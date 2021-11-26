import Vue from 'vue';
const api = process.env.VUE_APP_URL ? process.env.VUE_APP_URL : '/api';

export const APIROUTER = {
        // 登录
        'login':  api + '/NewAdminController/getAdmin',
        //图片上传
        'upImg':api+'/PicFileController/uploadPicture',
        //产品优势
        'product':api+'/AdvantageController/',
        //企业介绍
        'company':api+'/FirmController/',
        //合作单位
        'cooperator':api+'/MergeController/',
        //合伙人报名
        'apply':api+'/ApplyController/',
        //应用场景
        'scene':api+'/SceneController/',
        //宣传册
        'brochure':api+'/BrochureController/',
        //招商加盟
        'attract':api+'/JoinController/',
        //智能设备
        'equipment':api+'/IntelligenceController/',
        //系统配置
        'system':api+'/SysController/',
        //特色功能介绍
        'function':api+'/FeatureController/',
        //行业资讯
        'industry':api+'/NewsController/',
        //解决方案
        'solution':api+'/SchoolController/',
         //轮播图
        'banner':api+'/RotationController/',
   
}

Vue.prototype.$api_router = APIROUTER; // 直接声明出去