# Пропорции цветов и колорстопы

По умолчанию цвета в градиентах распределяются равномерно, в одинаковых пропорциях, но этим поведением можно управлять.

Делается это с помощью так называемых колорстопов, которые записываются сразу после значений цветов, например, `red 0%, yellow 100%`.

Колорстоп указывает положение цвета в градиенте, его можно задавать в процентах, пикселях и других единицах. Давайте рассмотрим несколько примеров, чтобы понять поведение колорстопов:

<table class="table">
<tbody>
<tr>
<td style="width: 50%;">

`yellow, green`
</td>
<td><div style="height: 20px; background-color: #f1652a; background-image: linear-gradient(to right, yellow, green); box-shadow: 1px 1px 3px #333333;"></div></td>
</tr>
<tr>
<td>

`yellow 0%, green 100%`
</td>
<td><div style="height: 20px; background-color: #f1652a; background-image: linear-gradient(to right, yellow 0%, green 100%); box-shadow: 1px 1px 3px #333333;"></div></td>
</tr>
<tr>
<td>

`yellow 0%, green 50%`
</td>
<td><div style="height:20px;background-color:#F1652A;background-image:linear-gradient(to right, yellow 0%, green 50%);box-shadow:1px 1px 3px #333;"></div></td>
</tr>
<tr>
<td>

`yellow 50%, green 100%`
</td>
<td><div style="height:20px;background-color:#F1652A;background-image:linear-gradient(to right, yellow 50%, green 100%);box-shadow:1px 1px 3px #333;"></div></td>
</tr>
<tr>
<td>

`yellow 25%, green 75%`
</td>
<td><div style="height:20px;background-color:#F1652A;background-image:linear-gradient(to right, yellow 25%, green 75%);box-shadow:1px 1px 3px #333;"></div></td>
</tr>
<tr>
<td>

`red, yellow, green`
</td>
<td><div style="height:20px;background-color:#F1652A;background-image:linear-gradient(to right, red, yellow, green);box-shadow:1px 1px 3px #333;"></div></td>
</tr>
<tr>
<td>

`red 0%, yellow 50%, green 100%`
</td>
<td><div style="height:20px;background-color:#F1652A;background-image:linear-gradient(to right, red 0%, yellow 50%, green 100%);box-shadow:1px 1px 3px #333;"></div></td>
</tr>
<tr>
<td>

`red 33%, yellow 66%, green 100%`
</td>
<td><div style="height:20px;background-color:#F1652A;background-image:linear-gradient(to right, red 33%, yellow 66%, green 100%);box-shadow:1px 1px 3px #333;"></div></td>
</tr>
</tbody>
</table>

Колорстоп задаёт то место, где будет располагаться центральная (самая насыщенная) часть цвета.