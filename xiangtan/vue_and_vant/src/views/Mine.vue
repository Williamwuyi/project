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
                <div @click="recharge(100)" name="order_price" value="100" class="ite3-div">100元<br><span>实付:￥92</span></div>
                <div @click="recharge(200)" name="order_price" value="200" class="ite3-div">200元<br><span>实付:￥184</span></div>
                <div @click="recharge(500)" name="order_price" value="500" class="ite3-div">500元<br><span>实付:￥460</span></div>
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
               <div id="userPhone" style="display: none;">{{userphone}}</div> -->
            <div>
                <table id="cord"></table>
            </div>  
                 <span  id="aa">
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
import { MessageBox } from 'mint-ui'
export default {
    name: "tabbar",
    data(){
        return {
        //    username:this.$route.query.user_name,
        //    userphone:this.$route.query.user_phone,
        //    usercode:this.$route.query.coupon_code,
        //    useroilCard:this.$route.query.user_oilCard,
           currIndex: 0,
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
            var userPhone = localStorage.getItem('user_phone');
            // alert(nameUser);
            if(nameUser=="油卡登录"||nameUser.indexOf("油卡登录")!=-1){
                this.$router.replace('/userLogin');
            }else{
                MessageBox.prompt('请填写绑定油卡姓名').then(({ value, action }) => {
                    $.ajax({
                        url:'http://tan.aizhanzhijia.com/admin/user/user_editName',
                        type:'post',
                        data:{
                            user_name:value,
                            user_phone:userPhone
                        },
                        dateType:'jsonp',
                            success:function(result){
                                Toast({
                                    message: result.msg,
                                    position: 'bottom',
                                    duration: 8000
                                });
                                if(result.code==1){
                                    location="/?user_phone="+result.user_phone+"&user_name="+result.user_name;
                                }
                                
                            }
                    });
                });
                // this.$toast('用户已绑定，请激活或充值');
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
            // console.log(path+'?user_phone='+userPhone+'&user_name='+nameUser);
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
            var useroilCards= $("#oildCard").text();
            // var userPhone = $("#userPhone").text();
            // var nameUser = $("#nameUser").text();
            var nameUser = localStorage.getItem('user_name');
            var userPhone = localStorage.getItem('user_phone');
            // console.log(useroilCards);
            if(useroilCards==""){
                this.$toast('请绑定油卡，在激活!');
            }else{
                this.$router.replace('/ticket?user_phone='+userPhone+'&user_name='+nameUser+'&user_oilCard='+useroilCards);
            }
        },
        // 油卡充值按钮
        recharge(value){
            alert("充值系统正在维护中......");
        //     var useroilCards= $("#oildCard").text();
        //     if(useroilCards!=''){
        //         var num = useroilCards.toString().length;
        //         if(num=='19'){
        //             // $.ajax({
        //             //     url:'http://tan.aizhanzhijia.com/admin/Order/order_oilDetail',
        //             //     type:'post',
        //             //     data:{
        //             //         user_oilCard:useroilCards,
        //             //         order_yuanPrice:500
        //             //     },
        //             //     dateType:'jsonp',
        //             //         success:function(result){
        //             //             Toast({
        //             //                 message: result.msg,
        //             //                 position: 'bottom',
        //             //                 duration: 8000
        //             //             });
        //             //             if(result.code==1){
        //             //                 location="/?user_phone="+result.user_phone+"&user_name="+result.user_name;
        //             //             }
                                
        //             //         }
        //             // });
        //             let ua = window.navigator.userAgent.toLowerCase();
        //             if(ua.match(/MicroMessenger/i) == 'micromessenger'){
        //                 location.href="http://tan.aizhanzhijia.com/admin/Index/pay?user_oilCard="+useroilCards+"&order_yuanPrice="+value;
        //             }else{
        //                 location.href="http://tan.aizhanzhijia.com/admin/Index/payH5?user_oilCard="+useroilCards+"&order_yuanPrice="+value;
        //             }
        //             return;
        //         }else{
        //             this.$toast('请绑定油卡,在充值');
        //         }
        //     }else{
        //         this.$toast('请绑定油卡,在充值');
        //     }
        }

    }
}
//刷新首页
$(function(){
        var useroilCards= $("#cardUser").text();
        // var nameUser = $("#nameUser").text();
        // var userPhone = $("#userPhone").text();
        var nameUser = localStorage.getItem('user_name');
        var userPhone = localStorage.getItem('user_phone');
        $.ajax({
            url:'http://tan.aizhanzhijia.com/admin/order/order_autoCode',
            type:'post',
            data:{
                user_name:nameUser,
                user_phone:userPhone
            },
            dateType:'jsonp',
            success:function(result){
                var zt="";
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
                    // 绑定油卡
                    if(result.user_oilCard==""||result.user_oilCard==undefined){
                    }else{
                        $("#oildCard").text(result.user_oilCard);
                    }
                    if(result.coupon_price>50000){
                        $("#sum").text("1000");
                    }else{
                        $("#sum").text(result.coupon_price);
                    }
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
                    // 用户
                    if(result.user_name==""||result.user_name==undefined){
                    }else{
                        $("#name_w").text(result.user_name);
                    }
                    // 绑定油卡
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