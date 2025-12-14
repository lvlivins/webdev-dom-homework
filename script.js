import { renderComments } from './modules/render.js'
import { comments } from './modules/comments.js'
import { getAPI } from './modules/api.js'
import { btnFunction } from './modules/button.js'

export const buttonEl = document.querySelector('.add-form-button')
export const inputEl = document.querySelector('.add-form-name')
export const textEl = document.querySelector('.add-form-text')
export const formEl = document.querySelector('.add-form')
export const containerEl = document.querySelector('.container')
export const loadEl = document.createElement('div')
export const formLoadEl = document.createElement('div')
export const container = document.getElementById('commentsContainer')
// export const containerDivInner = loadEl.querySelector('.container__jsInner')
// export const commentDivInner = formLoadEl.querySelector('.newComment__jsInner')
// export const commentElements = document.querySelectorAll('li')
// export const likeButtons = document.querySelectorAll('.like-button')

getAPI()
renderComments(comments) // 1 отрисовка - локально показываются данные
btnFunction()
