# Свойство `grid-column`

Мы добавили в список новую карточку, содержимое которой не помещается в одну колонку. Дизайнер настаивает, что уменьшать текст и картинку нельзя. Как быть? Разрешим карточке занять две колонки.

Сделать это можно с помощью свойства `grid-column`:

```css
.element {
  grid-column: span 2;
}
```

Элемент из примера растянется на две колонки:

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

  .wide {
    grid-column: span 2;
  }
</style>
<div class="list"><div class="card">1</div><div class="card">2</div><div class="card">3</div><div class="card wide">
    4. Карточка, занимающая две колонки.
  </div><div class="card">5</div></div>

Чтобы растянуть грид-элемент, используют слово `span`, а после указывают число колонок, которые элемент должен занять:

```css
// Этот элемент растянется на три колонки
.wide-element {
  grid-column: span 3;
}

// А этот – на четыре
.very-wide-element {
  grid-column: span 4;
}
```

Нам нужно, чтобы карточка в списке заняла две колонки. Добавим ей дополнительный класс и используем свойство `grid-column`, чтобы растянуть её. Поэкспериментируем с разными значениями `span` и разной шириной страницы.