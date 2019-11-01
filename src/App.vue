<style scoped>
#urls{
    display: inline-block;
    /* display: none; */
    opacity:0;
    transition: all 0.3s linear;
}
#urls>a{
    font-weight: 100
}
td:hover>#urls{
    /* display: inline-block; */
    opacity: 1;
}
#map{
    height: 800px
}
footer{
    padding:3em 0;
}
</style>

<template>
    <div>
    <!-- 顶部菜单开始 -->
    <div class="ui stackable menu">
        <div class="ui container">
            <div class="header item">Zbench</div>
            <a class="item" href="#basic_info"><i class="ui icon desktop"></i>基础信息</a>
            <a class="item" href="#disk_performance"><i class="ui icon disk"></i>磁盘</a>
            <a class="item" href="#network_test"><i class="ui icon cloud download"></i>网速</a>
            <a class="item" href="#mtr_test"><i class="ui icon sitemap"></i>路由</a>
            <a class="item" href="#ping"><i class="ui icon exchange"></i>延迟</a>
            <div class="item disabled">测试时间：{{result[0].update_timestamp}}</div>
        </div>
    </div>
    <!-- 顶部菜单结束 -->
    <div class="ui container">
        <div class="ui grid">
            <div class="row">
                <div class="sixteen wide column">
                    <h2 id="basic_info">基础信息</h2>
                </div>
                <div class="sixteen wide column">
                    <table class="ui selectable compact table blue celled strip">
                        <thead>
                            <tr>
                                <th>项目</th>
                                <th>数据</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>商家</td>
                                <td style="text-transform: capitalize;">{{result[0].Provider}}</td>
                            </tr>
                            <tr>
                                <td>CPU 型号</td>
                                <td>{{result[0].CPUmodel}}</td>
                            </tr>
                            <tr>
                                <td>CPU 核心数</td>
                                <td>{{result[0].CPUcore}}</td>
                            </tr>
                            <tr>
                                <td>CPU 主频</td>
                                <td>{{result[0].CPUspeed}}</td>
                            </tr>
                            <tr>
                                <td> 硬盘大小</td>
                                <td>{{result[0].HDDsize}}</td>
                            </tr>
                            <tr>
                                <td>内存大小</td>
                                <td>{{result[0].RAMsize}}</td>
                            </tr>
                            <tr>
                                <td>SWAP 交换空间大小</td>
                                <td>{{result[0].SWAPsize}}</td>
                            </tr>
                            <tr>
                                <td>在线时长</td>
                                <td>{{result[0].UPtime}}</td>
                            </tr>
                            <tr>
                                <td>系统负载</td>
                                <td>{{result[0].systemload}}</td>
                            </tr>
                            <tr>
                                <td>系统</td>
                                <td>{{result[0].OS}}</td>
                            </tr>
                            <tr>
                                <td>架构</td>
                                <td>{{result[0].Arch}}</td>
                            </tr>
                            <tr>
                                <td>核心</td>
                                <td>{{result[0].Kernel}}</td>
                            </tr>
                            <tr>
                                <td>虚拟化技术</td>
                                <td>{{result[0].Virmethod}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="ui container">
        <div class="ui grid">
            <div class="row">
                <div class="sixteen wide column">
                    <h2 id="disk_performance">磁盘测试</h2>
                </div>
                <div class="sixteen wide column">
                    <table class="ui table celled compact selectable green">
                        <thead>
                            <tr>
                                <th>序号</th>
                                <th>速度</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>第一次</td>
                                <td>{{result[0].IOa}}</td>
                            </tr>
                            <tr>
                                <td>第二次</td>
                                <td>{{result[0].IOb}}</td>
                            </tr>
                            <tr>
                                <td>第三次</td>
                                <td>{{result[0].IOc}}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <th>平均</th>
                                <th>{{average_io}}</th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="ui container ">
        <div class="ui grid">
            <div class="row">
                <div class="sixteen wide column">
                    <h2 id="network_test">网速测试</h2>
                </div>
                <div class="sixteen wide column">
                    <table class="ui table violet compact selectable fixed celled">
                        <thead>
                            <tr>
                                <th class="five wide">节点</th>
                                <th class="five wide">IP</th>
                                <th @click="sort_result('overseas_network','dl_bit')" class="two wide">速度<i style="float:right" class="ui icon sort numeric down"></i></th>
                                <th @click="sort_result('overseas_network','latency')" class="two wide">延迟<i style="float:right" class="ui icon sort numeric down"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in overseas_network">
                                <td>{{item.name}}</td>
                                <td>
                                    {{item.ip}}
                                    
                                </td>
                                <td>{{item.dl}}</td>
                                <td>{{item.latency}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div class="sixteen wide column"></div>
                <div class="sixteen wide column" style="padding:2em 1em 0 1em">
                    <h2>大陆网速</h2>
                </div>
                <div class="sixteen wide column">
                    <table class="ui table compact celled selectable olive">
                        <thead>
                            <tr>
                                <th>节点</th>
                                <th @click="sort_result('mainland_network','uplink')">上传<i style="float:right" class="ui icon sort numeric down"></i></th>
                                <th @click="sort_result('mainland_network','downlink')">下载<i style="float:right" class="ui icon sort numeric down"></i></th>
                                <th @click="sort_result('mainland_network','ping')">延迟<i style="float:right" class="ui icon sort numeric down"></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="item in mainland_network" :key="item.name">
                                <td>{{item.name}}</td>
                                <td v-html="item.uplink_html"></td>
                                <td v-html="item.downlink_html"></td>
                                <td v-html="item.ping_html"></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
    <div class="ui container ">
        <div class="ui grid">
            <div class="row">
                <div class="sixteen wide column">
                    <h2 id="mtr_test">路由测试</h2>
                </div>
                <div class="sixteen wide column">
                    <div class="ui top attached tabular stackable menu" style="cursor: pointer;">
                        <div class="item" v-for='result in trace_route_results' :class="{'active':(trace_tab_select==result.code)}" @click="trace_tab_select=result.code" :key="result.name">{{result.name}}</div>
                    </div>
                    <div class="ui bottom attached tab segment" v-for='result in trace_route_results' :key="result.name" :class="{'active':(trace_tab_select==result.code)}" >
                        <table class="ui table compact small selectable brown">
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th class="five wide">IP</th>
                                    <th>地址</th>
                                    <!-- <th>运营商</th> -->
                                    <th class="two wide">AS</th>
                                    <th class="two wide">延迟</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="line in result.content" :key="line.hop">
                                    <td>{{line.hop}}</td>
                                    <!-- <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td> -->
                                    <td>
                                        {{line.data[0].ip}}
                                        <span id="urls" v-if="line.data[0].ip.length>4">
                                            <a :href="'http://ip-api.com/#'+line.data[0].ip" target="_blank" class="ui blue mini label">IP-API</a>
                                            <a :href="'https://www.ipip.net/ip/'+line.data[0].ip + '.html'" target="_blank" class="ui teal mini label">IPIP</a>
                                            <a :href="'https://bgp.he.net/ip/'+line.data[0].ip" target="_blank" class="ui brown mini label">BGP</a>
                                        </span>
                                    </td>
                                    <td>{{line.data[0].location}}</td>
                                    <td>{{line.data[0].as}}</td>
                                    <td>{{line.data[0].elapse}} {{line.data[0].ip.length>4?'ms':''}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="ui container">
        <h2 id="ping">国内延迟</h2>
        <div class="ui divider"></div>
        <div class="ui segment" id="map"></div>
    </div>
    <footer class="ui container">
        <div class="ui divider"></div>
        <p>Made with <i class="ui red heart icon"></i> by kiwi</p>
    </footer>
</div>
</template>

<script>
export default {
    props:['result','map_js_loaded'],  
    data:function(){
        return {
            bench_result:this.result,
            mainland_network: [],
            overseas_network: [],
            trace_route_locations: {
                TGT: '广州电信',
                TGM: '广州移动',
                TGU: '广州联通',
                TST: '上海电信',
                TSM: '上海移动',
                TSU: '上海联通',
                CDE: '成都教育网'
            },
            trace_tab_select: 'TGT',
            trace_route_results:'',
            average_io:'',
            map:'',
            map_mark_interval:300,
            google:null,
            coordinates:[{"name":"兰州","coordinate":{"lat":36.061089,"lng":103.834303}},{"name":"长沙","coordinate":{"lat":28.228209,"lng":112.938814}},{"name":"杭州","coordinate":{"lat":30.274084,"lng":120.15507}},{"name":"拉萨","coordinate":{"lat":29.65483799999999,"lng":91.140552}},{"name":"郑州","coordinate":{"lat":34.746611,"lng":113.625328}},{"name":"广州","coordinate":{"lat":23.12911,"lng":113.264385}},{"name":"济南","coordinate":{"lat":36.6512,"lng":117.120095}},{"name":"重庆","coordinate":{"lat":29.4315861,"lng":106.912251}},{"name":"福州","coordinate":{"lat":26.074478,"lng":119.296482}},{"name":"北京","coordinate":{"lat":39.90419989999999,"lng":116.4073963}},{"name":"成都","coordinate":{"lat":30.572815,"lng":104.066801}},{"name":"宁夏","coordinate":{"lat":37.198731,"lng":106.1580937}},{"name":"乌鲁木齐","coordinate":{"lat":43.825592,"lng":87.61684799999999}},{"name":"合肥","coordinate":{"lat":31.820591,"lng":117.227219}},{"name":"宁波","coordinate":{"lat":29.868336,"lng":121.54399}},{"name":"西安","coordinate":{"lat":34.341574,"lng":108.93977}},{"name":"南京","coordinate":{"lat":32.060255,"lng":118.796877}},{"name":"武汉","coordinate":{"lat":30.592849,"lng":114.305539}},{"name":"上海","coordinate":{"lat":31.2303904,"lng":121.4737021}},{"name":"呼和浩特","coordinate":{"lat":40.842356,"lng":111.749995}},{"name":"天津","coordinate":{"lat":39.3433574,"lng":117.3616476}},{"name":"哈尔滨","coordinate":{"lat":45.80377499999999,"lng":126.534967}},{"name":"苏州","coordinate":{"lat":31.298974,"lng":120.585289}},{"name":"西宁","coordinate":{"lat":36.617134,"lng":101.778223}},{"name":"长春","coordinate":{"lat":43.817071,"lng":125.323544}}]
        }
    },
    watch:{
        map_js_loaded:function(newval,oldval){
            if(newval===1){
                this.initMap();
                this.process_ping_result();
            }
        }
    },
    methods: {
            initMap:function(){
                var mapProp = {
                    center:new google.maps.LatLng(34.58088, 105.72498),
                    zoom:5,
                    mapTypeId:google.maps.MapTypeId.ROADMAP
                };
                this.map=new google.maps.Map(document.getElementById("map"), mapProp);
                this.google=window.google;
            },
            blocker:function(){
                let interval=this.map_mark_interval;
                return new Promise(function(resolve,reject){
                    setTimeout(function(){
                        resolve(1)
                    },interval)
                })
            },
            mark:function(coordinate,info){
                var coordinate_obj=new google.maps.LatLng(coordinate);
                // 生成一个标记
                var marker=new google.maps.Marker({
                    position:coordinate_obj,
                });

                //生成一个信息窗口
                var infowindow = new google.maps.InfoWindow({
                    content:info
                });
                //在地图上画出标记
                marker.setMap(this.map);
                //在标记上打开信息窗口
                infowindow.open(this.map,marker);
            },
            process_ping_result:async function (){
                let data=JSON.parse(this.result[0].ping);
                this.bench_result[0].ping=[];
       
                for(let i=0;i<data.length;i++){
                    for(let x=0;x<this.coordinates.length;x++){
                            if(data[i].name===this.coordinates[x].name){
                                this.bench_result[0].ping.push({
                                    name:this.coordinates[x].name,
                                    latency:data[i].latency,
                                    coordinate:data[i].coordinate
                                })
                                let tmp=await this.blocker();
                                let latency_text='';
                                if(parseFloat(data[i].latency)===0){
                                    latency_text=`<span style="color:red">ERROR</span>`;
                                }else{
                                    latency_text=`<span style="color:${this.latency_color(data[i].latency)}">${data[i].latency} ms</span>`;
                                }
                                let marker_content=`<span style="font-weight:bold">${data[i].name}: ${latency_text}</span>`
                                this.mark(this.coordinates[x].coordinate, marker_content);
                            }
                    }
                }
            },
            latency_color:function(latency){

                if(latency<20){
                    return "#009933"
                }
                if(latency<50){
                    return "#86b300"
                }
                if(latency<100){
                    return "#669900"
                }
                if(latency<200){
                    return "#99cc00"
                }
                if(latency<300){
                    return "#b3b300"
                }
                if(latency<500){
                    return "#cc7a00"
                }
                return "#b32d00"
            },

            sort_result:function(arr,field,order){
                this[arr].sort(function(a,b){
                    return parseFloat(a[field])-parseFloat(b[field])
                })
            },
            format_link_speed: function(data) {
                let result = data / 8 / 1024;
                if (result < 1000) {
                    return Math.floor(result) + ' KB/s'
                }
                result = result / 1024;
                if (result < 1000) {
                    return `<span style="color:#339966">${result.toFixed(2)} MB/s</span>`
                }
                result = result / 1024;
                if (reuslt < 1000) {
                    return `<span style="color:#b30000">${result.toFixed(2)} GB/s</span>`
                }
            },
            format_mainland_network: function() {
                let data_arr = this.bench_result[0].Speedtest_cn.split('\n');

                for (var i = 0; i < data_arr.length; i++) {
                    let data = '';
                    if (data_arr[i] && data_arr[i].indexOf('ERROR') === -1) {
                        data = JSON.parse(data_arr[i]);
                        let ping = data.result.ping > 1000 ? (`<span style="color:red">${(data.result.ping / 1000).toFixed(2)} s</span>`) : (Math.ceil(data.result.ping) + ' ms');
                        this.mainland_network.push({
                            name: data.name,
                            uplink_html: this.format_link_speed(data.result.upload),
                            downlink_html: this.format_link_speed(data.result.download),
                            ping_html: ping,
                            uplink: data.result.upload,
                            downlink: data.result.download,
                            ping: data.result.ping
                        })
                    }

                }
            },
            format_overseas_network: function() {
                let data_arr = this.bench_result[0].Speedtest_overseas.split('\n');
                for (var i = 0; i < data_arr.length; i++) {
                    let data = '';
                    if (data_arr[i] && data_arr[i].indexOf('ERROR') === -1) {
                        data = JSON.parse(data_arr[i]);
                        let downlink_bit=parseFloat(data.result.download);
                        if(data.result.download.indexOf('MB')>0){
                            downlink_bit*=1024*1024;
                        }
                        if(data.result.download.indexOf('GB')>0){
                            downlink_bit*=1024*1024*1024;
                        }
                        this.overseas_network.push({
                            name: data.name,
                            ip: data.result.ip,
                            dl: data.result.download,
                            latency: data.result.latency,
                            dl_bit:downlink_bit
                        })
                    }

                }
            },
            format_io: function(io) {
                if (io.indexOf('MB') > 0) {
                    return parseInt(io, 10);
                }
                if (io.indexOf('GB') > 0) {
                    return parseInt(io, 10) * 1024;
                }
                if (io.indexOf('KB') > 0) {
                    return parseInt(io, 10) / 1024;
                }
                return 0;
            },
            caculate_average_io: function() {
                var average_io_mb = (this.format_io(this.result[0].IOa) + this.format_io(this.result[0].IOb) + this.format_io(this.result[0].IOc)) / 3;
                if (average_io_mb < 1025) {
                    this.average_io= Math.floor(average_io_mb) + ' MB/s';
                } else {
                    this.average_io= (average_io_mb / 1024).toFix(2) + ' GB/s';
                }
            },
            format_trace_route_results: function() {
                var results = [];
                for (let x in this.trace_route_locations) {
                    let content=JSON.parse(this.result[0][x]);
                    content.shift();
                    results.push({ name: this.trace_route_locations[x], content, code: x })
                }
                this.trace_route_results=results;
            },
        },
        beforeMount: function() {

        },
        mounted:function(){
            this.format_mainland_network();
            this.format_overseas_network();
            this.caculate_average_io();
            this.format_trace_route_results();
            
        }
}
</script>
