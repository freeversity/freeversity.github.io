# Чекбоксы, шаг 1

Теперь давайте займёмся усовершенствованием чекбоксов. Воспользуемся приёмом с `:checked ~` из [задания части про селекторы](/chapters/34/tasks/17) снова.

Для начала добавим в разметку чекбоксы и подписи к ним, а потом спрячем чекбоксы.

Затем с помощью псевдоэлемента `::before` у подписей сымитируем чекбоксы с нужным внешним видом: маленькие квадраты с тёмной границей. Стили для псевдоэлементов уже заданы в коде.