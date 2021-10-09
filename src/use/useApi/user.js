import axios from '@/api/clients/axios'
import { useAxios } from '@/use/useAxios'

export default () => {
    const byId = () => {
        return useAxios('/v1/e3d7e5d3-8f4c-4d22-b6f4-84dbbded1588', {
            method: 'get'
        }, axios)
    }

    return {
        byId
    }
}