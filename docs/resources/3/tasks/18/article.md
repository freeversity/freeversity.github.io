# Теги `del` и `ins`, выделение изменений

Списки дел на то и нужны, чтобы вычёркивать выполненные дела и иногда добавлять новые. У вас также назрела необходимость обновить список дел, но так, чтобы было видно, какие дела завершены, а какие добавлены. Как сделать разметку такой истории изменений?

Как раз для описания изменений предназначены теги `<del>` (сокращение от «delete») и `<ins>` (сокращение от «insert»).

Тег `<del>` выделяет текст, который был удалён в новой версии документа. В браузере этот текст перечёркивается.

Тег `<ins>` выделяет текст, который был добавлен в новой версии документа. В браузере этот текст подчёркивается.

Оба тега имеют атрибут `datetime`, в котором можно указать дату и время, когда была внесена та или иная правка.

Простейшим примером применения этих тегов может служить список дел. Когда дело выполнено, его помечают тегом `<del>`, а если появилось новое дело, то его добавляют в список и помечают тегом `<ins>`.

```html
<ul>
  <li>Почистить посудомоечную машину</li>
  <li><del datetime="2009-10-11T01:25-07:00">Погулять</del></li>
  <li><del datetime="2009-10-10T23:38-07:00">Поспать</del></li>
  <li><ins>Купить принтер</ins></li>
</ul>
```

> **_BTW:_**
> Атрибут `datetime` предназначен не для людей, а для компьютеров, поэтому дату и время там пишут в стандартизованном формате. При такой разметке программам легче разбирать документы и анализировать, когда произошли те или иные изменения.