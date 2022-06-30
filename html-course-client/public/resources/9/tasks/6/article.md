# Свойство `align-self` во флексе

Мы поменяли местами картинку и заголовок, но на этом работа с карточками не окончена. Обратите внимание на заголовок. Зелёная линия под ним — это нижняя граница элемента. Она тянется на всю ширину карточки, потому что сам заголовок тянется на всю ширину. На макете же он отцентрован и занимает столько места, сколько нужно его содержимому:

<style>
  .container {
    padding: 20px;
    padding-top: 40px;
    background-color: #E7EBE6;
    flex-shrink: 0;
  }

  .card {
  display: flex;
  flex-direction: column;
  width: 150px;
  padding: 15px;
  flex-shrink: 0;
  border-radius: 10px;
  font-size: 15px;
  line-height: 25px;
  background-color: #ffffff;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, 0.15);
}

.title {
  padding-bottom: 5px;
  font-weight: 700 !important;
  font-size: 30px !important;
  line-height: 35px !important;
  font-family: "PT Sans", "Arial", "Helvetica", sans-serif;
  border-bottom: 2px solid #B9E3B5;
  color: #333333;
}

.image {
  border-radius: 5px;
  order: -1;
}

.description {
  color: #888888;
}

.add-link {
  text-align: center;
  text-decoration: none;
  color: #ffffff;
  background-color: #4EB543;
  border-radius: 5px;
}

</style>
<div style="display: flex; justify-content: space-evenly; align-items: flex-start;"><div class="container browser-view"><div class="card current"><h3 class="title">Лайм</h3><img class="image" src="/resources/9/assets/img/lime.jpg" alt="Лайм" width="150" height="150"><p class="description">Добавит кислинку и уникальный аромат.</p><span class="add-link" href="#">+ Добавить</span></div></div><img src="/resources/9/assets/flex06.jpg" alt="Макет карточек" width="220" height="387" style="padding-top: 21px;"></div>

Обычно флекс-элементы сжимаются по ширине до содержимого, однако в карточке этого не произошло. Всё дело в направлении осей. По умолчанию флекс-элементы сжимаются по главной оси и растягиваются [по поперечной](/chapters/9/tasks/3). Таким образом, если главная ось направлена слева направо, то элементы сжимаются по горизонтали и растягиваются по вертикали.

![Схема осей флекса](/resources/9/assets/flex_scheme1_1.svg)

Если же главная ось направлена сверху вниз, то сжатие происходит по вертикали, а растяжение — по горизонтали.

![Схема повёрнутых осей флекса](/resources/9/assets/flex_scheme2.svg)

В карточках главная ось направлена сверху вниз. Поэтому, чтобы заголовок сжался по ширине до содержимого и расположился по центру, нужно задать ему выравнивание по поперечной оси. Мы уже знакомы со свойством `align-items`, которое управляет [выравниванием всех флекс-элементов](/chapters/9/tasks/3), но сейчас нам нужно отцентровать только заголовок.

Используем для этого свойство `align-self`. Оно задаётся флекс-элементу и говорит, как ему расположиться на поперечной оси. Значения у этого свойства такие же, как у `align-items`: `stretch` (значение по умолчанию), `flex-start`, `flex-end` и `center`.

```css
.element {
  align-self: flex-end;
}
```

Потренируемся использовать свойство `align-self`, а после отцентруем заголовок.

Если главная ось направлена сверху вниз, то для выравнивания всех элементов по вертикали используют [`justify-content`](/chapters/7/tasks/14).