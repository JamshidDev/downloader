
import axios from "@/service/index.js"

const permission_index = (payload) =>{
    return axios.get(`/permission/index`, {params:payload})
}

const permission_store = (payload) =>{
    return axios.post(`/permission/store`, payload.data)
}

const permission_update = (payload) =>{
    return axios.put(`/permission/update/${payload.permission_id}`, payload.data)
}

const permission_delete = (payload) =>{
    return axios.delete(`/permission/delete/${payload.permission_id}` )
}
export default {
    permission_index,
    permission_store,
    permission_update,
    permission_delete,
}