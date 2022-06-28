# Значение `minmax`

Мы сделали так, чтобы количество колонок в списке зависело от ширины страницы. Но если пространство по ширине не получается разделить на количество колонок без остатка, то справа остаётся много свободного места.

Чтобы от него избавиться, можно увеличить ширину колонок. Но фиксированная ширина проблему не решит — если страница ещё увеличится, то свободное пространство появится снова. Поэтому нужно, чтобы ширина колонок изменялась динамически и зависела от наличия свободного пространства.

Это можно сделать с помощью ещё одного значения-функции `minmax`. Его указывают в `repeat` вместо фиксированной ширины колонок. В скобках после `minmax` задают минимальный и максимальный размеры колонок, они разделяются запятой:

```css
repeat(auto-fit, minmax(минимальный размер, максимальный размер));
```

Код ниже позволит колонкам изменять ширину в зависимости от имеющегося в контейнере свободного пространства. При этом колонки не станут меньше `100px` и не растянутся больше, чем на `150px`:

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 150px));
}
```

В `minmax` в качестве максимального значения часто используют единицу измерения `fr`. Она позволяет колонкам увеличивать ширину до тех пор, пока свободного пространства в контейнере не хватит на ещё одну колонку.

<style>
  .wrapper {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 24% 35.5% 36.5%;
    column-gap: 2%;
    text-align: center;
    border: 1px solid #D5D8E3;
    border-radius: 4px;
    padding: 10px;
    background-color: #fff;
    color: #333333;
  }

  .title {
    grid-column: span 3;
    padding-top: 0.5em;
    padding-bottom: 1em;
    font-weight: bold;
    font-size: 1.5em;
  }

  .container {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(50px, 1fr));
    border: 1px solid #333333;
  }

  .column {
    height: 150px;
  }

  .column-1 {
    background-color: #b9e3b5;
  }

  .column-2 {
    background-color: #fed799;
  }

  .column-3 {
    background-color: #ccd9f0;
  }
</style>
<div class="wrapper"><div class="title">minmax (100px, 1fr)</div><div>width: 200px;</div><div>width: 299px;</div><div>width: 300px;</div><div class="container"><div class="column column-1"></div><div class="column column-2"></div></div><div class="container"><div class="column column-1"></div><div class="column column-2"></div></div><div class="container"><div class="column column-1"></div><div class="column column-2"></div><div class="column column-3"></div></div></div>

В шаблоне списка укажем с помощью `minmax` минимальный и максимальный размеры колонок и понаблюдаем, как перестроится список, если изменить ширину страницы. После этого посмотрим, что случится, если добавить в список карточку, чьё содержимое шире колонки.