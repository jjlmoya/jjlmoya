import L from "leaflet";
import { GeocodingService } from "./GeocodingService";
import { RouteService } from "./RouteService";

// Fix Leaflet icon issue
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
    iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
    shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

export interface RoutePoint {
    id: number;
    lat: number;
    lng: number;
    marker: L.Marker;
    name: string;
    address?: string;
}

export class RouteManager extends EventTarget {
    private map: L.Map | null = null;
    private points: RoutePoint[] = [];
    private routeLine: any = null;
    private geocodingService: GeocodingService;
    private routeService: RouteService;

    constructor() {
        super();
        this.geocodingService = new GeocodingService();
        this.routeService = new RouteService();
    }

    initMap(elementId: string) {
        const el = document.getElementById(elementId);
        if (!el) return;

        this.map = L.map(elementId).setView([40.416775, -3.70379], 6);

        L.tileLayer("https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png", {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
            subdomains: "abcd",
            maxZoom: 20,
        }).addTo(this.map);

        this.map.on("click", (e: L.LeafletMouseEvent) => {
            this.addPoint(e.latlng.lat, e.latlng.lng);
        });

        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.map?.setView([position.coords.latitude, position.coords.longitude], 13);
            });
        }
    }

    private getNumberedIcon(number: number) {
        return L.divIcon({
            className: 'number-icon-container',
            html: `<div class="number-icon">${number}</div>`,
            iconSize: [30, 30],
            iconAnchor: [15, 36],
            popupAnchor: [0, -36]
        });
    }

    async addPoint(lat: number, lng: number) {
        if (!this.map) return;

        const id = Date.now();
        const index = this.points.length + 1;
        const name = `Punto ${index}`;

        const marker = L.marker([lat, lng], {
            draggable: true,
            icon: this.getNumberedIcon(index)
        }).addTo(this.map);

        const point: RoutePoint = { id, lat, lng, marker, name, address: "Cargando dirección..." };
        this.points.push(point);

        this.notifyUpdate();

        // Handle drag
        marker.on("dragend", () => {
            const newPos = marker.getLatLng();
            point.lat = newPos.lat;
            point.lng = newPos.lng;
            this.clearRoute();
            this.updateAddress(point); // Refresh address on drag
        });

        // Fetch address
        await this.updateAddress(point);
    }

    private async updateAddress(point: RoutePoint) {
        const result = await this.geocodingService.getAddress(point.lat, point.lng);
        point.address = result.address;
        point.name = result.name;
        this.updateMarkerPopup(point);
        this.notifyUpdate();
    }

    private updateMarkerPopup(point: RoutePoint) {
        const popupContent = document.createElement("div");
        popupContent.innerHTML = `
            <div class="text-center">
                <strong class="block mb-1 text-sm">${point.name}</strong>
                <p class="text-xs text-slate-500 mb-2">Lat: ${point.lat.toFixed(4)}, Lng: ${point.lng.toFixed(4)}</p>
                <button class="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition-colors" id="delete-btn-${point.id}">
                    Eliminar
                </button>
            </div>
        `;

        point.marker.bindPopup(popupContent);
        point.marker.on('popupopen', () => {
            const btn = document.getElementById(`delete-btn-${point.id}`);
            btn?.addEventListener('click', () => this.deletePoint(point.id));
        });
    }

    deletePoint(id: number) {
        const index = this.points.findIndex((p) => p.id === id);
        if (index !== -1) {
            this.map?.removeLayer(this.points[index].marker);
            this.points.splice(index, 1);
            this.updateAllMarkers();
            this.clearRoute();
            this.notifyUpdate();
        }
    }

    private updateAllMarkers() {
        this.points.forEach((point, index) => {
            point.marker.setIcon(this.getNumberedIcon(index + 1));
        });
    }

    clearAll() {
        this.points.forEach((p) => this.map?.removeLayer(p.marker));
        this.points = [];
        this.clearRoute();
        this.notifyUpdate();
    }

    private clearRoute() {
        if (this.routeLine && this.map) {
            this.map.removeLayer(this.routeLine);
            this.routeLine = null;
        }
        this.dispatchEvent(new CustomEvent('routeCleared'));
    }

    async optimizeRoute() {
        if (this.points.length < 2) {
            this.dispatchEvent(new CustomEvent('error', { detail: 'Se necesitan al menos dos puntos para calcular una ruta.' }));
            return;
        }

        this.dispatchEvent(new CustomEvent('loading', { detail: true }));

        try {
            const { waypoints, trip } = await this.routeService.optimizeRoute(this.points);

            // 1. Map the response waypoints to our internal points to get the "Loop Order"
            // The waypoints array in the OSRM Trip response is sorted by the visit order
            const loopPoints = waypoints.map((wp: any) => {
                if (wp.waypoint_index !== undefined && wp.waypoint_index < this.points.length) {
                    return this.points[wp.waypoint_index];
                }
                return undefined;
            }).filter((p: any): p is RoutePoint => p !== undefined);

            if (loopPoints.length !== this.points.length) {
                console.warn("Mismatch in optimized points count, keeping original order");
                this.dispatchEvent(new CustomEvent('loading', { detail: false }));
                return;
            }

            // 2. Find the longest leg to "cut" the loop
            // The legs array corresponds to transitions: 0->1, 1->2, ..., (N-1)->0
            const legs = trip.legs;
            let maxLegIndex = -1;
            let maxLegDistance = -1;

            legs.forEach((leg: any, index: number) => {
                if (leg.distance > maxLegDistance) {
                    maxLegDistance = leg.distance;
                    maxLegIndex = index;
                }
            });

            // 3. Rotate the array so it starts after the longest leg
            // If leg[i] is the longest (from point i to i+1), we want to start at i+1.
            // New order: [i+1, i+2, ..., N-1, 0, 1, ..., i]
            const startIdx = (maxLegIndex + 1) % loopPoints.length;
            const newPointsOrder = [
                ...loopPoints.slice(startIdx),
                ...loopPoints.slice(0, startIdx)
            ];

            this.points = newPointsOrder;
            this.updateAllMarkers();
            this.notifyUpdate();

            // 4. Fetch the actual open route geometry for this new order
            const finalRoute = await this.routeService.getRoute(this.points);

            // Draw Route
            this.clearRoute();
            const routeGeoJSON = {
                type: "Feature",
                properties: {},
                geometry: finalRoute.geometry
            };

            this.routeLine = L.geoJSON(routeGeoJSON as any, {
                style: {
                    color: '#0891b2',
                    weight: 5,
                    opacity: 0.8,
                    lineCap: 'round',
                    lineJoin: 'round'
                }
            }).addTo(this.map!);

            this.map?.fitBounds(this.routeLine.getBounds(), { padding: [50, 50] });

            this.dispatchEvent(new CustomEvent('routeCalculated', { detail: { distance: finalRoute.distance } }));

        } catch (error) {
            console.error(error);
            this.dispatchEvent(new CustomEvent('error', { detail: 'Error al calcular la ruta' }));
        } finally {
            this.dispatchEvent(new CustomEvent('loading', { detail: false }));
        }
    }

    panToPoint(id: number) {
        const point = this.points.find(p => p.id === id);
        if (point && this.map) {
            this.map.flyTo([point.lat, point.lng], 16);
            point.marker.openPopup();
        }
    }

    private notifyUpdate() {
        this.dispatchEvent(new CustomEvent('update', { detail: this.points }));
    }
}
