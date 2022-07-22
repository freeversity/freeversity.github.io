Свойство `grid-template-areas` и пустые ячейки грида

Свойство `grid-template-areas` позволяет некоторые ячейки помечать как пустые.

Для этого вместо буквенного именования области используется символ точки `.`

К примеру, возьмём код из прошлой теории, где был грид из трёх столбцов.

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

```css
grid-template-areas:
  "red yellow green"
  "red yellow green"
  "red yellow green";
```

Если мы хотим, чтобы в первом ряду осталась только последняя зелёная ячейка, то заменим `red` и `yellow` в первой строке на точки:

```css
grid-template-areas:
  ".   .      green"
  "red yellow green"
  "red yellow green";
```

Получается нужный нам результат:

<table class="example-table"><tbody><tr><td></td><td></td><td class="green"></td></tr><tr><td class="red"></td><td class="yellow"></td><td class="green"></td></tr><tr><td class="red"></td><td class="yellow"></td><td class="green"></td></tr></tbody></table>

Давайте дополним пустыми ячейками пример из прошлого задания.
