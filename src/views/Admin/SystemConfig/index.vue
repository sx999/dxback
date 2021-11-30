<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/system' }"><a href="javascript:;">系统配置</a></el-breadcrumb-item>
        </el-breadcrumb>
        <div class="boxdetail">
            <div class="funmodule">
                <!-- <div class="search">
                    <el-input v-model="search.brochurePicLink" size="medium" placeholder="请输入标题"></el-input>
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
                max-height="630"
                size="small"
                style="width: 100%">
                    <el-table-column
                        type="index"
                        label="序号"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="sysId"
                        label="ID"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        label="更新时间"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="sysEmail"
                        label="电子邮箱"
                        show-overflow-tooltip
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="sysPhone"
                        label="联系电话"
                        show-overflow-tooltip
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="sysysAccount"
                        label="公众号二维码地址"
                        show-overflow-tooltip
                        width="200">
                        <template slot-scope="scope">
                            <el-popover trigger="hover" placement="bottom" width="240"> 
                                <el-image
                                    :src="scope.row.sysAccount"
                                    :fit="fits.contain"
                                   >
                                </el-image>
                            <!-- <p>链接: {{scope.row.sysAccount}}</p> -->
                                <div slot="reference" class="name-wrapper">
                                    <el-link type="primary" :underline="false" :href="scope.row.sysAccount"  target="_blank" class="cell">
                                        {{scope.row.sysAccount}}
                                    </el-link>
                                <!-- <el-tag size="medium">{{ scope.row.name }}</el-tag> -->
                                </div>
                            </el-popover>
                        </template>
                        <!-- <template slot-scope="scope">
                            <el-link type="primary" :underline="false" :href="scope.row.sysAccount"  target="_blank" class="cell">
                                {{scope.row.sysAccount}}
                            </el-link>
                        </template>  -->
                    </el-table-column>
                    <el-table-column
                        prop="sysApp"
                        label="app二维码地址"
                        show-overflow-tooltip
                        width="200">
                        <template slot-scope="scope">
                             <el-popover trigger="hover" placement="bottom" width="240">
                                <el-image
                                    :src="scope.row.sysApp"
                                    :fit="fits.contain"
                                   >
                                </el-image>
                            <!-- <p>链接: {{scope.row.sysAccount}}</p> -->
                                <div slot="reference" class="name-wrapper">
                                    <el-link type="primary" :underline="false" :href="scope.row.sysApp"  target="_blank" class="cell">
                                        {{scope.row.sysApp}}
                                    </el-link>
                                <!-- <el-tag size="medium">{{ scope.row.name }}</el-tag> -->
                                </div>
                            </el-popover>
                            <!-- <el-link type="primary" :underline="false" :href="scope.row.sysApp"  target="_blank" class="cell">
                                {{scope.row.sysApp}}
                            </el-link> -->
                        </template> 
                    </el-table-column>
                    <el-table-column
                        label="Logo路径"
                        show-overflow-tooltip
                        min-width="200">
                        <template slot-scope="scope">
                             <el-popover trigger="hover" placement="bottom" width="240">
                                <el-image
                                    :src="scope.row.sysLogo"
                                    :fit="fits.contain"
                                   >
                                </el-image>
                            <!-- <p>链接: {{scope.row.sysAccount}}</p> -->
                                <div slot="reference" class="name-wrapper">
                                    <el-link type="primary" :underline="false" :href="scope.row.sysLogo"  target="_blank" class="cell">
                                        {{scope.row.sysLogo}}
                                    </el-link>
                                <!-- <el-tag size="medium">{{ scope.row.name }}</el-tag> -->
                                </div>
                            </el-popover>
                            <!-- <el-link type="primary" :underline="false" :href="scope.row.sysLogo"  target="_blank" class="cell">
                                {{scope.row.sysLogo}}
                            </el-link> -->
                        </template> 
                    </el-table-column>
                    <el-table-column
                        prop="sysWebsite"
                        label="官方网站"
                        show-overflow-tooltip
                        width="200">
                        <template slot-scope="scope">
                            <el-link type="primary" :underline="false" :href="scope.row.sysWebsite"  target="_blank" class="black">
                                {{scope.row.sysWebsite}}
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
            :before-close="handleDialogClose"
            :close-on-click-modal="false">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="110px" class="demo-ruleForm">
                    <el-form-item label="公司地址" prop="sysAddress">
                        <el-input v-model="ruleForm.sysAddress" placeholder="请输入公司地址"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="sysEmail">
                        <el-input v-model="ruleForm.sysEmail" placeholder="请输入电子邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="sysPhone">
                        <el-input v-model.number="ruleForm.sysPhone" placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="官网链接" prop="sysWebsite">
                        <el-input v-model="ruleForm.sysWebsite" placeholder="请输入链接"></el-input>
                    </el-form-item>
                    <el-form-item label="上传Logo图片" class="block" prop="sysLogo">
                        <input type="file" @change="updateFaceLOGO($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                    </el-form-item>
                    <el-form-item label="预览图片:" class="block">
                        <el-link type="success" :underline="false" :href="ruleForm.sysLogo"  target="_blank"  >
                            <img :src="ruleForm.sysLogo" alt="" width="100">
                        </el-link>
                    </el-form-item>
                    <el-form-item label="公众号二维码" class="block" prop="sysAccount">
                        <input type="file" @change="updateFaceWX($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                    </el-form-item>
                    <el-form-item label="预览图片:" class="block">
                        <el-link type="success" :underline="false" :href="ruleForm.sysAccount"  target="_blank"  >
                            <img :src="ruleForm.sysAccount" alt="" width="100">
                        </el-link>
                    </el-form-item>
                    <el-form-item label="APP二维码" class="block" prop="sysApp">
                        <input type="file" @change="updateFaceAPP($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                    </el-form-item>
                    <el-form-item label="预览图片:" class="block">
                        <el-link type="success" :underline="false" :href="ruleForm.sysApp"  target="_blank"  >
                            <img :src="ruleForm.sysApp" alt="" width="100">
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
                <el-form :model="information" :rules="rules" ref="information" label-width="110px" class="demo-ruleForm">
                     <el-form-item label="公司地址" prop="sysAddress">
                        <el-input v-model="information.sysAddress" placeholder="请输入公司地址"></el-input>
                    </el-form-item>
                    <el-form-item label="电子邮箱" prop="sysEmail">
                        <el-input v-model="information.sysEmail" placeholder="请输入电子邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="sysPhone">
                        <el-input v-model.number="information.sysPhone" placeholder="请输入联系电话"></el-input>
                    </el-form-item>
                    <el-form-item label="官网链接" prop="sysWebsite">
                        <el-input v-model="information.sysWebsite" placeholder="请输入链接"></el-input>
                    </el-form-item>
                    <el-form-item label="Logo图片" class="block" prop="sysLogo">
                        <input id="fileupload1" type="file" @change="updateFaceLOGO($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                    </el-form-item>
                    <el-form-item label="预览图片:" class="block">
                        <el-link type="success" :underline="false" :href="information.sysLogo"  target="_blank"  >
                            <img :src="information.sysLogo" alt="" width="100">
                        </el-link>
                    </el-form-item>
                    <el-form-item label="公众号二维码" class="block" prop="sysAccount">
                        <input id="fileupload2" type="file" @change="updateFaceWX($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                    </el-form-item>
                    <el-form-item label="预览图片:" class="block">
                        <el-link type="success" :underline="false" :href="information.sysAccount"  target="_blank"  >
                            <img :src="information.sysAccount" alt="" width="100">
                        </el-link>
                    </el-form-item>
                    <el-form-item label="APP二维码" class="block" prop="sysApp">
                        <input id="fileupload3" type="file" @change="updateFaceAPP($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                    </el-form-item>
                    <el-form-item label="预览图片:" class="block">
                        <el-link type="success" :underline="false" :href="information.sysApp"  target="_blank"  >
                            <img :src="information.sysApp" alt="" width="100">
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
            loading:false, //加载动画
            dialogVisible:false,  //详情框
            dialogVisibles:false,  //添加框
            timer: null,  // 定时器名称   
            tableData:[],
            information:{   //添加数组
              sysAccount:"",
              sysAddress:"",
              sysApp:"",
              sysEmail:"",
              sysId:"",
              sysLogo:"",
              sysPhone:"",
              sysWebsite:""
            },  
            ruleForm:{},
            rules: {
                sysAddress:[
                    {required: true, message: '公司地址不能为空', trigger: 'blur'},
                    { min: 8, max: 30, message: '长度在 8 到 30 个字符', trigger: 'blur' }
                ],
                sysPhone:[
                    {required: true, message: '手机号不能为空', trigger: 'blur'},
                    { type: 'number', message: '手机号必须为数字值',trigger: 'blur'}
                ],
                sysEmail:[
                    {required: true, message: '邮箱不能为空', trigger: 'blur'},
                ],
                sysLogo:[
                    {required: true, message: '不能为空', trigger: 'blur'},
                ], 
                sysAccount:[
                    {required: true, message: '不能为空', trigger: 'blur'},
                ],
                sysApp:[
                    {required: true, message: '不能为空', trigger: 'blur'},
                ], 
            },
            fits: ['fill', 'contain', 'cover', 'none', 'scale-down'],
            file:"",
            file2:"",
            file3:"",
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
        //查询全部
        Queryall(){
            this.loading = true
            this.axios.post(this.$api_router.system+'findAll')
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
            this.information.sysAddress="",
            this.information.sysEmail="",
            this.information.sysPhone="",
            this.information.sysWebsite="",
            this.information.sysLogo="",
            this.information.sysApp="",
            this.information.sysAccount="",
            this.file = ""
            this.file2 = ""
            this.file3 = ""
        },
        //确认添加
        Affirm1(form){
             this.$refs[form].validate((valid) => {
                if(valid){
                    this.axios.post(this.$api_router.system+'saveOne',this.information)
                    .then(res=>{
                        // console.log(res)
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
            this.ruleForm.updateTime = new Date()
            this.$refs[form].validate((valid) => {
                if(valid){
                     this.axios.post(this.$api_router.system+'updateOne',this.ruleForm)
                    .then(res=>{
                        // console.log(res)
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
                    this.$Message.warning("填写不完整");
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
                    this.axios.post(this.$api_router.system+'delOne?sysId='+row[index].sysId)
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
        //logo图片回显1
        updateFaceLOGO(event) {
            this.file = event.target.files[0];
            let formData = new FormData();
            // 向 formData 对象中添加文件
            formData.append('file',this.file);
            this.axios.post(this.$api_router.upImg,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(res => {
                    this.ruleForm.sysLogo =  res.data.msg
                    this.information.sysLogo =  res.data.msg
                    var obj = document.getElementById('fileupload1') ; 
                    obj.outerHTML=obj.outerHTML;
            }).catch(err => {
                // console.log(err);
            });
        },
        //公众号图片回显1
        updateFaceWX(event) {
            this.file2 = event.target.files[0];
            let formData = new FormData();
            // 向 formData 对象中添加文件
            formData.append('file',this.file2);
            this.axios.post(this.$api_router.upImg,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(res => {
                    this.ruleForm.sysAccount =  res.data.msg
                    this.information.sysAccount =  res.data.msg
                    var obj = document.getElementById('fileupload2') ; 
                    obj.outerHTML=obj.outerHTML;
            }).catch(err => {
                // console.log(err);
            });
        },
        //app图片回显1
        updateFaceAPP(event) {
            this.file3 = event.target.files[0];
            let formData = new FormData();
            // 向 formData 对象中添加文件
            formData.append('file',this.file3);
            this.axios.post(this.$api_router.upImg,formData,{
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }).then(res => {
                    this.ruleForm.sysApp =  res.data.msg
                    this.information.sysApp =  res.data.msg
                    var obj = document.getElementById('fileupload3') ; 
                    obj.outerHTML=obj.outerHTML;
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
        //右上角 X 号
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
    .progressBar{
        width: 50%;
    }
    .el-table .cell{
        display: -webkit-box;
        -webkit-box-orient: vertical !important;
        -webkit-line-clamp: 3 !important;
    }
    .el-table .black{
        color: #606266;;
    }
</style>