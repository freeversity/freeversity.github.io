# Вертикальные отступы у строчных боксов

В прошлом задании мы добавили ссылкам внешние и внутренние отступы. Но внешние отступы по вертикали не появились, а внутренние вышли за пределы навигации — из-за этого фон у ссылки на текущую страницу налез на белую линию.

<style>
  .browser-view::before {
    z-index: 10;
  }
  .wrapper {
    padding: 24px 20px;
    background-color: #550a45;
    background-image: url("/resources/8/assets/img/background-small.jpg");
  }

  .navigation {
    display: grid;
    grid-template-columns: 95px 1fr;
    column-gap: 75px;
    border-bottom: 1px solid white;
    height: 22px;
  }

  .navigation-list {
    display: flex;
    justify-content: space-between;
  }

  .navigation-link {
    margin: 5px;
    padding: 15px;
    font-family: "PT Sans", "Arial", sans-serif;
    font-size: 14px;
    line-height: 14px;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    color: #ffffff;
  }

  .navigation-link.current {
    color: rgba(255, 255, 255, 0.8);
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
</style>
<div class="wrapper browser-view"><div class="navigation"><a class="logo"><img src="/resources/8/assets/img/hiking-club.svg" alt="Логотип" width="95" height="22"></a><div class="navigation-list"><div class="navigation-item"><span class="navigation-link current">Главная</span></div><div class="navigation-item"><span class="navigation-link">Маршруты</span></div><div class="navigation-item"><span class="navigation-link">Экипировка</span></div></div></div></div>

Так произошло потому, что по умолчанию ссылки имеют [строчный тип бокса](/chapters/7/1). Браузер игнорирует внешние отступы по вертикали у строчных боксов, а их внутренние отступы сверху и снизу не влияют на расположение других элементов и высоту строки.

Рассмотрим пример. Есть четыре ссылки на двух строках. Каждой ссылке заданы внутренние и внешние отступы со всех сторон и свой цвет фона:

<style>
.container {
  margin: 2em 0;
  border: 1px solid #333333;
  border-radius: 4px;
  font-size: 18px;
  background-color: #fff;
}

.container a {
  color: #3527b6 !important;
}

.link-1 {
  margin: 5px;
  padding: 10px;
  background-color: rgba(185, 227, 181, 0.5);
  outline: 1px solid green;
}

.link-2 {
  margin: 5px;
  padding: 10px;
  background-color: rgba(254, 215, 153, 0.5);
  outline: 1px solid orange;
}

.link-3 {
  margin: 5px;
  padding: 10px;
  background-color: rgba(250, 238, 221, 0.8);
  outline: 1px solid pink;
}

.link-4 {
  margin: 5px;
  padding: 10px;
  background-color: rgba(204, 217, 240, 0.5);;
  outline: 1px solid blue;
}
</style>
<div class="container"><a class="link-3">Ссылка цвета бедра испуганной нимфы</a><a class="link-2">Апельсиновая ссылка</a><br><a class="link-4">Ляпис-лазурная ссылка</a><a class="link-1">Ссылка цвета молодой листвы</a></div>

Обратите внимание, между ссылками появился горизонтальный отступ, потому что сработали внутренние и внешние отступы по горизонтали. Но при этом внешние отступы по вертикали у ссылок не появились, а внутренние отступы сверху и снизу наложились друг на друга и даже вышли за пределы контейнера. Это обычное поведение для строчных боксов.

Нам нужно, чтобы у ссылок в навигации заработали внешние отступы сверху и снизу, а внутренние отступы по вертикали не выходили за границы навигации. Самый простой способ добиться этого — изменить у ссылок тип бокса. Например, сделать ссылки блочными боксами:

```css
.element {
  display: block;
}
```

У блочных боксов работают все внешние отступы, а внутренние отступы по вертикали ведут себя так же, как и по горизонтали.

Мы уже превращали блочные боксы в грид- и флекс-контейнеры. Точно так же мы можем превращать строчные боксы в блочные и наоборот. Это не влияет на семантику тега.

Превратим ссылки в блочные боксы и убедимся, что вертикальные отступы заработали.