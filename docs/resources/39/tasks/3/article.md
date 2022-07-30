# `@keyframes`: `from` и `to`

Как уже говорилось в [предыдущем задании](/chapters/39/tasks/2), начальный и конечный ключевые кадры задаются с помощью слов `from` и `to` или значений `0%` и `100%`.

А промежуточные ключевые кадры задаются с помощью процентов. Вот пример анимации из 4 кадров:

```css
@keyframes coloring {
  from { background-color: red; }
  33%  { background-color: yellow; }
  66%  { background-color: green; }
  to   { background-color: blue; }
}
```

Опробуем `from`, `to` и промежуточные кадры в деле!