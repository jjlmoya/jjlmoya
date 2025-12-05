export class QRPayloadGenerator {
    static wifi(ssid: string, password?: string, encryption: string = 'WPA', hidden: boolean = false): string {
        if (!ssid) return '';
        const esc = (str: string) => str.replace(/([\\;,:])/g, '\\$1');
        return `WIFI:S:${esc(ssid)};T:${encryption};P:${esc(password || '')};H:${hidden};;`;
    }

    static url(url: string): string {
        return url;
    }

    static vcard(data: { name: string; surname: string; phone: string; email: string; org: string }): string {
        if (!Object.values(data).some(v => v)) return '';
        return `BEGIN:VCARD
VERSION:3.0
N:${data.surname};${data.name}
FN:${data.name} ${data.surname}
ORG:${data.org}
TEL:${data.phone}
EMAIL:${data.email}
END:VCARD`;
    }
}
