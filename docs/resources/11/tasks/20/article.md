# Раскрашиваем строки

В предыдущем задании вы раскрасили ячейки и ячейки-заголовки с помощью CSS. Если задавать стили для тега, например, `th` или `td`, то они применятся ко всем тегам. В нашем примере все ячейки окрасились в светло-жёлтый, а все ячейки-заголовки в светло-голубой.

Как быть, если стили нужно задать для какой-то определённой ячейки, группы ячеек, или строки? Можно использовать классы и применять стили для этих классов. Например, вот так:

```css
.my-class {
  стили
}
```

В этом задании мы раскрасим в разные цвета строки таблицы. Для этого воспользуемся классами, которые уже заданы для строк в примере.