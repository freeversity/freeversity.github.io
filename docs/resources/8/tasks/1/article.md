# Что такое микросетки?

В [предыдущей части](/chapters/7) мы научилиcь управлять потоком документа и верстать крупные сеточные элементы. В этой части мы займёмся мелкими сетками, их ещё называют микросетками. Учиться верстать микросетки будем на примере _компонентов_, или блоков, которые часто встречаются на сайтах: навигации и списка карточек.

В отличие от крупных сеток, микросетки меньше зависят от макета и больше — от содержимого.

Для начала сверстаем блок навигации, состоящий из логотипа и списка ссылок. Ссылка на текущую страницу должна отличаться от остальных. Предположим, что мы верстаем навигацию для главной страницы сайта:

![Макет навигации](/resources/8/assets/html2_1.jpg)

Содержимое навигации нужно расположить в две колонки и добавить отступ между ними. Левая колонка должна иметь фиксированный размер, а правая занять всё оставшееся пространство.

Для создания подобной сетки удобно использовать гриды. Эта технология позволяет легко создавать как фиксированные, так и тянущиеся колонки, а также управлять отступами между ними.

![Макет навигации](/resources/8/assets/html2_2.jpg)

В прошлой части мы разбирали, как изменять [тип бокса](/chapters/7/tasks/4), описывать [шаблон грид-контейнера](/chapters/7/tasks/5), работать со [свободным пространством](/chapters/7/tasks/8) и задавать отступы между [колонками](/chapters/7/tasks/9). Эти навыки пригодятся нам, чтобы сверстать сетку навигации.

```css
.grid-container {
  display: grid;
  grid-template-columns: 1fr 50px;
  column-gap: 5px;
}
```

Первым делом для наглядности подключим стилевой файл с подсветкой боксов.

После сделаем элемент с классом `navigation` грид-контейнером и разделим его содержимое на две колонки с помощью свойства `grid-template-columns`. Затем используем свойство `column-gap`, чтобы добавить отступ между колонками.