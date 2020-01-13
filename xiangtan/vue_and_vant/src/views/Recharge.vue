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
	        <div class="flex-item_hf">
	            <div class="flex-text_hf">
	                <div class="flex-cz">
	                    <div class="flex-bottom_cz">
	                         <a @click="onClickExplainHF" style="color: goldenrod;">话费充值说明</a>
	                    </div>
	                </div>
	            </div>
	            <div class="flex-item2">
	                <div class="flex-text2" style="border-right: 1px dashed grey;padding-right: 30px;">
                        <span id="economize_hf"> <b>0</b> </span><br>
                        已为您节省话费
                    </div>
	               <div class="flex-text2" style="padding-left: 30px;">
                        <a @click="onTicket">
                            <span id="sum">0
                            <!-- {{(couponPrice==undefined||couponPrice=="")?'0':couponPrice}} -->
                            </span><br>
                        可用代金券金额
                        </a>
                    </div>
	            </div>
	        </div>
            
	        <div class="flex-item3_hf">            
					<input class="flex_input" type="text" id="tel" readonly="true" placeholder="     请输入充值号码" />
	            <div class="item3-b_hf">
                    <div @click="recharge(50)" name="order_price" value="50" class="ite3-div">50元<br><span>实付:￥46</span></div>
                    <div @click="recharge(100)" name="order_price" value="100" class="ite3-div">100元<br><span>实付:￥92</span></div>
                    <div @click="recharge(200)" name="order_price" value="200" class="ite3-div">200元<br><span>实付:￥184</span></div>
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
	            
                <div>
	                <table id="cord_recharge"></table>
	            </div>
                
	             <span  id="none">
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
        onClickExplainHF() {
            // var nameUser = $("#nameUser").text();
            // var userPhone = $("#userPhone").text();
            var nameUser = localStorage.getItem('user_name');
            var userPhone = localStorage.getItem('user_phone');
            if(userPhone==''||nameUser==''){
                this.$router.replace('/explainhf');
            }else{
                this.$router.replace('/explainhf?user_phone='+userPhone+"&user_name="+nameUser);
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
        //用户登录
        onClickUser(){
            var nameUser = $("#name_w").text();
            // alert(nameUser);
            if(nameUser=="您还未绑定油卡"||nameUser.indexOf("未绑定油卡")!=-1){
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
        //充值
        recharge(value){
            alert("充值系统正在维护中......")
            // var orderphone= $("#tel").val();
            // if(orderphone!=''){
            //     var num = orderphone.toString().length;
            //     if(num=='11'){
            //             // $.ajax({
            //             //     url:'http://tan.aizhanzhijia.com/admin/Order/order_telDetail',
            //             //     type:'post',
            //             //     data:{
            //             //         order_phone:orderphone,
            //             //         user_phone:userphone,
            //             //         order_yuanPrice:200
            //             //     },
            //             //     dateType:'jsonp',
            //             //         success:function(result){
            //             //             // alert(result);
            //             //             Toast({
            //             //                 message: result.msg,
            //             //                 position: 'bottom',
            //             //                 duration: 5000
            //             //             });
            //             //             if(result.code==1){
            //             //                 location="/recharge?user_phone="+result.user_phone+"&user_name="+result.user_name;
            //             //             }
                                    
            //             //         }
            //             // });
            //             let ua = window.navigator.userAgent.toLowerCase();
            //             if(ua.match(/MicroMessenger/i) == 'micromessenger'){
            //                 location.href="http://tan.aizhanzhijia.com/admin/index/pay?order_yuanPrice="+value+"&order_phone="+orderphone;
            //             }else{
            //                 location.href="http://tan.aizhanzhijia.com/admin/index/payH5?order_yuanPrice="+value+"&order_phone="+orderphone;
            //             }
            //             return; 
            //     }else{
            //         this.$toast('请输入正确手机号码');
            //     }
            // }else{
            //     this.$toast('请输入手机号码');
            // }
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
        //设置默认用户手机号码
        if(userPhone==''||userPhone==undefined){
        }else{
            $("#tel").val(userPhone);
        }
        $.ajax({
            url:'http://tan.aizhanzhijia.com/admin/user/user_telRecharge',
            type:'post',
            data:{
                    user_name:nameUser,
                    user_phone:userPhone
            },
            dateType:'jsonp',
            success:function(result){
                console.log(result);
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
                    if(result.user_oilCard==""||result.user_oilCard==undefined){
                    }else{
                        $("#oildCard").text(result.user_oilCard);
                    }
                    if(result.coupon_price>50000){
                        $("#sum").text("1000");
                    }else{
                        $("#sum").text(result.coupon_price);
                    }
                    $("#economize_hf").text(result.youPrice);
                    //循环话费充值记录
                    if(result.order==[]||result.order==undefined){
                    }else{
                    $("#cord_recharge").append("<tr height='30px'><td width='190px'>充值时间</td><td width='120px'>充值项</td><td width='190px'>优惠额度</td><td width='200px'>充值状态</td></tr>"); 
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
                            $("#cord_recharge").append("<tr height='30px'><td width='190px'>"+result.order[i].order_time+"</td><td width='120px'>"+result.order[i].order_yuanPrice+"元"+"</td><td width='190px'>"+youPrice+"元"+"</td>"+"<td width='200px'>"+zt+"</td></tr>");
                        }
                    }
                    if(result.order==null || result.order=="" ){
                        $("#none").show();
                        }else{
                        $("#none").hide();
                    }
                }else{
                    if(result.user_oilCard==""||result.user_oilCard==undefined){
                    }else{
                        $("#oildCard").text(result.user_oilCard);
                    }
                   if(result.coupon_price>50000){
                        $("#sum").text("1000");
                    }else{
                        $("#sum").text(result.coupon_price);
                    }
                    // 已省话费
                    $("#economize_hf").text(result.youPrice);
                    // 判断是否有充值记录
                    if(result.order==[]||result.order==undefined){
                        console.log("未找到充值记录")
                    }else{
                    $("#cord_recharge").append("<tr height='30px'><td width='190px'>&nbsp;充值时间</td><td width='120px'>充值项</td><td width='190px'>优惠额度</td><td width='200px'>充值状态</td></tr>");
                        // 充值记录循环
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
                            $("#cord_recharge").append("<tr height='30px'><td width='190px'>"+result.order[i].order_time+"</td><td width='120px'>"+result.order[i].order_yuanPrice+"元"+"</td><td width='190px'>"+youPrice+"元"+"</td>"+"<td width='200px'>"+zt+"</td></tr>");
                        }
                    }
                    if(result.order==null || result.order=="" ){
                        $("#none").show();
                        }else{
                        $("#none").hide();
                    }
                }
            }
          
        });
})
</script>
<style lang="stylus">
</style>