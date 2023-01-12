<template>
    <div class="nav-bar" :class="{'is_Fixed': isFixed}">
        <div class="container">
            <div class="param-left">
                {{ title }}
            </div>
            <div class="param-right">
                <span class="pick">概述</span>
                <span>|</span>
                <span class="pick">参数</span>
                <span>|</span>
                <span class="pick">商品详情</span>
                <slot name="btn"></slot>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'product-param',
    props:{
        title: {
            type: String,
            default: '小米LOVE'
        }
    },
    data() {
        return {
            isFixed: false
        }
    },
    mounted() {
        window.addEventListener('scroll', this.initHeight)
    },
    methods: {
        initHeight() {
            let scrollTop = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset
            this.isFixed = scrollTop > 150 ? true : false
        }
    },
    destroyed() {
        // 第三个参数决定捕获和冒泡，使用false冒泡来移除
        window.removeEventListener('scroll', this.initHeight, false)
    }
}
</script>

<style lang="scss">
.nav-bar {
    z-index: 5;
    width: 100%;
    height: 69px;
    background-color: #fff;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    &.is_Fixed {
        position: fixed;
        top: 0;
    }
    .container {
        .param-left { 
            float: left;
            line-height: 71px;
            font-size: 18px;
            font-weight: bold;
            color: #333;
        }
        .param-right {
            float: right;
            line-height: 71px;
            span {
                font-size: 14px;
                font-weight: bold;
                color: #666;
                margin-right: 11px;
            }
            .pick {
                    cursor: pointer;
            }
        }
    }
}
</style>