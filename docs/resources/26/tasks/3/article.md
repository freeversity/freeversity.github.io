# Градиенты по диагоналям

Градиенты можно направлять по диагонали, из угла в угол. Для этого нужно комбинировать `top`, `bottom` и `left`, `right`. Например, градиент, идущий из левого нижнего в правый верхний угол:

```css
background-image: linear-gradient(to right top, yellow, green);
```

Вот примеры диагональных градиентов c цветами `yellow`, `green`:


<table class="table">
<tbody>
<tr>
<td style="width:20%;">

`to right top`
</td>
<td><div style="height:20px;background-color:#F1652A;background-image:linear-gradient(to right top, yellow, green);box-shadow:1px 1px 3px #333;"></div></td>
</tr>
<tr>
<td>

`to right bottom`
</td>
<td><div style="height:20px;background-color:#F1652A;background-image:linear-gradient(to right bottom, yellow, green);box-shadow:1px 1px 3px #333;"></div></td>
</tr>
<tr>
<td>

`to left bottom`
</td><td><div style="height:20px;background-color:#F1652A;background-image:linear-gradient(to left bottom, yellow, green);box-shadow:1px 1px 3px #333;"></div></td>
</tr>
<tr>
<td>

`to left top`
</td><td><div style="height:20px;background-color:#F1652A;background-image:linear-gradient(to left top, yellow, green);box-shadow:1px 1px 3px #333;"></div></td>
</tr>
</tbody>
</table>
