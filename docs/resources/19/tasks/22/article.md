# Сетка посложнее, шаг 3

Теперь нам нужно задать отступы между колонками содержания. Сделать это просто — добавим им маргин справа.

Но есть небольшая проблема. По макету последняя колонка должна прижиматься к правому краю контейнера. Поэтому нам нужно обнулить маргин справа у последней колонки в содержании, иначе она не будет влезать в контейнер и перенесётся на следующую строку.

Чтобы выбрать последнюю колонку, вы можете использовать псевдокласс `:last-child`, с которым вы [уже знакомились](/chapters/14/tasks/9) в части про селекторы.