# Флоат рядом с флоатом

Флоатные элементы становятся невидимыми для блочных элементов и видимыми для текста. А как же они взаимодействуют друг с другом?

Если вкратце то: флоатные элементы видят друг друга.

Идущие друг за другом флоаты выстраиваются в ряд, пока им хватает свободного места. Если места не хватает, то они начинают переноситься на следующую строчку. Почти как текст.

Как раз эта особенность флоатов и позволила применять их для создания сеток. Ведь в начале двухтысячных в CSS не было никакого другого способа создавать колонки и задавать им размеры.

Блочные элементы всегда располагались в разных строках. А строчные элементы, хоть и могли располагаться на одной строке, совершенно не воспринимали размеры. Позиционирование тоже не подходило для сеток, так как элементы выпадали из потока.

В общем, флоаты оказались как нельзя кстати для тех, кто решил уходить с табличной вёрстки.