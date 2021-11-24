<template>
    <div>   
      <el-container>
        <el-header class="header">
            <div class="header-list">
              <div> 
                 <i class="el-icon-menu" 
                  :icon="isCollapse?'el-icon-menu':'el-icon-s-grid'"
                  @click="isCollapse=!isCollapse"></i>
              </div>
              <img src="../../assets/images/gg.png" style="width:48px" alt="无法显示图片">
              <div class="header-text">
                  <span class="header-text-1">欢迎您，管理员:<span style="color:#4f5555;">{{username}}</span></span>
                  <span class="header-text-2" @click="Signout">退出</span>
              </div>
          </div>
        </el-header>
        <el-container>
              <!-- 侧边导航 -->
              <el-aside width="160px" :style="{'width':isCollapse ? '64px':'170px','background-color':'#545c64','overflow':'hidden'}">
                  <el-menu
                  :default-active="$route.path"
                  class="el-menu-vertical-demo"
                  :collapse="isCollapse" 
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#409EFF"
                  :router="true">
                      <el-menu-item  index="/home">
                          <i class="el-icon-s-home"></i>
                          <span slot="title">首页</span>
                      </el-menu-item>
                      <el-menu-item index="1">
                          <i class="el-icon-picture"></i>
                          <span slot="title">测试标题1</span>
                      </el-menu-item>
                      <el-menu-item index="2">
                          <i class="el-icon-s-custom"></i>
                          <span slot="title" >测试标题2</span>
                      </el-menu-item>
                      <el-submenu index="3">
                            <template slot="title">
                              <i class="el-icon-s-promotion" ></i>
                              <span slot="title">测试标题3</span>
                            </template>
                          <el-menu-item index="1-1">选项1</el-menu-item>
                          <el-menu-item index="1-2">选项2</el-menu-item>
                      </el-submenu>
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
      width: 98%;
      margin-top: 10px;
      margin-left: 30px;
      padding: 10px;
      border-radius: 4px 0;
      /* background-color: #dbe6f6; */
      background-color: #FFFFFF;
      box-shadow: 0px 0px 4px #c7c7c7;
      overflow-y: hidden;
    }
    .bottom{
      margin:  0 0 0 30px;
      background-color: #B3C0D1;
      color: #333;
      text-align: center;
      line-height: 60px;
    }
    .el-menu{
        border-right: 0px !important; 
    }
    .el-menu-item, .el-submenu__title{
        height: 48px !important;
        line-height: 48px !important;
    }
     .header-list{
        display: flex;
        align-items: center;
    }
    .header-text{
        margin-left: 40px;
        color: #fff;
    }
    .header-text span:nth-child(2){
        margin-left: 15px;
        color: #5e7c85;
        cursor: pointer;
    }
</style>