# Поля ввода адресов сайтов и email

> ***BTW:***
> 
> Вот поддержка браузерами [полей для ввода `email`](http://html5test.com/compare/feature/form.email.element/form-email-validation.html) и [полей для ввода адресов сайтов](http://html5test.com/compare/feature/form.url.element/form-url-validation.html)

В HTML5 добавлены два типа полей `email` и `url`, предназначенные для ввода электронной почты и адреса сайта. Особенностью этих полей является то, что они автоматически проверяют формат введённых данных.

Пример записи:

```html
<input type="email">
<input type="url">
```

Внешне эти поля не отличаются от обычных текстовых полей, но обладают важной особенностью, которая очень полезна на мобильных устройствах.

Когда вы начинаете заполнять такое поле на мобильнике, там автоматически переключается раскладка клавиатуры. Например, для `email` отобразятся латинские символы, цифры, знак `@` и некоторые другие. Посмотрите на скриншоты:

![Поле ввода email в iOS](/resources/13/assets/email-iphone.jpg)
![Поле ввода сайта в iOS](/resources/13/assets/url-iphone.jpg)