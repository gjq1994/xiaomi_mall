<template>
    <div class="learn">
        <div class="container">
            <div class="myForm">
                <div class="form-lt">
                    <form action="" id="formLearn-1">
                        <fieldset class="" name="test-1" form="formLearn-1">
                            <legend>表单学习</legend>
                            <div>
                                <label for="username">用户名：</label>
                                <input type="text" name="user" id="username">
                            </div>
                            <div>
                                <label for="age">年龄：</label>
                                <input type="text" name="age" id="age">
                            </div>
                            <div>
                                <label for="email">邮箱：</label>
                                <input type="email" name="email" id="email">
                            </div>
                            <div>
                                <label for="pet">邮箱：</label>
                                <select type="email" name="pet" id="pet">
                                    <option value="cat">猫</option>
                                    <option value="dog">狗</option>
                                </select>
                            </div>
                            <div>
                                <input type="radio" id="male" checked name="gender" value="male">
                                <label for="male">男</label>
                                <input type="radio" id="female" name="gender" value="female">
                                <label for="female">女</label>
                            </div>
                        </fieldset>
                        <div class="btn">提交</div>
                    </form>
                </div>
                <div class="form-rt"></div>
            </div>
        </div>
    </div>
</template>

<script>
import '@/assets/scss/learn.scss'
export default {
    name: 'learn'
}
</script>