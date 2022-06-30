# Верстаем список с `margin`

После того, как мы добавили в список ещё две карточки и разрешили многострочность, рядов стало два. При этом на втором ряду посередине образовалась «дырка». 

<style>
  .cards-list {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 490px;
  margin: 0;
  padding: 20px;
  padding-top: 35px;
 }

.card {
  box-sizing: content-box;
  width: 110px;
  padding: 15px;
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
<div class="cards-list browser-view"><div class="card"><img src="/resources/8/assets/img/coffee-5.jpg" alt="Рецепты на новогодние праздники"><div class="title">Рецепты на&nbsp;новогодние праздники</div></div><div class="card"><img src="/resources/8/assets/img/coffee-7.jpg" alt="Руководство по альтернативным способам заварки"><div class="title">Руководство по альтернативным способам заварки</div></div></div>

Значение `space-between` заставляет первую и последнюю карточки прижиматься к границам контейнера. Но если в ряду всего две карточки, то свободного пространства между ними оказывается слишком много.

Мы не можем задать разным рядам разное выравнивание, поэтому от `space-between` придётся отказаться. Вместо него используем `flex-start`, это значение по умолчанию. В результате карточки снова прижмутся к левой границе контейнера. А чтобы добавить между ними отступы, используем `margin`.

Размеры отступов возьмём из макета:

![Макет списка карточек](/resources/8/assets/html2_6.jpg)

Изменим значение `justify-content`, а после добавим карточкам внешний отступ справа, чтобы разделить их по горизонтали. Затем разделим их по вертикали, задав внешний отступ снизу.

```html
.element {
  margin-right: 20px;
  margin-bottom: 10px;
}
```