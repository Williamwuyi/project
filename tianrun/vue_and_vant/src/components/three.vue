<template>
<div>
<div class="divwrap" v-if="show">
  <v-distpicker type="mobile" @province="onChangeProvince1" @city="onChangeCity" 
                @area="onChangeArea"></v-distpicker>
</div>
<!--遮罩层-->
<div class="blacks" v-if="show" @click="countermand"></div>
<!--触发选择-->
<div @click="choose">
  <span>*</span> 用户地址: <br>
  <input type="text" v-model="city" name="user_address" placeholder="    请选择地址" 
  style="height: 30px;width: 90%;margin-top: 10px;outline-style: none;margin-left: 10px;border-radius: 2px;border: 1px solid #eee;background-color: #eee;">
  <!-- <span id="input">{{city}}</span> -->
</div>
</div>
</template>
<script>
import VDistpicker from 'v-distpicker'

 export default {
    components: {VDistpicker},
    name: "particular",
    data() {
      return {
        lxr: '',
        lxdh: '',
        show: false,
        //省市区
        province: '',
        city: '',
        area: ''
      }
    },
    props: ['ips'],
    methods: {
      //取消选择地区
      countermand: function () {
        this.show = false
      },
      //打开选择地区
      choose: function () {
        this.show = true;
      },
      onChangeProvince1: function (a) {
        this.province = a.value;
        if (a.value == '台湾省') {
          this.show = false;
        }
      },
      onChangeCity: function (a) {
        this.city = a.value;
      },
      onChangeArea: function (a) {
        this.area = a.value;
        this.show = false;
        this.city = this.province + this.city + this.area;
      }
    }
  }
</script>
<style scoped>
/* 遮罩层 */
.blacks {
  position: fixed;
  width: 100%;
  height: 70%;
  left: 0;
  top: 0;
  background: rgba(0, 0, 0, 0.45);
}
/*省市区三级联动*/
.divwrap {
  height: 30%;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  z-index: 99;
}

/*外部*/
.divwrap > .distpicker-address-wrapper {
  color: #0d0d0d;
  height: 100%;
}

/*头部*/
.divwrap >>> .address-header {
  background: #fff;
  color: #000;
  width: 100%;
  position: fixed;
  bottom: 30%;
  font-size: 0.2rem;
}

/*头部内容*/

.divwrap >>> .address-header ul li {
  flex-grow: 1;
  height: 10px;
  text-align: center;
}
.distpicker-address-wrapper.address-container ul li{
  height: 10px;
}

/*选择过省市区的头部*/
.divwrap >>> .address-header .active {
  color: #000;
  height: 10px;
  border-bottom: 0.05rem solid #666;
}

/*内容部分*/
.divwrap >>> .address-container {
  overflow: scroll;
  height: 100%;
}

/*点过的地区内容*/
.divwrap >>> .address-container .active {
  color: red;
}
</style>