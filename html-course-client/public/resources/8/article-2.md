# Конспект «Микросетки. Начало». Раздел 2

## Список на флексах

Свойство `justify-content` со значением `space-between` заставляет первый и последний элемент прижиматься к границам контейнера. Но если в ряду всего два элемента, то свободного пространства между ними может оказаться слишком много. В этом случае лучше использовать `margin`.

Чтобы убрать лишний отступ у последнего элемента в ряду, используют псевдокласс `:nth-child`. Он позволяет выбрать дочерний элемент по его порядковому номеру:

```css
// Выберет второй элемент с классом item
.item:nth-child(2) { ... }

// Выберет каждый второй элемент с классом item
.item:nth-child(2n) { ... }
```

Если не известно, какой элемент окажется в ряду последним, этот способ не сработает.

## `repeat`

Если все колонки в грид-контейнере должны быть одинаковой ширины, то удобно использовать значение-функцию `repeat`. В скобках после `repeat` указывают количество колонок и их ширину. Значения разделяют запятой:

```css
grid-template-columns: repeat(количество колонок, ширина колонки);
```

## `auto-fit`

Если количество колонок зависит от ширины контейнера, используют специальное значение `auto-fit`. Его указывают в скобках после `repeat` вместо числа колонок:

```css
grid-template-columns: repeat(auto-fit, ширина колонки);
```

<style>
  .wrapper-1 {
    max-width: 600px;
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

  .wrapper-1 .column {
    height: 120px;
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
<div class="wrapper-1"><div class="title">repeat (auto-fit, 100px)</div><div>width: 200px;</div><div>width: 300px;</div><div>width: 400px;</div><div class="container"><div class="column column-1"></div><div class="column column-2"></div></div><div class="container"><div class="column column-1"></div><div class="column column-2"></div><div class="column column-3"></div></div><div class="container"><div class="column column-1"></div><div class="column column-2"></div><div class="column column-3"></div><div class="column column-4"></div></div></div>

## `minmax`

Чтобы ширина колонок изменялась пропорционально свободному пространству в контейнере, используют значение-функцию `minmax`.

Его указывают в `repeat` вместо фиксированной ширины колонок. В скобках после `minmax` задают минимальный и максимальный размеры колонок, они разделяются запятой:

```css
repeat(auto-fit, minmax(минимальный размер, максимальный размер));
```

В `minmax` в качестве максимального значения часто используют единицу измерения `fr`. Она позволяет колонкам увеличивать ширину до тех пор, пока свободного пространства в контейнере не хватит на ещё одну колонку.

<style>
  .wrapper-2 {
    max-width: 600px;
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

  .wrapper-2 .column {
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
<div class="wrapper-2"><div class="title">minmax (100px, 1fr)</div><div>width: 200px;</div><div>width: 299px;</div><div>width: 300px;</div><div class="container"><div class="column column-1"></div><div class="column column-2"></div></div><div class="container"><div class="column column-1"></div><div class="column column-2"></div></div><div class="container"><div class="column column-1"></div><div class="column column-2"></div><div class="column column-3"></div></div></div>

# Свойства `grid-column` и `grid-row`

Чтобы растянуть элемент на несколько колонок используют свойство `grid-column`. Число после ключевого слова span указывает число колонок, которые элемент должен занять:

```css
.element {
  grid-column: span 2;
}
```

Растянуть элемент на несколько рядов можно с помощью свойства `grid-row`. Ключевое слово `span` в нём означает количество рядов, которые элемент должен занять:

```css
.long-element {
  grid-row: span 2;
}
```

Свойства grid-column и grid-row можно использовать одновременно.

## Свойство `grid-auto-flow`

Свойство `grid-auto-flow` управляет автозаполнением грид-контейнера.

```css
.grid-container {
  display: grid;
  grid-auto-flow: row;
}
```

Значение по умолчанию `row` говорит располагать элементы в том порядке, в котором они идут в разметке, и при необходимости создавать новые ряды:

<style>
  .list {
    max-width: 600px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
    border: 1px solid #D5D8E3;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 1em;
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
<div class="list"><div class="card">1</div><div class="card">2</div><div class="card wide">
    3. Карточка, занимающая две колонки.
  </div><div class="card">4</div><div class="card">5</div></div>

Но если указать значение `dense`, то контейнер будет заполняться так, чтобы не было пропусков:

<style>
  .list-2 {
    max-width: 600px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-auto-flow: dense;
    gap: 10px;
    border: 1px solid #D5D8E3;
    border-radius: 4px;
    padding: 10px;
    margin-bottom: 1em;
  }
</style>
<div class="list-2"><div class="card">1</div><div class="card">2</div><div class="card wide">
    3. Карточка, занимающая две колонки.
  </div><div class="card">4</div><div class="card">5</div></div>

Значение `dense` заставляет грид-контейнер заполнять пустые ячейки первым подходящим по размеру грид-элементом. При этом визуальный порядок на странице может отличаться от порядка элементов в разметке. Если порядок элементов важен, лучше это значение не использовать.