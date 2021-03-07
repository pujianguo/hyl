/*
 * @Descripttion:
 * @Author: pujianguo
 * @Date: 2021-02-26 11:28:51
 */
import { _get, _post, _put, _delete } from '../utils/request'

// eg: task
export const listTask = () => _get('oa/task', {}, false)
export const addTask = params => _post('oa/task', params)
export const updateTask = (id, params) => _put(`oa/task/${id}`, params)
export const deleteTask = id => _delete(`oa/task/${id}`)

// 标记
export const addStar = params => _post('weifuwu/star', params)
// 添加评论
export const addRate = params => _post('weifuwu/rate', params)

export const getMsData = params => _get('ms/cards', params)
export const getMsDetail = id => _get(`ms/${id}`)
export const getMsStoryList = (id, params) => _get(`story/list/${id}`, params)
export const getMsLevel = id => _get(`ms-level/${id}`)
export const getMsReview = (id, params) => _get(`ms-review/${id}`, params)
export const getMsProject = (id, params) => _get(`ms-project/${id}`, params)
export const addMsReview = params => _post('ms-review', params)

export const getMsLevelProject = () => _get('ms-level/project')
