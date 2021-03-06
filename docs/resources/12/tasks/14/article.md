# Раскрывающийся список, или «селект»

Раскрывающийся список так же, как и радиокнопки, позволяет выбрать один вариант ответа из нескольких.

Раскрывающийся список создаётся с помощью парного тега `<select>`, у которого есть знакомые атрибуты `name` и `id`.

Варианты ответов задаются с помощью парных тегов `<option>`, которые должны располагаться внутри тега `<select>`. Например:

```html
<select name="theme">
  <option value="light">Светлая тема</option>
  <option value="dark">Тёмная тема</option>
  ...
</select>
```

В атрибуте `value` тега `<option>` задаётся значение варианта ответа, а внутри этого тега располагается подпись варианта ответа.

Если при отправке формы у выбранного варианта задан `value`, то на сервер отправится значение этого атрибута. В противном случае будет отправлен текст подписи.