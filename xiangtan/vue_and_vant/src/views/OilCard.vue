<template>
    <div>
        <div>
            <van-nav-bar
                title="油卡信息录入"
                left-arrow
                @click-left="onClickLeft"
            />
        </div>
        <!-- <div>
            <van-cell-group>
                <van-field
                    v-model="name"
                    required
                    clearable
                    label="姓名:"
                    border
                />

                <van-field
                    v-model="tel"
                    label="手机"
                    clearable
                    required
                    border
                />

                <van-field
                    v-model="oilCard"
                    label="油卡号"
                    placeholder="请输入正确油卡号"
                    clearable
                    border
                    required
                />

            </van-cell-group>
            <van-row type="flex" justify="center" >
                <van-col span="8">
                    <van-button type="info" @click="confirm">确认提交</van-button></van-col>
            </van-row>
           
            
        </div> -->
        <form id="form_post">
                <ul>
                    <li class="form_ul">
                        <!-- <input type="text" v-model="username" name="user_realname" class="form_text" style="display: none;"> -->
                        <span>*</span> 用户姓名:<br>
                        <!-- <span name="user_name"> {{username}}</span>  -->
                        <input type="text" id="user_name" name="user_name"  placeholder="    请填写与油卡匹配的全名" class="form_text">
                    </li>
                     <li class="form_ul">
                        <span>*</span> 手机号码: <br>
                        <!-- <span  name="user_phone"> {{userphone}}</span> -->
                        <input type="text" id="phone" name="user_phone"  placeholder="    请输入正确手机号码" class="form_text" >
                    </li> 
                    <li class="form_ul">
                       <span>*</span> 用户性别: <br>
                       <input name="user_sex" type="radio"  checked="checked" class="form_sex" value="0" style="margin-top: 8px;" /><label>男</label> 
                       <input name="user_sex" type="radio" class="form_sex" value="1"/> <label>女</label>
                    </li>
                    <li class="form_ul" style="margin-top: -30px;">
                        <span>*</span> 用户油卡: 
                        <input type="text" required="required" name="user_oilCard" ref="oilCard" placeholder="    请输入19位正常油卡号" class="form_text">
                    </li>
                    <li class="form_ul">
                        <three name="user_address" style="height: 10px;"></three>
                    </li>
                </ul>
                
                <div class="from_submit">
                    <!-- <button hover-class="btnHover" @click="loginfunc">提交信息</button> -->
                    <div hover-class="btnHover" @click="loginfunc">提交信息</div>
                </div>
        </form>
               <!-- <div id="nameUser" style="display: none;">{{username}}</div>
               <div id="userPhone" style="display: none;">{{userphone}}</div>
               <div id="userCode" style="display: none;">{{usercode}}</div> -->
    </div>
</template>

<script>
import $ from 'jquery'
import { Toast } from 'mint-ui'
import three from '../components/three'
export default {
     components:{
        three
     },
    data(){
        return {
        //    username:this.$route.query.user_name,
        //    userphone:this.$route.query.user_phone,
        //    usercode:this.$route.query.coupon_code
        }
    },
    methods:{
        onClickLeft() {
            var userCode = $("#userCode").text();
            var userphone = $("#userPhone").text();
            var username = $("#nameUser").text();
            this.$router.replace('/?user_phone='+userphone+'&user_name='+username);
        },
        loginfunc () {
            var userCode = $("#userCode").text();
            $.ajax({
                url:'http://tan.aizhanzhijia.com/admin/user/user_oilCard',
                type:'post',
                data:$('#form_post').serialize(),
                dateType:'jsonp',
                success:function(result){
                    console.log(result);
                        if(result.code==1){
                            localStorage.setItem('user_name',result.user_name);
                            localStorage.setItem('user_phone',result.user_phone);
                            localStorage.setItem('user_oilCard',result.user_oilCard);
                            location.href="/?user_phone="+result.user_phone+"&user_name="+result.user_name;
                        }else if(result.code==0){
                            Toast({
                            message: result.msg,
                            position: 'bottom',
                            duration: 5000
                            });
                        }
                }
            });
        }

    }
}

</script>

