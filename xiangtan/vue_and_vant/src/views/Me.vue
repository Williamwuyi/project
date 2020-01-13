<template>
    <div>
        <div class="me_body">
            <div class="me_top">
            </div>

            <div class="me-list">
                <div class="me_order">
                </div> 
                <div class="me_order" @click="onWddd">
                    <img src="../assets/images/wddd.png"><span> 我的订单</span>
                    <label for=""><img src="../assets/images/jt.png" alt=""></label>
                </div> 
                <div class="me_order" @click="onDlzx">
                    <img src="../assets/images/kskt.png"><span> 代理中心</span>
                    <label for=""><img src="../assets/images/jt.png" alt=""></label>
                </div>
                <!-- <div class="me_order" @click="onSqrz">
                    <img src="../assets/images/sqrz.png"><span> 申请认证</span>
                    <label for=""><img src="../assets/images/jt.png" alt=""></label>
                </div>  -->
                <!-- <div class="me_order" @click="onYjfk">
                    <img src="../assets/images/yjfk.png"><span> 意见反馈</span>
                    <label for=""><img src="../assets/images/jt.png" alt=""></label>
                </div> 
                <div class="me_order" @click="onGywm">
                    <img src="../assets/images/gywm.png"><span> 关于我们</span>
                    <label for=""><img src="../assets/images/jt.png" alt=""></label>
                </div>  -->
                <a href="tel:400-6969-198" id="grzx_lxkf">
                <div class="me_order" @click="onLxkf">
                    <img src="../assets/images/lxkf.png"><span> 联系客服</span>
                    <label for=""><img src="../assets/images/jt.png" alt=""></label>
                </div> </a>
                <div class="me_order" @click="onTcdl">
                    <img src="../assets/images/tcdl.png"><span> 退出登录</span>
                    <label for=""><img src="../assets/images/jt.png" alt=""></label>
                </div>
            </div>
        </div>
               <!-- <div id="cardUser" style="display: none;">{{useroilCard}}</div>
               <div id="nameUser" style="display: none;">{{username}}</div>
               <div id="userPhone" style="display: none;">{{userphone}}</div>
               <div id="userCode" style="display: none;">{{usercode}}</div> -->

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
    data(){
        return{
            // username:this.$route.query.user_name,
            // userphone:this.$route.query.user_phone,
            // usercode:this.$route.query.coupon_code,
            // useroilCard:this.$route.query.user_oilCard,
            currIndex: 0,
            active: 0,
            name: "tabbar",
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
       // 我的订单
        onWddd(){
            // var nameUser = $("#nameUser").text();
            // var userPhone = $("#userPhone").text();
            var nameUser = localStorage.getItem('user_name');
            var userPhone = localStorage.getItem('user_phone');
            this.$router.replace('/myorder?user_phone='+userPhone+"&user_name="+nameUser);
            if(userPhone!=""||userPhone!=null){
                location="/myorder?user_phone="+userPhone+"&user_name="+nameUser;
            }
        },
        //代理中心
        onDlzx(){
            // var nameUser = $("#nameUser").text();
            // var userPhone = $("#userPhone").text();
            var nameUser = localStorage.getItem('user_name');
            var userPhone = localStorage.getItem('user_phone');
            $.ajax({
                url:'http://tan.aizhanzhijia.com/admin/group/group_agent',
                type:'post',
                data:{
                    user_phone:userPhone
                },
                dateType:'jsonp',
                success:function(result){
                    console.log(result);
                    if(result.code==1){
                        // this.$router.replace('/agency?user_phone='+userPhone+"&user_name="+nameUser);
                            location="/agency?user_phone="+userPhone+"&user_name="+nameUser;
                    }else{
                         Toast({
                            message: result.msg,
                            position: 'bottom',
                            duration: 5000
                        });
                    }
                    
                }
            });
            
        },
        // 申请认证
        onSqrz(){
             this.$toast('申请认证，还在完善中...');
        },
        // 意见反馈
        onYjfk(){
             this.$toast('意见反馈，还在完善中...');
        },
        // 关于我们
        onGywm(){
             this.$toast('关于我们，还在完善中...');
        },
        // 联系客户
        onLxkf(){
            // alert("确认呼叫:400-6969-198");
            //  this.$toast('联系客服，还在完善中...');
        },
        onTcdl(){
            MessageBox.confirm('确认退出登录?').then(action => {
                localStorage.clear();
                this.$toast('退出成功');
            });
        }
     }
}

</script>