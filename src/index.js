import App from './App.vue';
const bench_data=require('./data.json');


let root_div=document.createElement('div');
root_div.id='app';
if('serviceWorker' in navigator){
    window.addEventListener('load',function(){
        navigator.serviceWorker.register('./service-worker.js')
        .then(registration=>{
            console.log('service worker registered')
        }).catch(error=>{
            console.log('service worker register error')
        })
    })
}

document.getElementsByTagName('body')[0].append(root_div);

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

