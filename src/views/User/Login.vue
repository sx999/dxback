<template>
    <div class="Login-box">
        <img src="../../assets/images/bg1.jpg" alt="" class="bak-img">
        <div class="data-back-img">
            <div class="container-in">
            <div class="left">
                <h2 class="title">独秀科技</h2>
                <h2 class="titlex">独秀科技官方后台</h2>
                <h2 class="titlex">欢迎登录</h2>
		    </div>
            <div class="right login-form">
                <h2 class="form-title"> 独秀科技后台系统</h2>
                <Form ref="formInline" :model="formInline" :rules="ruleInline">
                <FormItem prop="user">
                    <Input type="text" v-model="formInline.user" placeholder="用户名">
                        <Icon type="ios-person-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input type="password" v-model="formInline.password" placeholder="密码">
                        <Icon type="ios-lock-outline" slot="prepend"></Icon>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formInline')" >登录</Button>
                </FormItem>
                </Form>
            </div>
            </div>
        </div>
       
    </div>
</template>
<script>
    export default {
        data () {
            return {
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
                        { required: true, message: '账号不能为空', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '密码不能为空', trigger: 'blur' },
                    ]
                }
            }
        },
        mounted(){

		},
		destroyed() {
		   
		},
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.axios.post(this.$api_router.login+'?adminAccount='+this.formInline.user+'&adminPassword='+this.formInline.password)
                        .then(res=>{
                            console.log("登录信息:",res)
                            if(res.data.code == 200){
                                this.$Message.success('登录成功!');
                                //登录成功保存登录信息
								localStorage.setItem("username",res.data.data.adminName);
								//保存唯一id
								localStorage.setItem("userid",res.data.data.adminId);
								//保存一个登录数据token
								window.sessionStorage.setItem('cat_token', res.data.data.token)
								this.$router.push({path:"/"})
                            }else{
                                this.$Message.error(res.data.msg);
                            }
                        }) 
                    } else {
                        this.$Message.error('账号密码错误!');
                    }
                })
            },
        }
    }
</script>
<style scoped>
    .Login-box{
        position:relative;
        width: 100vw;
        height: 100vh;
        /* background:url('../../assets/images/logo-back.jpg')  100% 100%; */
    }
    .Login-box .bak-img{
        position:absolute;
        width: 100%;
        height: 100%;
        transition: .5s ease-in-out;
        filter: blur(8px);
        -webkit-filter: blur(8px);
        /* z-index: 97; */
    }
    .Login-box .bak-img:hover{
        filter: blur(0);
        -webkit-filter: blur(0);
    }
    .Login-box .data-back-img{
        position: absolute;
        left: 0;
        right: 0;
        top: 12%;
        bottom: 0;
        width: 100%;
        height: 700px;
        margin:0 auto;
        background:url('../../assets/images/bg.png') no-repeat 100%;
    }
    .container-in{
        position: absolute;
        z-index: 2;
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%,-50%);
        -ms-transform: translate(-50%,-50%);
        transform: translate(-50%,-50%);
        width: 1200px;
        overflow: hidden;
    }
     .container-in .left{
        float: left;
        width: 750px;
    }
    .container-in .left .title {
        font-size: 38px;
        font-weight: bold;
        color: #fff;
        line-height: 2.5em;
    }
    .titlex{
        font-size: 35px;
        color: #fff;
        line-height: 2.2em;
    }
    .container-in .left .contact-link {
        font-size: 16px;
        color: #2198e6;
    }
    .container-in .right {
        float: right;
        width: 340px;
        height: 320px;
    }
    .container-in .login-form{
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 8px;
        overflow: hidden;
        padding: 20px;
    }
    .container-in .login-form .form-title{
        font-size: 30px;
        color: #2198E6;
        text-align: center;
        line-height: 2em;
    }
    .container-in .ivu-form{
        margin-top: 24px;
    }
    .Login-box .ivu-form-item{
        /* width: 260px !important; */
        margin-bottom: 34px !important;
        text-align: center;
    }
    .Login-box .ivu-btn{
        margin-top: 10px;
        border-radius: 20px;
        width: 200px;
        border: none;
        /* font-size: 16px; */
        letter-spacing:5px;
        text-align: center;
    }
</style>
