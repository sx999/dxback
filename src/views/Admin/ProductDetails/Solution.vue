<template>
    <div>
        <!-- <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/product/' }"><a href="javascript:;">产品详情</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/product/solution' }"><a href="javascript:;">解决方案</a></el-breadcrumb-item>
        </el-breadcrumb>
        <el-image 
            style="width: 200px; height: 100px"
            :src="url" 
            :preview-src-list="srcList">
        </el-image> -->
    </div>
</template>
<script>
export default {
    data(){
        return{
            url: 'https://dxkj2021-1306445192.cos.ap-nanjing.myqcloud.com/duxiu/9021637917314689.png',
            srcList: [
                'https://dxkj2021-1306445192.cos.ap-nanjing.myqcloud.com/duxiu/9021637917314689.png',
            ]
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