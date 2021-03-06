# Наследование «на пальцах»

Давайте на простых примерах подробнее разберёмся, в чём же преимущество наследования.

Рассмотрим пример:

```html
<p class="text">Cтрока c выделенным <span>словом</span></p>
```

Представим, что нам нужно установить <span style="color:red">красный</span> цвет текста для всего текста. Зададим CSS-свойства следующим образом:

```css
.text {
  color: red;
}
```

Благодаря наследованию цвет текста в теге `span` автоматически станет красным:

<blockquote>
<p style="color: red">Cтрока c выделенным словом</p>
</blockquote>

А так бы выглядел результат, если бы наследование не работало:

<blockquote>
<p><span  style="color: red">Cтрока c выделенным</span> словом</p>
</blockquote>

Нам пришлось бы отдельно прописывать цвет текста для тега `span`. И тогда установка таких простых свойств как стиль шрифта стала бы большой проблемой: нужно было бы задавать свойства для всех возможных вложенных тегов.