
import { cloneDeep } from 'lodash'

import { MENUS, FILES, IMGS } from './mutationTypes'
import fileService from '../../service/fileService'

// 判断是否文件夹
const isDir = (path) => {
  return !path.match(/\./)
}

// 判断是否图片
const isImg = (path) => {
  return path.match(/(.png|.jpg)$/)
}

const parseMenus = (files, index = '') => {
  if (!files || files.length <= 0) {
    return null
  }
  return files.map(file => {
    const newFile = {
      value: file.filePath,
      label: file.filePath,
      index: `${index}/${file.filePath}`
    }
    newFile.children = parseMenus(file.children, newFile.index)
    newFile.hasChildren = newFile.children && newFile.children.length > 0 && isDir(newFile.children[0].value)
    return newFile
  })
}

const appendFiles = (files, content, values) => {
  let target = files
  values.forEach((value, ind) => {
    if (ind > 0) {
      target = target.children
    }
    target = target.find(file => file.filePath === value)
  })
  target.children = content.files
  return files
}

const getImgList = (files, values) => {
  let target = files
  values.forEach((value, ind) => {
    if (ind > 0) {
      target = target.children
    }
    target = target.find(file => file.filePath === value)
  })
  if (target.children && target.children.length > 0 && isImg(target.children[0].filePath)) {
    return target.children
  }
}

const parseImgs = (imgs, values) => {
  let prefix = `/${values[0]}/${values[1]}`
  if (values[2]) {
    prefix += `/${values[2]}`
  }
  if (values[3]) {
    prefix += `/${values[3]}`
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

const needFetchChildren = (files, values) => {
  let target = files
  values.forEach(value => {
    target = target.find(file => file.filePath === value).children
  })
  return !(target && target.length > 0)
}

export default {
  async initMenus ({ commit }) {
    const { content } = await fileService.getFileByParent()
    const files = cloneDeep(content.files)
    const menus = parseMenus(content.files)
    // console.log('initMenus,menus', menus)
    commit(FILES, { files })
    commit(MENUS, { menus })
  },

  async refreshMenus ({ commit }, { files, values, value }) {
    let newFiles = null
    if (needFetchChildren(files, values)) {
      const { content } = await fileService.getFileByParent(value)
      newFiles = appendFiles(files, content, values)
      // console.log('appendFiles', newFiles)
      const menus = parseMenus(newFiles)
      // console.log('menus', menus)
      commit(FILES, { files: newFiles })
      commit(MENUS, { menus })
    }

    let imgs = getImgList(newFiles || files, values)
    if (imgs) {
      imgs = parseImgs(imgs, values)
      commit(IMGS, { imgs })
      // 滚动条回到顶部
      document.getElementById('imgContent').scrollTop = 0
    }
  }
}
