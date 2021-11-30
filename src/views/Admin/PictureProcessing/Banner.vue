<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/picture' }"><a href="javascript:;">图片处理</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/picture/banner' }"><a href="javascript:;">轮播图处理</a></el-breadcrumb-item>
        </el-breadcrumb>
        <div class="boxdetail">
            <div class="funmodule">
                <div class="search">
                    <el-input v-model="search.rotationName" size="medium" placeholder="请输入标题"></el-input>
                    <el-button icon="el-icon-search" size="small">搜索</el-button>
                </div>
                <div class="marl30 search">   
                    <el-button icon="el-icon-plus" size="small" @click="AddData()">添加</el-button>
                </div>  
                <div class="fol-r search">   
                    <el-button v-show="loading" size="small" :loading="loading" >加载中</el-button>
                    <el-button v-show="!loading" icon="el-icon-refresh-left" size="small"  @click="Refresh()">刷新</el-button>
                </div>  
            </div>
             <!-- table -->
            <div class="list">   
                <el-table
                v-loading="loading"
                :data="ftableData"
                border
                max-height="630"
                size="small"
                style="width: 100%">
                    <el-table-column
                        prop="rotationId"
                        label="ID"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        label="更新时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="rotationName"
                        label="标题"
                        show-overflow-tooltip
                        width="200">
                    </el-table-column>
                    <el-table-column
                        label="首页轮播图"
                        show-overflow-tooltip
                        min-width="150">
                        <template slot-scope="scope">
                            <el-link type="primary" :underline="false" :href="scope.row.rotationUrl"  target="_blank" class="cell">
                                <el-image
                                    style="width: 40%; height: 40%"
                                    :src="scope.row.rotationUrl"
                                    :fit="fits.contain"
                                   >
                                </el-image>
                            </el-link>
                        </template> 
                    </el-table-column>
                    <!-- <el-table-column
                        label="图片链接"
                        show-overflow-tooltip
                        min-width="150">
                        <template slot-scope="scope">
                            <el-link type="primary" :underline="false" :href="scope.row.rotationUrl"  target="_blank" class="cell">
                                {{scope.row.rotationUrl}}
                            </el-link>
                        </template> 
                    </el-table-column> -->
                    <el-table-column 
                    fixed="right"
                    label="操作"
                    width="240">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index,tableData)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index,tableData)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 编辑框 -->
            <el-dialog class="dialog" title="编辑框" 
            :visible.sync="dialogVisible" 
            width="50%" 
            :before-close="handleDialogClose"
            :close-on-click-modal="false">
                <el-form :model="ruleForm"  ref="ruleForm" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="标题">
                        <el-input v-model="ruleForm.rotationName" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片" class="block">
                        <input type="file" @change="updateFace($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                    </el-form-item>
                    <el-form-item label="预览图片:" class="block">
                        <el-link type="success" :underline="false" :href="ruleForm.rotationUrl"  target="_blank"  >
                            <img :src="ruleForm.rotationUrl" alt="" width="100">
                        </el-link>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="Cancel()" size="small">取 消</el-button>
                    <el-button class="backg" type="primary" size="small"  icon="el-icon-check" @click="Affirm()">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 添加框 -->
            <el-dialog class="dialog" title="正在添加...." 
            :visible.sync="dialogVisibles" 
            width="50%" 
            :before-close="handleDialogClose"
            :close-on-click-modal="false">
                <el-form :model="information"  ref="information" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="标题">
                        <el-input v-model="information.rotationName" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图标" class="block">
                        <input class="file-input" type="file" @change="updateFace($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                    </el-form-item>
                    <el-form-item label="预览">
                        <el-link type="success" :underline="false" :href="information.rotationUrl"  target="_blank">
                            <img :src="information.rotationUrl" alt="" width="100" class="block-image">
                        </el-link>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="Cancel()" size="small">取 消</el-button>
                    <el-button class="backg" type="primary" size="small"  icon="el-icon-check" @click="Affirm1()">保 存</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            loading:false, //加载动画
            dialogVisible:false,  //详情框
            dialogVisibles:false,  //添加框
            timer: null,  // 定时器名称   
            tableData:[],
            information:{   //添加数组
              rotationUrl:"",
              rotationName:"",
              rotationLinkUrl:"",
            },  
            search:{
                rotationName:""
            },
            ruleForm:{},
            fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
            file:""
        }
    },
    created(){},
    mounted(){this.Queryall()},
    computed:{
        //过滤
		"ftableData":function(){	
			return this.tableData.filter(row=>{
				// 默认过滤出来所有内容
				var flag=true
				// 对搜索的内容进行循环
				for(var k in this.search){
					// 判断搜索的条件不为空，并且搜索的条件不满足的情况下
					if(!!this.search[k]&&!String(row[k]).includes(this.search[k])){
						flag=false
					}
				}
				return flag
			})
		},
    },
    methods:{
         // 查询全部
        Queryall(){
            this.loading = true
            this.axios.post(this.$api_router.banner+'findAll')
            .then(res=>{
                // console.log(res)
                if(res.data.code == 200){
                        this.tableData = res.data.data
                        // this.$Message.success('查询完成!');
                        this.Dateformatting()  
                        this.loading = false
                }else{
                    this.$Message.warning(res.data.msg);
                    return false
                }
            })     
        },
        //点击添加
        AddData(){
            this.dialogVisibles = true
            this.information.rotationUrl="",
            this.information.rotationName="",
            this.information.rotationLinkUrl="",
            // this.information.newsRate=""
            this.file = ""
        },
        //确认添加
        Affirm1(){
            this.axios.post(this.$api_router.banner+'saveOne',this.information)
            .then(res=>{
                console.log(res)
                if(res.data.code == 200){
                    this.$Message.success('添加成功!');
                    this.Queryall()
                    this.dialogVisibles = false
                }else{
                    this.$Message.warning(res.data.msg);
                }
            })  
        },
        //点击编辑
        handleEdit(index,row){
            this.dialogVisible = true
            this.ruleForm = row[index]
        },
        //确认修改
        Affirm(){
            this.ruleForm.updateTime = new Date()
            this.axios.post(this.$api_router.banner+'updateOne',this.ruleForm)
            .then(res=>{
                console.log(res)
                if(res.data.code == 200){
                    this.$Message.success('修改成功!');
                    this.dialogVisible = false
                    this.Queryall()
                }else{
                    this.$Message.warning(res.data.msg);
                    return false
                }
            })
        },
        //删除
        handleDelete(index,row){
            this.$confirm("确定删除, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(()=>{
                    this.axios.post(this.$api_router.banner+'delOne?rotationId='+row[index].rotationId)
                    .then(res=>{
                        if(res.data.code == 200){
                            this.$Message.success('删除成功');
                            row.splice(index, 1);
                            this.Queryall()
                        }else{
                            this.$message({
                                showClose: true,
                                message: res.data.msg
                            });
                        }
                    })
                })
        },
        //图片回显
        updateFace(event) {
            this.file = event.target.files[0];
            let formData = new FormData();
            // 向 formData 对象中添加文件
            formData.append('file',this.file);
            this.axios.post(this.$api_router.upImg,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(res => {
                // console.log(res);
                this.ruleForm.rotationUrl=  res.data.msg
                this.ruleForm.rotationLinkUrl =  res.data.msg
                this.information.rotationUrl =  res.data.msg
                this.information.rotationLinkUrl =  res.data.msg
            }).catch(err => {
                console.log(err);
            });
        },
        //刷新
        Refresh(){
            this.loading = true
            this.timer = setTimeout(() => {
                this.Queryall() 
            }, 2000)
        },
        //事件格式化
        Dateformatting(){
            for(var i=0;i<this.tableData.length;i++){
               // this.tableData[i].createTime = this.moment(this.tableData[i].createTime).format("YYYY-MM-DD HH:mm:ss")
                this.tableData[i].updateTime = this.moment(this.tableData[i].updateTime).format("YYYY-MM-DD HH:mm:ss")
                // this.tableData[i].startTime = this.moment(this.tableData[i].startTime).format("YYYY-MM-DD HH:mm:ss")
                // this.tableData[i].endTime = this.moment(this.tableData[i].endTime).format("YYYY-MM-DD HH:mm:ss")
                
               //this.tableData[i].newsDate = this.moment(this.tableData[i].newsDate).format("YYYY-MM-DD HH:mm:ss")
            }
        },
        //取消按钮
        Cancel(){
            this.dialogVisible=false
            this.dialogVisibles=false
            this.Queryall()
        },
        handleDialogClose(){
            this.Cancel()
        },
    }
}
</script>
<style scoped>
    .module-img{
        margin-top: 10px;
    }
    .dialog img{
        width: 200px !important;
    }
</style>