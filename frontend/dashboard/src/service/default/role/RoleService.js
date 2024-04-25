
import axios from "@/service/index.js"

const _index = (payload) =>{
    return axios.get(`/role/index`, {params:payload})
}

const _store = (payload) =>{
    return axios.post(`/role/store`, payload.data)
}

const _update = (payload) =>{
    return axios.put(`/role/update/${payload.permission_id}`, payload.data)
}

const _delete = (payload) =>{
    return axios.delete(`/role/delete/${payload.permission_id}` )
}
export default {
    _index,
    _store,
    _update,
    _delete,
}