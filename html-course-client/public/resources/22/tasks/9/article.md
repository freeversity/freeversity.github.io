# Именованные области грида: свойство `grid-template-areas`

Чтобы быстро описать простую сетку с помощью гридов, нужно хорошенько поорудовать свойствами `grid-row-start`/`grid-row-end` и `grid-column-start`/`grid-column-end`. Что мы и делали в предыдущих заданиях. Но получается несколько многословно, не правда ли?

Есть более быстрый способ создания сетки и заключается он в использовании свойств `grid-template-areas` и `grid-area`.

Помните игру «крестики-нолики», где мы вписываем в сетку 3 на 3 значки?

Так вот, со свойством `grid-template-areas` мы будем работать похожим образом, буквально по клеточкам визуально размечая наш будущий грид.

Приведём пример. Допустим, что мы хотим сверстать вот такой простой грид 3 на 3, который представляет из себя три столбца:

<style>
  .example-table {
    font-family: monospace;
    border-collapse: collapse;
  }

  .example-table td {
    width: 30px;
    border: 1px solid;
    text-align: center;
    height: 30px;
  }

  .example-table .red {
    background-color: red;
  }

  .example-table .yellow {
    background-color: yellow;
  }

  .example-table .green {
    background-color: green;
  }
</style>
<table class="example-table"><tbody><tr><td class="red"></td><td class="yellow"></td><td class="green"></td></tr><tr><td class="red"></td><td class="yellow"></td><td class="green"></td></tr><tr><td class="red"></td><td class="yellow"></td><td class="green"></td></tr></tbody></table>

В разметке мы имеем контейнер с тремя дочерними элементами:

```html
<div class="grid">
  <div class="grid-element-1"></div>
  <div class="grid-element-2"></div>
  <div class="grid-element-3"></div>
</div>
```

В CSS нам нужно описать области грида:

```css
grid-template-areas:
  "red yellow green"
  "red yellow green"
  "red yellow green";
```
Строки в значении свойства `grid-template-areas` — не что иное, как визуальное представление рядов грида, а значения в строках — представление столбцов.

О! Так теперь таким образом можно строить какие угодно по форме сетки? Увы, но нет, есть небольшое ограничение — область должна быть прямоугольной формы, а количество объявленных столбцов в каждой строке должно быть одинаковым.

Названия областей должны начинаться с буквы и могут включать цифры и дефис. Например, `"lava lava2 lava-3"` — валидное значение для `grid-template-areas`. Названия в строках перечисляются через один или несколько пробелов.

Разметив то, как должны располагаться области в гриде с помощью `grid-template-areas`, мы сделали половину дела. Теперь нужно связать визуальное представление с конкретными элементами в HTML. И поможет нам в этом свойство `grid-area`.

Так и запишем:

> `grid-element-1`, ты будешь соответствать области `red`, `grid-element-2`, ты будешь `yellow`, а ты, `grid-element-3` — `green`.

```css
.grid-element-1 {
  grid-area: red;
}

.grid-element-2 {
  grid-area: yellow;
}

.grid-element-3 {
  grid-area: green;
}
```

Обратим внимание, что название `grid-area` для каждого элемента должно быть уникальным. Например, если есть 6 грид-элементов, значит должно быть и 6 названий `grid-area`:

```css
grid-template-areas:
  "green   green red    yellow"
  "yellow2 red2  green2 yellow"
  "yellow2 red2  green2 yellow";
```

А дальше для каждого элемента c первого по шестой прописывается своё название `grid-area`.

Одному элементу в HTML может соответствовать только одна грид-область. Если одна грид-область задана нескольким HTML-элементам, действовать будет только одно, наиболее специфичное объявление:

```css
.grid-element-1 {
  grid-area: red; /* Грид-область назначается первому элементу */
}

.grid-element-2 {
  grid-area: red; /* Грид-область red переназначается второму элементу */
}
```

Итак, секрет, как быстро создавать несложные сетки на гридах, раскрыт. Пробуем на практике?