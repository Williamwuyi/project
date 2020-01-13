<template>

<div> 
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width,initial-scale=1,user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="format-detection" content="telephone=no">
    <meta name="format-detection" content="email=no">
    <title></title>
    </head>
    <div class="flex-container">
        <div class="flex-item">
            <div class="flex-text">
                <div class="flex-text1">
                    <div style="height: 15px;"></div>
                    <div class="flex-t" id="name_w" @click="onClickUser">油卡登录
                         <!-- {{(username==undefined||username=="")?'油卡登录':username}} -->
                        </div>
                    <div class="flex-b"><button @click="onClickOilCard" id="oildCard">
                        添加您的中国石化加油卡
                        <!-- {{(useroilCard==undefined||useroilCard=="")?'添加您的中国石化加油卡':useroilCard}} -->
                        </button></div>
                    <div class="flex-bottom">
                        <!-- <span>获取头像</span> -->
                         <a @click="onClickExplain" style="color: gold;">油卡充值说明</a>
                    </div>
                </div>
            </div>
            <div class="flex-item2">
                <div class="flex-text2" style="border-right: 1px dashed grey;padding-right: 30px;">
                    <span id="economize">0</span><br>
                    已为您节省油费
                </div>
                <div class="flex-text2" style="padding-left: 30px;">
                    <a @click="onTicket">
                        <span id="sum">0
                        </span> <br>
                    可用代金券金额</a>
                </div>
                <div class="flex-jhm" @click="onTicket">激活</div>
            </div>
        </div>
        <div class="flex-item3">            
            <div class="item3-b">
                <div @click="recharge(100)" name="order_price" value="100" class="ite3-div">100元<br><span>优惠后:￥92</span></div>
                <div @click="recharge(200)" name="order_price" value="200" class="ite3-div">200元<br><span>优惠后:￥184</span></div>
                <div @click="recharge(500)" name="order_price" value="500" class="ite3-div">500元<br><span>优惠后:￥460</span></div>
            </div> 
        </div>

        <div class="flex-item4">
            <div class="text">
                <dd class="dot"></dd> 
                <dd class="czjl">充值记录</dd>
                <dd class="dot"></dd>
            </div>
               <!-- <div id="cardUser" style="display: none;">{{useroilCard}}</div>
               <div id="nameUser" style="display: none;">{{username}}</div>
               <div id="userPhone" style="display: none;">{{userphone}}</div>
               <div id="userCode" style="display: none;">{{usercode}}</div> -->

            <div >
            <table id="cord"></table>
            
            </div>
             <span id="aa">
              暂无充值记录
             </span>
        </div>
    </div>
        <div class="tab">
            <div class="tab_item" v-for="(item ,index) in tabBarImg" :key="index" @click="switchToTab(item.path)">
            <img :src="$route.path === item.path ? item.icon : item.normal" alt=""><br>
            <span :class="$route.path === item.path ? 'active' : ''">{{item.title}}</span>
            </div>
        </div>
</div>
    
    
</template>
<script>
import $ from 'jquery'
import { Toast } from 'mint-ui'
import axios from 'axios';
import wx from 'weixin-js-sdk';
var reqUrl ='http://run.aizhanzhijia.com';//后台请求域名
export default {
    data(){
        return {
        //    username:this.$route.query.user_name,
        //    userphone:this.$route.query.user_phone,
        //    usercode:this.$route.query.coupon_code,
        //    useroilCard:this.$route.query.user_oilCard,
           currIndex: 0,
           name: "tabbar",
           active: 0,
           tabBarImg:[
          {
            path:'/',
            normal:require('./../assets/images/index-0.png'),
            icon:require('./../assets/images/index-1.png'),
            title:'油卡充值'
          },
          {
            path:'/recharge',
            normal:require('./../assets/images/hot-0.png'),
            icon:require('./../assets/images/hot-1.png'),
            title:'话费充值'
          },
          {
            path:'/me',
            normal:require('./../assets/images/center-0.png'),
            icon:require('./../assets/images/center-1.png'),
            title:'个人中心'
          },
        ]
        }
    },
    methods:{
        // 充值说明
        onClickExplain() {
            // var nameUser = $("#nameUser").text();
            // var userPhone = $("#userPhone").text();
            var nameUser = localStorage.getItem('user_name');
            var userPhone = localStorage.getItem('user_phone');
            if(userPhone==''||nameUser==''){
                this.$router.replace('/explain');
            }else{
                this.$router.replace('/explain?user_phone='+userPhone+"&user_name="+nameUser);
            }
        },
        
        //用户登录
        onClickUser(){
            var nameUser = $("#name_w").text();
            // alert(nameUser);
            if(nameUser=="油卡登录"||nameUser.indexOf("油卡登录")!=-1){
                this.$router.replace('/userLogin');
            }else{
                this.$toast('用户已绑定，请激活或充值');
            }
        },
        //绑定油卡
        onClickOilCard(){
            // var nameUser = $("#nameUser").text();
            // var userPhone = $("#userPhone").text();
            var nameUser = localStorage.getItem('user_name');
            var userPhone = localStorage.getItem('user_phone');
            var oildCard = $("#oildCard").text();
            if(oildCard=="添加您的中国石化加油卡"||oildCard.indexOf("添加您的中国石化加油卡")!=-1){
                this.$router.replace('/oilCard?user_phone='+userPhone+"&user_name="+nameUser);
            }else{
                this.$toast('油卡已绑定');
            }
        },
        switchToTab(path){
            // var nameUser = $("#nameUser").text();
            // var userPhone = $("#userPhone").text();
            var nameUser = localStorage.getItem('user_name');
            var userPhone = localStorage.getItem('user_phone');

            this.$router.replace(path+'?user_phone='+userPhone+'&user_name='+nameUser);
            var paths = path.substring(1);
           if(paths==""||paths==null){
                location="/?user_phone="+userPhone+"&user_name="+nameUser;
            }else if(paths=="recharge"||paths.indexOf("recharge") != -1){
                location="/recharge?user_phone="+userPhone+"&user_name="+nameUser;
            }else if(paths=="me"||paths.indexOf("me") != -1){
                location="/me?user_phone="+userPhone+"&user_name="+nameUser;
            }
        },
        //激活码激活
        onTicket(){
            // var userPhone = $("#userPhone").text();
            // var nameUser = $("#nameUser").text();
            var nameUser = localStorage.getItem('user_name');
            var userPhone = localStorage.getItem('user_phone');
            var useroilCards= $("#oildCard").text();
            if(useroilCards==""){
                this.$toast('请绑定油卡，在激活!');
            }else{
                this.$router.replace('/ticket?user_phone='+userPhone+'&user_name='+nameUser+'&user_oilCard='+useroilCards);
            }
        },
        recharge(value){
            var myDate = new Date();
            var h=myDate.getHours();  //获取当前小时数(0-23)
            var day = myDate.getDay();
            if((day==6 || day==0)){
               this.$toast('周末不在充值时间段');
            }else{

                var useroilCards= $("#oildCard").text();
                if(useroilCards!=''){
                    var num = useroilCards.toString().length;
                    if(num=='19'){
                    // $.ajax({
                        //     url:reqUrl+'/admin/Order/order_oilDetail',
                        //     type:'post',
                        //     data:{
                        //         user_oilCard:useroilCards,
                        //         order_yuanPrice:500
                        //     },
                        //     dateType:'jsonp',
                        //         success:function(result){
                        //             // alert(result);
                        //             Toast({
                        //                 message: result.msg,
                        //                 position: 'bottom',
                        //                 duration: 5000
                        //             });
                        //             if(result.code==1){
                        //                 location="/?user_phone="+result.user_phone+"&user_name="+result.user_name;
                        //             }
                        //         }
                        // });
                        let ua = window.navigator.userAgent.toLowerCase();
                        if(ua.match(/MicroMessenger/i) == 'micromessenger'){
                            location.href=reqUrl+"/admin/Index/pay?user_oilCard="+useroilCards+"&order_yuanPrice="+value+"&order_url=1";
                        }else{
                            location.href=reqUrl+"/admin/Index/payH5?user_oilCard="+useroilCards+"&order_yuanPrice="+value+"&order_url=1";
                        }
                        return;
                    }else{
                        this.$toast('请绑定油卡,在充值');
                    }
                }else{
                    this.$toast('请绑定油卡,在充值');
                }
            }
        }   //结束 判断时间不能充值

    }
// 微信分享样式



}
//刷新首页
$(function(){
        // var nameUser = $("#nameUser").text();
        // var userPhone = $("#userPhone").text();
        var nameUser = localStorage.getItem('user_name');
        var userPhone = localStorage.getItem('user_phone');
        var useroilCards= $("#cardUser").text();
        $.ajax({
            url:reqUrl+'/admin/order/order_autoCode',
            type:'post',
            data:{
                user_name:nameUser,
                user_phone:userPhone
            },
            dateType:'jsonp',
            success:function(result){
                var zt="";
                // 刷新是是否有用户信息，0为没有用户信息
                if(result.code==0){
                    if(result.msg==""||result.msg==undefined){
                    }else{
                        Toast({
                            message: result.msg,
                            position: 'bottom',
                            duration: 5000
                        });
                    }
                    // 用户
                    if(result.user_name==""||result.user_name==undefined){
                    }else{
                        $("#name_w").text(result.user_name);
                    }
                    // 判断油卡是否为空，不为空则显示
                    if(result.user_oilCard==""||result.user_oilCard==undefined){
                    }else{
                        $("#oildCard").text(result.user_oilCard);
                    }
                    // 判断可代金券不能超过
                    if(result.coupon_price>50000){
                        $("#sum").text("1000");
                    }else{
                        $("#sum").text(result.coupon_price);
                    }
                    // 显示已优惠价格
                    $("#economize").text(result.youPrice);
                    // 判断是否有充值记录
                    if(result.order==[]||result.order==undefined){
                    }else{
                        $("#cord").append("<tr height='30px'><td width='190px'>充值时间</td><td width='120px'>充值项</td><td width='190px'>优惠额度</td><td width='200px'>充值状态</td></tr>"); 
                            // 循环充值记录
                        for (var i=0;i<result.order.length;i++) {
                            var status = result.order[i].order_chongStatus;
                            var stat = result.order[i].order_status;
                            var youPrice = result.order[i].order_yuanPrice-result.order[i].order_youPrice;
                            if(stat==0){
                                zt="待付款";
                            }else if(status==0){
                                zt="入账中";
                            }else if(status==1){
                                    zt="已入账 ";
                            }else if(status==2){
                                zt="入账失败";
                            }
                            $("#cord").append("<tr height='30px'><td width='190px'>"+result.order[i].order_time+"</td><td width='120px'>"+result.order[i].order_yuanPrice+"元"+"</td><td width='190px'>"+youPrice+"元"+"</td>"+"<td width='200px'>"+zt+"</td></tr>");
                        }
                    }
                    // 判断充值记录不为空时显示
                    if(result.order==null || result.order=="" ){
                        $("#aa").show();
                        }else{
                        $("#aa").hide();
                    }
                }else{
                    // 用户显示
                    if(result.user_name==""||result.user_name==undefined){
                    }else{
                        $("#name_w").text(result.user_name);
                    }
                    // 油卡显示
                    if(result.user_oilCard==""||result.user_oilCard==undefined){
                    }else{
                        $("#oildCard").text(result.user_oilCard);
                    }
                   if(result.coupon_price>50000){
                        $("#sum").text("1000");
                    }else{
                        $("#sum").text(result.coupon_price);
                    }
                    // 显示已优惠价
                    $("#economize").text(result.youPrice);
                    // 判断是否有充值记录
                    if(result.order==[]||result.order==undefined){
                    }else{
                        $("#cord").append("<tr height='30px'><td width='190px'>&nbsp;充值时间</td><td width='120px'>充值项</td><td width='190px'>优惠额度</td><td width='200px'>充值状态</td></tr>");
                        // 循环充值记录
                        for (var i=0;i<result.order.length;i++) {
                            var status = result.order[i].order_chongStatus;
                            var stat = result.order[i].order_status;
                            var youPrice = result.order[i].order_yuanPrice-result.order[i].order_youPrice;
                            if(stat==0){
                                zt="待付款";
                            }else if(status==0){
                                zt="入账中";
                            }else if(status==1){
                                    zt="已入账 ";
                            }else if(status==2){
                                zt="入账失败";
                            }
                            $("#cord").append("<tr height='30px'><td width='190px'>"+result.order[i].order_time+"</td><td width='120px'>"+result.order[i].order_yuanPrice+"元"+"</td><td width='190px'>"+youPrice+"元"+"</td>"+"<td width='200px'>"+zt+"</td></tr>");
                        }
                    }
                    if(result.order==null || result.order=="" ){
                        $("#aa").show();
                        }else{
                        $("#aa").hide();
                    }
                }
            }
          
        });

})

</script>
<style lang="stylus">
</style>