# Тег `main`, основное содержание

Обратите внимание, что мы задали классы для хедера и футера. Сделано это потому, что этих элементов на странице может быть несколько.

Хедер — это не только привычная шапка сайта с логотипом и меню, он может использоваться и как «шапка» какой-нибудь статьи или раздела сайта. Конечно, в этом случае хедер называют не «шапкой», а вводной частью, в которой могут содержаться заголовки, оглавление и так далее.

С футером ситуация аналогичная. В привычном нам понимании это «подвал» сайта, с копирайтами, контактной информацией и так далее. Но футер может использоваться и в других разделах сайта. Например, в футере статьи можно разместить дополнительную информацию: данные об авторе, дополнительные ссылки и так далее.

А раз теги не уникальные, то и стилизовать их лучше с помощью классов, как мы и сделали.

Если вы не хотите использовать классы для шапки и подвала сайта, то можете использовать селекторы `body > header` и `body > footer`. Эти селекторы не повлияют на хедеры и футеры, вложенные более глубоко.

Для разметки основного содержимого используем тег `<main>`. Для его стилизации класс использовать не будем, так как на сайте будет только одно единственное основное содержимое.

> ***BTW:***
> 
> Кстати, загляните в CSS и посмотрите, как сделаны фоны для основных блоков. В хедере и футере мы использовали линейные градиенты, которые детально разберём в более позднем тренажёре. А фоновую картинку для основного содержания мы задали с помощью так называемого `data:URI`. Это не опечатка, аббревиатура `URI` расшифровывается как `Uniform Resource Identifier`. Кодирование изображения прямо в CSS-коде — это одна из продвинутых техник оптимизации вёрстки.