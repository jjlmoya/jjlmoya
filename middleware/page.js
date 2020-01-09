export default function ({ route, store }) {
    if (route && route.params && route.params.id) {
        console.log(route.params.id)
    }
}
