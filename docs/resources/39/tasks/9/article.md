# Направление анимации: `animation-direction`, шаг 1

Помимо количества проигрываний анимации, мы можем определить её направление с помощью свойства `animation-direction`. По умолчанию анимация имеет прямое направление `normal`.

Но можно назначить и обратный порядок анимации, чтобы проигрывание начиналось с конца и шло к началу (то есть за начальную точку считался кадр `to`, а за конечную — `from`). Для этого используется значение `reverse` свойства `animation-direction`.

Попробуем сравнить два направления анимации на примере.