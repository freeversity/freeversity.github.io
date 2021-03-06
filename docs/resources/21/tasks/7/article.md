# Коэффициент растягивания элементов, `flex-grow`

В [предыдущем задании](/chapters/21/tasks/5) мы кое о чём умолчали. На самом деле, базовый размер — это не просто размер элемента вдоль главной оси, это _начальный_ или _исходный_ размер вдоль главной оси.

Почему так важны эти _начальный_ или _исходный_?

И снова всё дело в механизме перераспределения свободного места во флексбоксе.

Если внутри флекс-контейнера по главной оси остаётся свободное место, то мы можем попросить флекс-элемент, чтобы он увеличился и занял это место. Это делается с помощью свойства `flex-grow`, которое можно назвать «коэффициентом флекс-жадности» флекс-элемента.

Свойство `flex-grow` принимает неотрицательные числовые значения, его значение по умолчанию — `0`.

Если значение `flex-grow` равно нулю, то флекс-элемент «не претендует» на оставшееся свободное место во флекс-контейнере и не будет увеличиваться, чтобы занять это место.

Если значение `flex-grow` больше нуля, то флекс-элемент будет увеличиваться, «захватывая» оставшееся свободное место.

Получается, что базовый размер — это исходный размер флекс-элементов до применения `flex-grow`.