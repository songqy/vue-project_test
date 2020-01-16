<template>
  <div class="crawler">
    <div>
      <el-button type="primary">嘻嘻嘻</el-button>
      <el-cascader
        v-model="value"
        :options="options"
        :show-all-levels="false"
        @change="handleChange"
        :props="{ expandTrigger: 'hover' }"
      />
      <div>
        <div v-for="img in imgs" :key=img.index>
          <img :src=img.src>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { cloneDeep } from 'lodash'
import request from '../utils/request'

const parseOptions = files => {
  if (!files || files.length <= 0) {
    return null
  }
  if (!files[0].children || files[0].children <= 0) {
    return null
  }
  files.forEach(file => {
    file.value = file.filePath
    file.label = file.filePath
    file.children = parseOptions(file.children)
  })
  return files
}

const getImgList = (files, value) => {
  const file1 = files.find(file => file.filePath === value[0])
  const file2 = file1.children.find(file => file.filePath === value[1])
  if (value[2]) {
    const file3 = file2.children.find(file => file.filePath === value[2])
    return file3.children
  }
  return file2.children
}

const parseImgs = (imgs, value) => {
  let prefix = `/${value[0]}/${value[1]}`
  if (value[2]) {
    prefix += `/${value[2]}`
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
    handleChange: function (value) {
      console.log('handleChange')
      console.log(value)

      const imgs = getImgList(this.files, value)
      this.imgs = parseImgs(imgs, value)
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
</style>
