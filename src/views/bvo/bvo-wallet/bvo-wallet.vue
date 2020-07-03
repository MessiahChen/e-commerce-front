<template>
  <div>
    <div class="login-container">
      <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on"
               label-position="left">
        <el-form-item prop="account">
          <span class="svg-container">
            <svg-icon icon-class="user" />
          </span>
          <el-input ref="username" v-model="loginForm.username" placeholder="Username" name="username" type="text"
                    tabindex="1" auto-complete="on" />
        </el-form-item>
        <el-form-item prop="email">
          <span class="svg-container">
            <svg-icon icon-class="email" />
          </span>
          <el-input ref="email" v-model="loginForm.email" placeholder="E-mail" name="email" type="email"
                    tabindex="1" auto-complete="on" />
        </el-form-item>
        <el-form-item prop="password">
          <span class="svg-container">
            <svg-icon icon-class="password" />
          </span>
          <el-input :key="passwordType" ref="password" v-model="loginForm.password" :type="passwordType" placeholder="Password"
                    name="password" tabindex="2" auto-complete="on" @keyup.enter.native="handleLogin" />
          <span class="show-pwd" @click="showPwd">
            <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
          </span>
        </el-form-item>
        <el-button :loading="loading" type="primary" style="width:40%;margin-bottom:30px;" @click.native.prevent="handleLogin">Login</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
    import {validUsername} from "@/utils/validate";
    import {getTransactionRecord, walletLogin} from '@/network/bvo'

    export default {
      name: "bvo-wallet",
      data(){
        const validateUsername = (rule, value, callback) => {
          if (!validUsername(value)) {
            callback(new Error('Please enter the correct user name'))
          } else {
            callback()
          }
        }
        const validateEmail = (rule, value, callback) => {
          if (!value.search('@')) {
            callback(new Error('The e-mail form is not correct'))
          } else {
            callback()
          }
        }
        const validatePassword = (rule, value, callback) => {
          if (value.length < 6) {
            callback(new Error('The password can not be less than 6 digits'))
          } else {
            callback()
          }
        }
        return {
          loginForm: {
            username: '',
            email:'',
            password:''
          },
          loginRules: {
            username: [{
              required: true,
              trigger: 'blur',
              validator: validateUsername
            }],
            email: [{
              required: true,
              trigger: 'blur',
              validator: validateEmail
            }],
            password: [{
              required: true,
              trigger: 'blur',
              validator: validatePassword
            }]
          },
          loading: false,
          passwordType: 'password',
          redirect: undefined,
        }
      },
      methods: {
        showPwd() {
          if (this.passwordType === 'password') {
            this.passwordType = ''
          } else {
            this.passwordType = 'password'
          }
          this.$nextTick(() => {
            this.$refs.password.focus()
          })
        },
        handleLogin() {
          this.$refs.loginForm.validate(valid => {
            if (valid) {
              console.log(123);
              this.loading = true
              console.log(123);
              this.$store.dispatch('user/walletLogin', this.loginForm).then(() => {
                console.log(123)
                this.$router.push({
                  path: '/bvo/bvoAvailableMoney'
                })
                this.loading = false
              }).catch(() => {
                this.loading = false
              })
            } else {
              console.log('error submit!!')
              return false
            }
          })
        }
      }
    }
</script>

<style lang="scss">

  /* reset element-ui css */
  .login-container {
    .el-input {
      display: inline-block;
      height: 47px;
      width: 85%;

      input {
        background: transparent;
        border: 0px;
        -webkit-appearance: none;
        border-radius: 0px;
        padding: 12px 5px 12px 15px;
        height: 47px;
      }
    }

    .el-form-item {
      border: 1px solid rgba(255, 255, 255, 0.1);
      background: rgba(0, 0, 0, 0.1);
      border-radius: 5px;
    }
  }
</style>

<style lang="scss" scoped>
  .login-container {
    min-height: 100%;
    width: 100%;
    overflow: hidden;

    .login-form {
      position: relative;
      width: 520px;
      max-width: 100%;
      padding: 160px 35px 0;
      margin: 0 auto;
      overflow: hidden;
      text-align:center;
    }

    .svg-container {
      padding: 6px 5px 6px 15px;
      vertical-align: middle;
      width: 30px;
      display: inline-block;
    }

    .show-pwd {
      position: absolute;
      right: 10px;
      top: 7px;
      font-size: 16px;
      cursor: pointer;
      user-select: none;
    }
  }
</style>

