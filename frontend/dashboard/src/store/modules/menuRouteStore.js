import {defineStore} from "pinia";
export const  useMenuRouteStore = defineStore('menuRouteStore',{
    state:()=>({
        headerList:[
            {
                label: "#",
                width: `40px`,
                field:'number',
            },
            {
                label: "Nomi",
                field:'name',
            },
            {
                label: "Route",
                width: `120px`,
                field:'route',
            },
            {
                label: "Status",
                width: `120px`,
                field:'status',
            },
            {
                label: "Status Text",
                width: `120px`,
                field:'statusText',
            },
            {
                label: "ID",
                width: `200px`,
                field:'_id',
            },
            {
                label: "Amallar",
                width: `80px`,
                field:'action',
            },
        ],
        bodyList:[],
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

        _index(){
            this.loading = true;
            $ApiService.menuRouteService._index(this.params).then((res)=>{
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
        _store(data){
            $ApiService.menuRouteService._store({data}).then((res)=>{
                this._index();
            }).finally(()=>{
            })
        },
        _update(payload){
            let {data, permission_id} = payload;
            $ApiService.menuRouteService._update({data, permission_id}).then((res)=>{
                this._index();
            }).finally(()=>{
            })
        },
        _delete(id){
            $ApiService.menuRouteService._delete({permission_id:id}).then((res)=>{
                this._index();
            }).finally(()=>{
            })
        },
        _filter(payload){
            this.params.page = 1;
            this.params.search = payload;
            this._index();
        },
        _changePage(event){
            this.params.page = event.page;
            this.params.per_page = event.per_page;
            this._index();
        }
    }
})