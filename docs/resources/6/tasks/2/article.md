# Относительный размер шрифта

Абсолютные величины применительно к размеру шрифта — это простое, но не совсем гибкое решение и применяется для самых простых случаев.

К примеру, для всего документа задан размер шрифта:

```css
body { font-size: 16px; }
```

В [задании про наследование](/chapters/5/tasks/4) мы разбирали, что все дочерние элементы с _необъявленным_ значением размера шрифта унаследуют этот размер, то есть `16px`.

Заголовку на странице мы зададим другое фиксированное значение размера шрифта:

```css
h1 { font-size: 32px; }
```

Пока что всё хорошо. Но представьте, что теперь появляется требование: на больших экранах мониторов увеличить размер шрифта документа с `16px` до `20px`. Если поменять размер у `body`, то у «наследников» размер тоже изменится. Но у заголовка размер никак не поменяется, он будет фиксированным — `32px`.

Хочется сделать так, чтобы при изменении основного размера шрифта для родителя (в нашем случае это `body`), его дочерние элементы пропорционально меняли свои размеры шрифта. И для этого случая есть специальная единица измерения — `em`.

Величина `1em` — это такой же размер шрифта, что и у родителя. Соответственно, если мы хотим, чтобы шрифт дочернего элемента был всегда в 2 раза больше родительского, то зададим значение `2em`:

```css
h1 { font-size: 2em; }
```

Такой подход к написанию стилей позволяет сделать код более гибким.

> **_BTW:_**
> Наравне с «абсолютными» ключевыми словами существует пара «относительных» ключевых слов, которые применяются к размеру шрифта: `larger` и `smaller`. Они буквально делают размер шрифта элемента _больше_ или _меньше_ того размера, который задан его родительскому элементу. Подробно об этих ключевых словах можно узнать в [спецификации](https://www.w3.org/TR/css-fonts-3/#relative-size-value).