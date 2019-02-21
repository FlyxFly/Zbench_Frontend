import App from './App.vue';


window.myapp=new Vue({
    el:'#app',
    data:{
        bench_data,
        map_js_loaded:0
    },
    components:{
        App
    },
    beforeMount:function(){
        window.document.title=this.bench_data[0].Provider+' Bench result';
    }
})


window.initMap=function(){
    myapp.map_js_loaded=1;
}