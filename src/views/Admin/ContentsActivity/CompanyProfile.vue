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
                    <el-input v-model="search.name" size="medium" placeholder="请输入内容"></el-input>
                    <el-button icon="el-icon-search" size="small">搜索</el-button>
                </div>
                <div class="marl30 search">   
                    <el-button icon="el-icon-plus" size="small">添加</el-button>
                </div>
                  
            </div>
            <!-- table -->
            <div class="list">   
                <el-table
                :data="ftableData"
                border
                size="small"
                style="width: 100%">
                    <el-table-column
                        prop="name"
                        label="姓名"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        prop="address"
                        label="地址"
                         width="200">
                    </el-table-column>
                    <el-table-column
                        prop="province"
                        label="省份"
                        width="120">
                    </el-table-column>
                    <el-table-column
                        prop="city"
                        label="市区"
                        width="120">
                    </el-table-column>
                    <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
            <!-- 编辑框 -->
            <el-dialog title="编辑框" 
            :visible.sync="dialogVisible" 
            width="50%" 
            :before-close="handleDialogClose"
            :close-on-click-modal="false">
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="80px" class="demo-ruleForm">
                    <el-form-item label="专家名称" prop="expertName">
                        <el-input v-model="ruleForm.expertName" placeholder="请输入专家名称"></el-input>
                    </el-form-item>
                    <el-form-item label="职位" prop="expertTitle">
                        <el-input v-model="ruleForm.expertTitle" placeholder="请输入职位"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" prop="expertPhone">
                        <el-input v-model="ruleForm.expertPhone" placeholder="请输入手机号"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="expertMailbox">
                        <el-input v-model="ruleForm.expertMailbox" placeholder="请输入邮箱"></el-input>
                    </el-form-item>
                    <el-form-item label="上传图片">
                        <input type="file" @change="updateFace($event)" ref="inputer0"  multiple accept="image/png,image/jpeg,image/jpg"/>
                    </el-form-item>
                    <el-form-item label="预览图片:">
                        <el-link type="success" :underline="false" :href="ruleForm.expertPic"  target="_blank"  >
                            <img :src="ruleForm.expertPic" alt="" width="100">
                        </el-link>
                    </el-form-item>
                    <el-form-item label="内容" prop="expertDetails">
                        <el-input type="textarea" v-model="ruleForm.expertDetails" placeholder="内容"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="close()">取 消</el-button>
                    <el-button class="backg" type="primary" size="small"  icon="el-icon-check" @click="Affirm()" v-if="detail==1">确 定</el-button>
                    <el-button class="backg" type="primary" size="small"  icon="el-icon-check" @click="Affirm1()" v-if="detail==2">保 存</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            search:{
                name:""
            },
            tableData:[{
                date: '2016-05-02',
                name: '王小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1518 弄',
                zip: 200333
                }, {
                date: '2016-05-04',
                name: '3小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1517 弄',
                zip: 200333
                }, {
                date: '2016-05-01',
                name: '2小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1519 弄',
                zip: 200333
                }, {
                date: '2016-05-03',
                name: '1小虎',
                province: '上海',
                city: '普陀区',
                address: '上海市普陀区金沙江路 1516 弄',
                zip: 200333
                }
            ]
        }
    },
    created(){},
    mounted(){},
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

    }
}
</script>
<style scoped>
    .boxdetail{
      background-color: #FFF;
    }
    .funmodule{
        display: flex;
        align-items: center;
        margin-top: 20px;
        box-shadow:1px 1px 5px rgba(156, 151, 151, 0.3) ;
        width: 100%;
        height: 60px;
        padding: 8px 10px;
    }
    .funmodule .search {
        display: flex;
        align-items: center;
    }
    .funmodule .search .el-input{
        margin-right: 18px;
        width: 200px;
    }
    .funmodule .el-button{
        color: #FFF;
        background-color:  #009688 !important;
        opacity: 0.8;
    }
    .funmodule .el-button:hover{
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
</style>