<template>
    <div class="header">
        <div class="nav-topbar">
            <div class="container">
                <div class="topbar-menu">
                    <a href="javascript:;">小米商城</a>
                    <a href="javascript:;">MUI</a>
                    <a href="javascript:;">云服务</a>
                    <a href="javascript:;">协议规则</a>
                </div>
                <div class="topbar-user">
                    <a href="javascript:;" v-if="username">{{ username }}</a>
                    <a href="javascript:;" v-if="!username" @click="login">登录</a>
                    <a href="javascript:;" v-if="username"  @click="logout">退出</a>
                    <a href="javascript:;" v-if="username">我的订单</a>
                    <a href="javascript:;" class="my-cart">
                        <span class="icon-cart"></span>
                        <span>购物车</span>
                        <span>{{ data }}</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="nav-header">
            <div class="container">
                <div class="header-logo">
                    <a href="/#/index"></a>
                </div>
                <div class="header-menu">
                    <div class="item-menu">
                        <span>小米手机</span>
                        <div class="children1">
                            <ul>
                                <li class="product" v-for="(item, index) in phoneList" :key="index">
                                    <a :href="('/#/product/' + item.id)" target="_blank">
                                        <div class="pro-img">
                                            <img :src="item.mainImage" :alt="item.subtitle">
                                        </div>
                                        <div class="pro-name">{{item.name}}</div>
                                        <div class="pro-price">{{item.price}}</div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="item-menu">
                        <span>Redmi红米</span>
                        <div class="children"></div>
                    </div>
                    <div class="item-menu">
                        <span>电视</span>
                        <div class="children"></div>
                    </div>
                </div>
                <div class="header-search">
                    <div class="wrapper">
                        <input type="text" name="keyword" :value="num">
                        <a href="javascript:;" @click="setNum"></a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from 'vuex'
    export default {
        name: 'nav-header',
        data() {
            return {
                phoneList: []
            }
        },
        mounted() {
            this.getProductList()
            let params = this.$route.params
            if(params && params.from == 'login') {
                this.getCartCount()
            } 
        },
        filters: {
            
        },
        computed: {
            ...mapState(['username', 'data', 'num']),
            ...mapGetters(['hitState']),
            
        },
        methods: {
            ...mapActions(['setNum', 'setUserName']),
            ...mapMutations(['setNumber']),
            login() {
                this.$router.push('/login')
            },
            logout() {
                this.axios.post('/user/logout').then(() => {
                    this.$cookie.delete('userId')
                    //this.$store.dispatch('setUserName')
                    this.$store.dispatch('clear')
                    this.$message({
                        message: '退出成功！',
                        type: 'success'
                    })
                })
            },
            getProductList() {
                this.axios.get('/products', {
                    params: {
                        categoryId: '100012'
                    }
                }).then((res) => {
                    if(res.list.length > 6) {
                        this.phoneList = res.list.slice(4, 10)
                    }
                })
            },
            getCartCount() {
                this.axios.get('/carts/products/sum').then((res) => {
                    this.setData(res)
                }).catch((e) => {
                    console.log('退出登录,无法读取2')
                })
            }
        }
    }
</script>