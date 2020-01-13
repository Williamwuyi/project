<template>
<div>
    <!-- 导航栏 -->
    <div id="nav_bar">
        <van-nav-bar
            left-arrow
            left-text=""
            @click-left="onClickLeft">
        </van-nav-bar>
    </div>
    <!-- 主体 -->
    <div class="agency">
        <div class="agency_tab">
            <div class="tab-head">
            <span class="selected" @click="orderOild">油卡充值记录</span>
            <span @click="orderHf">话费充值记录</span>
            </div>
            <div class="tab-content">
                <div class="show">
                    <table id="oild"></table>
                </div>
                <div>
                    <table id="orderhf"></table>
                </div>
            </div>
        </div>
        
    </div>
    <!-- 页面主体 -->
    <!-- <div id="nameUser" style="display: none;">{{username}}</div>
    <div id="userPhone" style="display: none;">{{userphone}}</div> -->


</div>
</template>

<script>
import $ from 'jquery'
export default {
     data(){
        return {
        //    username:this.$route.query.user_name,
        //    userphone:this.$route.query.user_phone
        }
    },
    methods:{
        onClickLeft() {
            // var nameUser = $("#nameUser").text();
            // var userPhone = $("#userPhone").text();
            var nameUser = localStorage.getItem('user_name');
            var userPhone = localStorage.getItem('user_phone');
            this.$router.replace('/me?user_phone='+userPhone+'&user_name='+nameUser);
            // location="/me?user_phone="+userPhone+"&user_name="+nameUser;
        },
        orderOild(){
            // var nameUser = $("#nameUser").text();
            // var userPhone = $("#userPhone").text();
            var nameUser = localStorage.getItem('user_name');
            var userPhone = localStorage.getItem('user_phone');
            $.ajax({
                url:'http://run.aizhanzhijia.com/admin/Order/order_list',
                type:'post',
                data:{
                    order_group:1,
                    user_phone:userPhone
                },
                dateType:'jsonp',
                success:function(result){
                    console.log("油卡的============");
                    console.log(result);
                    if(result.order==[]||result.order==undefined){
                    }else{
                        var oildtext = $("#oild").text();
                        if(oildtext==''||oildtext==null){
                            // 循环充值记录
                            for (var i=0;i<result.order.length;i++) {
                            $("#oild").append("<tr><td>姓名：</td><td>"+result.order[i].order_name+"</td><tr><td>油卡号：</td><td>"+result.order[i].order_oilCard+"</td></tr><tr><td>充值金额：</td><td>"+result.order[i].order_yuanPrice+"元</td></tr><tr><td>充值时间：</td><td>"+result.order[i].order_time+"</td></tr><tr height='30px'></tr>");
                            }
                        }
                    }
                }
            });  
        },
        orderHf(){
            // var nameUser = $("#nameUser").text();
            // var userPhone = $("#userPhone").text();
            var nameUser = localStorage.getItem('user_name');
            var userPhone = localStorage.getItem('user_phone');
            $.ajax({
                url:'http://run.aizhanzhijia.com/admin/Order/order_list',
                type:'post',
                data:{
                    order_group:2,
                    user_phone:userPhone
                },
                dateType:'jsonp',
                success:function(result){
                    console.log("话费的===============");
                    if(result.order==[]||result.order==undefined){
                    }else{
                        var order = $("#orderhf").text();
                        if(order==''||order==null){
                        // 循环充值记录
                            for (var i=0;i<result.order.length;i++) {
                                $("#orderhf").append("<tr><td>姓名：</td><td>"+result.order[i].order_name+"</td><tr><td>手机号：</td><td>"+result.order[i].order_phone+"</td></tr><tr><td>充值金额：</td><td>"+result.order[i].order_yuanPrice+"元</td></tr><tr><td>充值时间：</td><td>"+result.order[i].order_time+"</td></tr><tr height='30px'></tr>");
                            }
                        }
                    }
                }
            });  
        },

    }
}

window.onload = function () {
   var tabs = document.getElementsByClassName('tab-head')[0].getElementsByTagName('span'),
      contents = document.getElementsByClassName('tab-content')[0].getElementsByTagName('div');
        (function changeTab(tab) {
            for(var i = 0, len = tabs.length; i < len; i++) {
                 tabs[i].onmouseover = showTab;
            }
        })();
        function showTab() {
            for(var i = 0, len = tabs.length; i < len; i++) {
                if(tabs[i] === this) {
                    tabs[i].className = 'selected';
                    contents[i].className = 'show';
                } else {
                    tabs[i].className = '';
                    contents[i].className = '';
                }
            }
        }
    // var nameUser = $("#nameUser").text();
    // var userPhone = $("#userPhone").text();
    var nameUser = localStorage.getItem('user_name');
    var userPhone = localStorage.getItem('user_phone');
    $.ajax({
        url:'http://run.aizhanzhijia.com/admin/Order/order_list',
        type:'post',
        data:{
            order_group:1,
            user_phone:userPhone
        },
        dateType:'jsonp',
        success:function(result){
           if(result.order==[]||result.order==undefined){
           }else{
               // 循环充值记录
                for (var i=0;i<result.order.length;i++) {
                    $("#oild").append("<tr><td>姓名：</td><td>"+result.order[i].order_name+"</td><tr><td>油卡号：</td><td>"+result.order[i].order_oilCard+"</td></tr><tr><td>充值金额：</td><td>"+result.order[i].order_yuanPrice+"元</td></tr><tr><td>充值时间：</td><td>"+result.order[i].order_time+"</td></tr><th height='30px'></th>");
                }         
           }         
        }
    });             
}
</script>

<style lang="stylus">
table{
    margin-left:20px;
    margin-top:20px;
    width:100%
}
table th{

}  
</style>