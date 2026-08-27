/**
 * Добавляйте новые главы в массив CHAPTERS по мере публикации.
 * Новая глава автоматически появится на странице после добавления объекта сюда
 * и размещения соответствующего PDF в папке files/.
 */
const CHAPTERS = [
  {
    title: 'Первая глава',
    description: 'Ефим после гибели жены и плена у хана становится безжалостным воином, а после смерти заключает в Аду сделку с демоном.',
    file: 'chapter-01.pdf'
  },
  {
    title: 'Вторая глава',
    description: 'Московский студент Роман во время инопланетного вторжения погибает от выстрела солдата.',
    file: 'chapter-02.pdf'
  },
  {
    title: 'Третья глава',
    description: 'Душу Романа перехватывает Шедоу, воскрешая его, после чего Шедоу убивает Чародея и поглощает его магию.',
    file: 'chapter-03.pdf'
  }
];

const grid = document.getElementById('booksGrid');

function renderChapters(chapters) {
  return chapters.map((chapter, index) => `
    <article class="book-card">
      <div>
        <h3 class="book-title">${chapter.title}</h3>
        <div class="book-file">
          <a href="/wiki/files/${chapter.file}" download>скачать файл</a>
        </div>
        <p class="book-desc">${chapter.description}</p>
      </div>
      <p class="book-hint">Глава №${index + 1}.</p>
    </article>
  `).join('');
}

grid.innerHTML = `
  ${renderChapters(CHAPTERS)}
  <article class="book-card book-card--soon" aria-label="Новые главы">
    <div>
      <p class="book-soon-label">Продолжение следует</p>
      <h3 class="book-title">Скоро</h3>
      <p class="book-desc">На данный момент новые главы еще в стадии разработки. Но скоро они здесь появятся. Следите за обновлениями! </p>
    </div>
  </article>
`;
