<template>
    <transition name="slide">
        <div class="modal" v-show="showModal">
            <div class="mask"></div>
            <div class="modal-dialog">
                <div class="m-header">
                    <span class="title">标题</span>
                    <span class="icon-close" @click="$emit('toClose')"></span>
                </div>
                <div class="m-body">
                    <slot name="body" :con="count">我是插槽内容</slot>
                </div>
                <div class="m-footer">
                    <span class="btn" v-if="btnType!=2" @click="$emit('submit')">确定</span>
                    <span class="btn" v-if="btnType!=1" @click="$emit('cancel')">取消</span>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: 'modal',
    props: {
        modalType: {
            // 分为小中大和表单
            type: String,
            default: 'form'
        },
        title: {
            type: String
        },
        btnType: {
            // 按钮类型，1，2,3
            type: String
        },
        sureText: {
            type: String,
            default: '确定'
        },
        cancelText: {
            type: String,
            default: '关闭'
        },
        showModal: {
            type: Boolean
        }
    },
    data() {
        return {
            count: 1
        }
    }
}
</script>