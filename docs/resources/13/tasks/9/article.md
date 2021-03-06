# Поле ввода числового значения

> ***BTW:***
> 
> Поля для ввода числовых значений уже поддерживаются в [этих браузерах](http://caniuse.com/input-number).

Для ввода числовых значений существует специальный тип поля ввода `number`. Рядом с полем браузер автоматически подставляет две стрелочки для увеличения и уменьшения числового значения.

Пример записи:

```html
<input type="number">
```

В Chrome это выглядит так:

![Поле ввода числового значения в Chrome](/resources/13/assets/number-chrome.jpg)

При помощи вспомогательных атрибутов `min` и `max` можно установить верхнюю и нижнюю границу допустимых значений. А атрибут `step` устанавливает величину шага изменения значения.

Также стоит отметить, что поле ввода числа, как и некоторые другие поля, которые будут рассмотрены дальше, по-особому ведёт себя в мобильных браузерах: например, при фокусе на такое поле появляется клавиатура, позволяющая вводить соответствующие символы.

![Поле ввода числового значения в iOS](/resources/13/assets/number-iphone.jpg)
