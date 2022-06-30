# Отступы флекс-элементов

Мы отцентровали заголовок, и теперь для соответствия макету осталось только поработать с отступами.

Заголовок карточки размечен тегом `<h3>`, а описание — тегом `<p>`. Каждому из них браузер добавляет внешние отступы по вертикали, которые не совпадают с теми, что нарисовал дизайнер. Эти отступы придётся переопределить.

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
  align-self: center;
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
.reference {
  margin-top: 21px;
  padding-top: 20px;
}

.reference .image {
  margin-bottom: 15px;
}

.reference .title {
  margin-top: 0;
  margin-bottom: 10px;
}

.reference .description {
  margin-top: 0;
  margin-bottom: 5px;
}

.reference .add-link {
  margin-top: 10px;
  padding: 5px;
}
</style>
<div style="display: flex; justify-content: space-evenly; align-items: flex-start;"><div class="container browser-view"><div class="card current"><h3 class="title">Лайм</h3><img class="image" src="/resources/9/assets/img/lime.jpg" alt="Лайм" width="150" height="150"><p class="description">Добавит кислинку и уникальный аромат.</p><span class="add-link" href="#">+ Добавить</span></div></div><div class="container reference"><div class="card current"><h3 class="title">Лайм</h3><img class="image" src="/resources/9/assets/img/lime.jpg" alt="Лайм" width="150" height="150"><p class="description">Добавит кислинку и уникальный аромат.</p><span class="add-link" href="#">+ Добавить</span></div></div></div>

Задавая внешние отступы, следует помнить, что у соседних флекс-элементов они складываются.

![Внешние отступы соседних элементов](/resources/9/assets/scheme_flex-grid01.svg)

Чтобы не запутаться и получить именно те размеры, которые указаны в макете, верстальщики добавляют элементам внешние отступы только с одной стороны. Часто внешние отступы задают в направлении потока. Если элементы выстроены горизонтально, то отступ задают справа, а у последнего элемента обнуляют:

![Внешние отступы, горизонтальный поток](/resources/9/assets/scheme_flex-grid02.svg)

Если элементы выстроены вертикально, то отступ добавляют снизу. Исключение — самый последний элемент (например, подвал страницы), ему при необходимости задают отступ сверху:

![Внешние отступы, вертикальный поток](/resources/9/assets/scheme_flex-grid03.svg)

В этом случае, даже если изменить порядок секций, они не слипнутся, и между ними не появятся лишние отступы.

Элементы в карточках выстроены сверху вниз. Поэтому мы добавим отступы снизу всем элементам, кроме ссылки, и обнулим верхние отступы по умолчанию у заголовка и абзаца. Ссылка — последний элемент, поэтому ей зададим внешний отступ сверху.

![Макет карточки](/resources/9/assets/flex07.jpg)

Также ссылке нужно добавить внутренние отступы со всех сторон. Обратите внимание, что в нашем случае ссылка — не строчный бокс, а флекс-элемент. Поэтому [отступы по вертикали](/chapters/8/tasks/4) у неё будут работать так же, как по горизонтали.

> ***BTW:***
> 
> Отступы в карточках можно сверстать иначе. Например, можно задать абзацу с описанием отступ снизу `15px` и не добавлять ссылке внешний отступ сверху.
>
> Но в этом случае, если описание в карточке растянется на несколько абзацев, отступ между ними получится `15px`. Это слишком много, такой отступ должен быть только после последнего абзаца. Поэтому внешние отступы у абзаца и ссылки лучше разделить.