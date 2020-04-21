<template>
  <div class="crawler">
    <el-backtop target=".content"></el-backtop>
    <el-row class="tac">
      <el-col :span="4">
        <div class="left">
          <tree-menu @onSelect=onSelect :files="menus"></tree-menu>
        </div>
      </el-col>
      <el-col :span="20">
        <div class="content" id="imgContent">
          <div v-for="img in imgs" :key=img.index>
            <img :src=img.src>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

const { mapState, mapActions } = createNamespacedHelpers('crawler')

export default {
  name: 'Crawler',

  mounted: async function () {
    this.initMenus()
  },

  computed: {
    ...mapState({
      menus: state => state.menus,
      files: state => state.files,
      imgs: state => state.imgs
    })
  },

  methods: {
    ...mapActions([
      'initMenus',
      'refreshMenus'
    ]),
    onSelect: async function (value) {
      console.log('onSelect,', value)
      const values = value.split('/').slice(1)
      this.refreshMenus({
        files: this.files,
        values,
        value
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content,.left {
  height: 100vh;
  overflow: scroll;
}
</style>
