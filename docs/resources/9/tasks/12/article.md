# Добавляем третью колонку

Мы задали заголовку ширину больше ширины колонки. В результате заголовок выпал из контейнера и наложился на описание.

Чтобы поправить карточку, разделим её не на две колонки, а на три. При этом заголовок, описание и дисклеймер [растянем на две колонки](/chapters/8/tasks/16), а список опций — на [два ряда](/chapters/8/tasks/17).

![Макет карточки](/resources/9/assets/grid03.svg)

Придумать подходящую структуру грид-контейнера бывает непросто. Если элементы расположены асимметрично, часто требуется больше колонок, чем кажется на первый взгляд.

Итак, разделим содержимое карточки на три колонки и растянем заголовок на две колонки с помощью свойства `grid-column` и ключевого слова `span`.

```css
.element {
  grid-column: span 2;
}
```

При этом больше не нужно будет использовать свойство `width` для заголовка, так как его ширина будет ограничиваться шириной первых двух колонок.
