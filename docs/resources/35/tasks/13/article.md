# Изображение рамки: `border-image-source`

Мы подошли к обширной и интересной теме, в которой рамки и фоновые изображения встречаются.

Итак, семейство свойств `border-image` задаёт фоновое изображение для рамки блока. Поддержка данного семейства свойств в современных браузерах [довольно неплохая](http://caniuse.com/#feat=border-image).

Свойство `border-image-source` задаёт путь к изображению рамки. По умолчанию картинкой заполнятся только углы рамки. В следующих заданиях мы разберём, как можно управлять отображением рамки.

В качестве изображения для рамки используем вот такую картинку:

![Пример изображения для border-image](/resources/35/assets/img/border-img.png)

Синтаксис свойства такой же, как у `background-image`, то есть:

```css
border-image-source: url("image.jpg");
```

Давайте же зададим фоновое изображение рамки и начнём его настраивать.