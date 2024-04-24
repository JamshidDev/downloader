import {defineStore} from "pinia";
export const  usePermissionStore = defineStore('permissionStore',{
    state:()=>({
        headerList:[
            {
                label: "#",
                width: `40px`,
            },
            {
                label: "Nomi",
            },
            {
                label: "ID",
                width: `200px`,
            },
            {
                label: "Amallar",
                width: `80px`,
            },
        ],
        bodyList:[],
        bodyProperty:['number','name','_id', 'action'],

        permissionList:[],
        totalItem:0,
        params:{
            search:null,
            page:1,
            per_page:10,
        },
        loading:false,
    }),

    actions:{

        get_permission(){
            this.loading = true;
            $ApiService.permissionService._index(this.params).then((res)=>{
                let number = (this.params.page - 1) * this.params.per_page;
                res.data.data.data.forEach((item) => {
                    number++;
                    item.number = number;
                });
                this.bodyList = res.data.data.data;
                this.totalItem = res.data.data.totalItem;
            }).finally(()=>{
                this.loading = false;
            })
        },
        create_permission(data){
            $ApiService.permissionService._store({data}).then((res)=>{
                this.get_permission();
            }).finally(()=>{
            })
        },
        update_permission(payload){
            let {data, permission_id} = payload;
            $ApiService.permissionService._update({data, permission_id}).then((res)=>{
                this.get_permission();
            }).finally(()=>{
            })
        },
        delete_permission(id){
            $ApiService.permissionService._delete({permission_id:id}).then((res)=>{
                this.get_permission();
            }).finally(()=>{
            })
        },
        filter_permission(payload){
            this.params.page = 1;
            this.params.search = payload;
            this.get_permission();
        },
        changePage(event){
            this.params.page = event.page;
            this.params.per_page = event.per_page;
            this.get_permission();
        }
    }
})