# Верстаем список с `gap`

Мы посмотрели, как будет выглядеть список, если в ряду окажется две или четыре карточки. Так как мы убрали отступ у каждой третьей карточки, то третья и четвёртая карточки начали слипаться. Кроме того, справа у границы контейнера снова появился лишний отступ.

<style>
.cards-list {
  width: 650px;
  display: flex;
  flex-wrap: wrap;
  margin: 0;
  padding: 20px;
  padding-top: 45px;
 }

.card {
  box-sizing: content-box;
  width: 110px;
  padding: 15px;
  margin-right: 15px;
  margin-bottom: 15px;
}

.cards-list {
  list-style: none;
  font-family: "PT Sans", "Arial", sans-serif;
  color: #085A75;
  background-color: #D5D0C7;
}

.card {
  text-align: center;
  background: #FFFFFF;
  border-radius: 2px;
}

.card:nth-child(3) {
  margin-right: 0;
}

.title {
  margin: 5px 0;
  font-size: 13px;
  line-height: 16px;
  font-weight: 400;
  word-break: break-word;
}
</style>
<div class="cards-list browser-view"><div class="card"><img src="/resources/8/assets/img/coffee-1.jpg" alt="Кофе: длинный путь от сбора ягод до вашей кружки" width="110" height="110"><div class="title">Кофе: длинный путь от&nbsp;сбора ягод до&nbsp;вашей кружки</div></div><div class="card"><img src="/resources/8/assets/img/coffee-2.jpg" alt="Лучшие машины для дома" width="110" height="110"><div class="title">Лучшие машины для дома</div></div><div class="card"><img src="/resources/8/assets/img/coffee-4.jpg" alt="Советы от бариста: как выбрать хорошее зерно?" width="110" height="110"><div class="title">Советы от&nbsp;бариста: как выбрать хорошее зерно?</div></div><div class="card"><img src="/resources/8/assets/img/coffee-5.jpg" alt="Рецепты на новогодние праздники" width="110" height="110"><div class="title">Рецепты на&nbsp;новогодние праздники</div></div></div>

Мы не знаем, какой ширины окажется окно браузера у пользователя и какая карточка будет в ряду последней. Из-за этого мы не можем использовать `:nth-child`, чтобы убрать у неё отступ справа. Как быть?

К сожалению, простого решения этой проблемы для флексов нет. А вот свойство `gap`, которое есть у гридов, придётся как нельзя кстати. Это свойство позволяет задавать отступы между элементами и не влияет на расстояние до границ контейнера.

```
.grid-container {
  display: grid;
  gap: 10px;
}
```

Напишем новые стили для списка карточек, на этот раз используя гриды.

Так как при описании шаблона грид-контейнера мы указываем ширину колонок, то задавать ширину самим карточкам больше не нужно.

![Макет списка карточек](/resources/8/assets/html2_7.jpg)

Все колонки в списке должны быть одинаковой ширины. В этом случае удобно использовать значение-функцию `repeat` (от английского «повторить»). В скобках после `repeat` указывают количество колонок и их ширину. Значения разделяют запятой:

```css
grid-template-columns: repeat(количество колонок, ширина колонки);
```

Этот код разобьёт грид-контейнер на четыре колонки шириной `100px`:

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(4, 100px);
}
```

Удалим весь код, который мы написали для реализации на флексах. После этого превратим список карточек в грид-контейнер и добавим отступы между карточками с помощью свойства `gap`. Используем `repeat`, чтобы разделить список на колонки, и попробуем задавать разные значения.
