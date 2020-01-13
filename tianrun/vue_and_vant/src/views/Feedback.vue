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
        <div class="feedback">
            <div class="feedback-bt">
               <span>* </span>留下您最宝贵的意见
            </div>
            <div class="feedback-text">
            <textarea name="" id="feedback" cols="45" rows="5" maxlength="100" placeholder=" 请填写您对我们的反馈意见"></textarea>
            </div>
            <div class="from_submit">
                <div @click="onFeedBackTJ"> 提 交 </div>
            </div>
        </div>

        <!-- <div id="nameUser" style="display: none;">{{username}}</div>
        <div id="userPhone" style="display: none;">{{userphone}}</div> -->
    </div>
     
  
</template>

<script>
import $ from 'jquery'
import axios from 'axios';
import { Toast } from 'mint-ui'
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
            this.$router.replace('/me?user_phone='+userPhone+"&user_name="+nameUser);
        },
        onFeedBackTJ(){
            // var userPhone = $("#userPhone").text();
            var nameUser = localStorage.getItem('user_name');
            var userPhone = localStorage.getItem('user_phone');
            var feedBack = $("#feedback").val();
            if(userPhone==""){
                 this.$toast('请登录您的信息');
            }else{
                axios.get('http://run.aizhanzhijia.com/admin/user/user_feedback', {
                    params: {
                    user_phone:userPhone,
                    feedback_content:feedBack
                },
                }).then(resp => {
                    console.log(resp);
                    console.log(resp.data);
                    var result =resp.data;
                    Toast({
                        message: result.msg,
                            position: 'bottom',
                            duration: 5000
                        });
                        
                    if(result.code==1){
                        location="/me?user_phone="+result.user_phone+"&user_name="+result.user_name;
                    }else if(result.code==0){
                        Toast({
                            message: result.msg,
                            position: 'bottom',
                            duration: 5000
                        });
                    }
                }).catch(err => {
                    console.log(err);
                })
            }
        }

    }
}
</script>

<style lang="stylus">

</style>