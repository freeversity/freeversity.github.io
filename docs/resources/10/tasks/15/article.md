# Теги `figure` и `figcaption`, картинки с подписями

Теперь, когда шаблон поста готов, можно добавить в блог ещё несколько коротких записей. А начнём с фотопоста.

Для его разметки используем тег <`figure>` — он обозначает цельный и независимый блок содержания. Внутри этого тега размещают демонстрационный материал: изображения, схемы, куски кода и так далее.

Обычно каждый такой материал сопровождает разъясняющий комментарий или «легенда». Для обозначения этого комментария и предназначен ещё один новый тег — `<figcaption>`, который размещается первым или последним элементом внутри `<figure>`. Пример:

```html
<figure>
  схема,
  график,
  диаграмма
  и так далее
  <figcaption>Легенда</figcaption>
</figure>
```

Подробно про `<figure>` уже рассказывалось в [прошлой части](/chapters/4/tasks/14).

Мы используем этот тег для более прозаичных целей.