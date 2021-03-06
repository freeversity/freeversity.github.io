# Свойство `justify-content`, выравнивание по главной оси

Мы задали ширину и внутренние отступы колонкам. Их суммарный размер оказался меньше ширины родительского контейнера, и справа осталось свободное место.

На макете колонки прижаты к противоположным краям, а свободное пространство сосредоточено между ними:

![Макет основного содержимого](/resources/7/assets/port_scr5.svg)

Чтобы прижать колонки к краям родительского контейнера, используем свойство `justify-content`. Это свойство флекс-контейнера, которое говорит, как расположить флекс-элементы на главной оси.

У него может быть несколько значений:

- `flex-start` — флекс-элементы располагаются в начале главной оси (по умолчанию — слева);
- `flex-end` — флекс-элементы располагаются в конце главной оси (по умолчанию — справа);
- `center` — флекс-элементы располагаются в центре главной оси;
- `space-around` — свободное пространство распределяется вокруг флекс-элементов;
- `space-between` — свободное пространство распределяется между флекс-элементами, при этом первый и последний элемент прижимаются к краям флекс-контейнера.

Добавим `<main>` свойство `justify-content` и поэкспериментируем со значениями.