<template>
    <div class="Home-box">
        
        <div class="layui-col-md12">
            <div class="layui-card">
                <div class="layui-card-body ">
                    <span class="x-red">首页</span>！当前时间:{{this.gettime}}
                </div>
            </div>
        </div>
        <div class="layui-col-md12">
            <div class="layui-card">
                <div class="layui-card-header">数据统计</div>
                <ul class="list">
                    <li v-for="(item,index) in homedata" :key="index">
                        <a href="javascript:;" class="backlog-body" >
                            <h3>{{item.title}}</h3>
                            <p>{{item.number}}</p>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="layui-col-md12">
            <div class="layui-card">
                <div class="layui-card-header">系统信息</div>
                <div class="layui-card-body-1">
                    <table class="layui-table" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <th class="w100">xxx版本</th>
                                <td class="borl-no">1.0.180420</td>
                            </tr>
                            <tr v-for="(item,index) in config" :key="index">
                                <th class="bort-no">{{item.title}}</th>
                                <td class="borl-no bort-no">{{item.detail}}</td>
                            </tr>
    
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div class="layui-col-md12">
            <div class="layui-card">
                <div class="layui-card-header">开发团队</div>
                <div class="layui-card-body-1">
                    <table class="layui-table" cellspacing="0" cellpadding="0">
                        <tbody>
                            <tr>
                                <th>版权所有</th>
                                <td class="borl-no">duxiukeji.com
                                    <a href="http://x.xuebingsi.com/" target="_blank">访问官网</a>
                                </td>
                            </tr>
                            <tr>
                                <th class="bort-no">开发者</th>
                                <td class="borl-no bort-no">某某(0000000000@qq.com)</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            gettime:"",
            homedata:[
                {title:"文章",number:"66"},
                {title:"会员",number:"62"},
                {title:"商品",number:"63"},
                {title:"文章",number:"69"},
                {title:"会员",number:"68"},
                {title:"商品",number:"67"},
            ],
            config:[
                {title:"服务器地址",detail:"duxiu.com"},
                {title:"操作系统",detail:"Windos"},
                {title:"框架语法",detail:"Element,Vue"},
                {title:"MYSQL版本",detail:"5.5.53"},
                {title:"ThinkPHP",detail:"5.0.18"},
                {title:"上传附件限制",detail:"20M"},
                {title:"执行时间限制",detail:"30s"},
                {title:"剩余空间",detail:"6666.2M"},
            ]
        }
    },
    created(){},
    mounted(){
        this.timer = setInterval(() => {
                this.getCurrentTime() // 修改数据date
        }, 1000)
    },
    methods:{
        
         //获取当前时间
        getCurrentTime() {
            var _this = this;
        　　let yy = new Date().getFullYear();
        　　let mm = new Date().getMonth()+1;
        　　let dd = new Date().getDate();
        　　let hh = new Date().getHours();
        　　let mf = new Date().getMinutes()<10 ? '0'+new Date().getMinutes() : new Date().getMinutes();
        　　let ss = new Date().getSeconds()<10 ? '0'+new Date().getSeconds() : new Date().getSeconds();
        　　_this.gettime = yy+'-'+mm+'-'+dd+' '+hh+':'+mf+':'+ss;
        // 　　console.log(_this.gettime)  
        },


    },
    beforeDestroy() {
        if (this.timer) {
        clearInterval(this.timer); // 在Vue实例销毁前，清除我们的定时器
        }
    }
}
</script>
<style scoped>
     @import "../../assets/css/Home.css";
</style>