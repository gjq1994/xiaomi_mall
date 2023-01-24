<template>
    <div class="nav-bar">
        <div class="container">
            <div class="nav-left">
                <span class="logo"><a href="/#/index"></a></span>
                <span class="pageName">
                    <slot name="pageName"></slot>
                </span>
                <span class="describe">
                    <slot name="describe"></slot>
                </span>
            </div>
            <div class="nav-right">{{ username }}</div>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
    name: 'order-header',
    computed: {
    ...mapState(['username'])
}
}
</script>

<style lang="scss">
.nav-bar {
    width: 100%;
    height: 110px;
    border-bottom: 2px solid #f60;
    .container {
        height: 100%;
        .nav-left {
            float: left;
            height: 100%;
            line-height: 110px;
            font-size: 0;
            span {
                display: inline-block;
                vertical-align: middle;
            }
            .logo {
                width: 52px;
                height: 52px;
                background: url('@/../public/imgs/logo-mi.png') no-repeat center;
                background-size: cover;
                a {
                    display: block;
                    width: 100%;
                    height: 100%;
                }
            }
            .pageName {
                margin: 0 17px 0 54px;
                font-size: 28px;
                font-weight: 400;
                color: #333;
            }
            .describe {
                line-height: 36px;
                height: 28px;
                font-size: 14px;
                font-weight: 300;
                color: #999;
            }
        }
        .nav-right {
            float: right;
            height: 100%;
            line-height: 110px;
            font-size: 16px;
            font-weight: 400;
            color: #666;
        }
    }
}
</style>