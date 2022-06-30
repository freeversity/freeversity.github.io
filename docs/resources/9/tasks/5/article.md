# Свойство `order`, порядок элементов

Мы превратили карточки во флекс-контейнеры и сделали так, чтобы элементы выстроились сверху вниз. Теперь мы можем поменять местами заголовок и картинку, как того требует макет.

![Макет карточек](/resources/9/assets/flex05.jpg)

Чтобы изменить визуальный порядок элементов, удобно использовать свойство `order`. В качестве значения свойство принимает число, причём оно может быть как положительным, так и отрицательным. По умолчанию у всех элементов свойство `order` равно нулю.

```css
.element {
  order: 5;
}
```

Элементы выстраиваются от меньшего значения `order` к большему. Если у нескольких элементов одинаковое значение, используется их порядок в разметке.

Рассмотрим пример. Есть четыре разноцветных блока:

<style>
  .container,
  .container-2  {
    padding: 20px;
    display: flex;
    width: max-content;
    border: 1px solid #aaaaaa;
    border-radius: 4px;
  }

  .card {
    margin-right: 20px;
    padding: 20px 30px;
    font-size: 18px;
    line-height: 24px;
    color: #333333;
  }

  .card:last-child {
    margin-right: 0;
  }

  .green {
    background-color: #b9e3b5;
  }

  .orange {
    background-color: #fed799;
  }

  .blue {
    background-color: #ccd9f0;
  }

  .pink {
    background-color: #f0cce7;
  }
  </style>
  <div class="container"><div class="card green">1. green</div><div class="card orange">2. orange</div><div class="card blue">3. blue</div><div class="card pink">4. pink</div></div>

Используем `order`, чтобы изменить их порядок:

```css
.green {
  order: 1;
}

.orange {
  order: 0;
}

.blue {
  order: -1;
}

.pink {
  order: 0;
}
```

В результате блоки выстроятся в таком порядке:

<style>
  .container-2 .green {
    order: 1;
    margin-right: 0;
  }

  .container-2 .orange {
    order: 0;
  }

  .container-2 .blue {
    order: -1;
  }

  .container-2 .pink {
    order: 0;
    margin-right: 20px !important;
  }
  </style>
  <div class="container-2"><div class="card green">1. green</div><div class="card orange">2. orange</div><div class="card blue">3. blue</div><div class="card pink">4. pink</div></div>

Первым оказался синий блок, потому что у него самое маленькое значение `order`. Следующее по возрастанию значение у оранжевого и розового блоков, но в разметке оранжевый идёт раньше. Самое большое значение `order` у зелёного блока, поэтому он отобразился последним.

Нам нужно сделать картинку первым элементом в карточке. По умолчанию у всех элементов значение `order` равно нулю. Поэтому самый простой способ сделать картинку первым элементом — задать ей значение `order` меньше нуля. Это может быть любое отрицательное число, но для простоты используем `-1`.

Потренируемся задавать разные значения `order`, чтобы понять, как работает это свойство. А затем поменяем местами заголовок и картинку.

> ***BTW:***
> Свойство `order` меняет порядок только внутри родительского контейнера. То есть переместить элемент из шапки в подвал с его помощью не получится.