import { comments } from './comments.js'
import { textEl } from '../script.js'
import { inputEl } from '../script.js'
import { formEl } from '../script.js'
import { formLoadEl } from '../script.js'
import { handlePostClick } from './api.js'
import { buttonEl } from '../script.js'
import { replaceAllEl } from './replaceAll.js'

export let countLikes = 0

export function btnFunction() {
    buttonEl.addEventListener('click', () => {
        // проверка, чтобы все поля были заполнены
        if (inputEl.value === '') {
            inputEl.style.backgroundColor = 'red'
            inputEl.onfocus = function () {
                inputEl.style.backgroundColor = ''
            }
            return
        }
        if (textEl.value === '') {
            textEl.style.backgroundColor = 'red'
            textEl.onfocus = function () {
                textEl.style.backgroundColor = ''
            }
            return
        }

        comments.push({
            userName: replaceAllEl(inputEl.value),
            date: `${new Date().toLocaleDateString('ru-RU', {
                month: 'numeric',
                day: 'numeric',
                year: '2-digit',
            })} ${new Date().toLocaleTimeString('ru-RU', {
                hour: '2-digit',
                minute: '2-digit',
            })}`,
            commentText: replaceAllEl(textEl.value),
            likes: countLikes,
            isLiked: false,
        })

        if (navigator.onLine) {
            formEl.style.display = 'none'
            formLoadEl.style.display = 'flex'
            formEl.replaceWith(formLoadEl)
        }

        // renderComments(comments);// 2 отрисовка - локально показывается новый коммент

        // fetch post - перед очищением полей и после рендера

        handlePostClick()
    })
}
