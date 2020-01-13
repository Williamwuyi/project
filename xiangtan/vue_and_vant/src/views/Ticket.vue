<template>
    <div>
        <div>
            <van-nav-bar
                title="激活"
                left-arrow
                @click-left="onClickLeft"
            />
        </div>
        <div class="activate">
            <form id="form_post">
                <!-- <input type="hidden" name="user_oilCard"> -->
                <input type="text" id="jhm" name="coupon_code" placeholder="请输入6位或者8位激活码">
                <div @click="onTicket">激活</div>
            </form>
            
        </div>
        <div id="userphone" style="display: none;">{{userphone}}</div>
        <div id="nameUser" style="display: none;">{{username}}</div>
        <div id="cardUser" style="display: none;">{{useroilCard}}</div>
    </div>
</template>
<script>
import $ from 'jquery'
import { Toast } from 'mint-ui'
export default {
    data(){
        return {
        username:this.$route.query.user_name,
        userphone:this.$route.query.user_phone,
        useroilCard:this.$route.query.user_oilCard
        }
    },
    methods:{
        onClickLeft() {
             var userphone= $("#userphone").text();
            var nameUser = $("#nameUser").text();
            this.$router.replace('/?user_phone='+userphone+'&user_name='+nameUser);
            location="/?user_phone="+userphone+"&user_name="+nameUser;
        },
        onTicket(){
            var code = $("#jhm").val();
            if(code==""){
                this.$toast('请输入正确激活码');
                return false;
            }
            var useroilCards= $("#cardUser").text();
            $.ajax({
            url:'http://tan.aizhanzhijia.com/admin/coupon/coupon_activate',
            type:'post',
            // data:$('#form_post').serialize(),
            data:{
                coupon_code:code,
                user_oilCard:useroilCards
            },
            dateType:'jsonp',
            success:function(result){
                // console.log(result);
                // alert(result);
                Toast({
                    message: result.msg,
                    position: 'bottom',
                    duration: 5000
                });
                if(result.code==1){
                    location="/?user_phone="+result.user_phone+"&user_name="+result.user_name;
                }else if(result.code==0){
                    Toast({
                    message: result.msg,
                    position: 'bottom',
                    duration: 5000
                    });
                    // location="/Ticket?user_phone="+result.user_phone+"&user_name="+result.user_name;
                }
            }
        });
        
       

        }
    }
}
</script>
<style scoped>
    .el-message{
        color: red;
    }
</style>