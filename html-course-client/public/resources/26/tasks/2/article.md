# Направление градиента

Направления градиента задаются с помощью ключевых слов: `top`, `bottom`, `left`, `right`.

Направление градиента располагается перед списком цветов и включает в себя частицу to. Она была добавлена в синтаксис для улучшения читабельности и наглядности:

```css
background-image: linear-gradient(to right, yellow, green);
```

И сразу понятно, что это: _«Жёлто-зелёный градиент слева направо»_.

Вот примеры разных направлений градиента c цветами `yellow, green`:

<table class="table">
<tbody>
<tr>
<td style="width:20%;">

`to right`
</td>
<td><div style="height:20px;background-color:#F1652A;background-image:linear-gradient(to right, yellow, green);box-shadow:1px 1px 3px #333;"></div></td>
</tr>
<tr>
<td>

`to left`
</td>
<td><div style="height:20px;background-color:#F1652A;background-image:linear-gradient(to left, yellow, green);box-shadow:1px 1px 3px #333;"></div></td>
</tr>
<tr>
<td>

`to bottom`
</td><td><div style="height:20px;background-color:#F1652A;background-image:linear-gradient(to bottom, yellow, green);box-shadow:1px 1px 3px #333;"></div></td>
</tr>
<tr>
<td>

`to top`
</td><td><div style="height:20px;background-color:#F1652A;background-image:linear-gradient(to top, yellow, green);box-shadow:1px 1px 3px #333;"></div></td>
</tr>
</tbody>
</table>

А теперь самостоятельно потренируйтесь задавать разные направления градиентов.