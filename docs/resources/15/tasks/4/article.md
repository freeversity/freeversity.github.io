# Ещё немного про наследование

Наверняка вы обращали внимание, что не все свойства наследуются тегами-потомками от их родителей.

Действительно, было бы странно, если бы свойство `border` автоматически устанавливалось для всех вложенных элементов.

Например, для этого куска кода:

```html
<p class="bordered">Cтрока c выделенным <span>словом</span></p>
```

Установим CSS-свойство:

```css
.bordered {
  border: 1px solid green;
}
```

Если бы наследовались все свойства, то результат бы выглядел так:

<blockquote>
<p style="border: 1px solid green">Cтрока c выделенным <span style="border: 1px solid green">словом</span></p>
</blockquote>

На самом деле граница будет нарисована только у тега `p`.

О том, какие именно свойства наследуются, мы расскажем в следующих заданиях.