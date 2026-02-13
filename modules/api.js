import { comments, updateComments } from './comments.js'
import { renderComments } from './render.js'

const host = 'https://wedev-api.sky.pro/api/v2/lada-yarkova'
const authHost = 'https://wedev-api.sky.pro/api/user'
export let token = ''

export const setToken = (newToken) => {
    token = newToken
}

export let name = ''

export const setName = (newName) => {
    name = newName
}

export const login = (login, password) => {
    return fetch(authHost + '/login', {
        method: 'POST',
        body: JSON.stringify({ login: login, password: password }),
    })
        .then((response) => {
            if (response.status === 400) {
                throw new Error('Неверное имя пользователя или пароль')
            }
            return response.json()
        })
        .catch((error) => {
            alert(error.message)
        })
}

export const registration = (name, login, password) => {
    return fetch(authHost, {
        method: 'POST',
        body: JSON.stringify({ name: name, login: login, password: password }),
    })
}

export const getAPI = () => {
    const formEl = document.querySelector('.add-form')
    const containerEl = document.querySelector('.container')
    const loadEl = document.createElement('div')

    return fetch(host + '/comments')
        .then((response) => {
            return response.json()
        })
        .then((data) => {
            updateComments(data.comments)
            renderComments(comments)
        })
        .catch(() => {
            alert('У пользователя пропал интернет')
        })
        .finally(() => {
            /*formEl.style.display = 'flex'
            containerEl.classList.remove('disabled')
            loadEl.remove() не работал тк элемент null исправление ниже */
            formEl && (formEl.style.display = 'flex')
            containerEl && containerEl.classList.remove('disabled')
            loadEl.remove()
        })
}

export const handlePostClick = () => {
    const textEl = document.querySelector('.add-form-text')
    const inputEl = document.querySelector('.add-form-name')
    const formLoadEl = document.createElement('div')
    const formEl = document.querySelector('.add-form')

    fetch(host + '/comments', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
            text: textEl.value,
            name: inputEl.value,
            // forceError: true это для вызова ошибки
        }),
    })
        .then((response) => {
            // console.log(response.status);
            if (response.status === 500) {
                throw new Error('Сервер сломался, попробуй позже')
            } else if (response.status === 400) {
                throw new Error(
                    'Имя и комментарий должны быть не короче 3 символов',
                )
            }
            return response.json()
        })
        .then(() => {
            //return Promise.reject('какая-то ошибка') - пример ошибки
            return getAPI()
        })
        .then(() => {
            // очищение полей для нового ввода, после отрисовки нового комментария и передачи его в post
            inputEl.value = ''
            inputEl.style.backgroundColor = ''
            textEl.value = ''
            textEl.style.backgroundColor = ''
        })
        .catch((error) => {
            if (
                error.message ===
                    'NetworkError when attempting to fetch resource.' ||
                error.message === 'Failed to fetch'
            ) {
                alert('У пользователя пропал интернет')
            } else if (error.message === 'Сервер сломался, попробуй позже') {
                handlePostClick()
            } else {
                alert(error.message)
            }
        })
        .finally(() => {
            formLoadEl.style.display = 'none'
            formEl.style.display = 'flex'
            formLoadEl.replaceWith(formEl)
        })
}
