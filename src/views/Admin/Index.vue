<template>
    <div>   
      <el-container class="main">
        <el-header class="header">
            <div class="header-list">
              <div class="logo">
                <a href="">DuXiuKeJi</a>
              </div>
              <div class="left_open"> 
                 <i class="el-icon-s-fold" 
                  :icon="isCollapse?'el-icon-s-fold':'el-icon-s-unfold'"
                  @click="isCollapse=!isCollapse"></i>
              </div>
              <div class="left_open"> 
                  <router-link to="/home">
                    <i class="el-icon-s-home"></i>
                  </router-link>
              </div>
              <div class="header-text">
                  <img src="../../assets/images/gg.png" style="width:38px" alt="无法显示图片">
                  <span class="header-text-1">欢迎您，管理员:<span style="color:#4f5555;">&nbsp; {{username}}</span></span>
                  <span class="header-text-2" @click="Signout">退出</span>
              </div>
          </div>
        </el-header>
        <el-container class="container">
              <!-- 侧边导航 -->
              <el-aside width="170px" :style="{'width':isCollapse ? '64px':'170px','background-color':'#545c64','overflow':'hidden'}">
                  <el-menu
                  :default-active="$route.path"
                  class="el-menu-vertical-demo"
                  :collapse="isCollapse" 
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#409EFF"
                  :unique-opened="true"
                  :router="true">
                      <el-menu-item  index="/home">
                          <i class="el-icon-s-home"></i>
                          <span slot="title">首页</span>
                      </el-menu-item>
                      <el-menu-item index="/about">
                          <i class="el-icon-picture"></i>
                          <span slot="title">测试标题1</span>
                      </el-menu-item>
                      <el-submenu index="/content">
                            <template slot="title">
                              <i class="el-icon-tickets" ></i>
                              <span slot="title">文章管理</span>
                            </template>
                          <el-menu-item index="/content/companyprofile">企业介绍</el-menu-item>
                          <el-menu-item index="/content/industry">行业资讯</el-menu-item>
                      </el-submenu>
                       <el-submenu index="/product">
                            <template slot="title">
                              <i class="el-icon-s-promotion" ></i>
                              <span slot="title">产品详情</span>
                            </template>
                          <el-menu-item index="/product/device" disabled>智能设备</el-menu-item>
                          <el-menu-item index="/product/advantage" disabled>产品优势</el-menu-item>
                          <el-menu-item index="/product/featurefun">功能介绍</el-menu-item>
                          <el-menu-item index="/product/solution" disabled>解决方案</el-menu-item>
                      </el-submenu>
                      <el-submenu index="/message">
                            <template slot="title">
                              <i class="el-icon-s-comment" ></i>
                              <span slot="title">信息管理</span>
                            </template>
                          <el-menu-item index="/message/apply">报名查询</el-menu-item>
                          <el-menu-item index="/message/attract">招商管理</el-menu-item>
                          <el-menu-item index="/message/cooperative">合作单位</el-menu-item>
                      </el-submenu>
                      <el-submenu index="/picture">
                            <template slot="title">
                              <i class="el-icon-picture"></i>
                              <span slot="title">图片处理</span>
                            </template>
                          <el-menu-item index="/picture/brochure">宣传册</el-menu-item>
                          <el-menu-item index="/picture/banner">轮播图</el-menu-item>
                      </el-submenu>
                       <el-menu-item index="/system">
                          <i class="el-icon-setting"></i>
                          <span slot="title">系统设置</span>
                      </el-menu-item>
                      
                  </el-menu>
              </el-aside>
              <!-- 子路由内容切换 -->
              <el-main class="center">
                <router-view/>
              </el-main>
        </el-container>
      </el-container>
    </div>
</template>
<script>
export default {  
    data(){
        return{
          isCollapse:false,
          keyname:"",
          username:"",
        }
    },
    components: {},
    created(){

    },
    mounted(){
        //获取本地存储
        this.username = localStorage.getItem('username');
    },
    methods:{
        Signout(){
           this.$confirm("退出登录, 是否继续?", "提示", {
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				type: "warning",
			  }).then(() => {
				sessionStorage.clear();
                localStorage.clear()
				this.$router.push({ path: "/login" });
			  });
			},
    },
}
</script>
<style scoped>
    .main{
      width: 100vw;
      height: 100vh;
      display: flex;
      overflow-y: auto;
      overflow-x: hidden;
    }
    .header{
      display: flex;
      align-items: center;
      width: 100%;
      height: 48px !important;
      /* background-color: #a0b4ba; */
      background: linear-gradient(to left,rgba(1, 170, 237, 1), rgba(82, 183, 109, 1)) !important;
    }
    .center{
      width: 100%;
      margin-top: 10px;
      margin-left: 10px;
      /* padding: 10px; */
      border-radius: 4px 0;
      /* background-color: #dbe6f6; */
      /* background-color: #FFFFFF;
      box-shadow: 0px 0px 4px #c7c7c7; */
      /* overflow-y: hidden; */
    }
    .bottom{
      margin:  0 0 0 30px;
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
    }
    .el-menu{
        height: 700px;
        overflow: hidden;
        border-right: 0px !important; 
    }
    .el-menu-item, .el-submenu__title{
        height: 48px !important;
        line-height: 48px !important;
    }
    .el-header{
      padding: 0
    }
    .el-aside{
      transition: all .3s;
      -webkit-transition: all .3s;
    }
    .container{
      overflow: hidden;
    }
    .el-main {
      padding: 0 !important;
      overflow-y:auto !important;
    }
    @import "../../assets/css/index-header.css";
</style>