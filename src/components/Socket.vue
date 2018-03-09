<template>
    <div>
        <a href="#/">home</a>
        <div id="head">
            <input type="" name="" id="input_text" v-model="text">
            <button id="send_btn" v-on:click="send_msg">发送</button>
        </div>
        <div id="chat_text">
            <h4>聊天记录</h4>
            <p v-for="item in msg_list">
                {{item}}
            </p>
        </div>
    </div>
</template>
<script>
import get_io from '../assets/js/test.js';


export default {
    name: 'Socket',
    created: function() {
        this.io = get_io(this.msg_list);
    },
    data: function() {
        return {
            text: '',
            io: null,
            msg_list: [],
        }
    },
    methods: {
        send_msg: function() {
            console.log(this.text)
            this.io.sendData(this.text);
        }
    },
    destroyed:function(){
        this.io.disconnect();
    },
}
// get_io();
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline-block;
    margin: 0 10px;
}

a {
    color: #42b983;
}
</style>
