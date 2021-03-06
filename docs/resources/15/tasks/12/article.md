# Битва за курочку. Борьба накаляется

Как вы уже знаете, существуют селекторы не только по классам, но и по `id`. Они начинаются с решётки `#`.

HTML:

```html
<div id="experiment-1" class="experiment">
  <p class="red blue">Синий или красный?</p>
</div>
```

CSS:

```css
#experiment-1 .blue {
  color: blue;
}
.experiment .red {
  color: red;
}
```

Особенность атрибута `id` заключается в том, что его значение должно быть уникальным в пределах страницы. То есть, может существовать только один тег с определённым значением `id`.

Получается, что селектор по `id` может выбрать только один элемент. И поэтому он на порядок специфичнее селекторов по тегам, классам, а также комбинаций этих селекторов.

Кексик и Рудольф демонстрируют его работу.