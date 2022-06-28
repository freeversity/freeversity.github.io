# Значение `auto-fit`

В прошлом задании мы использовали `repeat`, чтобы создать несколько колонок. Их количество было фиксированным: какое число указано в скобках, на столько колонок и разделялось содержимое контейнера. Но нам нужно сделать так, чтобы количество колонок зависело от ширины окна.

Для этого используем специальное значение `auto-fit`. Его пишут в скобках после `repeat` вместо числа колонок:

```css
grid-template-columns: repeat(auto-fit, ширина колонки);
```

Значение `auto-fit` указывает, что колонок должно быть столько, сколько может поместиться в грид-контейнере.

```css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, 100px);
}
```

Код в примере разделит контейнер на колонки шириной `100px`.

<style>
  .wrapper {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 20% 30% 40%;
    column-gap: 5%;
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

  .column-4 {
    background-color: #f0cce7;
  }
</style>
<div class="wrapper"><div class="title">repeat (auto-fit, 100px)</div><div>width: 200px;</div><div>width: 300px;</div><div>width: 400px;</div><div class="container"><div class="column column-1"></div><div class="column column-2"></div></div><div class="container"><div class="column column-1"></div><div class="column column-2"></div><div class="column column-3"></div></div><div class="container"><div class="column column-1"></div><div class="column column-2"></div><div class="column column-3"></div><div class="column column-4"></div></div></div>

Доработаем наш список карточек. Заменим фиксированное количество колонок на значение `auto-fit`. После этого изменим ширину `<body>` и посмотрим, как будет перестраиваться список.