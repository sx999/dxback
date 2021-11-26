<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/content' }"><a href="javascript:;">文章管理</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/content/companyprofile' }"><a href="javascript:;">企业介绍</a></el-breadcrumb-item>
        </el-breadcrumb>
        <div class="boxdetail">
            <div class="funmodule">
                <div class="search">
                    <el-input v-model="search.firmTitle" size="medium" placeholder="请输入标题"></el-input>
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
                max-height="500"
                size="small"
                style="width: 100%">
                    <el-table-column
                        prop="firmId"
                        label="ID"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        label="更新时间"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="firmTitle"
                        label="标题"
                        show-overflow-tooltip
                        width="300">
                    </el-table-column>
                    <el-table-column
                        prop="firmMatter"
                        label="内容"
                        width="400">
                    </el-table-column>
                    <el-table-column
                        label="图片链接"
                        show-overflow-tooltip
                        min-width="200">
                        <template slot-scope="scope">
                            <el-link type="primary" :underline="false" :href="scope.row.firmPic"  target="_blank" class="cell">
                                {{scope.row.firmPic}}
                                <!-- <el-image
                                    style="width: 100px; height: 100px"
                                    :src="scope.row.firmPic"
                                    :fit="fits.contain"
                                   >
                                </el-image> -->
                            </el-link>
                        </template> 
                    </el-table-column>
                    <el-table-column 
                    fixed="right"
                    label="操作"
                    width="200">
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
            :close-on-click-modal="false">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="标题" prop="firmTitle">
                        <el-input v-model="ruleForm.firmTitle" placeholder="请输入专家名称"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片" class="block">
                        <input type="file" @change="updateFace($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                    </el-form-item>
                    <el-form-item label="预览图片:" class="block">
                        <el-link type="success" :underline="false" :href="ruleForm.firmPic"  target="_blank"  >
                            <img :src="ruleForm.firmPic" alt="" width="100">
                        </el-link>
                    </el-form-item>
                    <el-form-item label="内容" prop="firmMatter">
                        <quill-editor 
                            v-model="ruleForm.firmMatter" 
                            ref="myQuillEditor" 
                            :options="editorOption" 
                            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                            @change="onEditorChange($event)">
                        </quill-editor> 
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible=false" size="small">取 消</el-button>
                    <el-button class="backg" type="primary" size="small"  icon="el-icon-check" @click="Affirm()">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 添加框 -->
            <el-dialog class="dialog" title="正在添加...." 
            :visible.sync="dialogVisibles" 
            width="50%" 
            :close-on-click-modal="false">
                <el-form :model="information" :rules="rules" ref="information" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="标题" prop="firmTitle">
                        <el-input v-model="information.firmTitle" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片" class="block">
                        <input class="file-input" type="file" @change="updateFace($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                    </el-form-item>
                    <el-form-item label="预览图片:">
                        <el-link type="success" :underline="false" :href="information.firmPic"  target="_blank">
                            <img :src="information.firmPic" alt="" width="100" class="block-image">
                        </el-link>
                    </el-form-item>
                    <el-form-item label="内容" prop="firmMatter">
                        <quill-editor 
                            v-model="information.firmMatter" 
                            ref="myQuillEditor" 
                            :options="editorOption" 
                            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                            @change="onEditorChange($event)">
                        </quill-editor> 
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisibles=false" size="small">取 消</el-button>
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
                firmTitle:"",
                firmPic:"",
                firmMatter:""
            },  
            search:{
                firmTitle:""
            },
            editorOption: {},
            detail:"",
            ruleForm:{},
            rules: {
                firmTitle:[
                    {required: true, message: '标题不能为空', trigger: 'blur'}
                ],
                firmMatter:[
                    {required: true, message: '内容不能为空', trigger: 'blur'}
                ],
                firmPic:[
                    {required: true, message: '封面图文件不存在', trigger: 'blur'}
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
            this.axios.post(this.$api_router.company+'findAll')
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
            this.information.firmTitle="",
            this.information.firmPic="",
            this.information.firmMatter="",
            this.file = ""
        },
        //确认添加
        Affirm1(){
            this.axios.post(this.$api_router.company+'saveOne',this.information)
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
             this.axios.post(this.$api_router.company+'updateOne',this.ruleForm)
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
               
        },
        //删除
        handleDelete(index,row){
            this.$confirm("确定删除, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(()=>{
                    this.axios.post(this.$api_router.company+'delOne?firmId='+row[index].firmId)
                    .then(res=>{
                        console.log(res)
                        if(res.data.code == 200){
                            this.$Message.success('删除成功');
                            row.splice(index, 1);
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
                this.ruleForm.firmPic =  res.data.msg
                this.information.firmPic =  res.data.msg
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
            // clearInterval(this.timer);
        },
         //事件格式化
        Dateformatting(){
            for(var i=0;i<this.tableData.length;i++){
                // this.tableData[i].createTime = this.moment(this.tableData[i].createTime).format("YYYY-MM-DD HH:mm:ss")
                this.tableData[i].updateTime = this.moment(this.tableData[i].updateTime).format("YYYY-MM-DD HH:mm:ss")
                // this.tableData[i].startTime = this.moment(this.tableData[i].startTime).format("YYYY-MM-DD HH:mm:ss")
                // this.tableData[i].endTime = this.moment(this.tableData[i].endTime).format("YYYY-MM-DD HH:mm:ss")
            }
        },
        onEditorBlur(){//失去焦点事件
        },
        onEditorFocus(){//获得焦点事件
        },
        onEditorChange(){//内容改变事件
        }
        
    }
}
</script>
<style>
    .boxdetail{
      background-color: #FFF;
    }
    .boxdetail .funmodule{
        display: flex;
        align-items: center;
        margin-top: 20px;
        box-shadow:1px 1px 5px rgba(156, 151, 151, 0.3) ;
        width: 100%;
        height: 60px;
        padding: 8px 10px;
    }
    .boxdetail .funmodule .search {
        display: flex;
        align-items: center;
    }
    .boxdetail .funmodule .search .el-input{
        margin-right: 18px;
        width: 200px;
    }
    .boxdetail .funmodule .el-button{
        color: #FFF !important;
        background-color:  #009688 !important;
        opacity: 0.8;
    }
    .boxdetail .funmodule .el-button:hover{
        opacity: 1;
    }
    .marl30{
        margin-left: 30px;
    }
    .backg{
        color: #FFF;
        background-color:  #009688 !important;
        opacity: 0.8;
    }

    .el-table .cell{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2; 
        overflow: hidden;
    }
    .boxdetail .dialog .el-input__inner{
        font-size: 14px;
        width: 80%;
    }
    .block{
        position: relative;
    }
    .dialog .file-input{
        position: absolute;
        opacity: 0.5
    }
    .dialog .block-image{
        transition: all .3s;
      -webkit-transition: all .3s;
    }
    .dialog .ql-container{
        height: 300px !important;
        overflow-y: auto !important;
    }
</style>