# Псевдокласс `:not`

Псевдокласс `:not(селектор)` является отрицающим селектором. С его помощью можно выбрать элементы, которые НЕ содержат указанный селектор:

```css
li:not(:last-child) { }
```

Этот селектор выберет все теги `<li>`, _НЕ_ являющиеся последними в их родителе.

В качестве селектора могут указываться псевдоклассы, теги, идентификаторы, классы и селекторы атрибутов. Нельзя использовать двойной псевдокласс `:not`, то есть конструкция `:not(:not(...))` не сработает.

Также в комбинации с `:not` не применяются:

- объединение селекторов: например, `li:not(.heart.jack)` — некорректный селектор;
- псевдоэлементы: `li:not(::after)` — неправильная запись (подробнее о псевдоэлементах рассказано [далее в этой части](/chapters/17/tasks/14));
- селекторы-потомки, групповые селекторы или комбинации: например, нельзя писать `li:not(a span)` или `li:not(a + span)`.