# Кнопка отправки формы

Форма практически готова. Осталось добавить кнопку для отправки формы. Такая кнопка создаётся с помощью тега `<input>` c типом `submit`.

Надпись на кнопке можно задать с помощью атрибута `value`. Для кнопки отправки формы задавать имя необязательно. Но если имя задано, то на сервер будут отправляться имя и значение кнопки.

Обычно имя для кнопки отправки задают, когда в форме несколько кнопок, отвечающих за разные действия. Браузер отправляет на сервер имя и значение только той из них, на которую нажал пользователь. Таким образом, сервер может понять, какую кнопку нажали и что нужно сделать.
