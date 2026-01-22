export interface GeocodingResult {
    address: string;
    name: string;
}

export class GeocodingService {
    async getAddress(lat: number, lng: number): Promise<GeocodingResult> {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`,
                {
                    headers: { "User-Agent": "RutasApp/1.0" },
                }
            );
            const data = await response.json();
            const addr = data.address;

            let addressStr = "Dirección desconocida";
            if (addr) {
                const parts = [];
                if (addr.road) parts.push(addr.road);
                if (addr.house_number) parts.push(addr.house_number);
                if (addr.suburb && !addr.road) parts.push(addr.suburb);
                if (addr.city || addr.town || addr.village)
                    parts.push(addr.city || addr.town || addr.village);
                addressStr = parts.join(", ") || data.display_name.split(",")[0];
            }

            return {
                address: addressStr,
                name: addressStr,
            };
        } catch (e) {
            console.error("Error fetching address:", e);
            return {
                address: "Error al obtener dirección",
                name: "Punto desconocido",
            };
        }
    }
}
