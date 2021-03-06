# Свойство `text-align`, горизонтальное выравнивание текста

Следующее свойство `text-align` описывает, как выравнивается текст внутри блока по горизонтали (на самом деле не только текст, но об этом в [следующем задании](/chapters/6/tasks/8)).

Свойство может принимать следующие значения:

- `left` — выравнивание по левому краю блока, это значение по умолчанию;
- `right` — по правому краю блока;
- `center` — по центру блока;
- `justify` — по ширине блока, при этом слова в строке будут размещаться так, чтобы занять равномерно всё пространство строки (пробелы между словами в таком случае становятся неравномерными, так как браузер «растягивает» слова в строке).
  
Важно помнить, что свойство `text-align` применяется именно к самому блоку-контейнеру, внутри которого находится текстовый контент:

HTML:

```html
<p>
  Я текст внутри абзаца
</p>
```

CSS:

```css
p {
  text-align: center;
}
```

> **_BTW:_**
>
> На самом деле существует ещё два значения `text-align`: это выравнивание к началу блока `start` и выравнивание к концу блока `end`. Если вы попробуете применить эти значения, то увидите, что эффект от значения `start` совпадает со значением `left`, а end делает то же самое, что и `right`.
>
> Но это не всегда так. Дело в том, что не во всех языках текст пишется слева направо. Например, в японском текст пишется сверху вниз, и в этом случае значения `left` и `right` уже не так логичны, как в «европейских» языках.
>
> Именно чтобы сделать CSS-код универсальным для любых направлений написания текста и появились такие значения `text-align`. Кстати, для управления направлением текста есть специальное свойство — [`writing-mode`](https://www.w3.org/TR/css-writing-modes-3/#propdef-writing-mode).
