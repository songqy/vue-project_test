<template>
  <el-menu
    class="el-menu-vertical-demo"
    :unique-opened="true"
    @select="handleSelect"
  >
    <div v-for="file in files" :key=file.value>
      <tree-sub-menu :file=file></tree-sub-menu>
    </div>
  </el-menu>
</template>

<script>

export default {
  name: 'TreeMenu',
  props: ['files'],

  methods: {
    handleSelect: function (value) {
      this.$emit('onSelect', value)
    }
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
