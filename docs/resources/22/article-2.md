# Конспект «Гриды: создание раскладки». Раздел 2

Чтобы задать гриду определённое количество столбцов и рядов, существуют свойства `grid-template-columns` и `grid-template-rows`.

Свойство `grid-template-columns` перечисляет количество и ширину будущих столбцов грида:

```css
/*
Задаём гриду три столбца,
первый шириной 100px,
второй шириной 200px,
третий — 300px.
*/

.element {
  grid-template-columns: 100px 200px 300px;
}
```

Аналогично `grid-template-columns` работает и свойство `grid-template-rows`, только оно сообщает гриду, сколько рядов он будет содержать и какой они будут высоты:

```css
/*
Задаём гриду три ряда,
первый высотой 100px,
второй высотой 200px,
третий — 300px.
*/

.element {
  grid-template-rows: 100px 200px 300px;
}
```

Также есть возможность задавать нефиксированный размер ячейкам. Для этого существует значение `auto`:

```css
/*
Задаём гриду два столбца,
первый с нефиксированной шириной,
второй шириной 100px.
*/

.element {
  grid-template-columns: auto 100px;
}

/*
Задаём гриду три ряда,
первый высотой 100px,
второй с нефиксированной высотой,
третий высотой 200px.
*/

.element {
  grid-template-rows: 100px auto 200px;
}
```

При заданных свойствах `grid-template-columns` и `grid-template-rows` грид-элементы вписываются в заданную сетку автоматически. При этом часть грид-элементов также может иметь чёткие координаты в гриде. Комбинируя задание явного расположения грид-элементов и их автоматическое распределение, можно строить сложные и одновременно гибкие сетки.

Ещё один механизм создания раскладки грида заключается в использовании свойств `grid-template-areas` и `grid-area`. В значении свойства `grid-template-areas` визуально «по клеточкам» описывается структура грида.

Пример:

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

HTML:

```html
<div class="grid-container">
  <div class="grid-element-1"></div>
  <div class="grid-element-2"></div>
  <div class="grid-element-3"></div>
</div>
```

CSS:

```css
.grid-container {
  grid-template-areas:
    "red yellow green"
    "red yellow green"
    "red yellow green";
}

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

Свойство `grid-template-areas` позволяет некоторые ячейки грида помечать как пустые. Для этого вместо буквенного именования области используется символ точки `.`

<table class="example-table"><tbody><tr><td></td><td></td><td class="green"></td></tr><tr><td class="red"></td><td class="yellow"></td><td class="green"></td></tr><tr><td class="red"></td><td class="yellow"></td><td class="green"></td></tr></tbody></table>

```css
.grid-container {
  grid-template-areas:
    ".   .      green"
    "red yellow green"
    "red yellow green";
}
```

Свойство `gap` позволяет добавлять равномерный интервал между рядами и столбцами. Чтобы добавить интервал только между рядами, используется свойство `row-gap`, а только между столбцами — `column-gap`.

```css
.grid-container {
  gap: 10px; /* Между рядами и столбцами интервал 10px */
  column-gap: 20px;  /* Между столбцами интервал 20px */
  row-gap: 30px;  /* Между рядами интервал 30px */
}
```
