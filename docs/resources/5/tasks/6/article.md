# Ненаследуемые свойства

В предыдущем задании мы перечислили основные наследуемые свойства. Но не все свойства наследуются. Основные ненаследуемые свойства — это параметры позиционирования, размеров, отступов, фона, рамок:

    background, border, padding, margin, width, height, position и другие.

Не наследуются они из соображений здравого смысла. Например, если для какого-либо блока установлен внутренний отступ, автоматически выставлять такой же отступ каждому вложенному элементу нет никакой надобности. Эти параметры чаще всего уникальны для каждого отдельного блока.

Давайте посмотрим что было бы, если бы все подряд свойства наследовались. Вот так, например, выглядел бы `nav` на главной странице при добавлении ему рамки (свойства `border`):

<style>
  .example-div {
    margin-bottom: 30px;
    padding: 20px;
    border: 5px solid #2d508f;
    background-color: #4470c4;
    color: #ffffff;
    font-size: 16px;
    line-height: 26px;
    font-family: "Arial", sans-serif;
  }

  .example-div h2 {
    border: inherit;
    font-size: 20px;
    line-height: normal;
  }

  .example-div ul {
    list-style: none;
    padding-left: 0;
    border: inherit;
  }

  .example-div li {
    border: inherit;
    padding-left: 0 !important;
  }

  .example-div li::before {
    content: none !important;
  }

  .example-div a {
    color: #ffffff;
    border: inherit;
  }
</style>
<div class="example-div course-theory__no-interactions">
    <h2>Записи в блоге</h2>
    <ul>
        <li><a href="#">День первый. Как я забыл покормить кота</a></li>
        <li><a href="#">День второй. Хочу быть верстальщиком</a></li>
        <li><a href="#">День третий. Мой кот на меня обиделся</a></li>
    </ul>
</div>

Записи в блоге
День первый. Как я забыл покормить кота
День второй. Хочу быть верстальщиком
День третий. Мой кот на меня обиделся

Теперь возьмём это же свойство `border` и убедимся, что оно не наследуется.