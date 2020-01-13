<template>
    <div>
        <div class="activate">

            
        </div>
        <div id="chongzhi" style="display: none;">
            话费每月充值金额不超过200元充值<br>
            到账时间：星期一至星期五    早9:00-晚18:00<br>
            由于系统原因法定节假日休息，到账时间会延迟到工作日。<br>
           <br>1、每日22:50—00:50为其系统对账时间，此段时间聚合收单处理，对账结束，正常处理。
           <br> 2、话费充值必须为三大运营商（电信，移动，联通）。
           <br>  3、用户支付成功后2小时内即可到账，若因系统问题超过24小时未到账，将原路退还所充值的金额。
           <br> 4、同一时间同一卡号提交多笔，可能会系统限制，导致充值失败。
           <br> 5、订单充值成功，如超过24小时仍未到账，可能是系统数据传输问题，请您尽快通过客服热线与我们联系。
        </div>
        <div id="nameUser" style="display: none;">{{username}}</div>
        <div id="userPhone" style="display: none;">{{userphone}}</div>
        <div id="userCode" style="display: none;">{{usercode}}</div>
    </div>
</template>
<script>
import $ from 'jquery'
export default {
    data(){
        return {
            username:this.$route.query.user_name,
            userphone:this.$route.query.user_phone,
            usercode:this.$route.query.coupon_code
        }
    }
}
$(function(){
    var nameUser = $("#nameUser").text();
    var userPhone = $("#userPhone").text();
    // var nameUser = localStorage.getItem('user_name');
    // var userPhone = localStorage.getItem('user_phone');
    var chongzhi = $("#chongzhi").text(); 
    var myDate = new Date();
    var h=myDate.getHours();  //获取当前小时数(0-23)
    var day = myDate.getDay();
    if((h>=17 || h<9) || (day==6 || day==0)){
        alert(chongzhi);
        location="/recharge?user_phone="+userPhone+"&user_name="+nameUser;
    }else{
        alert("返回首页");
        location="/recharge?user_phone="+userPhone+"&user_name="+nameUser;
    }
    
})
</script>
