import { replaceAllEl } from './replaceAll.js'

export const comments = []
// из API - под мой формат
export const updateComments = (commentEl) => {
    const newComments = commentEl.map((comment) => {
        return {
            id: comment.id,
            userName: replaceAllEl(comment.author.name),
            date: new Date(comment.date).toLocaleString('ru-RU', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
            }),
            commentText: replaceAllEl(comment.text),
            likes: comment.likes,
            isLiked: comment.isLiked,
        }
    })
    comments.length = 0 // обнуляем старый массив для замены
    comments.push(...newComments) // добавляем новых комментов
}

// изначально: const comments = [
//   {
//     userName: 'Глеб Фокин',
//     date: '12.02.22 12:18',
//     commentText: "Это будет первый комментарий на этой странице",
//     likes: 3,
//     isLiked: false
//   },
//   {
//     userName: 'Варвара Н.',
//     date: '13.02.22 19:22',
//     commentText: "Мне нравится как оформлена эта страница! ❤",
//     likes: 75,
//     isLiked: true
//   }
// ];
