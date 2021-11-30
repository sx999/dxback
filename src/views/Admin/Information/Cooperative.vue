<template>
    <div>
        <el-link type="primary" :underline="false" :href="url"  target="_blank" class="cell">
                  <h2 style="marginBottom:20px">点我查看修改模块</h2>  
        </el-link>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/message' }"><a href="javascript:;">信息管理</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/message/cooperative' }"><a href="javascript:;">合作单位</a></el-breadcrumb-item>
        </el-breadcrumb>
        <div class="boxdetail">
            <div class="funmodule">
                <div class="search">
                    <el-input v-model="search.mergeTitle" size="medium" placeholder="请输入标题"></el-input>
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
                max-height="600"
                size="small"
                style="width: 100%">
                    <el-table-column
                        prop="mergeId"
                        label="ID"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        label="更新时间"
                        width="160">
                    </el-table-column>
                     <el-table-column
                        prop="mergeTitle"
                        label="单位名称"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        label="合作单位logo"
                        show-overflow-tooltip
                        min-width="150">
                        <template slot-scope="scope">
                            <el-link type="primary" :underline="false" :href="scope.row.mergePic"  target="_blank" class="cell">
                                <el-image
                                 
                                    :src="scope.row.mergePic"
                                    :fit="fits.contain"
                                   >
                                </el-image>
                            </el-link>
                        </template> 
                    </el-table-column>
                    <!-- <el-table-column
                        label="图片链接"
                        show-overflow-tooltip
                        min-width="220">
                        <template slot-scope="scope">
                            <el-link type="primary" :underline="false" :href="scope.row.mergePic"  target="_blank" class="cell">
                                {{scope.row.mergePic}}
                            </el-link>
                        </template>  
                    </el-table-column>-->
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
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="单位名称" prop="mergeTitle">
                        <el-input v-model="ruleForm.mergeTitle" placeholder="单位名称"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片" class="block">
                        <input type="file" @change="updateFace($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                    </el-form-item>
                    <el-form-item label="预览图片:" class="block">
                        <el-link type="success" :underline="false" :href="ruleForm.mergePic"  target="_blank"  >
                            <img :src="ruleForm.mergePic" alt="" width="100">
                        </el-link>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="Cancel()" size="small">取 消</el-button>
                    <el-button class="backg" type="primary" size="small"  icon="el-icon-check" @click="Affirm('ruleForm')">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 添加框 -->
            <el-dialog class="dialog" title="正在添加...." 
            :visible.sync="dialogVisibles" 
            width="50%" 
            :before-close="handleDialogClose"
            :close-on-click-modal="false">
                <el-form :model="information" :rules="rules" ref="information" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="标题" prop="mergeTitle">
                        <el-input v-model="information.mergeTitle" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片" class="block">
                        <input class="file-input" type="file" @change="updateFace($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                    </el-form-item>
                    <el-form-item label="预览">
                        <el-link type="success" :underline="false" :href="information.mergePic"  target="_blank">
                            <img :src="information.mergePic" alt="" width="100" class="block-image">
                        </el-link>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="Cancel()" size="small">取 消</el-button>
                    <el-button class="backg" type="primary" size="small"  icon="el-icon-check" @click="Affirm1('information')">保 存</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            url:"https://dxkj2021-1306445192.cos.ap-nanjing.myqcloud.com/duxiu/54251638169758940.png",
            loading:false, //加载动画
            dialogVisible:false,  //详情框
            dialogVisibles:false,  //添加框
            timer: null,  // 定时器名称   
            tableData:[],
            information:{   //添加数组
                mergeSort:0,
                mergeTitle:"",
                mergePic:""
            },  
            search:{
                title:"",
            },
            ruleForm:{},
            rules: {
                mergeTitle:[
                    {required: true, message: '标题不能为空', trigger: 'blur'},
                    { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
            },
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
            this.axios.post(this.$api_router.cooperator+'findAll')
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
            this.information.mergeTitle="",
            this.information.mergePic="",
            this.file = ""
        },
         //确认添加
        Affirm1(form){
             this.$refs[form].validate((valid) => {
                if (valid) {
                    this.axios.post(this.$api_router.cooperator+'saveOne',this.information)
                    .then(res=>{
                        // console.log(res)
                        if(res.data.code == 200){
                            this.$Message.success('添加成功!');
                            this.Queryall()
                            this.dialogVisibles = false
                           
                        }else{
                            this.$Message.warning(res.data.msg);
                        }
                         this.file = ""
                    })  
                }else{
                    this.$Message.warning("内容填写不完整");
                }
            }) 
        },
        //点击编辑
        handleEdit(index,row){
            this.dialogVisible = true
            this.ruleForm = row[index]
        },
        //确认修改
        Affirm(form){
             this.$refs[form].validate((valid) => {
                if(valid) {
                    this.ruleForm.updateTime = new Date()
                    this.axios.post(this.$api_router.cooperator+'updateOne',this.ruleForm)
                    .then(res=>{
                        if(res.data.code == 200){
                            this.$Message.success('修改成功!');
                            this.dialogVisible = false
                            this.Queryall()
                        }else{
                            this.$Message.warning(res.data.msg);
                            return false
                        }
                    })
                }else{
                    this.$Message.warning("内容填写不完整");
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
                    this.axios.post(this.$api_router.cooperator+'delOne?mergeId='+row[index].mergeId)
                    .then(res=>{
                        console.log(res)
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
                this.ruleForm.mergePic=  res.data.msg
                this.information.mergePic=  res.data.msg
            }).catch(err => {
                // console.log(err);
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
    .dialog img{
        width: 200px !important;
    }
</style>