# Свойство `flex-direction`, направление главной оси

Список готов. Перейдём к сеточным стилям самих карточек.

![Макет карточек](/resources/9/assets/flex05.jpg)

Обратите внимание на порядок элементов внутри карточек. На макете первым идёт изображение, а следом за ним заголовок. В разметке же наоборот:

```html
<li class="card current">
  <h3 class="title">Лайм</h3>
  <img class="image" src="img/lime.jpg" alt="Лайм">
  <p class="description">Добавит кислинку и уникальный аромат.</p>
  <a class="add-link" href="#">+ Добавить</a>
</li>
```

Изменять порядок элементов в разметке нежелательно — с точки зрения семантики, первым должен идти заголовок раздела, а уже потом все относящиеся к нему элементы. Как быть? Изменим **визуальный порядок** элементов!

Управлять визуальным порядком элементов удобно с помощью свойства `order`. Но это свойство работает только в грид- и флекс-контейнерах, а наши карточки — это элементы `<li>`, у которых блочный тип. Чтобы свойство `order` заработало, тип бокса у карточек придётся изменить. Что выбрать: грид или флекс? Подойдут оба, но у флексбокса лучше [браузерная поддержка](https://caniuse.com/flexbox), поэтому используем его.

Однако если мы просто сделаем карточки флекс-контейнерами, элементы внутри выстроятся в ряд, и вёрстка сломается. Чтобы сохранить направление потока сверху вниз, придётся повернуть [главную ось](/chapters/7/tasks/12) флекс-контейнера.

![Схема осей флекса](/resources/9/assets/flex_scheme1.svg)

За направление главной оси отвечает свойство `flex-direction`. По умолчанию у него значение `row` (ряд), но его можно изменить на `column` (колонка):

```css
.card {
  display: flex;
  flex-direction: column;
}
```

В этом случае главная ось будет направлена сверху вниз, а поперечная — слева направо. В результате флекс-элементы внутри карточек выстроятся сверху вниз.

![Схема повёрнутых осей флекса](/resources/9/assets/flex_scheme2.svg)

Нам нужно, не меняя разметку, поменять местами картинку и заголовок в каждой карточке. Для этого сначала сделаем карточки флекс-контейнерами и повернём главную ось, а в следующем задании займёмся визуальным порядком элементов.