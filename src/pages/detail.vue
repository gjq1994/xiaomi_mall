<template>
    <div class="detail">
        <product-param :title="productInfo.name"></product-param>
        <div class="content">
            <div class="proDetail">
                <div class="container">
                    <div class="deSwiper">
                        <swiper :options="swiperOptions" class="detailSwiper">
                            <swiper-slide><img v-lazy="'/imgs/detail/phone-1.jpg'" alt="恭喜发财"></swiper-slide>
                            <swiper-slide><img v-lazy="'/imgs/detail/phone-2.jpg'" alt="恭喜发财"></swiper-slide>
                            <swiper-slide><img v-lazy="'/imgs/detail/phone-3.jpg'" alt="恭喜发财"></swiper-slide>
                            <swiper-slide><img v-lazy="'/imgs/detail/phone-4.jpg'" alt="恭喜发财"></swiper-slide>
                            <div class="swiper-button-prev" slot="button-prev"></div>
                            <div class="swiper-button-next" slot="button-next"></div>
                        </swiper>
                        <div class="swiper-pagination"  slot="pagination"></div>
                    </div>
                    <div class="detailInfo">
                        <div class="deName">
                            <h4>{{ productInfo.name }}</h4>
                            <p>
                                相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 
                                全球首款双频GPS / 骁龙845处理器 / 
                                红外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏
                            </p>
                            <span class="deMall">小米自营</span>
                            <span class="dePrice">
                                <span>{{ productInfo.price }}元</span>
                                <span class="oldPrice">{{ productInfo.price - 100 }}元</span>
                            </span>
                        </div>
                        <div class="address">
                            <div class="add-up">
                                <span class="icon-add"></span>
                                <span class="add">北京 北京市 朝阳区 安定门街道</span>
                                <span class="change">修改</span>
                            </div>
                            <div class="add-down">有现货</div>
                        </div>
                        <span class="choice">选择版本</span>
                        <div class="toChoice">
                            <div class="option" :class="{'mySelect': myEdition == 'ed-1' ? true : false}" id="ed-1" @click="edChoose">
                                <span class="edition">6GB+64GB 全网通</span>
                                <span>1099</span> 元 
                            </div>
                            <div class="option" :class="{'mySelect': myEdition == 'ed-2' ? true : false}" id="ed-2" @click="edChoose">  
                                <span class="edition">4GB+64GB 移动4G</span>
                                <span>899</span> 元
                            </div>
                        </div>
                        <span class="choice">选择颜色</span>
                        <div class="toChoice">
                            <div class="option" :class="{'mySelect': myColor == 'co-1' ? true : false}" id="co-1" @click="coChoose">
                                <span class="myColor"></span>
                                <span class="colorWord">天蓝色</span>
                            </div>
                        </div>
                        <div class="final-price">
                            <div class="final-info">
                                <span class="fin-ed">{{ finalInfo.finalEdition }}</span>
                                <span class="fin-co">{{ finalInfo.finalColor }}</span>
                                <span class="old-pr">{{ 100 + (finalInfo.finalPrice - 0) }}元</span>
                                <span class="fin-pr">{{ finalInfo.finalPrice }}元</span>
                            </div>
                            <div class="buy-price">总计：{{ finalInfo.finalPrice }}元</div>
                        </div>
                        <div class="toBuy">
                            <div class="buy-btn" @click="addCart">加入购物车</div>
                            <div class="love-btn">
                                <span class="myLove"></span>
                                <span>喜欢</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="priceInfo">
                <div class="container">
                    <span>价格说明</span>
                    <img src="/imgs/detail/item-price.jpeg" alt="价格说明">
                </div>
            </div>
        </div>
        <service-bar></service-bar>
    </div>
</template>

<script>
import productParam from '@/components/ProductParam.vue'
import serviceBar from '@/components/ServiceBar.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
import { mapState } from 'vuex'
export default {
    name: 'detail',
    components: {
        productParam,
        serviceBar,
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            swiperOptions: {
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: true,
                },
                speed: 2000,
                loop: true,
                effect : 'fade',
                fadeEffect: {
                    crossFade: true,
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
            productInfo: '',
            myEdition: 'ed-2',
            myColor: 'co-1',
            finalInfo: {
                finalEdition: '',
                finalColor: '',
                finalPrice: '',
            }
        }
    },
    mounted() {
        this.getProductInfo()
        this.getFinalInfo()
    },
    computed: {
        ...mapState(['username'])
    },
    methods: {
        getProductInfo() {
            let id = this.$route.params.id
            this.axios.get(`/products/${id}`).then((res) => {
                this.productInfo = res
            })
        },
        getFinalInfo() {
            this.finalInfo.finalEdition = document.getElementById(this.myEdition).firstChild.innerHTML
            this.finalInfo.finalColor = document.getElementById(this.myColor).lastChild.innerHTML
            this.finalInfo.finalPrice = document.getElementById(this.myEdition).firstChild.nextSibling.innerHTML
        },
        edChoose(event) {
            this.myEdition = event.currentTarget.id
            this.finalInfo.finalEdition = event.currentTarget.firstChild.innerHTML
            this.finalInfo.finalPrice = event.currentTarget.firstChild.nextSibling.innerHTML
        },
        coChoose(event) {
            this.myColor = event.currentTarget.id
            this.finalInfo.finalColor = event.currentTarget.lastChild.innerHTML
        },
        addCart() {
            if(!this.username) {
                this.$router.push('/login')
                return
            }
            let id = this.$route.params.id
            this.axios.post('/carts', {
                    productId: id,
                    selected: true
            }).then((res) => {
                this.$router.push('/cart')
            })
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/detail.scss';
</style>