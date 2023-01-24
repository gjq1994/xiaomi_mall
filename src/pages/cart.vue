<template>
    <div class="cart">
        <order-header>
            <template v-slot:pageName>
                <span>我的购物车</span>
            </template>
            <template v-slot:describe>
                <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>  
            </template>
        </order-header>
        <div class="myCart">
            <div class="container">
                <div class="cartList">
                    <ul class="list-item-head">
                        <li class="ti-1">
                            <span class="check-box" :class="{'beCheck' : selAll}" 
                            @click="selectAll"></span>
                            <span>全选</span>
                        </li>
                        <li class="ti-2">商品名称</li>
                        <li class="ti-3">单价</li>
                        <li class="ti-4">数量</li>
                        <li class="ti-5">小计</li>
                        <li class="ti-6">操作</li>
                    </ul>
                    <ul class="list-item-info" v-for="(item, index) in myList" :key="index">
                        <li class="itemCheck">
                            <span class="check-box" :class="{'beCheck' : item.productSelected}" 
                            @click="checked(item)"></span>
                        </li>
                        <li class="itemInfo">
                            <img v-lazy="item ? item.productMainImage : '/imgs/item-box-3.jpg'" alt="求职顺利！">
                            <span>{{ item.productName }}</span>
                            <span>{{ item.productSubtitle }}</span>
                        </li>
                        <li class="itemPrice">{{ item.productPrice }}元</li>
                        <li class="itemNum">
                            <div class="numBox">
                                <span class="num-plus" @click="toMinus(item.productId, item.quantity, item.productSelected)">-</span>
                                <span>{{ item.quantity }}</span>
                                <span class="num-minus" @click="toPlus(item.productId, item.productSelected)">+</span>
                            </div>
                        </li>
                        <li class="itemFinalPrice">{{ item.productTotalPrice }}元</li>
                        <li class="toDelete">
                            <div class="ico-del" @click="toDelete(item.productId)"></div>
                        </li>
                    </ul>
                </div>
                <div class="cartBottom">
                    <span>
                        共 <span class="myColor">{{ proNum }}</span> 件商品，
                        已选择 <span class="myColor">{{ checkedNum }}</span> 件
                    </span>
                    <div class="orderBtn" @click="goToOrder">去结算</div> 
                    <div span class="myColor">
                        合计：<span class="bigWord">{{ cartList.cartTotalPrice }}</span> 元
                    </div>
                </div>
            </div>
        </div>
        <service-bar></service-bar>
        <nav-footer></nav-footer>
    </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import NavFooter from './../components/NavFooter'
import ServiceBar from '@/components/ServiceBar.vue'
export default {
    name: 'cart',
    components: {
        OrderHeader,
        NavFooter,
        ServiceBar
    },
    data() {
        return {
            cartList: '',
            myList: [],
            proNum: '',
            selAll: '',
            checkedNum: ''
        }
    },
    mounted() {
        this.getCartList()
    },
    computed: {
        
    },
    methods: {
        getCartList() {
            this.axios.get('/carts').then((res) => {
                this.renderData(res)
            })
        },
        renderData(res) {
            this.cartList = res
            this.myList = res.cartProductVoList
            this.proNum = res.cartProductVoList.length
            this.selAll = res.selectedAll
            this.checkedNum = res.cartProductVoList.filter(item => item.productSelected).length;
        },
        toPlus(id, selected) {
            this.axios.post('/carts', {
                productId: id,
                selected
            }).then((res) => {
                this.renderData(res)
            })
        },
        toMinus(id, num, selected) {
            if(num <= 1) {
                this.toDelete(id)
                return
            }
            num = num - 1
            this.axios.put(`/carts/${id}`, {
                quantity: num,
                selected
            }).then((res) => {
                this.renderData(res)
            })
        },
        toDelete(id) {
            this.axios.delete(`/carts/${id}`).then((res) => {
                this.renderData(res)
            })
        },
        checked(item) {
            let selected = !item.productSelected
            this.axios.put(`/carts/${item.productId}`, {
                quantity: item.quantity,
                selected
            }).then((res) => {
                this.renderData(res)
            })
        },
        selectAll() {
            let seAll = !this.selAll
            if(seAll == true) {
                this.axios.put('/carts/selectAll').then((res) => {
                    this.renderData(res)
                })
            } else if(seAll == false) {
                this.axios.put('/carts/unSelectAll').then((res) => {
                    this.renderData(res)
                })
            } else return
        },
        goToOrder() {
            let checked = this.myList.every(item => !item.productSelected)
            if(checked) {
                this.$message.warning('至少选择一件商品！')
                return
            } else {
                this.$router.push('/order/confirm')
            }
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/cart.scss';
</style>