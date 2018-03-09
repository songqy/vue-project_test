<template>
  <div class="test">
    <h1 v-text="msg"></h1>
    <p v-text="name"></p>
    <p v-text="age"></p>
    <p v-text="total"></p>
    <a href="#/">home</a>
    <div>
      <a href="#/test/test_a">test_a</a>
      <a href="#/test/test_b">test_b</a>
    </div>
    <transition name="fade" mode="out-in">
    <router-view :message="age" v-on:add="sum"></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'test',
  created:function(){
     this.foo();
  },
  data :function() {
    return {
      msg: 'Welcome to Test.vue',
      name: 'dffefgr',
      age: 33,
      total: 0,
    }
  },

  methods:{
    foo:function(){
        var that = this;
        setTimeout(function(){
            that.age=4;
        },3000)
    },
    sum:function(){
        this.total++;
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
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
