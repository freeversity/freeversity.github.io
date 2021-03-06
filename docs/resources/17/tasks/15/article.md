# Псевдоэлемент `::after`

Псевдоэлемент `after` аналогичен `before`. Отличие заключается в том, что он добавляет псевдотег не в начало, а в конец элемента. Например:

```css
.heart::after { content: "Черви"; }
```

Даст такой результат:

```html
<div class="queen heart">
  <em>Дама</em>
  <after>Черви</after>
</div>
```

Псевдоэлементы `before` и `after` можно использовать одновременно. Это означает, что с помощью CSS вы можете добавить к любому элементу на странице два псевдоэлемента.

Обратите внимание, что псевдоэлементы пишутся с двойным двоеточием. Этим они отличаются от псевдоклассов, которые используют одинарное двоеточие.

> ***BTW:***
> 
> В старом варианте стандарта псевдоэлементы можно было использовать с `:`. Поэтому запись с `:` понимают и очень старые браузеры. Но сейчас использовать одинарное двоеточие для псевдоэлементов считается дурным тоном.