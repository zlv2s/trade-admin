import request from '@utils/request'

/**
 * 文件上传
 * @param {FormData} filename
 * @returns {Promise}
 */
export function uploadFile(formData, onUploadProgress) {
  return request({
    url: '/file/upload/mobile',
    method: 'post',
    data: formData,
    onUploadProgress
  })
}
