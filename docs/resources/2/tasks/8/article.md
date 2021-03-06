# Тег `nav`, основная навигация

Помните о задании инструктора Кекса? Мы разрабатываем сайт, на котором будет главная страница и записи блога. Поэтому нам нужно предусмотреть на главной странице навигационный блок, с которого можно будет перейти на определённые записи.

Для создания логического раздела с основной навигацией предназначен тег `<nav>` (сокращение от английского «navigation»). Обычно в `<nav>` включают ссылки на другие страницы или навигацию по текущей странице. Пример:

```html
<nav>
  Первый пост, второй пост, архив постов
</nav>
```

Со ссылками мы разберёмся в следующих частях. А пока что добавим навигационный раздел на главной странице. Этот раздел на главной будет особенным и на других страницах повторяться не будет, поэтому расположим его в основном содержании.

> **_BTW:_** 
> Не каждая группа ссылок на странице должна быть обёрнута в `<nav>`. Например, небольшой блок со вспомогательными ссылками в подвале сайта. Такой блок внутри тега `<footer>` не нужно дополнительно оборачивать в тег `<nav>`.
>
> Кроме того, блок `<nav>` помимо ссылок может включать абзацы с текстом, заголовки, списки и другое содержание.