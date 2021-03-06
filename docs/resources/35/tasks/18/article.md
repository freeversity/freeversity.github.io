# Изображение рамки: `border-image-width`

Следующее свойство, которое мы рассмотрим — `border-image-width`.

У блока должна существовать рамка определённой толщины `border-width`, тогда ему можно задать и фоновую картинку для рамки. Область, в которой будет отображаться эта картинка по умолчанию равна ширине рамки.

Свойство `border-image-width` позволяет управлять шириной видимой области рамки-картинки, масштабировать её. Саму ширину рамки это свойство не меняет.

Если значение этого свойства больше `border-width`, картинка рамки заползёт под содержимое, даже если не задано свойство `fill`.

Ширина рамки-картинки задаётся в `%`, `px`, `em` или других единицах измерения. Также возможно значение `auto`, при котором ширина зависит от значения `border-image-slice`.

Можно задавать разную ширину сторон. В этом случае значения перечисляются аналогично `margin`, `padding` в последовательности: верхнее, правое, нижнее, левое. Например:

```css
border-image-width: 10px 20px 30px 40px;
border-image-width: 10px 50px;
```

Попробуем поуправлять шириной рамки-картинки.