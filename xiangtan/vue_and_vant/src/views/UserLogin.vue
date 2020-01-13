<template>
    <div>
        <div>
            <van-nav-bar
                title="用户"
                left-arrow
                @click-left="onClickLeft"
            />
        </div>
        <div class="activate">
            <form>
                <input type="text" id="user" name="user" placeholder="请输入绑定时用户名">
                <input type="text" id="phone" name="phone" placeholder="请输入绑定时的手机号码">
                <div @click="onLogin">登陆</div>
            </form>
            
        </div>

    </div>
</template>
<script>
import $ from 'jquery'
import { Toast } from 'mint-ui'
import axios from 'axios';
export default {
    data(){
        return {
          useroilCard:this.$route.query.user_oilCard
           
        }
    },
    methods:{
        onClickLeft() {
            this.$router.replace('/');
        },
        onLogin(){
            var user = $("#user").val();
            var phone =$("#phone").val();
            if(user==""){
                this.$toast('用户名不能为空');
                return false;
            }
            if(phone==""){
                this.$toast('手机不能为空');
                return false;
            }
            axios.get('http://tan.aizhanzhijia.com/admin/user/user_phone', {
                params: {
                    user_name:user,
                    user_phone:phone
                },
                }).then(resp => {
                    console.log(resp);
                    console.log(resp.data);
                    var result =resp.data;
                    Toast({
                            message: result.msg,
                            position: 'bottom',
                            duration: 8000
                        });
                    if(result.code==1){
                        localStorage.setItem('user_name',result.user_name);
                        localStorage.setItem('user_phone',result.user_phone);
                        localStorage.setItem('user_oilCard',result.user_oilCard);
                        location="/?user_phone="+result.user_phone+"&user_name="+result.user_name;
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
            //     $.ajax({
            //     url:'http://admin.aizhanzhijia.com/admin/user/user_phone',
            //     type:'post',
            //     // data:$('#form_post').serialize(),
            //     data:{
            //         user_name:user,
            //         user_phone:phone
            //     },
            //     dateType:'jsonp',
            //     success:function(result){
            //         console.log(result);
            //         Toast({
            //                 message: result.msg,
            //                 position: 'bottom',
            //                 duration: 8000
            //             });
            //         if(result.code==1){
            //             location="/?user_phone="+result.user_phone+"&user_name="+result.user_name;
            //         }else if(result.code==0){
            //             Toast({
            //                 message: result.msg,
            //                 position: 'bottom',
            //                 duration: 8000
            //             });
            //         }
            //     }
            // });
        
       

        }
    }
}
</script>