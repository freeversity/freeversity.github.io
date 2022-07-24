# Резкие переходы цветов

Позиция цвета (или колорстоп) задаёт расположение центральной части цвета, ту точку, от которой начинается переход в другой цвет.

А что будет, если задать для соседних цветов одну и ту же позицию? В этом случае получится резкий переход цветов, так как они оба будут «вытекать» из одной точки в противоположных направлениях.

Легче продемонстрировать это поведение на примере:

<table class="table">
<tbody>
<tr>
<td style="width:50%;">

`yellow 25%, green 75%`
</td>
<td><div style="height:20px;background-color:#F1652A;background-image:linear-gradient(to right, yellow 25%, green 75%);box-shadow:1px 1px 3px #333;"></div></td>
</tr>
<tr>
<td style="width:50%;">

`yellow 45%, green 55%`
</td>
<td><div style="height:20px;background-color:#F1652A;background-image:linear-gradient(to right, yellow 45%, green 55%);box-shadow:1px 1px 3px #333;"></div></td>
</tr>
<tr>
<td style="width:50%;">

`yellow 49%, green 51%`
</td>
<td><div style="height:20px;background-color:#F1652A;background-image:linear-gradient(to right, yellow 49%, green 51%);box-shadow:1px 1px 3px #333;"></div></td>
</tr>
<tr>
<td style="width:50%;">

`yellow 50%, green 50%`
</td>
<td><div style="height:20px;background-color:#F1652A;background-image:linear-gradient(to right, yellow 50%, green 50%);box-shadow:1px 1px 3px #333;"></div></td>
</tr>
</tbody>
</table>

Этот приём часто используют для создания интересных эффектов.