
import axios from "@/service/index.js"

const _index = (payload) =>{
    return axios.get(`/menu/index`, {params:payload})
}

const _store = (payload) =>{
    return axios.post(`/menu/store`, payload.data)
}

const _update = (payload) =>{
    return axios.put(`/menu/update/${payload.permission_id}`, payload.data)
}

const _delete = (payload) =>{
    return axios.delete(`/menu/delete/${payload.permission_id}` )
}
export default {
    _index,
    _store,
    _update,
    _delete,
}