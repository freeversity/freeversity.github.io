# `:nth-child` и контекстные селекторы

Селекторы с псевдоклассами хорошо сочетаются с контекстными селекторами.

Например, следующий селектор выберет третий тег `<li>` внутри блока с классом `shooter-2`.

```css
.shooter-2 li:nth-child(3) { ... }
```

Селектор не обязательно должен заканчиваться псевдоклассом. Например, следующий селектор выберет элемент с классом `.text` в четвёртом элементе списка `<li>`.

```css
li:nth-child(4) .text { ... }
```

В этом задании вам нужно будет сделать то же, что и в [задании 5](/chapters/22/tasks/5), но без использования классов для мишеней.