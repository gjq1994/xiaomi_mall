<template>
    <div class="index">
        <div class="index-top">
            <div class="container">
                <div class="swiper-box">
                    <div class="box-list">
                        <ul>
                            <li class="list-item">
                                <span>手机 电话卡</span>
                                <span class="icon-arrow"></span>
                                <div class="children">
                                    <ul v-for="(items, index) in menuList" :key="index">
                                        <li v-for="(item, index) in items" :key="index">
                                            <a :href="'/#/product/id=' + (item ? item.id : '10086')" target="_blank">
                                                <img v-lazy="item ? item.img : '/imgs/item-box-3.jpg'" alt="加载失败">
                                                <span>{{item ? item.name : '小米love'}}</span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </li>
                            <li class="list-item">
                                <span>手机 电话卡</span>
                                <span class="icon-arrow"></span>
                            </li>
                            <li class="list-item">
                                <span>笔记本 平板</span>
                                <span class="icon-arrow"></span>
                            </li>
                            <li class="list-item">
                                <span>家电 插线板</span>
                                <span class="icon-arrow"></span>
                            </li>
                            <li class="list-item">
                                <span>出行 穿戴</span>
                                <span class="icon-arrow"></span>
                            </li>
                            <li class="list-item">
                                <span>耳机 音箱</span>
                                <span class="icon-arrow"></span>
                            </li>
                            <li class="list-item">
                                <span>电源 配件</span>
                                <span class="icon-arrow"></span>
                            </li>
                            <li class="list-item">
                                <span>生活 箱包</span>
                                <span class="icon-arrow"></span>
                            </li>
                        </ul>
                    </div>
                    <div class="box-swiper">
                        <swiper :options="swiperOptions" class="mySwiper">
                            <swiper-slide v-for="(item, index) in slideList" :key="index">
                                <a :href="'/#/product/id=' + item.id" target="_blank">
                                    <img :src="item.img" :alt="item.mySubtle">
                                </a>
                            </swiper-slide>
                            <div class="swiper-pagination"  slot="pagination"></div>
                            <div class="swiper-button-prev" slot="button-prev"></div>
                            <div class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                    </div>
                </div>
                <div class="ads-box">
                    <ul>
                        <li v-for="(item, index) in adsList" :key="index">
                            <a :href="'/#/product/id=' + item.id" target="_blank">
                                <img :src="item.img" alt="广告位招租">
                            </a>
                        </li>
                    </ul>
                </div>
                <div class="banner"></div>
            </div>
        </div>
        <div class="index-bottom">
            <div class="container">
                <div class="product-box">
                    <span>手机</span>
                    <div class="box-pro">
                        <div class="pro-lt">
                            <img src="@/../public/imgs/mix-alpha.jpg" alt="恭喜发财">
                        </div>
                        <div class="pro-rt">
                            <ul v-for="(items, i) in phoneList" :key="i">
                                <li v-for="(item, j) in items" :key="j">
                                    <span class="hot" v-if="(item.id % 3 == 0)">新品</span>
                                    <a :href="'/#/product/id=' + item.id" target="_blank">
                                        <img v-lazy="item.mainImage" :alt="item.subtitle">
                                        <span class="name">{{item.name}}</span>
                                        <span class="subtitle">{{item.subtitle}}</span>
                                        <span class="price">
                                            ￥{{item.price}}元
                                            <span class="add-cart" @click.prevent="show_Modal=true"></span>
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <service-bar></service-bar>
        <modal title="提示"
            sureText="确认信息"
            modalType="middle"
            btnType="3"
            :showModal="show_Modal"
            @submit="goToCart"
            @cancel="show_Modal=false"
            @toClose="()=>show_Modal=false">
            <template v-slot:body="slotProp">
                <div>{{slotMessage}}</div>
                <div>{{slotProp.con+1}}</div>
            </template>
        </modal>
    </div>
</template>

<script>
import ServiceBar from '@/components/ServiceBar'
import Modal from '@/components/Modal.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
    name: 'index',
    components: {
        ServiceBar,
        Modal,
        Swiper,
        SwiperSlide,
    },
    data() {
        return {
            swiperOption: {},
            swiperOptions: {
                autoplay: true,
                loop: true,
                delay: 2000,
                speed: 2000,
                effect: 'cube',
                 cubeEffect: {
                     slideShadows: true,
                     shadow: false,
                //     shadowOffset: 100,
                //     shadowScale: 0.6
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
                navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
                },
            },
            slideList: [
                {
                    id: 42,
                    index: 1,
                    img: '/imgs/slider/slide-1.jpg',
                    mySubtle: '求职顺利'
                },
                {
                    id: 45,
                    index: 2,
                    img: '/imgs/slider/slide-2.jpg',
                    mySubtle: '心想事成'
                },
                {
                    id: 46,
                    index: 3,
                    img: '/imgs/slider/slide-3.jpg',
                    mySubtle: '恭喜发财'
                },
                {
                    id: 42,
                    index: 4,
                    img: '/imgs/slider/slide-4.jpg',
                    mySubtle: '必胜'
                }
            ],
            menuList:[
                [
                    {
                        id:30,
                        img:'/imgs/item-box-1.png',
                        name:'小米CC9',
                    },
                    {
                        id:31,
                        img:'/imgs/item-box-2.png',
                        name:'小米8青春版',
                    },
                    {
                        id:32,
                        img:'/imgs/item-box-3.jpg',
                        name:'Redmi K20 Pro',
                    },
                    {
                        id:33,
                        img:'/imgs/item-box-4.jpg',
                        name:'移动4G专区',
                    }
                ],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0],
                [0,0,0,0]
            ],
            adsList:[
                {
                    id:33,
                    img:'/imgs/ads/ads-1.png'
                },
                {
                    id:48,
                    img:'/imgs/ads/ads-2.jpg'
                },
                {
                    id:45,
                    img:'/imgs/ads/ads-3.png'
                },
                {
                    id:47,
                    img:'/imgs/ads/ads-4.jpg'
                }
            ],
            phoneList: [],
            slotMessage: '父组件字符串',
            show_Modal: false,
        }
    },
    mounted() {
        this.init()
    },
    methods: {
        init() {
            this.axios.get('/products/', {
                params: {
                    categoryId:100012,
                    pageSize:14
                }
            }).then((res) => {
                res.list = res.list.slice(6, 14)
                this.phoneList = [res.list.slice(0, 4), res.list.slice(4, 8)]
            })
        },
        addCart(id) {
            this.axios.post('/carts', {
                productId: id,
                selected: true
            }).then((res) => {

            }).catch(() => {
                this.showModal = true
            })         
        },
        goToCart() {
            this.$router.push('/cart')
        }
    }
}
</script>