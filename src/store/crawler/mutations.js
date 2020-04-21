
import { MENUS, FILES, IMGS } from './mutationTypes'

export default {
  [MENUS] (state, { menus }) {
    state.menus = menus
  },

  [FILES] (state, { files }) {
    state.files = files
  },

  [IMGS] (state, { imgs }) {
    state.imgs = imgs
  }
}
