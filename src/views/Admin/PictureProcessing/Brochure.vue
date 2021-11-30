<template>
    <div>
        <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/picture' }"><a href="javascript:;">图片处理</a></el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/picture/brochure' }"><a href="javascript:;">宣传册</a></el-breadcrumb-item>
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
                        prop="brochureId"
                        label="ID"
                        width="180">
                    </el-table-column>
                    <el-table-column
                        prop="updateTime"
                        label="更新时间"
                        width="180">
                    </el-table-column>
                    <!-- <el-table-column
                        prop="brochurePicLink"
                        label="标题"
                        show-overflow-tooltip
                        width="200">
                    </el-table-column> -->
                    <el-table-column
                        label="宣传册图片"
                        show-overflow-tooltip
                        min-width="150">
                        <template slot-scope="scope">
                            <!-- <el-link type="primary" :underline="false" :href="scope.row.brochurePic"  target="_blank" class="cell"> -->
                                <div class="demo-image__lazy">
                                    <el-image
                                        style="width: 10%; height: 20%"
                                        :src="scope.row.brochurePic"
                                        :fit="fits.contain"
                                        :preview-src-list="srcList"
                                    >
                                    </el-image>
                                </div>
                            <!-- </el-link> -->
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
                <el-form :model="ruleForm"  label-width="80px" class="demo-ruleForm">
                    <!-- <el-form-item label="标题">
                        <el-input v-model="ruleForm.brochurePicLink" placeholder="请输入标题"></el-input>
                    </el-form-item> -->
                    <el-form-item label="上传图片" class="block">
                        <input type="file" @change="updateFace($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                    </el-form-item>
                    <el-form-item label="预览图片:" class="block">
                        <el-link type="success" :underline="false" :href="ruleForm.brochurePic"  target="_blank"  >
                            <img :src="ruleForm.brochurePic" alt="" width="100">
                        </el-link>
                    </el-form-item>
                    <div class="progressBar" v-show="progr">
                        <el-progress :text-inside="true" :stroke-width="26" :percentage="number" ></el-progress>
                    </div>
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
                <el-form :model="information"   label-width="80px" class="demo-ruleForm">
                    <!-- <el-form-item label="标题">
                        <el-input v-model="information.brochurePicLink" placeholder="请输入标题"></el-input>
                    </el-form-item> -->
                    <el-form-item label="上传图片" class="block">
                        <input id="fileupload" class="file-input" type="file" @change="updateFace($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                    </el-form-item>
                    <el-form-item label="预览图片">
                        <el-link type="success" :underline="false" :href="information.brochurePic"  target="_blank">
                            <img :src="information.brochurePic" alt="" width="100" class="block-image">
                        </el-link>
                    </el-form-item>
                    <div class="progressBar" v-show="progr">
                        <el-progress :text-inside="true" :stroke-width="26" :percentage="number" ></el-progress>
                    </div>
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
            url: '',        //当前图片
            
            progr:false,
            number:10,      //进度条

            srcList: [],   //预览图片组
            loading:false, //加载动画
            dialogVisible:false,  //详情框
            dialogVisibles:false,  //添加框
            timer: null,  // 定时器名称   
            tableData:[],
            information:{   //添加数组
              brochurePicLink:"",
              brochurePic:"",
            },  
            // search:{
            //     rotationName:""
            // },
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
        //查询全部
        Queryall(){
            this.loading = true
            this.axios.post(this.$api_router.brochure+'findAll')
            .then(res=>{
                // console.log(res)
                if(res.data.code == 200){
                        this.tableData = res.data.data
                        // this.$Message.success('查询完成!');
                        this.Dateformatting()  
                        this.Recombination()
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
            this.information.brochurePicLink="",
            this.information.brochurePic="",
            this.file = ""
            // this.information.newsRate=""
            this.progr=false,
            this.number=10
           
        },
        //确认添加
        Affirm1(){
            this.axios.post(this.$api_router.brochure+'saveOne',this.information)
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
        },
        //点击编辑
        handleEdit(index,row){
            this.dialogVisible = true
            this.ruleForm = row[index]
            this.progr=false,
            this.number=10
        },
        //确认修改
        Affirm(){
            this.ruleForm.updateTime = new Date()
            this.axios.post(this.$api_router.brochure+'updateOne',this.ruleForm)
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
        },
        //删除
        handleDelete(index,row){
            this.$confirm("确定删除, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                }).then(()=>{
                    this.axios.post(this.$api_router.brochure+'delOne?brochureId='+row[index].brochureId)
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
            this.progr= true
            var time =  setInterval(() => {
                this.number = this.number+30
                if(this.number >= 100){
                        this.number=100
                         clearInterval(time); 
                }
            }, 1000);
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
                setTimeout(() => {
                    this.ruleForm.brochurePic =  res.data.msg
                    this.information.brochurePic =  res.data.msg
                    var obj = document.getElementById('fileupload') ; 
                    obj.outerHTML=obj.outerHTML;
                }, 3000)
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
        //生成预览图 数组
        Recombination(){
            var srcList = this.tableData.map(({brochurePic})=>({brochurePic}));
            // console.log(srcList)
            var srcListnew = []
            for(var a =0;a<srcList.length;a++){
                srcListnew.push(srcList[a].brochurePic)
            }
            this.srcList  = srcListnew
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
    .dialog img{
        width: 100px !important;
        height: 200px !important;
    }
    .progressBar{
        width: 50%;
    }
</style>