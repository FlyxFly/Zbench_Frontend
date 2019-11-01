import App from './App.vue';

let root_div=document.createElement('div');
root_div.id='app';

let map_script=document.createElement('script');
map_script.src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCAr0SYZ3yV8Iwm0WyyQ1dArg1TYgA-Pv0&callback=initMap";
map_script.defer="true";

document.getElementsByTagName('body')[0].append(root_div);
document.getElementsByTagName('body')[0].append(map_script);

window.myapp=new Vue({
    el:'#app',
    template:'<App :result="bench_data" :map_js_loaded="map_js_loaded"></App>',
    data:{
        bench_data,
        map_js_loaded:0
    },
    components:{
        App
    },
    beforeMount:function(){
        window.document.title=this.bench_data[0].Provider+' bench result';
    }
})


window.initMap=function(){
    myapp.map_js_loaded=1;
}

