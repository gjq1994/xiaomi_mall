<template>
    <div class="product">
        <product-param :title="productInfo.name">
            <template v-slot:btn>
                <div class="param-btn" @click="buy">立即购买</div>
            </template>
        </product-param>
        <div class="pro-bg-1">
            <div class="pro-msg">
                <h2>{{ productInfo.name }}</h2>
                <h3>{{ productInfo.subtitle }}</h3>
                <p>
                    <a href="javascript:;">全球首款双频 GP</a>
                    <span>|</span>
                    <a href="javascript:;">骁龙845</a>
                    <span>|</span>
                    <a href="javascript:;">AI 变焦双摄</a>
                    <span>|</span>
                    <a href="javascript:;">红外人脸识别</a>
                </p>
                <span class="price">￥{{ productInfo.price }}</span>
            </div>
        </div>
        <div class="pro-bg-2">
            <div class="container">
                <img src="@/../public/imgs/product/product-bg-2.png" alt="???">
            </div>
        </div>
        <div class="pro-bg-3"></div>
        <div class="pro-swiper">
            <swiper :options="swiperOptions" class="mySwiper">
                <swiper-slide class="mySlide"><img src="/imgs/product/gallery-2.png" alt="恭喜发财"></swiper-slide>
                <swiper-slide class="mySlide"><img src="/imgs/product/gallery-3.png" alt="恭喜发财"></swiper-slide>
                <swiper-slide class="mySlide"><img src="/imgs/product/gallery-4.png" alt="恭喜发财"></swiper-slide>
                <swiper-slide class="mySlide"><img src="/imgs/product/gallery-5.jpg" alt="恭喜发财"></swiper-slide>
                <swiper-slide class="mySlide"><img src="/imgs/product/gallery-6.jpg" alt="恭喜发财"></swiper-slide>
            </swiper> 
            <div class="swiper-pagination"  slot="pagination"></div>
            <div class="pname">{{ productInfo.name }} AI变焦双摄拍摄</div>
        </div>
        <div class="pro-videos">
            <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
            <p>
                后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>
                更能AI 精准分析视频内容，15个场景智能匹配背景音效。
            </p>
            <div class="videos-bg" v-show="showBg">
                <div class="seeVideo" @click="seeVideo"></div>
            </div>
            <transition name="videoSlide">
                <div class="video-box" v-show="showVideo">
                    <div class="overlay"></div>
                    <div class="video" :class="{'slide': showVideo}">
                        <video id="myVideo" src="/imgs/product/video.mp4" controls loop muted autoplay></video>
                        <div class="toClose" @click="toClose"></div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
import productParam from '@/components/ProductParam.vue'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
export default {
    name: 'product',
    components: {
        productParam,
        Swiper,
        SwiperSlide
    },
    data() {
        return {
            swiperOptions: {
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                speed: 2000,  
                loop: true,
                effect: 'slide',
                centeredSlides: true,
                slidesPerView : 3,
                slidesPerGroup: 1,
                spaceBetween : 22,
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                },
            },
            showVideo: false,
            showBg: true,
            productInfo: ''
        }
    },
    mounted() {
        this.getProductInfo()
    },
    methods: {
        getProductInfo() {
            let id = this.$route.params.id.slice(3)
            this.axios.get(`/products/${id}`).then((res) => {
                this.productInfo = res
            })
        },
        buy() {
            let id = this.$route.params.id.slice(3)
            this.$router.push(`/detail/${id}`)
        },
        seeVideo() {
            this.showVideo = true
            this.showBg = false
        },
        toClose() {
            this.showBg = true
            this.showVideo = false
            let video = document.getElementById('myVideo')
            video.pause()      
        }
    }
}
</script>

<style lang="scss">
@import '@/assets/scss/product.scss';
</style>