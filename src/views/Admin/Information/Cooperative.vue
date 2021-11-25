<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/content' }"><a href="javascript:;">信息管理</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/content/cooperative' }"><a href="javascript:;">合作单位</a></el-breadcrumb-item>
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