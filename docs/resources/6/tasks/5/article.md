# Свойство `font-family`, семейство шрифта

Мы уже разобрались с размерами шрифта, но как же задавать сам шрифт?

Для этого есть специальное свойство — `font-family`. В значении этого свойства указывается список названий шрифтов, перечисленных через запятую. В начале списка располагают самый желаемый шрифт, затем менее желаемый, а в самом конце списка — общий тип шрифта. Браузер проходит по списку слева направо и использует первый найденный в системе или на сайте шрифт. Пример:

```css
body {
  font-family: "PT Sans", "Arial", sans-serif;
}
```

Если название шрифта состоит из нескольких слов, то его нужно заключать в кавычки. Одинарные названия можно оставлять как без кавычек, так и с ними для единообразия. Если браузер не находит на сайте или в операционной системе ни одно из перечисленных названий шрифтов, то он применяет последнее значение — общий системный тип шрифта. Самые распространённые типы шрифта:

- `serif` — шрифт с засечками;
- `sans-serif` — шрифт без засечек.

> **_BTW_:**
>
> На самом деле, кроме `serif` и `sans-serif` есть ещё менее распространённые типы шрифта:
>
> - `monospace` — моноширинный шрифт;
> - `cursive` — шрифт с неформальным начертанием, например, имитация рукописного текста или леттеринга;
> - `fantasy` — декоративный шрифт, например, всемирно известный `Comic Sans`.