# Теги `h1`-`h6`, заголовки в HTML

Мы закончили прототипировать крупные блоки страниц. Теперь давайте вернёмся к главной странице и немного поработаем над структурой текстового содержания.

Для создания основной структуры текста используют заголовки. В HTML существует целое семейство заголовочных тегов: от `<h1>` до `<h6>`. Тег `<h1>` обозначает самый важный заголовок (заголовок верхнего уровня), а тег `<h6>` обозначает подзаголовок самого нижнего уровня. Буква «h» в названии тега — это первая буква английского «heading».

На практике в текстах редко встречаются подзаголовки ниже третьего уровня. Поэтому чаще всего используются теги `<h1>`, `<h2>` и `<h3>`:

```html
<h1>Спецификация HTML</h1>
<h2>Раздел 1 Введение</h2>
<h3>Раздел 1.1 Происхождение языка</h3>
```

Поисковые системы придают особое значение заголовкам, также правильно расставленные заголовки важны для доступности документа. Поэтому нужно учиться грамотно использовать заголовки.

Заголовок `<h1>` — самый важный на странице. В него нужно включать текст, который в целом описывает содержание страницы. Очень важно, чтобы заголовок первого уровня на странице был только один.

На главных страницах заголовок верхнего уровня часто добавляют в шапку сайта. В нашем прототипе мы поступим так же.

> **_BTW:_** 
> В пятой версии HTML разрешили использовать собственную, независимую от остального документа, иерархию заголовков в [тегах для создания смысловых разделов](https://html.spec.whatwg.org/multipage/dom.html#sectioning-content). Теперь на странице можно использовать несколько `<section>` или `<article>` со своими `<h1>`, `<h2>` и `<h3>`.
>
> На практике выяснилось, что этот механизм скорее мешает, чем помогает, а браузеры и средства доступности не спешат его реализовывать. Так что все начали возвращаться к старой доброй сквозной иерархии заголовков во всём документе.