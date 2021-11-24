<template>
    <div class="Nomatch-box">
        <div class="Nomatch-box-img">
            <div class="nomatchimg">
                <img src="../../assets/images/icon/icon-404.svg" alt="">
            </div>
        </div>
        <div class="ivu-exception-content">
            <h1>404</h1>
            <div class="ivu-exception-content-desc">抱歉，你访问的页面不存在</div>
            <div class="ivu-exception-content-actions">
                <a href="/" target="_self" class="ivu-btn ivu-btn-primary ivu-btn-large">
                    <span @click="backhome()">返回首页</span>
                </a>
            </div>
        </div>
        
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    methods:{
        //反回首页
        backhome(){
            this.$router.push({path:'home',query:{}})
        }
    }
}
</script>
<style scoped>
    .Nomatch-box{
        padding: 0 30px;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        /* justify-content: space-around; */
        height: 100vh;
    }
    .Nomatch-box-img{
        -webkit-box-flex: 0;
        -ms-flex: 0 0 62.5%;
        flex: 0 0 62.5%;
        width: 62.5%;
        padding-right: 152px;
        zoom: 1;
    }
    .nomatchimg{
        float: right;
        width: 100%;
        /* max-width: 430px;
        height: 360px; */
        background-repeat: no-repeat;
        background-position: 50% 50%;
        background-size: contain;
    }
    .ivu-exception-content{
        /* width: 270px; */
        -webkit-box-flex: 1;
        /* -ms-flex: auto; */
        flex: auto;
    }
    .ivu-exception-content h1{
        margin-bottom: 24px;
        color: #515a6e;
        font-weight: 600;
        font-size: 72px;
        line-height: 72px;
    }
   .ivu-exception-content-desc {
        margin-bottom: 16px;
        color: #808695;
        font-size: 20px;
        line-height: 28px;
    }
    /* .Nomatch-box img{
        position: absolute;
        width: 100%;
        height: 100%;
    }
    .Nomatch-box .el-button{
        z-index: 98;
        position: absolute;
        left: 50%;
        top: 68%;
        transform: translate(-50%,-50%);
    } */
</style>