<template>
  <div class="crawler">
    <el-backtop target=".content"></el-backtop>
    <el-row class="tac">
      <el-col :span="4">
        <tree-menu @onSelect=onSelect :files=options></tree-menu>
      </el-col>
      <el-col :span="20">
        <div class="content">
          <div v-for="img in imgs" :key=img.index>
            <img :src=img.src>
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import request from '../utils/request'

// 判断是否文件夹
const isDir = (path) => {
  return !path.match(/\./)
}

const parseOptions = (files, index = '') => {
  if (!files || files.length <= 0) {
    return null
  }
  // if (!files[0].children || files[0].children <= 0) {
  //   return null
  // }
  files.forEach(file => {
    file.value = file.filePath
    file.label = file.filePath
    file.index = `${index}/${file.filePath}`
    file.children = parseOptions(file.children, file.index)
    file.hasChildren = file.children && file.children.length > 0 && isDir(file.children[0].value)
  })
  return files
}

const getImgList = (files, value) => {
  const file1 = files.find(file => file.filePath === value[0])
  const file2 = file1.children.find(file => file.filePath === value[1])
  if (value[2]) {
    const file3 = file2.children.find(file => file.filePath === value[2])
    if (value[3]) {
      const file4 = file3.children.find(file => file.filePath === value[3])
      return file4.children
    }
    return file3.children
  }
  return file2.children
}

const parseImgs = (imgs, value) => {
  let prefix = `/${value[0]}/${value[1]}`
  if (value[2]) {
    prefix += `/${value[2]}`
  }
  if (value[3]) {
    prefix += `/${value[3]}`
  }

  let imgName = imgs.map(v => v.filePath)
  imgName = imgName.filter(v => v.match(/img\d+.*/))

  imgName = imgName.map(img => {
    return {
      src: `/api_crawler/file${prefix}/${img}`,
      index: parseInt(img.slice(3))
    }
  })

  imgName.sort((a, b) => {
    return a.index - b.index
  })

  return imgName
}

export default {
  name: 'Crawler',
  options: [],
  files: [],
  imgs: [],

  mounted: async function () {
    const { content } = await request.get('/api_crawler/files')
    this.files = cloneDeep(content.files)
    this.options = parseOptions(content.files)
    console.log(this.options)
  },

  methods: {
    onSelect: function (value) {
      const values = value.split('/').slice(1)
      console.log('onSelect,', values)
      const imgs = getImgList(this.files, values)
      this.imgs = parseImgs(imgs, values)
    }
  },

  data () {
    return {
      value: [],
      options: this.options,
      files: this.files,
      imgs: this.imgs
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.content {
  height: 100vh;
  overflow: scroll;
}
</style>
