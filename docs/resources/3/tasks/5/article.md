# Вложенные списки

Список дел будет ещё полезнее, если будет подсказывать любимые блюда кота. Поэтому в пункт «Покормить кота» хорошо бы добавить вложенный перечень или подсписок.

Теги `<ol>` и `<ul>` можно вкладывать друг в друга и создавать многоуровневые списки. Количество уровней в списках не ограничено.

Сначала нужно создать список первого уровня, а затем между тегами `<li>` и `</li>` этого списка добавить ещё один список. При этом необходимо аккуратно закрывать все теги:

```html
<ol>
  <li>1
    <ul>
      <li>1.1</li>
      <li>1.2</li>
    </ul>
  </li>
  <li>2</li>
</ol>
```

А вот пример ошибки, когда подсписок `<ul>` вложен между `<li>`, а не внутрь них:

```html
<ol>
  <li>1</li>
  <ul>
    <li>1.1</li>
    <li>1.2</li>
  </ul>
  <li>2</li>
</ol>
```
