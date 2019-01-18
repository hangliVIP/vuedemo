<template>
  <div class="login">
    <h1>登录页面</h1>
    <div class="top_hat"></div>
    <div class="login-box">

      <div class="logo-wrap">
        <div class="logo"></div>
      </div>

      <!--登录表达-->
      <!--errors.has('cno') 加入判断，看是否满足检验规则 -->
      <div class="input-group" :class="{active:act_index===1,error:errors.has('cno')}">
        <label for="cm_code">公司编号:</label>
        <!--v-validate 加入验证方法 -->
        <input name="cno" v-validate="{required:true,max:8,min:4}" @focus="act_index=1" type="number" id="cm_code"
               v-model="cm_code">
      </div>

      <div class="input-group" :class="{active:act_index===2,error:errors.has('pno')}">
        <label for="PNO">员工编号:</label>
        <input name="pno" v-validate="{required:true,max:12,min:6}" @focus="act_index=2" type="PNO" id="PNO"
               v-model="PNO">
      </div>

      <div class="input-group" :class="{active:act_index===3,error:errors.has(password)}">
        <label for="Password">用户密码:</label>
        <!--focus获得焦点-->
        <input name="password" @focus="act_index=3" type="password" id="Password" v-model="Password">
      </div>

      <div class="ck-row">
        <div class="ckbox_wrap" @click="rememberSet" :class="{active:remember}">
          <i class="iconfont" :class="{'icon-kongjianyixuan':remember,'icon-kongjianweixuan':!remember}"></i>
          <span>记住密码</span>
        </div>
        <div @click="autoLoginSet" class="ckbox_wrap" :class="{active:autologin}">
          <i class="iconfont" :class="{'icon-kongjianyixuan':autologin,'icon-kongjianweixuan':!autologin}"></i>
          <span>自动登录</span>
        </div>
      </div>

      <div class="btn-wrap" @click="loginBtnClick">
        <P>登录</P>
      </div>

    </div>

  </div>

</template>


<script>
  import {Indicator} from 'mint-ui';
  import axios from "axios"  // 引入axios网络请求库
  export default {
    name: "Login",
    data() {
      return {
        act_index: 1,
        cm_code: "",
        PNO: "",
        password: "",
        remember: false,
        autologin: false
      };
    },

    mounted() {
      this.$validator.validate();  // 强制进行校验
    },

    methods: {
      autoLoginSet() {
        // 设置当前的autologin为true 或 false
        this.autologin = !this.autologin;
        // 自动登录的时候肯定也记住密码了
        this.autologin && (this.remember = true);
      },
      rememberSet() {  // 记住密码
        this.remember = !this.remember;
        this.remember || (this.autologin = false);
      },
      loginBtnClick() {
        // this.errors.any();  any可以返回一个boolean值
        if (this.errors.any()) {
          console.log("有错误")
          return;
        }
        // 弹窗
        Indicator.open("正在登录...");
        setTimeout(() => {
          Indicator.close();
        }, 2000);  // 2s后关闭
        // 发送ajax请求
        /**
         * 第一个是请求的接口地址
         * 第二个是请求的参数
         * 第三个是返回值
         */
        axios.post("http://127.0.0.1/api/login", {
          PNO: this.PNO,
          Password: this.password,
          CNO:this.cm_code
        })
          .then(res => {
            if (res.data.code === 1) {
              // 登录成功
              // 记住用户名密码
              localStorage.setItem(
                "Login_data", JSON.stringify({   // key value
                  remember: this.remember,
                  autologin: this.autologin,
                  CNO: this.remember ? this.cm_code : "",
                  Password: this.remember ? this.Password : "",
                  PNO: this.remember ? this.PNO : "",
                })
              );

              this.$route.push("/home");

            } else {  // 登录失败
              Toast({
                message: "登录异常失败！",
                duration: 2000
              });
            }
            Indicator.close();
          })
          .catch(e => {
            Toast({
              message: "登录异常失败！",
              duration: 2000
            });
            Indicator.close();
          })
      }
    }
  }
</script>

<style lang="scss" scoped>

  @mixin login_wrap {
    width: 600px;
    height: 836px;
    border-radius: 20px;
    background-color: white;
    margin: 0 auto;
  }

  .login {
    // 给h1 设置布局
    h1 {
      text-align: center; // 居中对齐
      font-size: px2rem(36);
      /*height: px2rem(36);*/
      /*line-height: px2rem(36);*/
      margin-bottom: 48px;
      height: 36px;
      line-height: 36px;
      color: white;
    }

    .login-box {
      /*width: px2rem(600);*/
      /*height: px2rem(836);*/
      /*border-radius: px2rem(20);*/
      @include login_wrap; //绑定风格

      .logo-wrap {
        padding: 80px 0px;

        .logo {
          width: 190px;
          height: 190px;
          margin: 0 auto; // 居中对齐
          background: url("../assets/logo.png");
        }
      }

      @mixin rowstyle() {
        width: 410px;
        padding: 0 36px;
        color: #757575;
      }

      .input-group {
        /*边框*/
        border: 2px solid #e2e2e2;
        border-radius: 45px;
        font-size: 28px;
        line-height: 90px; // 行高
        margin: 0 auto 30px; // 居中对齐
        @include rowstyle();

        // 设置没有边框
        input {
          border: 0 none;
          font-size: 28px;
          line-height: 20px;
          width: 200px;
          padding-left: 1em; // 隔一个字符
        }
      }

      // 设置点击后的颜色边缘
      .input-group.active {
        color: #10903d;
        border: 2px solid #10803d;
      }

      // 设置输入验证
      .input-group.error {
        color: red;
        border: 2px solid red;
      }


      .ck-row {
        @include rowstyle();
        font-size: 24px;
        display: flex;
        justify-content: space-around;
        // 未点击时的控件
        .ckbox_wrap {
          padding-left: 36px;

          i::before {
            padding-top: 10px;
            display: inline-block;
            height: 24px;
            width: 24px;
            font-size: 30px;
          }
        }

        .ckbox_wrap.active {
          color: #55a532;
        }

      }
    }

    .top_hat {
      /*width: px2rem(537);*/
      /*height: px2rem(18);*/
      /*border-radius: px2rem(18) px2rem(18) 0 0;*/
      width: 537px;
      height: 18px;
      border-radius: 18px 18px 0px 0px;
      background-color: #eee;
      margin: 0 auto;

    }

    .btn-wrap {
      @include login_wrap;
      letter-spacing: 10px; // 间隔
      font-weight: 700; // 加粗
      text-align: center;
      line-height: 100px;
      height: 100px;
      font-size: 30px;
      color: #0086b3;
    }
  }

</style>

<style lang="scss">
  html,
  head,
  body,
  #app {
    height: 100%;
    background-color: #2ade69;
  }
</style>
