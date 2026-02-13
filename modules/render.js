import { initLikes } from './listener.js'
import { feedbackComments } from './listener.js'
import { token } from './api.js'
import { login } from './api.js'
import { registration } from './api.js'
import { name } from './api.js'
import { setToken } from './api.js'
import { setName } from './api.js'
import { comments } from './comments.js'
import { btnFunction } from './button.js'

const containerEl = document.querySelector('.container')

export function renderComments(comments) {
    const commentsHTML = comments
        .map(
            (comment, index) =>
                `<li class="comment" data-index="${index}">
        <div class="comment-header">
          <div>${comment.userName}</div>
          <div>${comment.date}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text">${comment.commentText}
          </div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter">${comment.likes}</span>
            <button class="${comment.isLiked ? 'like-button -active-like' : 'like-button'}" data-index="${index}"></button>
          </div>
        </div>
        </li>`,
        )
        .join('')

    const addCommentsHTML = `
     <div class="add-form">
    <input
      type="text"
      class="add-form-name"
      placeholder="Введите ваше имя"
      readonly
      value="${name}"
      id="textholder"
    />
    <textarea
      type="textarea"
      class="add-form-text"
      placeholder="Введите ваш коментарий"
      rows="4"
      id="textarea"
    ></textarea>
    <div class="add-form-row">
      <button
        id="btn"
        class="add-form-button"
      >Написать
      </button>
    </div>
  </div>`

    containerEl.innerHTML = addCommentsHTML

    const linkToLogin = `
    <p class="login-hint">
      Чтобы оставить комментарий, <span class="login-link">авторизуйтесь</span>
    </p>`

    const baseHTML = `<ul class="comments" id="commentsContainer">${commentsHTML}</ul> ${token ? addCommentsHTML : linkToLogin}`

    containerEl.innerHTML = baseHTML

    if (token) {
        btnFunction()
        initLikes()
        feedbackComments()
    } else {
        document.querySelector('.login-link').addEventListener('click', () => {
            renderLogin()
        })
    }
}

// рендер логина тут
export function renderLogin() {
    const loginHTML = `
  <section class="auth">
  <h2 class="auth__title">Вход в аккаунт</h2>
  <form class="auth__form">
    <input
      type="text"
      class="auth__input"
      placeholder="Логин"
      id = "login"
      required
    />
    <input
      type="password"
      class="auth__input"
      placeholder="Пароль"
      id="password"
      required
    />
    <div class="auth__btnbox">
      <button type="button" class="auth__btn auth__btn_entry" id="btnAuth">
        Войти
      </button>
      <u class="auth__btn auth__btn_reg" id="btnReg">
        Зарегистрироваться
      </u>
    </div>
  </form>
</section>`

    containerEl.innerHTML = loginHTML

    document.querySelector('#btnReg').addEventListener('click', () => {
        renderRegistration()
    })

    const loginEl = document.querySelector('#login')
    const passwordEl = document.querySelector('#password')
    const authBtnEl = document.querySelector('#btnAuth')

    authBtnEl.addEventListener('click', () => {
        login(loginEl.value, passwordEl.value).then((data) => {
            setToken(data.user.token)
            setName(data.user.name)
            renderComments(comments)
        })
    })
}

// рендер регистрации тут

export function renderRegistration() {
    const loginHTML = `
  <section class="auth">
  <h2 class="auth__title">Регистрация</h2>
  <form class="auth__form">
  <input
      type="text"
      class="auth__input"
      placeholder="Имя"
      id = "name"
      required
    />
    <input
      type="text"
      class="auth__input"
      placeholder="Логин"
      id = "login"
      required
    />
    <input
      type="password"
      class="auth__input"
      placeholder="Пароль"
      id="password"
      required
    />
    <div class="auth__btnbox">
      <u class="auth__btn auth__btn_entry" id="AllowReg">
        Зарегистрироваться
      </u>
      <button type="button" class="auth__btn auth__btn_reg" id="AllowEntry">
        Войти
      </button>
    </div>
  </form>
</section>`

    containerEl.innerHTML = loginHTML

    document.querySelector('#AllowEntry').addEventListener('click', () => {
        renderLogin()
    })

    const nameEl = document.querySelector('#name')
    const loginEl = document.querySelector('#login')
    const passwordEl = document.querySelector('#password')
    const regBtnEl = document.querySelector('#AllowReg')

    regBtnEl.addEventListener('click', () => {
        registration(nameEl.value, loginEl.value, passwordEl.value)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setToken(data.user.token)
                setName(data.user.name)
                renderComments(comments)
            })
    })
}
