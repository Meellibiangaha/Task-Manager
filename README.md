##  Заметки, но как веб-приложение: ##
![](./forReadMe_img/1.png)
*** 
#  Вот что в них на данный момент можно делать #

- Создание, чтение, обновление и досок и задач
![](./forReadMe_img/2.png)
- Получать проверки формы при попытке создать/отредактировать доски и задачи (и прочие ограничения, например при создании папки максимум 18 символов)
![](./forReadMe_img/3.png)
- Отмечайте подзадачи как выполненные
![](./forReadMe_img/4.png)
- Dragn' Drop (криво, если честно)
![](./forReadMe_img/dnd.png)
- Переключение темы dark/light (+ localStorage, чтобы запомнить выбор пользователя)
![](./forReadMe_img/light_theme.png)
![](./forReadMe_img/localStorage.png)
- Создавать новые папки и таски в них
![](./forReadMe_img/create_papka.png)
*** 
#  Что должно быть добавлено #

- Удаление как тасков, так и папок (если удалить папку, удалятся все таски в ней)
- Изменение/обновление таска (как описание/имя, так и статус Doing/Todo/Done)
- Изменение статуса таска путем перетаскивания (Drag and Drop)
*** 
###  История почему я это начал делать ###

Решивший посмотреть задачи для junior разработчиков, я полез в интернет, там я обнаружил такие задания как:
- HexColors
- Calculator (через eval...)
- Timer
- Заметки

Начав их делать, я понял, что это слишком легко, поэтому я полез дальше я нашёл таск на
[Frontend Mentor](https://www.frontendmentor.io/challenges/kanban-task-management-web-app-wgQLt-HlbB)
![](./forReadMe_img/task.png)  

Это заинтересовало меня и я начал рассматривать скрины конечного результата, приложенные к таску.  

И так как у меня не было премиум подписки, пришлось делать "на глаз" или же "приближенного к дизайну".
*** 
#  Что использовалось #  
- Html
- Css (flexbox'ы/grid'ы)
- JavaScript без библиотек 


##  Немного про логику ## 
Чтобы связать таск с его модальным окном (когда хотим посмотреть содержимое и изменить/удалить его) + запихнуть в нужную папку я решил воспользоваться объектом в js Map(ключ: значение)  

 <let boardsMap = new Map();
boardsMap.set(activeBoard, activeMainBlock); >  
<//связываю: модальное окно -> блок таска
taskMap.set(currentModalTask, currentTask); >

Для сохранения выбранного цвета, писал функцию, которая при нажатии на кнопку меняет link стиля через  

<localStorage.setItem('theme', userTheme);
    link.setAttribute("href", currTheme); >  

Для записи его в localStorage:  

<window.onload = function() {
    if(localStorage.getItem('theme') == 'css/light_theme.css'){
        document.body.style.display = "none";
        setTimeout(() => document.body.style.display = "", 1); //я не знаю как, но это убирает ненужную анимацию при f5
        let toggle = document.querySelector('.toggle-checkbox');
        toggle.checked = !toggle.checked;
        document.getElementById("theme_link").setAttribute("href", 'css/light_theme.css');
    }
} >
***
Возможно, скрипт для слайдера можно написать короче и красивее...
![](./screenshots/3.png)

##  Ссылки, которые мне помогли ## 

- [Js](https://medium.com/@dan.postnov/%D0%BC%D0%BE%D0%B4%D0%B0%D0%BB%D1%8C%D0%BD%D1%8B%D0%B5-%D0%BE%D0%BA%D0%BD%D0%B0-%D0%BD%D0%B0-javascript-30-%D1%81%D1%82%D1%80%D0%BE%D0%BA-%D0%BA%D0%BE%D0%B4%D0%B0-dbbb599649f3 "модальное окно")
- [Js](https://developer.mozilla.org/ru/docs/Web/API/Element/classList)
- [Css](https://html5book.ru/css-grid/)