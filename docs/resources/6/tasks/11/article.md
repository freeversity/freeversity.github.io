# Свойство `color`, цвет текста

Мы помним, что цветом текста и фона можно управлять свойствами `color` и `background-color`.

Теперь разберёмся подробно со значениями этих свойств.

Цвет может быть задан в виде ключевого слова (полный список ключевых слов приводится в [спецификации](https://www.w3.org/TR/css-color-3/#svg-color)). Например:

```css
color: black; /* чёрный цвет */
color: red;   /* красный цвет */
color: white; /* белый цвет */
```

Ещё один вариант указания цвета — в виде [шестнадцатеричного значения](https://uk.wikipedia.org/wiki/%D0%A8%D1%96%D1%81%D1%82%D0%BD%D0%B0%D0%B4%D1%86%D1%8F%D1%82%D0%BA%D0%BE%D0%B2%D0%B0_%D1%81%D0%B8%D1%81%D1%82%D0%B5%D0%BC%D0%B0_%D1%87%D0%B8%D1%81%D0%BB%D0%B5%D0%BD%D0%BD%D1%8F). Именно им мы пользовались в [прошлом задании](/chapters/6/tasks/11). В этом случае цвет формируется из _красной_, _зелёной_ и _синей_ составляющих, заданных в виде шестнадцатеричного числа от `00` до `ff`. Помимо шести, цветовой код может содержать три знака, в этом случае второй символ в цветовых составляющих дублируется первым:

```css
color: #000000; /* чёрный цвет */
color: #f00;    /* красный цвет, то же что #ff0000 */
color: #fff;    /* белый цвет, то же что #ffffff */
```

Если не хочется иметь дело с шестнадцатеричными значениями, можно воспользоваться специальной функцией `rgb`, в которой указывается цвет в более привычном десятичном виде в диапазоне от `0` до `255` также в виде трёх цветовых составляющих, перечисленных через запятую:

```css
color: rgb(0, 0, 0)       /* чёрный, то же что #000000 */
color: rgb(255, 0, 0)     /* красный, то же что #ff0000 */
color: rgb(255, 255, 255) /* белый, то же что #ffffff */
```

У функции `rgb` есть расширенная версия — `rgba`. В этом случае помимо указания цвета последним значением указывается степень непрозрачности цвета — `alpha`. Значение может быть от `0` (полностью прозрачный) до `1` (полностью непрозрачный):

```css
color: rgba(0, 0, 0, 0.5)      /* чёрный, непрозрачный на 50% */
color: rgba(255, 0, 0, 0.3)     /* красный, непрозрачный на 30% */
color: rgba(255, 255, 255, 0.9) /* белый, непрозрачный на 90% */
```
