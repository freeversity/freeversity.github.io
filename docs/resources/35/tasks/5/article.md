# Обрезка фона

Свойство `background-clip` управляет тем, как обрезается фон. Причём обрезаются не только фоновые изображения, но и фоновый цвет.

Значения свойства такие же, как у `background-origin`: `padding-box`, `border-box` и `content-box`.

![Схематичное отображение значений свойства background-clip](/resources/35/assets/box-sizing.jpg)

Значение `border-box` задано по умолчанию, при этом фоновое изображение совсем не обрезается.

Значение `padding-box` обрежет фон по внутреннему краю области рамки.

Значение `content-box` обрежет фон по краю области содержимого.