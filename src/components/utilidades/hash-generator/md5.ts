
export function md5(string: string) {
    function k(n: number, s: number, _t: number) {
        return (n << s) | (n >>> (32 - s));
    }

    function l(x: number, y: number, z: number, w: number, s: number, t: number, a: number) {
        x = (x + (y & z | ~y & w) + s + a) | 0;
        return k(x, t, 0) + y;
    }

    function m(x: number, y: number, z: number, w: number, s: number, t: number, a: number) {
        x = (x + (y & w | z & ~w) + s + a) | 0;
        return k(x, t, 0) + y;
    }

    function n(x: number, y: number, z: number, w: number, s: number, t: number, a: number) {
        x = (x + (y ^ z ^ w) + s + a) | 0;
        return k(x, t, 0) + y;
    }

    function o(x: number, y: number, z: number, w: number, s: number, t: number, a: number) {
        x = (x + (z ^ (y | ~w)) + s + a) | 0;
        return k(x, t, 0) + y;
    }

    const x: number[] = [];
    const bytes = Array.from(new TextEncoder().encode(string));
    for (let i = 0; i < bytes.length; i++) {
        x[i >> 2] |= bytes[i] << ((i % 4) * 8);
    }
    x[bytes.length >> 2] |= 0x80 << ((bytes.length % 4) * 8);
    x[(((bytes.length + 8) >> 6) << 4) + 14] = bytes.length * 8;

    let a = 1732584193;
    let b = -271733879;
    let c = -1732584194;
    let d = 271733878;

    for (let i = 0; i < x.length; i += 16) {
        const aa = a;
        const bb = b;
        const cc = c;
        const dd = d;

        a = l(a, b, c, d, x[i + 0], 7, -680876936);
        d = l(d, a, b, c, x[i + 1], 12, -389564586);
        c = l(c, d, a, b, x[i + 2], 17, 606105819);
        b = l(b, c, d, a, x[i + 3], 22, -1044525330);
        a = l(a, b, c, d, x[i + 4], 7, -176418897);
        d = l(d, a, b, c, x[i + 5], 12, 1200080426);
        c = l(c, d, a, b, x[i + 6], 17, -1473231341);
        b = l(b, c, d, a, x[i + 7], 22, -45705983);
        a = l(a, b, c, d, x[i + 8], 7, 1770035416);
        d = l(d, a, b, c, x[i + 9], 12, -1958414417);
        c = l(c, d, a, b, x[i + 10], 17, -42063);
        b = l(b, c, d, a, x[i + 11], 22, -1990404162);
        a = l(a, b, c, d, x[i + 12], 7, 1804603682);
        d = l(d, a, b, c, x[i + 13], 12, -40341101);
        c = l(c, d, a, b, x[i + 14], 17, -1502002290);
        b = l(b, c, d, a, x[i + 15], 22, 1236535329);

        a = m(a, b, c, d, x[i + 1], 5, -165796510);
        d = m(d, a, b, c, x[i + 6], 9, -1069501632);
        c = m(c, d, a, b, x[i + 11], 14, 643717713);
        b = m(b, c, d, a, x[i + 0], 20, -373897302);
        a = m(a, b, c, d, x[i + 5], 5, -701558691);
        d = m(d, a, b, c, x[i + 10], 9, 38016083);
        c = m(c, d, a, b, x[i + 15], 14, -660478335);
        b = m(b, c, d, a, x[i + 4], 20, -405537848);
        a = m(a, b, c, d, x[i + 9], 5, 568446438);
        d = m(d, a, b, c, x[i + 14], 9, -1019803690);
        c = m(c, d, a, b, x[i + 3], 14, -187363961);
        b = m(b, c, d, a, x[i + 8], 20, 1163531501);
        a = m(a, b, c, d, x[i + 13], 5, -1444681467);
        d = m(d, a, b, c, x[i + 2], 9, -51403784);
        c = m(c, d, a, b, x[i + 7], 14, 1735328473);
        b = m(b, c, d, a, x[i + 12], 20, -1926607734);

        a = n(a, b, c, d, x[i + 5], 4, -378558);
        d = n(d, a, b, c, x[i + 8], 11, -2022574463);
        c = n(c, d, a, b, x[i + 11], 16, 1839030562);
        b = n(b, c, d, a, x[i + 14], 23, -35309556);
        a = n(a, b, c, d, x[i + 1], 4, -1530992060);
        d = n(d, a, b, c, x[i + 4], 11, 1272893353);
        c = n(c, d, a, b, x[i + 7], 16, -155497632);
        b = n(b, c, d, a, x[i + 10], 23, -1094730640);
        a = n(a, b, c, d, x[i + 13], 4, 681279174);
        d = n(d, a, b, c, x[i + 0], 11, -358537222);
        c = n(c, d, a, b, x[i + 3], 16, -722521979);
        b = n(b, c, d, a, x[i + 6], 23, 76029189);
        a = n(a, b, c, d, x[i + 9], 4, -640364487);
        d = n(d, a, b, c, x[i + 12], 11, -421815835);
        c = n(c, d, a, b, x[i + 15], 16, 530742520);
        b = n(b, c, d, a, x[i + 2], 23, -995338651);

        a = o(a, b, c, d, x[i + 0], 6, -198630844);
        d = o(d, a, b, c, x[i + 7], 10, 1126891415);
        c = o(c, d, a, b, x[i + 14], 15, -1416354905);
        b = o(b, c, d, a, x[i + 5], 21, -57434055);
        a = o(a, b, c, d, x[i + 12], 6, 1700485571);
        d = o(d, a, b, c, x[i + 3], 10, -1894986606);
        c = o(c, d, a, b, x[i + 10], 15, -1051523);
        b = o(b, c, d, a, x[i + 1], 21, -2054922799);
        a = o(a, b, c, d, x[i + 8], 6, 1873313359);
        d = o(d, a, b, c, x[i + 15], 10, -30611744);
        c = o(c, d, a, b, x[i + 6], 15, -1560198380);
        b = o(b, c, d, a, x[i + 13], 21, 1309151649);
        a = o(a, b, c, d, x[i + 4], 6, -145523070);
        d = o(d, a, b, c, x[i + 11], 10, -1120210379);
        c = o(c, d, a, b, x[i + 2], 15, 718787280);
        b = o(b, c, d, a, x[i + 9], 21, -343485551);

        a = (a + aa) | 0;
        b = (b + bb) | 0;
        c = (c + cc) | 0;
        d = (d + dd) | 0;
    }

    const hexChars = "0123456789abcdef";
    let hex = "";
    for (let i = 0; i < 4; i++) {
        const n = (i === 0 ? a : i === 1 ? b : i === 2 ? c : d);
        for (let j = 0; j < 4; j++) {
            hex += hexChars[(n >> (j * 8 + 4)) & 0x0f] + hexChars[(n >> (j * 8)) & 0x0f];
        }
    }
    return hex;
}
