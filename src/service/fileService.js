
import request from '../utils/request'

const fileService = {
  async getFileByParent (parent = '/') {
    const res = await request.get(`/api_crawler/files?parent=${parent}`)
    return res
  }
}
export default fileService
