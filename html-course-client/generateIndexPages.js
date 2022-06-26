const course = require('../docs/resources/course.json');
const fs = require('fs');
const indexPage = fs.readFileSync('../docs/index.html');

fs.rmSync('../docs/chapters', { recursive: true, force: true });

for (let lvl of course.levels) {
    for (let section of lvl.sections) {
        for (let chapter of section.chapters) {
            fs.mkdirSync(`../docs/chapters/${chapter.id}`, {recursive: true});
            fs.writeFileSync(`../docs/chapters/${chapter.id}/index.html`, indexPage);

            const chapterConfig = require(`../docs/resources/${chapter.id}/chapter.json`);

            for (let task of chapterConfig.tasks) {
                fs.mkdirSync(`../docs/chapters/${chapter.id}/tasks/${task.id}`, {recursive: true});
                fs.writeFileSync(`../docs/chapters/${chapter.id}/tasks/${task.id}/index.html`, indexPage);
            }
        }
    }
}

console.log('DONE!')