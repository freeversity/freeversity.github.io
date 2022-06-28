# Свойство `flex-wrap`

Мы сверстали навигацию как на макете, после чего добавили в список ещё три элемента. Места им не хватило, и на странице появилась горизонтальная полоса прокрутки. Кроме того, последние элементы списка вылезли за границы навигации — такое поведение называют _выпадением элементов_. Также говорят, что произошло _переполнение_.

<style>
.wrapper {
  width: 505px;
  padding: 0;
  padding-top: 24px;
  padding-bottom: 15px;
  background-color: #550a45;
  background-image: url("/resources/8/assets/img/background-small.jpg");
  background-repeat: no-repeat;
  background-position: -610px 0;
  overflow: auto;
}

.navigation {
  width: 220px;
  border-bottom: 1px solid white;
}

.navigation-list {
  display: flex;
}

.navigation-link {
  display: block;
  margin: 5px;
  padding: 15px;
}

.navigation-link {
  font-family: "PT Sans", "Arial", sans-serif;
  font-size: 14px;
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
<div class="wrapper browser-view"><div class="navigation"><div class="navigation-list"><div class="navigation-item"><span class="navigation-link">Экипировка</span></div><div class="navigation-item"><span class="navigation-link">Инструкторы</span></div><div class="navigation-item"><span class="navigation-link extra">Попутчики</span></div><div class="navigation-item"><span class="navigation-link extra">Контакты</span></div></div></div></div>

Чаще всего элементы выпадают, если верстальщик не учитывает, что содержимое страницы может измениться. Когда мы верстали крупные сетки, то могли быть уверены, что на странице не появится вторая шапка или подвал. Но количество мелких сеточных элементов, например ссылок в навигации, будет меняться почти наверняка. Это нужно предусмотреть.

На нашей странице элементам списка не хватило места по ширине. Они не перенеслись на новую строку, потому что по умолчанию флекс-контейнер однострочный. Чтобы элементы не выпадали из контейнера, нужно сделать его многострочным.

Для этого используют свойство `flex-wrap`. Значение по умолчанию `nowrap` запрещает перенос, но если изменить его на `wrap`, флекс-элементы начнут переноситься.

```css
.flex-container {
  display: flex;
  flex-wrap: wrap;
}
```

Добавим списку `navigation-list` свойство `flex-wrap` со значением wrap и убедимся, что элементы списка не будут вываливаться, а вместо этого перенесутся на новую строку.

После этого уберём подсветку боксов.