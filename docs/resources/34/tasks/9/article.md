# Псевдоклассы `:enabled` и `:disabled`

В предыдущих частях мы уже научились работать с формами и разными полями форм. Теперь рассмотрим ряд дополнительных селекторов для работы с этими элементами.

Для обращения к элементам, которые являются доступными на сайте (не заблокированными), можно использовать псевдокласс `:enabled`. Заблокированными считаются элементы форм, у которых установлен атрибут `disabled`. Подробнее об этом атрибуте можно посмотреть в [этой части](/chapters/13).

Например:

``css
input:enabled {
  /* какие-то стили */
}
```

И наоборот, если нужно обратиться только к заблокированным элементам, то для этого есть псевдокласс `:disabled`