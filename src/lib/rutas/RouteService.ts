export interface OptimizationResult {
    waypoints: any[];
    trip: any;
}

export class RouteService {
    async optimizeRoute(points: { lat: number; lng: number }[]): Promise<OptimizationResult> {
        const coords = points.map(p => `${p.lng},${p.lat}`).join(';');
        
        
        const url = `https://router.project-osrm.org/trip/v1/driving/${coords}?source=any&roundtrip=true&geometries=geojson&overview=full`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.code !== 'Ok') {
            throw new Error(data.message || 'Error al calcular la ruta');
        }

        return {
            waypoints: data.waypoints,
            trip: data.trips[0]
        };
    }

    async getRoute(points: { lat: number; lng: number }[]): Promise<any> {
        const coords = points.map(p => `${p.lng},${p.lat}`).join(';');
        const url = `https://router.project-osrm.org/route/v1/driving/${coords}?geometries=geojson&overview=full`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.code !== 'Ok') {
            throw new Error(data.message || 'Error al obtener la geometría de la ruta');
        }

        return data.routes[0];
    }
}
