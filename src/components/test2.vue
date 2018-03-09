<template>
    <div class="test">
        <h1 v-text="msg"></h1>
        <p v-text="msg2"></p>
        <a href="#/">home</a>
        <img src="../assets/images/11772064_post_-630954391.jpg">
    </div>
</template>
<script>
export default {
    name: 'test_b',
    created: function() {
        this.foo();
    },
    data: function() {
        return {
            msg: '433253245453245',
            msg2: 'hrt999图',
            count2: 0,
        }
    },

    methods: {
        foo: function() {
            var that = this;
            setTimeout(function() {
                that.msg = 'r64656y5y';
            }, 3000)
        },
        add2: function() {
            this.count2++;
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

.test img{
    display: block;
    margin: 10px auto;
}
</style>
