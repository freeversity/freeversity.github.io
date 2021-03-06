# Битва за курочку. Раунд второй

Чуть более сложный пример. Тот же HTML:

```html
<p class="red blue">Синий или красный?</p>
```

Немного другой CSS:

```css
p.blue {
  color: blue;
}

.red {
  color: red;
}
```

В этом случае текст абзаца будет синим. Происходит это потому, что селектор `p.blue` _более специфичный_, чем селектор `.red`.

Простое объяснение специфичности звучит так:

Чем меньшее количество элементов потенциально может выбрать селектор, тем он специфичнее.
В нашем примере селектор `.red` выберет все теги с нужным классом, а селектор `p.blue` выберет только абзацы с нужным классом. О том, как объединять селекторы по тегам и классам, рассказывалось в [этом задании](/chapters/14/tasks/4).

Заметьте, что в этом задании одно из CSS-правил вынесено в заблокированный HTML-код, а вам нужно победить его, усилив другое CSS-правило.