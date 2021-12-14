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
                        <el-upload
                                class="avatar-uploader"
                                :action="serverUrl"
                                :headers="header"
                                :show-file-list="false"
                                :on-success="uploadSuccess"
                                :on-error="uploadError"
                                :before-upload="beforeUpload">
                        </el-upload>
                        <quill-editor
                                class="editor"
                                v-model="addinform.schoolDetails"
                                ref="myQuillEditor"
                                :options="editorOption"
                                @blur="onEditorBlur($event)"
                                @focus="onEditorFocus($event)"
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
// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["link", "image", "video"] // 链接、图片、视频
];
import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
export default {
     props: {
        /*编辑器的内容*/
        value: {
        type: String
        },
        /*图片大小*/
        maxSize: {
        type: Number,
        default: 4000 //kb
        }
    },
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
            file:"",
            quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
            editorOption: {
            placeholder: "",
            theme: "snow", // or 'bubble'
            placeholder: "您想说点什么？",
            modules: {
            toolbar: {
            container: toolbarOptions,
            // container: "#toolbar",
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              }
              // link: function(value) {
              //   if (value) {
              //     var href = prompt('请输入url');
              //     this.quill.format("link", href);
              //   } else {
              //     this.quill.format("link", false);
              //   }
              // },
            },
          }
        }
            },
            serverUrl: "http://119.45.125.173:8091/PicFileController/uploadPicture", // 这里写你要上传的图片服务器地址
            header: {
                // token: sessionStorage.token
            } // 有的图片服务器要求请求头需要有token
        }
    },
    components: {
        quillEditor
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
        onEditorChange() {
        //内容改变事件
        this.$emit("input", this.addinform.schoolDetails);
        },
         // 富文本图片上传前
        beforeUpload() {
        // 显示loading动画
        this.quillUpdateImg = true;
        },
        uploadSuccess(res, file) {
        console.log(res,file)
        // res为图片服务器返回的数据
        // 获取富文本组件实例
        let quill = this.$refs.myQuillEditor.quill;
        // 如果上传成功
        if (res.code == 200) {
            // 获取光标所在位置
            let length = quill.getSelection().index;
            // 插入图片  res.url为服务器返回的图片地址
            quill.insertEmbed(length, "image", res.msg);
            // 调整光标到最后
            quill.setSelection(length + 1);
        } else {
            this.$message.error("图片插入失败");
        }
        // loading动画消失
        this.quillUpdateImg = false;
         },
        // 富文本图片上传失败
        uploadError() {
        // loading动画消失
        this.quillUpdateImg = false;
        this.$message.error("图片插入失败");
        },
    }
}
</script>
<style scoped>
    .editor {
  line-height: normal !important;
  height: 500px;
}
.ql-snow .ql-tooltip[data-mode="link"]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
  border-right: 0px;
  content: "保存";
  padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode="video"]::before {
  content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: "14px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="small"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="small"]::before {
  content: "10px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="large"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="large"]::before {
  content: "18px";
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value="huge"]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value="huge"]::before {
  content: "32px";
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: "文本";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: "标题1";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: "标题2";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: "标题3";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: "标题4";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: "标题5";
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: "标题6";
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: "标准字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="serif"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="serif"]::before {
  content: "衬线字体";
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value="monospace"]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value="monospace"]::before {
  content: "等宽字体";
}
</style>