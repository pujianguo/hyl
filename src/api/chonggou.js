/*
 * @Descripttion:
 * @Author: pujianguo
 * @Date: 2021-02-26 11:28:51
 */
import { _get, _post, _put, _delete } from '../utils/request'

// eg: task
// export const listTask = () => _get('oa/task', {}, false)
// export const addTask = params => _post('oa/task', params)
// export const updateTask = (id, params) => _put(`oa/task/${id}`, params)
// export const deleteTask = id => _delete(`oa/task/${id}`)

export const getStoryMenu = () => _get('story/menu')
export const getStoryData = () => _get('story/cards')
