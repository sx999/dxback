<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/content' }"><a href="javascript:;">文章管理</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/content/companyprofile' }"><a href="javascript:;">行业资讯</a></el-breadcrumb-item>
        </el-breadcrumb>
         <div class="boxdetail">
            <div class="funmodule">
                <div class="search">
                    <el-input v-model="search.newsTitle" size="medium" placeholder="请输入标题"></el-input>
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
                :default-sort = "{prop: 'newsDate', order: 'descending'}"
                border
                max-height="570"
                size="small"
                style="width: 100%">
                    <el-table-column
                        label="序号"
                        type="index"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="newsID"
                        label="ID"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="newsDate"
                         sortable
                        label="发布时间"
                        width="160">
                    </el-table-column>
                    <el-table-column
                        prop="newsTitle"
                        label="新闻标题"
                        show-overflow-tooltip
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="newsDesc"
                        show-overflow-tooltip
                        label="新闻描述"
                        width="300">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="newsRate"
                        label="新闻级别"
                        width="100">
                    </el-table-column> -->
                    <el-table-column
                        prop="newsContent"
                        label="新闻内容"
                        width="300">
                    </el-table-column>
                    <el-table-column
                        label="封面图片链接"
                        show-overflow-tooltip
                        min-width="200">
                        <template slot-scope="scope">
                             <el-popover trigger="hover" placement="bottom" width="240">
                                <el-image
                                    :src="scope.row.newsImagePath"
                                    :fit="fits.contain"
                                   >
                                </el-image>
                                <div slot="reference" class="name-wrapper">
                                    <el-link type="primary" :underline="false" :href="scope.row.newsImagePath"  target="_blank" class="cell">
                                        {{scope.row.newsImagePath}}
                                    </el-link>
                                </div>
                            </el-popover>
                           
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
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="90px" class="demo-ruleForm">
                    <el-form-item label="新闻标题" prop="newsTitle">
                        <el-input v-model="ruleForm.newsTitle" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="发布时间" prop="newsDate" required>
                        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.newsDate" style="width: 50%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="新闻描述" prop="newsDesc">
                        <el-input v-model="ruleForm.newsDesc" placeholder="请输入简述"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片"  class="block">
                        <input type="file" @change="updateFace($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                    </el-form-item>
                    <el-form-item label="预览图片:" prop="newsImagePath" class="block">
                        <el-link type="success" :underline="false" :href="ruleForm.newsImagePath"  target="_blank"  >
                            <img :src="ruleForm.newsImagePath" alt="" width="100">
                        </el-link>
                    </el-form-item>
                    <el-form-item label="内容" prop="newsContent">
                        <quill-editor 
                            v-model="ruleForm.newsContent" 
                            ref="myQuillEditor" 
                            :options="editorOption" 
                            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                            @change="onEditorChange($event)">
                        </quill-editor> 
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
            :close-on-click-modal="false">
                <el-form :model="information" :rules="rules" ref="information" label-width="90px" class="demo-ruleForm">
                    <el-form-item label="新闻标题" prop="newsTitle">
                        <el-input v-model="information.newsTitle" placeholder="请输入新闻标题"></el-input>
                    </el-form-item>
                    <el-form-item label="新闻描述" prop="newsDesc">
                        <el-input v-model="information.newsDesc" placeholder="请输入新闻描述"></el-input>
                    </el-form-item>
                    <el-form-item label="发布时间" prop="newsDate" required>
                        <el-date-picker type="date" placeholder="选择日期" v-model="information.newsDate" style="width: 50%;"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="上传封面图" class="block">
                        <input class="file-input" type="file" @change="updateFace($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                    </el-form-item>
                    <el-form-item label="预览图片" prop="newsImagePath">
                        <el-link type="success" :underline="false" :href="information.newsImagePath"  target="_blank">
                            <img :src="information.newsImagePath" alt="" width="100" class="block-image">
                        </el-link>
                    </el-form-item>
                    <el-form-item label="新闻内容" prop="newsContent">
                        <quill-editor 
                            v-model="information.newsContent" 
                            ref="myQuillEditor" 
                            :options="editorOption" 
                            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                            @change="onEditorChange($event)">
                        </quill-editor> 
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click=" Cancel()" size="small">取 消</el-button>
                    <el-button class="backg" type="primary" size="small"  icon="el-icon-check" @click="Affirm1('information')">保 存</el-button>
                </span>
            </el-dialog>
            <div class="block-bottom">
                <el-pagination
                @current-change="getLista($event)"
                :current-page="this.pageData.currentPage"
                :page-size="this.pageData.pageSize"
                layout="prev, pager, next"
                :total="this.pageData.totalRecord">
                </el-pagination>
		    </div>
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
                newsContent:"",
                newsDesc:"",
                newsTitle:"",
                newsRate:0,
                newsIsCheck: 0,
                newsIsTop: 0,
                newsImagePath:"",
                newsDate:""
            },  
            search:{
                newsTitle:""
            },
            pageData:{},  //页数数据
            editorOption: {},
            detail:"",
            ruleForm:{},
            rules: {
                newsTitle:[
                    {required: true, message: '标题不能为空', trigger: 'blur'},
                    { min: 5, max: 30, message: '长度在 5 到 30 个字符', trigger: 'blur' }
                ],
                newsDesc:[
                    {required: true, message: '简述不能为空', trigger: 'blur'}
                ],
                newsDate:[
                    { required: true, message: '请选择日期', trigger: 'blur' }
                ],
                newsImagePath:[
                    {required: true, message: '封面图文件不存在', trigger: 'blur'}
                ],
                newsContent:[
                     {required: true, message: '内容不能为空', trigger: 'blur'}
                ]
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
        //分页
        getLista(event){
            console.log(event)
             this.axios.post(this.$api_router.industry+'list?currentPage='+event+'&limit=8')
            .then(res=>{
                console.log(res)
                if(res.data.code == 200){
						this.tableData =  res.data.data.page.dataList
                        this.pageData =  res.data.data.page
						// this.$message({
						//   message: '查询成功',
						//   type: 'success'
						// });
                        this.Dateformatting()
						this.loading = false
                }else{
                    this.$Message.warning(res.data.msg);
                    return false
                }
            })
	    },
        // 查询全部
        Queryall(){
            this.loading = true
            this.axios.post(this.$api_router.industry+'list?currentPage=1&limit=8')
            .then(res=>{
                console.log(res)
                if(res.data.code == 200){
                        this.tableData = res.data.data.page.dataList
                        this.pageData =  res.data.data.page
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
            this.information.newsContent="",
            this.information.newsDesc="",
            this.information.newsTitle="",
            this.information.newsDate="",
            this.information.newsImagePath="",
            // this.information.newsRate=""
            this.file = ""
        },
        //确认添加
        Affirm1(form){
             this.$refs[form].validate((valid) => {
                if (valid) {
                    this.axios.post(this.$api_router.industry+'saveOne',this.information)
                    .then(res=>{
                        console.log(res)
                        if(res.data.code == 200){
                            this.dialogVisibles = false
                            this.Queryall()
                            this.$Message.success('添加成功!');
                        }else{
                            this.$Message.warning(res.data.msg);
                        }
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
                    this.axios.post(this.$api_router.industry+'updateOne',this.ruleForm)
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
                    this.axios.post(this.$api_router.industry+'delOne?newsID='+row[index].newsID)
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
                this.ruleForm.newsImagePath =  res.data.msg
                this.information.newsImagePath =  res.data.msg
            }).catch(err => {
                console.log(err);
            });
        },
         //时间格式化
        Dateformatting(){
            for(var i=0;i<this.tableData.length;i++){
               // this.tableData[i].createTime = this.moment(this.tableData[i].createTime).format("YYYY-MM-DD HH:mm:ss")
                this.tableData[i].updateTime = this.moment(this.tableData[i].updateTime).format("YYYY-MM-DD HH:mm:ss")
                // this.tableData[i].startTime = this.moment(this.tableData[i].startTime).format("YYYY-MM-DD HH:mm:ss")
                // this.tableData[i].endTime = this.moment(this.tableData[i].endTime).format("YYYY-MM-DD HH:mm:ss")
                
               this.tableData[i].newsDate = this.moment(this.tableData[i].newsDate).format("YYYY-MM-DD")
            }
        },
        //刷新
        Refresh(){
            this.loading = true
            this.timer = setTimeout(() => {
                this.Queryall() 
            }, 2000)
            // clearInterval(this.timer);
        },
        Cancel(){
            this.dialogVisible=false
            this.dialogVisibles=false
            this.Queryall()
        },
        onEditorBlur(){//失去焦点事件
        },
        onEditorFocus(){//获得焦点事件
        },
        onEditorChange(){//内容改变事件
        }
    },
    beforeDestroy() {
        if (this.timer) {
           clearInterval(this.timer);  // 在Vue实例销毁前，清除我们的定时器
        }
    }
}
</script>
<style>
    .boxdetail .funmodule .fol-r{
        position:absolute;
        right: 10%;
        /* margin-right: 50px; */
        /* float: right; */
    }
    .boxdetail .block-bottom{
        position: fixed;
        bottom: 30px;
        left: 200px;

    }
</style>