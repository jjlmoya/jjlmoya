import { useRouter } from "vue-router"

export default () => {
    const router = useRouter()
    const paths = router.options.routes
    const getNavPath = () => router.options.routes.filter((path) => path.meta.menu)
    

    return {
        paths,
        getNavPath
    }
}
