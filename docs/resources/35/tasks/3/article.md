# Размер фона, шаг 2

Ещё два значения свойства `background-size` — это `contain` и `cover`.

Значение `contain` работает так:

- пропорции изображения сохраняются;
- изображению задаются максимально возможные размеры, при которых оно и по ширине, и по высоте полностью помещается в границы фона;
- изображение может не закрывать всю фоновую область блока, если пропорции изображения и блока разные.

Значение `cover` работает иначе:

- пропорции изображения сохраняются;
- изображению задаются минимально возможные размеры, при которых оно закроет всю фоновую область блока;
- если пропорции изображения и блока разные, то часть изображения обрезается.

Опробуем эти значения на практике.