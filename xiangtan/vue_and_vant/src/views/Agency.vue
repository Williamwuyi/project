<template>
<div>
    <!-- 导航栏 -->
    <div id="nav_bar">
        <van-nav-bar
            left-arrow
            left-text="代理中心"
            @click-left="onClickLeft">
        </van-nav-bar>
    </div>
    <!-- 主体 -->
    <div class="agency">
        <div class="agency_name">
            当前代理组：<span id="groupName"></span> 
        </div>
        <div class="agency_value">
            <div class="agency_num" style="border-right: 1px solid grey;padding-right: 20px;">
                <span id="allCode">0</span><br>
                <label>总激活码</label>
            </div>
             <div class="agency_num" style="border-right: 1px solid grey;padding-right: 20px;">
                <span id="allToday">0</span><br>
                <label>今日激活次数</label>
            </div>
             <div class="agency_num" style="border-right: 1px solid grey;padding-right: 20px;">
                <span id="allStatus">0</span><br>
                <label>总激活数</label>
            </div>
             <div class="agency_num">
                <span id="allPrice"></span><br>
                <label>总加油金额</label>
            </div>
        </div> 
        <div style="height:20px">
        </div>
        <div class="agency_tab">
            <div class="tab-head">
            <span class="selected">全部</span>
            <span>已激活</span>
            <span>今日激活</span>
            </div>
            <div class="tab-content">
                <div class="show">
                    <table id="all_order"></table>
                </div>
                <div>
                    <table id="y_order"></table>
                </div>
                <div>
                    <table id="day_order"></table>
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
        confirm(){
            this.$toast('点击确定');
        }
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
    //加载数据
    var nameUser = localStorage.getItem('user_name');
    var userPhone = localStorage.getItem('user_phone');
    //  var userPhone = $("#userPhone").text();
            $.ajax({
                url:'http://run.aizhanzhijia.com//admin/group/group_showagent',
                type:'post',
                data:{
                    user_phone:userPhone
                },
                dateType:'jsonp',
                success:function(result){
                    var zt="";
                    console.log(result);
                    // 代理组名称
                    $("#groupName").text(result.group_name);
                    // 总激活码
                    $("#allCode").text(result.allCode);
                    // 今日激活数
                    $("#allToday").text(result.allToday)
                    // 总激活码数
                    $("#allStatus").text(result.allStatus);
                    // 总加油金额
                    $("#allPrice").text(result.allPrice);
                    // 全部
                    if(result.couponList==[]||result.couponList==undefined){
                    }else{
                        for(var i=0;i<result.couponList.length;i++){
                            var jhm = result.couponList[i].coupon_code;// 激活码
                            var jhsj = result.couponList[i].coupon_time;//激活时间
                            // 激活状态
                            if(result.couponList[i].coupon_status==0){
                                zt="未激活";
                            }else if(result.couponList[i].coupon_status==1){
                                zt="已激活";
                            }
                            var name = result.couponList[i].user_name;//用户名
                            var phone = result.couponList[i].user_phone;//手机号码
                            $("#all_order").append("<tr><td>激活码:</td><td>"+jhm+"</td></tr>=<tr><td>激活时间:</td><td>"+jhsj+"</td></tr>=<tr><td>当前状态:</td><td>"+zt+"</td></tr>=<tr><td>姓名:</td><td>"+name+"</td></tr>=<tr><td>电话:</td><td>"+phone+"</td></tr><th height='30px'></th>");
                        }
                    }
                    // 已激活
                    if(result.statusList==[]||result.statusList==undefined){
                    }else{
                        for(var i=0;i<result.statusList.length;i++){
                            var jhm = result.statusList[i].coupon_code;// 激活码
                            var jhsj = result.statusList[i].coupon_time;//激活时间
                            var jhzt = result.statusList[i].coupon_status;// 激活状态
                            if(jhzt==0){
                                zt="未激活";
                            }else if(jhzt==1){
                                zt="已激活";
                            }
                            var name = result.statusList[i].user_name;//用户名
                            var phone = result.statusList[i].user_phone;//手机号码
                            $("#y_order").append("<tr><td>激活码:</td><td>"+jhm+"</td></tr>=<tr><td>激活时间:</td><td>"+jhsj+"</td></tr>=<tr><td>当前状态:</td><td>"+zt+"</td></tr>=<tr><td>姓名:</td><td>"+name+"</td></tr>=<tr><td>电话:</td><td>"+phone+"</td></tr><th height='30px'></th>");
                        }
                    }
                    // 今日激活
                    if(result.todayList==[]||result.todayList==undefined){
                    }else{
                        for(var i=0;i<result.todayList.length;i++){
                            var jhm = result.todayList[i].coupon_code;// 激活码
                            var jhsj = result.todayList[i].coupon_time;//激活时间
                            var jhzt = result.todayList[i].coupon_status;// 激活状态
                            if(jhzt==0){
                                zt="未激活";
                            }else if(jhzt==1){
                                zt="已激活";
                            }
                            var name = result.todayList[i].user_name;//用户名
                            var phone = result.todayList[i].user_phone;//手机号码
                            $("#day_order").append("<tr><td>激活码:</td><td>"+jhm+"</td></tr>=<tr><td>激活时间:</td><td>"+jhsj+"</td></tr>=<tr><td>当前状态:</td><td>"+zt+"</td></tr>=<tr><td>姓名:</td><td>"+name+"</td></tr>=<tr><td>电话:</td><td>"+phone+"</td></tr><th height='30px'></th>");
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
</style>