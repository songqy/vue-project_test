<template>
    <div class="test">
        <h1 v-text="msg"></h1>
        <p v-text="msg2"></p>
        <p>{{message}}</p>
        <a href="#/">home</a>
        <button v-on:click="add1">{{count1}}</button>
    </div>
</template>
<script>
export default {
    name: 'test_a',
    created: function() {
        this.foo();
    },
    data: function() {
        return {
            msg: 'one',
            msg2: 'dffefgr',
            count1: 0,
        }
    },
    props: [
        'message'
    ],
    methods: {
        foo: function() {
            var that = this;
            setTimeout(function() {
                that.msg = 'two';
            }, 3000)
        },
        add1: function() {
            this.count1++;
            this.$emit('add');
        },
    }
}
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
