# Свойство `grid-template-columns`, шаблон грид-контейнера

Нам нужно расположить логотип и заголовок в шапке в две колонки. Мы сделали шапку грид-контейнером, однако нескольких колонок не появилось. Всё потому, что по умолчанию грид-контейнер одноколоночный.

Чтобы это изменить, нужно описать _шаблон_ грид-контейнера. Для этого используют свойство `grid-template-columns`:

```css
.grid-container {
  display: grid;
  grid-template-columns: 100px 150px 80px;
}
```

Код в примере разобьёт содержимое грид-контейнера на три колонки шириной `100`, `150` и `80` пикселей. Грид-элементы автоматически распределятся по колонками слева направо.

В шапке нам нужно получить две колонки шириной `210` и `200` пикселей:

![Макет шапки](/resources/7/assets/food_scr2.svg)

Потренируемся использовать свойство `grid-template-columns`, а после разделим содержимое шапки на колонки правильного размера.

> **_BTW:_**
> Существуют и другие свойства для описания шаблона грид-контейнера. Например, `grid-template-rows` и `grid-template-areas`. О них подробно рассказано в [этой части](/chapters/22).