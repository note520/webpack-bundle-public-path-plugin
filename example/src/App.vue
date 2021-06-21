<template>
    <div id="app">
        <div class="page">
            <h1>hell Vue App</h1>
            <el-button>默认按钮</el-button>
            <div class="img-box">

            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'App',
        mounted(){
            console.log('app mounted href:',window.location.href);
        }
    }
</script>

<style scoped>
    .img-box{
        width: 900px;
        height: 600px;
        margin: 0 auto;
        background: url("./assets/img/demo.jpg") no-repeat center center;
        background-size: contain ;
    }
</style>
