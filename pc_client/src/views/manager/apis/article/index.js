import axios from 'axios'

export function getMainTableData ({ ...params }) {
  if (!params.title) {
    params.title = ''
  }
  params.tags = JSON.stringify(['文章'])
  params.page--
  return axios.get('/getBreviaryArticleList', {
    params: params,
  })
}

export function saveArticle (formData) {
  formData.filename = '无文件名'
  let date = new Date()
  formData.tips.push('文章')
  formData.createTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  formData.updateTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  return axios.post('/uploadArticle', {
    data: JSON.stringify(formData),
  })
}

export function updateArticle (formData) {
  let date = new Date()

  if (!formData.tips.includes('文章')) {
    formData.tips.push('文章')
  }

  formData.updateTime = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
  return axios.post('/updateArticle', {
    data: JSON.stringify(formData),
  })
}
