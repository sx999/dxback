<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/content' }"><a href="javascript:;">文章管理</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/content/companyprofile' }"><a href="javascript:;">行业资讯</a></el-breadcrumb-item>
        </el-breadcrumb>
    </div>
</template>
<script>
export default {
    data(){
        return{

        }
    },
    created(){},
    mounted(){},
    computed:{},
    methods:{

    }
}
</script>
<style scoped>

</style>