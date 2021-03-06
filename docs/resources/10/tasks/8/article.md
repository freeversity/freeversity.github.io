# Использование нестандартных шрифтов

Перед тем как продолжить работу над сайтом, давайте разберёмся со шрифтами.

В HTML и CSS есть возможность подключать и использовать на странице нестандартные шрифты. Простейший способ использовать такой шрифт — найти его в специальном сервисе по названию, получить там код подключения шрифта, вставить этот код в свою вёрстку и использовать шрифт, как обычно, с помощью свойства `font-family`.

Подобных сервисов с бесплатными шрифтами достаточно много. Один из самых известных — это [Google Fonts](https://www.google.com/fonts). А вот похожий сервис: [fontstorage](https://fontstorage.com).

При использовании веб-шрифтов не забывайте указывать так называемые «фоллбэк»-шрифты — стандартные шрифты, которые будут отображаться, если веб-шрифт либо недоступен, либо не поддерживается старым браузером пользователя. Для этого нужно всего лишь перечислить их через запятую после нестандартного шрифта:

```css
font-family: "PT Sans", "Arial", sans-serif;
```

Потренируемся подключать и использовать веб-шрифты.