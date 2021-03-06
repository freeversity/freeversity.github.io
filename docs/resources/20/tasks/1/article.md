# Свойство `display: flex`, `flex`-элемент

Флексбокс — это первый CSS-механизм, предназначенный для построения сеток и создания сложных раскладок блоков.

Другие механизмы, с помощью которых мы раньше строили сетки, задумывались совсем не для этого: плавающие блоки нужны для создания блоков, которые текст должен обтекать, а таблицы используются для разметки табличных данных.

Флексбокс задумывался для создания «гибких» раскладок и хранит много тонкостей и чудес, о которых мы поговорим в этой серии частей. А пока начнём с простого. Как включить флексбокс?

Очень просто: нужно задать элементу свойство `display: flex;`. После этого происходит два события:

1. Элемент с `display: flex;` превращается во _«флекс-контейнер»_ и внутри него начинает происходить вся магия гибкой раскладки.
2. Непосредственные потомки этого элемента превращаются во _«флекс-элементы»_ и начинают играть по новым правилам.

Первое, что вы заметите после выполнения этого задания, это то, что блоки растянутся на всю высоту контейнера. Да, внутри флексбокса можно делать элементы одинаковой высоты!

Поэкспериментируем!

> ***BTW:***
> 
> На момент написания части [поддержка флексбокса](http://caniuse.com/#feat=flexbox) в современных браузерах довольно хорошая, что позволяет сейчас с уверенностью его использовать.