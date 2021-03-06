# Используем два класса

Общее оформление для всех преимуществ готово, теперь надо «раскидать» их по тарифам.

Вспомните, как мы отделили элементы-преимущества от обычных элементов. Мы добавили им класс, который говорит, что перед нами преимущество (`advantages-item`). Можем ли мы некоторым преимуществам добавить ещё один класс, который привяжет их к какому-то тарифу и отделит их от других преимуществ? Можем, и тогда у одного элемента будет сразу два класса.

На самом деле у HTML-элемента может быть сколько угодно классов, в этом случае они перечисляются в атрибуте `class` через пробел, например:

```html
<li class="product">Товар</li>
<li class="product hit">Товар, а ещё хит продаж</li>
<li class="product hit sale">Товар, хит продаж и со ски-и-идкой!</li>
```
 
Использование нескольких классов — это типовой приём, который ещё называется миксованием классов. Обычно его используют так: в один класс выносят общее оформление, а в дополнительных классах описывают его модификации. В примере выше размеры карточек товаров можно описать в CSS-правиле `.product`, а особый фон для хита продаж — в правиле `.hit`. В общем, удобный приём, помогает сократить дублирование кода.

Осталось придумать наши классы для тарифов. Для эконом-тарифа дополнительный класс вводить не будем, для стандартного тарифа используем класс `standard`, а для вип-тарифа — `vip`. Всё, можно дорабатывать разметку.