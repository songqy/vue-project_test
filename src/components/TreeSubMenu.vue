<template>
  <el-submenu v-if="file.hasChildren" :index=file.index>
    <template slot="title">{{file.value}}</template>
    <div v-for="item in file.children" :key=item.index>
        <tree-sub-menu :file=item></tree-sub-menu>
    </div>
  </el-submenu>
  <el-menu-item v-else :index=file.index>{{file.value}}</el-menu-item>
</template>

<script>

export default {
  name: 'TreeSubMenu',
  props: ['file']
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
