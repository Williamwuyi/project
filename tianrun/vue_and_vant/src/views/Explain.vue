<template>
    <div>
        <!-- 导航栏 -->
        <div id="nav_bar">
            <van-nav-bar
                left-arrow
                left-text="返回"
                @click-left="onClickLeft">
            </van-nav-bar>
        </div>
        <!-- 页面主体 -->
         <div class="explain">
            充值说明<br>

        <div class="explain-text">充值说明:<br>
            
            中石化油卡每日最大充值金额不超过500元，每月充值金额不超过2000元充值<br>
            到账时间：星期一至星期五    早9:00-晚18:00<br>
            由于系统原因法定节假日休息，到账时间会延迟到工作日。<br>
            <br>1、中石化官方每日22:50—00:50为其系统对账时间，此段时间聚合收单处理，对账结束，正常处理。
           <br> 2、油卡充值必须为中国石化个人实名认证加油卡主卡方可充值充值，不记名主卡、企业主卡。副卡、挂失卡卡号不存在无法充值。
          <br>  3、用户支付成功后2小时内即可到账，若因油卡或系统问题超过24小时未到账，将原路退还所充值的金额。
           <br> 4、同一时间同一卡号提交多笔，可能会被中石化系统限制，导致充值失败，不同省份超限制不同。
           <br> 5、订单充值成功，如超过24小时仍未到账，为中石化官方系统数据传输问题，请您尽快通过客服热线与我们联系。
          <!-- <br>  6、朝晖汽车客服热线：0731-83689998 -->

            <br>
        </div>
            <!--                     <div>客服电话（微信同号）：13908462346</div>   -->
    </div>  
        <!-- <div id="cardUser" style="display: none;">{{useroilCard}}</div>
        <div id="nameUser" style="display: none;">{{username}}</div>
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
            this.$router.replace('/?user_phone='+userPhone+'&user_name='+nameUser);
            location="/?user_phone="+userPhone+"&user_name="+nameUser;
        },
        confirm(){
            this.$toast('点击确定');
        }

    }
}
</script>

<style lang="stylus">

</style>