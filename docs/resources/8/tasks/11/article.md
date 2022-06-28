# Убираем лишний отступ

Мы изменили значение `justify-content` и использовали внешние отступы, чтобы разделить карточки. Но в результате вместо трёх карточек в ряду оказалось всего две. Третья карточка не поместилась.

Разберём, почему так вышло. Мы добавили отступ справа всем карточкам, и у третьей карточки он тоже появится. В контейнере для него места не оказалось, и третья карточка перенеслась на новый ряд.

<style>
  .cards-list {
    width: 490px;
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 20px;
    padding-top: 45px;
   }

  .card {
    position: relative;
    box-sizing: content-box;
    width: 110px;
    padding: 15px;
    margin-bottom: 15px;
    margin-right: 15px;
  }

  .card::after {
    content: "";
    position: absolute;
    width: 15px;
    top: -1px;
    bottom: -1px;
    right: -15px;
    background-color: #0083FF; opacity: 0.2;
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

  .title {
    margin: 5px 0;
    font-size: 13px;
    line-height: 16px;
    font-weight: 400;
    word-break: break-word;
  }
  </style>
<div class="cards-list browser-view"><div class="card"><img src="/resources/8/assets/img/coffee-1.jpg" alt="Кофе: длинный путь от сбора ягод до вашей кружки" width="110" height="110"><div class="title">Кофе: длинный путь от&nbsp;сбора ягод до&nbsp;вашей кружки</div></div><div class="card"><img src="/resources/8/assets/img/coffee-2.jpg" alt="Лучшие машины для дома" width="110" height="110"><div class="title">Лучшие машины для дома</div></div><div class="card"><img src="/resources/8/assets/img/coffee-4.jpg" alt="Советы от бариста: как выбрать хорошее зерно?" width="110" height="110"><div class="title">Советы от&nbsp;бариста: как выбрать хорошее зерно?</div></div><div class="card"><img src="/resources/8/assets/img/coffee-5.jpg" alt="Рецепты на новогодние праздники" width="110" height="110"><div class="title">Рецепты на&nbsp;новогодние праздники</div></div></div>

Чтобы вернуть третью карточку на место, отступ справа у неё придётся убрать. Для этого удобно использовать псевдокласс.

Псевдокласс — это дополнение к обычным селекторам, которое делает их точнее. Псевдокласс добавляется к селектору c помощью двоеточия. Подробнее о псевдоклассах рассказано в части [«Селекторы. Знакомство»](/chapters/14).

Нам нужно убрать отступ справа у каждой третьей карточки. Для этого подойдёт псевдокласс `:nth-child`. Он позволяет выбрать дочерний элемент по его порядковому номеру:

```css
// Выберет второй элемент с классом item
.item:nth-child(2) { ... }

// Выберет каждый второй элемент с классом item
.item:nth-child(2n) { ... }
```

Поправим наш список. Используем селектор с псевдоклассом, чтобы убрать лишний отступ справа у каждой третьей карточки.
