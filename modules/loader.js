const formEl = document.querySelector('.add-form')
const containerEl = document.querySelector('.container')
const formLoadEl = document.createElement('div')
const loadEl = document.createElement('div')

loadEl.className = 'container__jsEdit'
loadEl.innerHTML =
    '<div class="container__jsInner"><p> Идет загрузка списка комментариев. Подождите! </p></div>'
loadEl.setAttribute(
    'style',
    'background-color: red; border: 2px solid black; width: 600px; height: 200px; display: flex; align-items: center;',
)

const containerDivInner = loadEl.querySelector('.container__jsInner')
containerDivInner.setAttribute(
    'style',
    'font-size: 28px; color: white; font-weight: bold; text-align: center;',
)

containerEl.classList.add('disabled') // вся стр
formEl.style.display = 'none' // блок добавления комментария

formLoadEl.className = 'newComment__jsEdit'
formLoadEl.innerHTML =
    '<div class ="newComment__jsInner"><p> Идет загрузка нового комментария. Подождите! </p></div>'
formLoadEl.setAttribute(
    'style',
    'background-color: red; margin-top: 48px; border: 2px solid black; width: 600px; height: 200px; display: flex; align-items: center;',
)

const commentDivInner = formLoadEl.querySelector('.newComment__jsInner')
commentDivInner.setAttribute(
    'style',
    'font-size: 28px; color: white; font-weight: bold; text-align: center;',
)

formLoadEl.style.display = 'none'

if (navigator.onLine) {
    containerEl.prepend(loadEl)
}
