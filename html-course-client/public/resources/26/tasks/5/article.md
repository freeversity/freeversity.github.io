# Диагонали против градусов

Иногда градиенты с направлениями, заданными с помощью градусов и диагоналей, выглядят одинаково.

<table class="table">
<tbody>
<tr>
<td class="text-center">

`to right top`
<div style="height:150px;width:150px;margin-top:10px;background-image:linear-gradient(to right top, yellow, green);box-shadow:1px 1px 3px #333;"></div>
</td>
<td class="text-center">

`45deg`
<div style="height:150px;width:150px;margin-top:10px;background-image:linear-gradient(45deg, yellow, green);box-shadow:1px 1px 3px #333;"></div>
</td>
</tr>
</tbody>
</table>

Однако их поведение отличается. Градиенты, заданные с помощью градусов, не зависят от формы контейнера, а диагональные градиенты зависят. Диагональные градиенты всегда остаются привязанными к своим углам.

Конечно, если контейнеры квадратные, то отличий не видно. Но что будет, если вытянуть их по высоте? Давайте проверим.