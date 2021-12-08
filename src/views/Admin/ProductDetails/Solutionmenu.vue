<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/product/' }"><a href="javascript:;">产品详情</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/product/solutionmenu'}"><a href="javascript:;">解决方案菜单</a></el-breadcrumb-item>
        </el-breadcrumb>
        <div class="boxdetail">
            <div class="funmodule">
                <!-- <div class="search">
                    <el-input v-model="search.featureHeadline" size="medium" placeholder="请输入标题"></el-input>
                    <el-button icon="el-icon-search" size="small">搜索</el-button>
                </div> -->
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
                        prop="menuId"
                        label="菜单ID"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        label="更新时间"
                        width="200">
                    </el-table-column>
                    <el-table-column
                        prop="menuName"
                        label="菜单名称"
                        show-overflow-tooltip
                        >
                    </el-table-column>
                    <el-table-column 
                    fixed="right"
                    label="操作"
                    width="360">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index,tableData)">编辑菜单</el-button>
                        <el-button
                        size="mini"
                        type="info"
                        @click="handleAdd(scope.$index,tableData)">添加内容</el-button>
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
                    <el-form-item label="菜单名称" prop="menuName">
                        <el-input v-model="ruleForm.menuName" placeholder="请输入菜单名称"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="Cancel()" size="small">取 消</el-button>
                    <el-button class="backg" type="primary" size="small"  icon="el-icon-check" @click="Affirm('ruleForm')">确 定</el-button>
                </span>
            </el-dialog>
            <!-- 添加框 -->
            <el-dialog class="dialog" title="正在添加菜单...." 
            :visible.sync="dialogVisibles" 
            width="50%" 
            :before-close="handleDialogClose"
            :close-on-click-modal="false">
                <el-form :model="information" :rules="rules" ref="information" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="菜单名称" prop="menuName">
                        <el-input v-model="information.menuName" placeholder="请输入菜单名称"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="Cancel()" size="small">取 消</el-button>
                    <el-button class="backg" type="primary" size="small"  icon="el-icon-check" @click="Affirm1('information')">保 存</el-button>
                </span>
            </el-dialog>
            <!-- 内容编辑框 -->
            <el-dialog class="dialog" title="正在添加内容...." 
            :visible.sync="dialogVisibles1" 
            width="50%" 
            :before-close="handleDialogClose"
            :close-on-click-modal="false">
                <el-form :model="addinform" :rules="rules1" ref="addinform" label-width="130px" class="demo-ruleForm">
                    <el-form-item label="标题" prop="schoolHeadline">
                        <el-input v-model="addinform.schoolHeadline" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" prop="schoolDetails">
                        <quill-editor 
                            v-model="addinform.schoolDetails" 
                            ref="myQuillEditor" 
                            :options="editorOption" 
                            @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
                            @change="onEditorChange($event)">
                        </quill-editor> 
                    </el-form-item>
                    <el-form-item label="图片(顶部大图)" class="block">
                        <input class="file-input" type="file" @change="updateFace($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                    </el-form-item>
                    <el-form-item label="预览">
                        <el-link type="success" :underline="false" :href="addinform.schoolPic"  target="_blank">
                            <img :src="addinform.schoolPic" alt="" width="200" class="block-image">
                        </el-link>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="Cancel()" size="small">取 消</el-button>
                    <el-button class="backg" type="primary" size="small"  icon="el-icon-check" @click="Affirm2('addinform')">保 存</el-button>
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
            dialogVisibles:false,  //添加框s
            dialogVisibles1:false, //内容框
            timer: null,  // 定时器名称
            editorOption:{},
            tableData:[],
            information:{   //添加数组
                menuLogo:"",
                menuName:"",
            },  
            search:{
                menuName:""
            },
            //内容编辑
            addinform:{
                schoolHeadline:"",
                schoolDetails:"",
                schoolPic:"",
                schoolTop: 0,
                deleted: 0,
                menuId:"",
                schoolId:"",
            },  
            ruleForm:{},
            rules: {
                menuName:[
                    {required: true, message: '菜单名称不能为空', trigger: 'blur'},
                    { min: 4, max: 10, message: '长度在 4 到 10 个字符', trigger: 'blur' }
                ],
               
            },
            rules1: {
                schoolHeadline:[
                    {required: true, message: ' 标题不能为空', trigger: 'blur'},
                    { min: 4, max: 50, message: '长度在 4 到 50 个字符', trigger: 'blur' }
                ],
                schoolDetails:[
                    {required: true, message: '内容不能为空', trigger: 'blur'},
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
        // 查询全部
        Queryall(){
            this.loading = true
            this.axios.post(this.$api_router.solutionmenu+'findAll')
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
            this.information.menuName=""
        },
         //确认添加
        Affirm1(form){
             this.$refs[form].validate((valid) => {
                if (valid) {
                    this.axios.post(this.$api_router.solutionmenu+'saveOne',this.information)
                    .then(res=>{
                        //console.log(res)
                        if(res.data.code == 200){
                            this.$Message.success('添加成功!');
                            this.Queryall()
                            this.dialogVisibles = false
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
                    this.axios.post(this.$api_router.solutionmenu+'updateOne',this.ruleForm)
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
        //编辑内容打开
        handleAdd(index,row){
            var id = row[index].menuId
            this.dialogVisibles1 = true
            this.addinform.menuId = id
            this.addinform.schoolHeadline="",
            this.addinform.schoolDetails="",
             this.addinform.schoolPic=""
            // this.axios.post(this.$api_router.solution+'findMenuId?menuId='+id)
            // .then(res=>{
            //     console.log(res)
            // })

        },
        //内容编辑保存
        Affirm2(form){
            this.$refs[form].validate((valid) => {
                if(valid) {
                    this.axios.post(this.$api_router.solution+'saveOne',this.addinform)
                    .then(res=>{
                        //console.log(res)
                        if(res.data.code == 200){
                            this.$Message.success('添加成功!');
                            this.Queryall()
                            this.dialogVisibles1 = false
                        }else{
                            this.$Message.warning(res.data.msg);
                        }
                        this.dialogVisibles1 = false
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
                    this.axios.post(this.$api_router.solutionmenu+'delOne?menuId='+row[index].menuId)
                    .then(res=>{
                       // console.log(res)
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
                this.addinform.schoolPic=  res.data.msg
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
        //取消按钮
        Cancel(){
            this.dialogVisible=false
            this.dialogVisibles=false
            this.dialogVisibles1=false
            this.Queryall()
        },
        handleDialogClose(){
            this.Cancel()
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
        onEditorBlur(){//失去焦点事件
        },
        onEditorFocus(){//获得焦点事件
        },
        onEditorChange(){//内容改变事件
        }
    }
}
</script>
<style scoped>

</style>