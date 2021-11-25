<template>
    <div>
         <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/content' }"><a href="javascript:;">信息管理</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/content/attract' }"><a href="javascript:;">招商管理</a></el-breadcrumb-item>
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