# Комбинируем автоматические и явные координаты, часть 2

Как вы заметили, у нас появились пустые незаполненные элементами ячейки, которые мы можем использовать. Поэтому следующим нашим шагом после определения рядов и столбцов будет распределение элементов. Зачем пропадать драгоценному пространству?

Идея в том, чтобы правильно распределить это пространство среди уже имеющихся элементов.

Как это сделать? Задавать всем элементам начало и конец? Не обязательно. Часть из элементов может иметь чёткие координаты в гриде, а часть — занимать оставшееся место, то есть распределяться браузером автоматически.

Работает это следующим образом:

1. Сначала выстраиваются элементы с явными координатами.
2. Затем выстраиваются элементы, которым координаты явно не заданы. Они выстраиваются по очереди в порядке следования в разметке в оставшиеся «свободные ячейки» от начала грида к концу. По размерам такие грид-элементы занимают одну ячейку.

Уже не терпится попробовать всё это на практике.