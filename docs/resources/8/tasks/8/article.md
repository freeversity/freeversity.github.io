# Начинаем верстать список карточек

Мы сверстали блок навигации и узнали, что гриды и флексы можно использовать в одном компоненте, что отступы по вертикали у строчных боксов ведут себя не так, как у блочных, и что контейнер может переполниться, из-за чего элементы начнут выпадать. Посмотрим, с чем ещё сталкиваются верстальщики при работе с микросетками.

Сверстаем другой компонент — список карточек. Этот компонент часто встречается на новостных сайтах, в интернет-магазинах и фотогалереях.

![Макет списка карточек](/resources/8/assets/html2_4.jpg)

Этот список немного похож на тот, с которым мы работали в [прошлой части](/chapters/7/tasks/8), когда знакомились с крупными сетками. Важное отличие в том, что в новом списке количество колонок может быть любым и должно подстраиваться под ширину окна браузера.

Верстая навигацию в прошлых заданиях, мы брали из макета только размеры отступов. Но в этот раз мы также возьмём [ширину](/chapters/7/tasks/13) карточки. По замыслу дизайнера, карточки должны иметь фиксированную ширину, которая не зависит от длины текста в самой карточке.

```css
.element {
  width: 200px;
}
```

Обратите внимание, свойство `width` задаёт ширину содержимого и не включает внутренние отступы.

![Макет списка карточек](/resources/8/assets/html2_5.jpg)

Список карточек — блочный бокс, вложенный непосредственно в `<body>`. Поэтому он тянется на всю ширину страницы. По умолчанию ширина страницы зависит от размера окна браузера, но для удобства мы **временно** зададим тегу `<body>` другую ширину с помощью свойства `width`. Изменяя значение этого свойства, мы в следующих заданиях будем имитировать разную ширину окна и влиять на число колонок в списке. Это поможет протестировать нашу вёрстку.

Начнём верстать список карточек. Укажем ширину `<body>`, обнулим у списка внешние отступы по умолчанию и переопределим внутренние. Затем возьмём из макета отступы и ширину карточки.