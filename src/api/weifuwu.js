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
