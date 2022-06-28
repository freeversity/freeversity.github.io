# Свойство `grid-row`

Мы заставили карточку растянуться на несколько колонок. Дизайнеру идея понравилась, и он решил ни в чём себя не ограничивать. Так в списке появилась карточка, которой требуется две колонки _и два ряда_. Она уже добавлена в разметку, осталось только написать правильные стили.

Растянуть элемент на несколько рядов можно с помощью свойства `grid-row`. Ключевое слово `span` в нём работает так же, как в `grid-column`, только означает не количество колонок, которые элемент должен занять, а количество рядов:

```css
.long-element {
  grid-row: span 2;
}
```

Элемент из примера растянется на два ряда:

<style>
  .list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    border: 1px solid #D5D8E3;
    border-radius: 4px;
    padding: 10px;
  }

  .card {
    box-sizing: border-box;
    padding: 10px;
    text-align: center;
    font-size: 16px;
    color: #333333;
    background-color: #b9e3b5;
  }

  .long {
    grid-row: span 2;
  }
</style>
<div class="list"><div class="card">1</div><div class="card">2</div><div class="card long">
    3<br>Карточка, занимающая два ряда.
  </div><div class="card">4</div><div class="card">5</div></div>

Свойства `grid-column` и `grid-row` можно использовать одновременно. Например, такой код заставит элемент занять три колонки и два ряда:

```css
.element {
  grid-column: span 3;
  grid-row: span 2;
}
```

Карточка, которая в два раза шире и выше других, имеет класс `huge`. Скажем ей растянуться на два ряда и две колонки.