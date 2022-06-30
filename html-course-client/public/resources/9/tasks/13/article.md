# Используем грид-области

Мы разделили карточку на три колонки и растянули заголовок. Вышло неплохо, но элементы всё равно выстроились не так, как на макете: описание тарифа попало в третью, самую узкую, колонку и выпало из контейнера.

Тариф «Бесконечный разговор» с дополнительным пакетом СМС
Тариф для тех, кто действительно любит общение.

<style>
.wrapper {
  padding: 20px;
  padding-top: 45px;
  width: fit-content;
  background-color: #3D458F;
}
.card {
  word-wrap: normal;
  padding: 20px;
  font-family: "PT Sans", "Arial", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  background-color: #3D458F;
  color: #ffffff;
  background-color: #5A66D8;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.25);
  border-radius: 10px;
  box-sizing: content-box;
  width: 540px;
  display: grid;
  grid-template-columns: 260px 165px 75px;
  gap: 20px;
}

.title {
  margin: 0 !important;
  font-weight: 700;
  font-size: 25px;
  line-height: 36px;
}

.options-list {
  margin: 0;
  padding: 20px;
  font-size: 16px;
  line-height: 25px;
  list-style: none;
  background-color: #4553D3;;
  border-radius: 8px;
}

.options-item {
  margin-bottom: 8px;
  padding-left: 30px;
  position: relative;
}

.options-item::before {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  top: 4px;
  left: 0;
  background-image: url('/assets/courses/367/img/tick.svg');
}

.disclaimer {
  font-style: italic;
  font-size: 14px;
  line-height: 20px;
  color: #AEB4EA;
}

.description p {
  margin-top: 0;
  margin-bottom: 4px;
  font-size: 16px;
  line-height: 25px;
}

.price {
  padding: 5px 15px;
  font-size: 20px;
  line-height: 30px;
  font-weight: 700;
  background-image: linear-gradient(180deg, #FDB52B 0%, #F7752C 100%);
  border-radius: 5px;
  text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.25);
}

.title {
  grid-column: span 2;
}
</style>
<div class="wrapper browser-view"><article class="card"><h2 class="title">Тариф «Бесконечный разговор» с&nbsp;дополнительным пакетом СМС</h2><div class="description"><p>Тариф для тех, кто действительно любит общение.</p></div><div class="options-list"><div class="options-item">Безлимитные звонки.</div><div class="options-item">Безлимитные соцсети.</div><div class="options-item">Безлимитные мессенджеры.</div><div class="options-item">600 СМС в&nbsp;день.</div></div><div class="price">999₽</div><div class="disclaimer">Не&nbsp;является публичной офертой.</div></article></div>

Чтобы поправить карточку, нужно изменить [визуальный порядок](/chapters/9/tasks/5) элементов. Мы уже знакомы со свойством `order`, но в данном случае удобнее будет не переставлять отдельные элементы, а описать шаблон карточки целиком, используя _грид-области_.

Грид-областью называют часть сетки грид-контейнера, у которой может быть имя. Имя области придумывает сам разработчик. Оно должно начинаться с буквы и может включать цифры, дефис и знак подчёркивания. Например: `header`, `section-2`, `user_avatar`. Следует выбирать такие имена, которые описывают содержимое области.

Используем грид-области, чтобы разместить элементы как на макете. Пойдём по порядку и сначала создадим грид-области для заголовка и блока с ценой. Им подойдут имена `title` и `price`.

![Макет карточки](/resources/9/assets/grid04.svg)

Чтобы описать структуру грида с помощью областей, используют свойство `grid-template-areas`. В нём указывают имена грид-областей. При этом каждый ряд оборачивают в кавычки, а колонки разделяют пробелом. Если требуется растянуть область на несколько колонок, её имя повторяют нужное число раз.

Нам нужно растянуть заголовок на две колонки и переместить блок с ценой в первый ряд:

```css
.card {
  display: grid;
  grid-template-columns: 260px 165px 75px;
  grid-template-areas: "title title price";
}
```

Однако просто описать шаблон недостаточно, ведь браузер не знает, какие элементы мы имеем в виду. Чтобы связать имя области с соответствующим грид-элементом, используют свойство `grid-area`. Обратите внимание, в `grid-area` кавычки не нужны!

```css
.title {
  grid-area: title;
}

.price {
  grid-area: price;
}
```

Этот код свяжет заголовок с областью `title`, а блок с ценой — с областью `price`. В результате оба элемента расположатся так, как описано в `grid-template-areas`, невзирая на их порядок в разметке.

Итак, опишем первый ряд карточки с помощью `grid-template-areas`, а после назначим подходящие имена заголовку и блоку с ценой. Заодно убедимся, что растягивать заголовок с помощью `grid-column` больше не нужно.

> ***BTW:***
> 
> Имя области не обязано совпадать с селектором, но должно описывать содержимое элемента:
>
> ```css
> h1 {
>   grid-area: title;
> }
> ```
> 
> Элементы, которым не задано имя области, выстраиваются по сетке, как обычно.# 