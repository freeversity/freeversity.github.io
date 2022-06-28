# Флекс внутри грида

Разделив навигацию на две колонки, мы получили в одной из них логотип, а в другой — список ссылок. К логотипу мы вернёмся чуть позже, а пока займёмся списком. По умолчанию элементы списка имеют блочный тип бокса. Поэтому они растягиваются на всю ширину родителя и выстраиваются сверху вниз.

<style>
  .wrapper {
    padding: 24px 40px;
    background-color: #550a45;
    background-image: url("/resources/8/assets/img/background-small.jpg");
  }

  .navigation {
    display: grid;
    grid-template-columns: 95px 1fr;
    column-gap: 75px;
    border-bottom: 1px solid white;
  }

  .navigation-list {
    margin: 14px 0;
    padding-left: 40px;
    outline: 2px solid #9779ec;
    background-color: rgba(151, 121, 236, 0.1);
  }

  .navigation-item {
    margin: 1px;
    outline: 2px solid #5ca055;
    background-color: rgba(92, 160, 85, 0.3);
    outline-offset: -2px;
  }

  .navigation-link {
    font-family: "PT Sans", "Arial", sans-serif;
    font-size: 14px !important;
    line-height: 14px !important;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    color: #ffffff;
  }

  .navigation-link.current {
    color: rgba(255, 255, 255, 0.8);
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 4px;
  }
</style>

<div class="browser-view wrapper">
<div class="navigation"><a class="logo"><img src="/resources/8/assets/img/hiking-club.svg" alt="Логотип" width="95" height="22"></a><div class="navigation-list"><div class="navigation-item"><span class="navigation-link current">Главная</span></div><div class="navigation-item"><span class="navigation-link">Маршруты</span></div><div class="navigation-item"><span class="navigation-link">Экипировка</span></div></div></div>
</div>

Нам нужно уменьшить ширину элементов списка, расположить их в ряд и распределить между ними свободное пространство.

![Макет навигации](/resources/8/assets/html2_3_1.jpg)

Проще всего это сделать с помощью [флексов](/chapters/7/tasks/12), потому что флекс-элементы по умолчанию выстраиваются горизонтально и занимают столько места, сколько нужно их содержимому, включая отступы.

```css
.flex-container {
  display: flex;
}
```

Кроме того, флексы позволяют удобно управлять [выравниванием элементов](/chapters/7/tasks/14). По умолчанию флекс-элементы начинаются у левой границы контейнера и идут вплотную друг за другом. Но это можно изменить с помощью свойства `justify-content`. Оно задаётся флекс-контейнеру и отвечает за выравнивание флекс-элементов по главной оси.

Нам нужно, чтобы первый и последний флекс-элемент прижались к краям контейнера, а свободное пространство распределилось поровну между всеми элементами. Такое выравнивание задаёт свойство `justify-content` со значением `space-between`.

```css
.flex-container {
  display: flex;
  justify-content: space-between;
}
```

Обратите внимание, мы сделали грид-контейнером сам блок навигации, а теперь используем флексбокс для вложенного в него списка ссылок. Необязательно использовать при вёрстке только какую-то одну технологию, их можно комбинировать.

Итак, превратим список с классом `navigation-list` во флекс-контейнер, чтобы элементы списка выстроились горизонтально. Затем выровняем флекс-элементы по главной оси.