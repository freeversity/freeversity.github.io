# `transition-timing-function`, шаг 2

Вот ещё несколько форм переходов: `ease-in`, `ease-out` и `ease-in-out`.

<table>
<tr>
<td style="text-align: center">

![ease-in](/resources/38/assets/ease-in.png)<br>
`ease-in`
</td>
<td style="text-align: center">

![ease-out](/resources/38/assets/ease-out.png)<br>
`ease-out`
</td>
<td style="text-align: center">

![ease-in-out](/resources/38/assets/ease-in-out.png)<br>
`ease-in-out`
</td>
</tr>
</table>

Из графиков видно, что при значении `ease-in` переход медленно начинается, а к концу ускоряется; при `ease-out` — начинается быстро, а к концу замедляется. Значение `ease-in-out` похоже на `ease`, то есть переход начинается и заканчивается медленно, но происходит это чуть-чуть интенсивнее.

Испробуем эти значения свойства `transition-timing-function`.