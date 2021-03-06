# Перемещение по вертикали

Теперь давайте попробуем перемещать объекты по вертикали.

Для этого воспользуемся похожей на «горизонтальную» функцией `translateY`:

```css
transform: translateY(-100px)
```

Такая функция переместит объект на 100 пикселей вертикально вверх. Заметьте, что для движения вверх используется отрицательное значение трансформации.

Как вы уже увидели в предыдущем задании, к объекту может быть одновременно применено несколько функций трансформации. При этом функции просто перечисляются через пробел после имени свойства `transform`, например:

```css
transform: translateY(-100px) translateX(100px)
```

Такая трансформация переместит объект на `100` пикселей вправо и вверх по оси координат.

Давайте попробуем перенести мага по воздуху с помощью функций горизонтальных и вертикальных перемещений.

И конечно же надо не забыть прочитать заклинание левитации, чтобы волшебник мог лететь!