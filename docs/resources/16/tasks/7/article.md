# Свойство `background`
Фон элемента можно задавать с помощью отдельных свойств: `background-color`, `background-image` и так далее. Получается довольно громоздкая запись.

Также задать фон можно с помощью сокращенного свойства `background`, в котором через пробел перечисляются его компоненты:

```css
background: [bc] [bi] [br] [bp] [ba];
/* Обозначения:
[bc] — background-color
[bi] — background-image
[br] — background-repeat
[bp] — background-position
[ba] — background-attachment
*/
```

Если какой-то компонент не указан, то берется значение по умолчанию. Ниже примеры.

```css
background: #e74c3c;
background: url("img.png") no-repeat;
background: url("img.png") 10px 20px;
```

В первом примере просто задан цвет фона.

Во втором примере задано не повторяющееся фоновое изображение, а также по умолчанию прозрачный цвет фона, расположение в левом верхнем углу.

В третьем примере задано фоновое изображение и его расположение, а также по умолчанию прозрачный цвет фона и режим повторения во все стороны.
