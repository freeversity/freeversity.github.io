# Боксовая модель

В этом тренажёре мы разберём продвинутые техники создания сайтов. В частности, поговорим о том, как располагать элементы на странице, то есть о сетках.

В тренажёре [«Знакомство с HTML и CSS»](/#html-and-css-introduction) мы познакомились со многими тегами. Каждому из этих тегов на странице соответствует прямоугольная область, которая называется **боксом** (от английского _box_ — «коробка»).

Бокс состоит из содержимого (`content`), внутренних отступов (`padding`), рамки (`border`) и внешних отступов (`margin`):

![Схема бокса](/resources/7/assets/scheme1.svg)

То, как бокс выглядит на странице, во многом зависит от его типа (или от типа его родителя). С боксами двух типов — блочными и строчными — мы уже работали в тренажёре [«Знакомство с HTML и CSS»](/#html-and-css-introduction), хоть и не упоминали их типы.

Блочные боксы на странице начинаются с новой строки и растягиваются на всю ширину родительского элемента. Блочный тип по умолчанию имеют, например, теги `<p>`, `<div>` и `<h1>`.

<style>
.scheme {
  position: relative;
  font-size: 14px;
  line-height: 14px;
  border: 1px solid transparent;
  background-color: rgba(0, 0, 255, 0.1);
  outline: 2px solid blue;
}

.scheme::before {
  position: absolute;
  content: "div";
  top: -1px;
  left: -1px;
  padding: 5px;
  color: white;

  background-color: blue;
}

.scheme h1 {
  position: relative;
  margin-top: 30px;
  margin-bottom: 0;
  padding: 5px;
  padding-left: 30px;
  background-color: rgba(0, 255, 0, 0.1);
  outline: 2px solid green;
  outline-offset: -1px;
}

.scheme h1::before {
  position: absolute;
  content: "h1";
  top: 0;
  left: 0;
  padding: 5px;
  font-size: 14px;
  line-height: 14px;
  color: white;

  background-color: green;
}

.scheme p {
  position: relative;
  margin-top: 15px;
  padding: 5px;
  padding-left: 30px;
  background-color: rgba(255, 255, 0, 0.1);
  outline: 2px solid gold;
  outline-offset: -1px;
}

.scheme p::before {
  position: absolute;
  content: "p";
  top: 0;
  left: 0;
  padding: 5px;
  font-size: 14px;
  color: white;

  background-color: gold;
}
</style>
<div class="scheme"><h1>Заголовок</h1><p>Абзац</p></div>

Строчные боксы располагаются друг за другом на одной строке, а их ширина зависит от их содержимого. По умолчанию строчными боксами являются, например, теги `<a>`, `<span>` и `<b>`.

<style>
.scheme-inline {
  position: relative;
  padding: 15px 10px;
  font-size: 14px;
  line-height: 14px;
  border: 2px solid #aaaaaa;
}

.scheme-inline a,
.scheme-inline span,
.scheme-inline i {
  display: inline-block;
}

.scheme-inline a {
  position: relative;
  margin-right: 10px;
  padding: 5px;
  padding-left: 20px;
  background-color: rgba(0, 0, 255, 0.1);
  outline: 2px solid blue;
}

.scheme-inline a::before {
  position: absolute;
  content: "a";
  top: 0;
  left: 0;
  bottom: 0;
  color: white;
  padding: 5px;
  background-color: blue;
}

.scheme-inline span {
  position: relative;
  margin-right: 10px;
  padding: 5px;
  padding-left: 45px;
  background-color: rgba(0, 255, 0, 0.1);
  outline: 2px solid green;
}

.scheme-inline span::before {
  position: absolute;
  content: "span";
  top: 0;
  left: 0;
  bottom: 0;
  padding: 5px;
  color: white;

  background-color: green;
}

.scheme-inline b {
  position: relative;
  margin-bottom: 0;
  padding: 3px 5px 3px 25px;
  background-color: rgba(255, 255, 0, 0.1);
  outline: 2px solid gold;
}

.scheme-inline b::before {
  position: absolute;
  content: "b";
  top: 0;
  left: 0;
  bottom: 0;
  padding: 5px;
  color: white;

  background-color: gold;
}
</style>
<div class="scheme-inline"><a>Ссылка</a>&nbsp;<span>Произвольная строка текста</span>&nbsp;<b>Текст, выделенный полужирным</b></div>

Хорошему верстальщику нужно уметь видеть боксы на странице. Потренируем этот навык. Подключим специальный стилевой файл для подсветки боксов, а после добавим на страницу новые боксы разных типов.