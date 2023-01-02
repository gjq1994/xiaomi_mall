<template>
    <div class="login">
        <div class="login-header">
                <div class="container">
                    <div class="login-logo">
                        <a href="/index">
                            <img src="/imgs/login-logo.png" alt="lololo">
                        </a>
                    </div>
                </div>
            </div>
        <div class="wrapper">
            <div class="container">
                <div class="login-box" v-if="toregister==0">
                    <div class="login-top">
                        <span :class="tologin==1?'login-color':''" @click="tologin=1">账号登录</span>
                        <span class="foo">|</span>
                        <span :class="tologin==2?'login-color':''" @click="tologin=2">扫码登录</span>
                    </div>
                    <div class="login-form" v-if="tologin==1">
                        <div class="lo-input">
                            <input type="text" placeholder="请输入帐号" v-model="username">
                        </div>
                        <div class="lo-input">
                            <input type="password" placeholder="请输入密码" v-model="password">
                        </div>         
                    </div>
                    <div class="login-picture" v-if="tologin==2">
                        <img src="@/../public/imgs/dengluo.png" alt="扫码登录">
                    </div>
                    <div class="login-button" @click="login" v-if="tologin==1">登录</div>
                    <div class="login-word" v-if="tologin==1">
                        <span>手机短信登录/注册</span>
                        <span @click="toregister=1">立即注册</span>
                    </div>
                </div>
                <div class="register-box" v-if="toregister==1">
                    <div class="register-form">
                        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm">
                            <el-form-item label="用户名" prop="name">
                                <el-input type="text" v-model="ruleForm.name" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="密码" prop="pass">
                                <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="确认密码" prop="checkPass">
                                <el-input type="password" v-model="ruleForm.checkPass" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" prop="email">
                                <el-input type="email" v-model="ruleForm.email" autocomplete="off"></el-input>
                            </el-form-item>
                            <el-form-item>
                                <el-button type="primary" @click="register">注册</el-button>
                                <el-button @click="resetForm('ruleForm')">重置</el-button>
                                <el-button @click="toregister=0">已注册？直接登陆</el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>
        <div class="login-footer">
                <div class="container">
                    <div class="footer-word">
                        <span class="word-up">
                            <a href="javascript:;">简体</a><span>|</span>
                            <a href="javascript:;">繁体</a><span>|</span>
                            <a href="javascript:;">English</a><span>|</span>
                            <a href="javascript:;">常见问题</a><span>|</span>
                            <a href="javascript:;">隐私政策</a>
                        </span>
                        <span class="word-down">
                            小米公司版权所有-京ICP备10046444-
                            <span></span>
                            京公网安备11010802020134号-京ICP证110507号
                        </span>
                    </div>
                </div>
            </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    name: 'login',
    data() {
        const validateName = (rule, value, callback) => {
            if(!value) {
                callback(new Error('请输入用户名'))
            } else if(value.length > 6) {
                callback(new Error('用户名小于6位'))
            } else {
                callback()
            }
        }
        const validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'))
                } else {
                if (this.ruleForm.checkPass !== '') {
                    this.$refs.ruleForm.validateField('checkPass')
                }
                    callback()
                }
        }
        const validatePass2 = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('请再次输入密码'))
            } else if (value !== this.ruleForm.pass) {
                callback(new Error('两次输入密码不一致!'))
            } else {
                callback()
            }
        }
        return {
            username: '',
            password: '',
            userId: '',
            tologin: 1,
            toregister: 0,
            ruleForm: {
                name: '',
                pass: '',
                checkPass: '',
                email: ''
            },
            rules: {
                name: [
                    { validator: validateName, trigger: 'blur', required:true }
                ],
                pass: [
                    { validator: validatePass, trigger: 'blur', required:true }
                ],
                checkPass: [
                    { validator: validatePass2, trigger: 'blur', required:true }
                ],
                email: [
                    {
                        pattern:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                        message: '请输入正确的邮箱', 
                        trigger: 'blur',
                        required: true
                    }
                ]
            },
        }     
    },
    mounted() {
        
    },
    methods: {
        ...mapActions(['setUserName']),
        login() {
            let { username, password } = this
            if(!username || !password) {
                this.$message.error("请输入正确的用户名和密码")
                return
            }
            this.axios.post('/user/login', {
                username,
                password
            }).then((res) => {
                this.$cookie.set('userId', res.id, {expires: 'Session'})
                this.setUserName(res.username)
                this.$router.push({
                    name: 'index',
                    params: {
                        from: 'login'
                    }
                })
                this.$message({
                    message: '登陆成功',
                    type: 'success'
                })
            }).catch(() => console.log('发现一个错误'))
        },
        register() {
            let { name, pass, email } = this.ruleForm
            if(!name || !pass || !email) {
                this.$message.error('请完成填写')
                return
            }
            this.axios.post('/user/register', {
                username: name,
                password: pass,
                email
            }).then((res) => {
                if(res) {
                    this.$message({
                        message: res,
                        type: 'success'
                    })
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        },
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/login.scss';
</style>