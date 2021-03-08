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


export const getMsMenu = () => _get('ms/menu')
export const getMsData = params => _get('ms/cards', params)
export const getMsDetail = id => _get(`ms/${id}`)
export const getMsStoryList = (id, params) => _get(`story/list/${id}`, params)
export const getMsLevel = id => _get(`ms-level/${id}`)
export const getMsReview = (id, params) => _get(`ms-review/${id}`, params)
export const addMsReview = params => _post('ms-review', params)

export const getMsProgress= (id, params) => _get(`ms-progress/${id}`, params)
export const addMsProgress = params => _post('ms-progress', params)
export const updateMsBase = params => _put('ms', params)

export const getMsLevelProject = () => _get('ms-level/project')
