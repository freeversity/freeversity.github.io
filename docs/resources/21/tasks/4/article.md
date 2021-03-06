# Направление главной оси и внешние отступы

Будет ли результат таким, как на картинке снизу, если повернуть главную ось в [предыдущем задании](/chapters/21/tasks/3)?

![До](/resources/21/assets/theory-1.png)
![После](/resources/21/assets/theory-2.png)

Нет, не будет!

Дело в том, что «старые нефлексовые» свойства, такие как отступы или размеры, ничего не знают про направление осей. Они «мыслят по-старому», понятиями «верх» и «низ», «право» и «лево».

Поэтому когда главная ось направлена слева направо, горизонтальные отступы перемещают флекс-элементы вдоль _главной_ оси. Но если направить главную ось сверху вниз, то те же отступы начнут работать вдоль _поперечной_ оси.

То же относится и к вертикальным отступам.

Давайте повернём ось, а затем внесём правки и получим результат, как на картинке выше.