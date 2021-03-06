# Ищем в начале строки: `[foo^="bar"]`

В [первой части про селекторы](/chapters/14) мы разбирали селектор по атрибутам, когда запись `input[type="text"]` выберет все элементы `input`, у которых атрибут `type` равен `text`.

У этого механизма есть дополнительные возможности: можно выбирать элементы по вхождению подстроки в значение атрибута.

Запись вида `[foo^="bar"]` выберет все элементы, у которых значение атрибута `foo` начинается с подстроки `bar`.

Представьте, что у вас есть три класса для задания колонок разной ширины, например: `column-1`, `column-2` и `column-3`.

У этих классов часть свойств повторяется, а разной является только ширина. Чтобы не дублировать CSS-код, вы можете вынести общие свойства колонок в правило с селектором `[class^="column-"]`, а в остальных правилах задать только ширину:

```css
[class^="column-"] {
  /* общие свойства: отступы, рамки, фон и так далее */
}
.column-1 { width: 100px; }
.column-2 { width: 200px; }
.column-3 { width: 300px; }
```

То есть, первый селектор выберет все дивы с классами, начинающимися на `column-`:

```html
<div class="column-1"></div>
<div class="column-2"></div>
<div class="column-3"></div>
```

Обратите внимание, что селектор чувствителен к регистру.

> ***BTW:*** 
> 
> Селекторы этой части относятся к спецификации CSS3 и [работают](http://caniuse.com/#feat=css-sel3) во всех распространённых современных браузерах.