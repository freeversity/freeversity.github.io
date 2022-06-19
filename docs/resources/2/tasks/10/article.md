# Тег `aside`, дополнительное содержание

Помимо `<section>` и `<article>` есть ещё один крупный логический контейнер. Это тег `<aside>`.

Тег `<aside>` включает в себя дополнительное содержание, не связанное напрямую с основным. Такие блоки ещё часто называют «сайдбарами» или боковыми панелями.

```html
<aside>
  Я скромный блок с курсами валют на сайте про рыбок
</aside>
```

На нашей внутренней странице тоже стоит предусмотреть `<aside>`. Позже мы сможем включить туда ссылки на похожие посты блога или ленту постов из Твиттера, или что-то подобное (кто знает, что придёт в голову боссу).

> **_BTW:_** 
>В стилях для прототипирования мы по-разному оформили теги, которые применяются для решения разных задач. При этом мы опирались на [систему типов](https://html.spec.whatwg.org/multipage/dom.html#kinds-of-content) спецификации HTML. Вот расшифровка:
> 
> -  <span style="border: 2px dashed #7fc1ff;border-radius: 4px;padding: 3px 5px;">Пунктиром</span> выделен особый тег `<body>`.
> - <span style="border: 2px solid #7fc1ff;background-color: #f3faff;border-radius: 4px;padding: 3px 5px;">Синей рамкой</span> выделяются [поточные теги](https://html.spec.whatwg.org/multipage/dom.html#flow-content), которыми обычно размечают крупные структурные блоки страниц, например `<main>`.
> - <span style="border: 2px solid #9779ec;background-color: #f9f7ff;border-radius: 4px;padding: 3px 5px;">Фиолетовой рамкой</span> выделяются [теги для создания смысловых разделов](https://html.spec.whatwg.org/multipage/dom.html#sectioning-content), например `<section>`.
> - <span style="border: 2px solid #ff994f;background-color: #ffffff;border-radius: 4px;padding: 3px 5px;">Оранжевой рамкой</span> выделяются [заголовочные теги](https://html.spec.whatwg.org/multipage/dom.html#heading-content), например `<h1>`.
> - <span style="border: 2px solid #f36dff;background-color: #ffffff;border-radius: 4px;padding: 3px 5px;">Розовой рамкой</span> выделяются [поточные теги](https://html.spec.whatwg.org/multipage/dom.html#flow-content), которыми обычно размечают непосредственно текстовые элементы, например `<p>`.
>
> Конечно, в спецификации больше типов, но мы не стали оформлять все, а ограничились только теми тегами, которые понадобятся нам в прототипе.