# Отличие `box-shadow` и `drop-shadow`

Фильтр тени имеет преимущества перед свойством `box-shadow`.

Во-первых, при отрисовке в браузере фильтра `drop-shadow `используется аппаратное ускорение, что улучшает производительность. А дополнительного ускорения при использовании свойства `box-shadow` в браузере нет.

Во-вторых, фильтр `drop-shadow` применяется к непрозрачному контуру картинок, а прозрачные области игнорируются, в то время как `box-shadow` задает прямоугольную тень по границе всего изображения.

На примере полупрозрачной PNG-картинки можно оценить, как работают эти два свойства. Но стоит задать такой картинке непрозрачный фон, как поведение фильтра изменится.

Нужно заметить, что фильтры пришли в CSS из SVG, поэтому `drop-shadow` и `box-shadow` различаются в реализации. То есть с одними и теми же параметрами тени будут выглядеть по-разному.

Давайте сравним эффекты теней на примере.