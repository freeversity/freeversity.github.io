# Форматы и источники звука

У звуковых файлов с поддержкой форматов дела обстоят лучше, чем у видео.

Для охвата большинства современных браузеров, достаточно использовать всего два формата:

- MP3
- OGG

И снова мы не можем указать только один файл в атрибуте `src` у тега `<audio>`. Мы должны так же, как и в случае с видео, перечислить адреса звуковых файлов в разных форматах с помощью тегов `<source>`:

```html
<audio controls>
  <source src="sound.mp3" type="audio/mpeg">
  <source src="sound.oga" type="audio/ogg">
</audio>
```

Теги `<source>` в аудио работают так же, как и в видео.