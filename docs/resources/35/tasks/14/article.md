# Изображение рамки: `border-image-slice`

Давайте разберёмся, как работает механизм «нарезки» фонового изображения для рамки.

<div style="float:right; margin-left: 20px; max-width: 300px">

![Схема работы механизма «нарезки» фонового изображения для рамки](/resources/35/assets/border-slice.jpg)
</div>

Каждая рамка имеет `9` областей: `4` угла, `4` стороны и центральную область. Для заполнения этих областей браузер должен нарезать картинку для рамки на `9` частей. Когда браузер не знает, как это сделать, он просто размещает картинку по углам — мы видели это в предыдущем задании.

Свойство `border-image-slice` задаёт отступы от краёв картинки до четырёх линий, которые «разрезают» её на части, как на схеме справа. Если эти отступы небольшие, то получается «нарезка» из `9` частей, которые затем размещаются в соответствующих областях рамки.

Но если отступы слишком большие (больше половины картинки), то браузер не может получить `9` частей и располагает то, что отрезалось по углам.

Значение свойства можно задавать числом без единицы измерения (оно обычно обозначает пиксели) или в процентах (относительно размера самой картинки). Пример:

```css
border-image-slice: 60;
border-image-slice: 10%;
```
