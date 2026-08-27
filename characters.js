const characters = [
  { id: 'efim', name: 'Ефим', age: '654 года', short: 'Крестьянин XV века, обращённый в безжалостного убийцу по прозвищу Шедоу.', full: 'Крестьянин из русской глубинки XV века. Его жизнь разрушил набег орды: он потерял жену Марию, оказался в рабстве и был превращён в безжалостного убийцу по прозвищу Шедоу (Тень). После смерти душа Ефима попала в Ад, где он провёл столетия, пока демон Элигос не предложил ему сделку. До трагедии он был спокойным, трудолюбивым и любящим мужем. После — ожесточённый, мрачный, сломленный временем. Но внутри него ещё тлеет искра человечности.', image1: '/wiki/images/efim.png'},
  { id: 'eligos', name: 'Элигос', age: 'древний демон', short: 'Высший демон, который превращает чужую боль в выгоду и сделки.', full: 'Демон высокого ранга, обманчиво изящный и опасно умный. Элигос умеет говорить медово и действовать холодно, а за вежливой улыбкой скрывает расчёт, жажду власти и вкус к разрушению. Именно он нашёл для Ефима путь обратно в мир живых, предложив сделку: свобода, месть и возвращение — в обмен на открытие двери в чужой порядок. Для него души и судьбы — лишь рычаги, которыми можно двигать вселенной.', image1: '/wiki/images/eligos.png'},
  { id: 'roma', name: 'Рома', age: '19 лет', short: 'Студент, чья смерть не стала концом и чьё тело стало домом для Шедоу.', full: 'Обычный студент из Москвы, чья жизнь в один момент сломалась под ударом вторжения Собирателя. После смерти он оказался втянут в сущность Шедоу и стал её носителем. Рома — человек, вынужденный учиться жить в мире магии, войны и чужой тьмы внутри себя. Он тянется к нормальной жизни, к людям, к дому, но всё чаще вынужден выбирать между страхом, долгом и силой, которая пробуждается в его руке.', image1: '/wiki/images/roman.png'},
  { id: 'anya', name: 'Аня', age: '19 лет', short: 'Спокойная и наблюдательная художница с белыми волосами и ясным взглядом.', full: 'Студентка архитектуры, которая быстро замечает то, что другие стараются не видеть. Аня рисует мир с внимательностью и терпением, а в моменты хаоса остаётся логичной, собранной и честной. Её белые волосы и тихая уверенность делают её почти призрачной фигурой среди московской суеты. Она помогает Роме не терять опору и часто становится голосом здравого смысла, когда эмоции уже готовы захлестнуть всё вокруг.', image1: '/wiki/images/anna.png'},
  { id: 'moth', name: 'Мотылёк', age: 'неизвестно', short: 'Мистический проводник с жёлто-оранжевыми глазами и даром порталов.', full: 'Таинственный союзник, чьё имя связано с хрупкостью, огнём и перемещением между мирами. Мотылёк действует жёстко, говорит мало и редко объясняет больше, чем нужно, но его расчётливые планы не раз спасали Рому и его друзей. Он открывает порталы, ведёт через Астрал и знает о скрытых слоях реальности больше, чем кто-либо из смертных. За холодной манерой скрывается глубокая усталость и знание слишком многих потерь.', image1: '/wiki/images/moth.png'},
  { id: 'collector', name: 'Собиратель', age: 'неизвестно', short: 'Холодный правитель Пожирателя, для которого всё живое — коллекция и ресурс.', full: 'Властитель колоссального корабля и центр новой оккупационной реальности. Собиратель одержим порядком, контролем и систематизацией всего, что считает редким или ценным. Он захватывает артефакты, изучает аномалии и сохраняет тела своих врагов ради будущих экспериментов. Его спокойствие страшнее ярости: он не разрушает ради удовольствия, он подчиняет ради результата.', image1: '/wiki/images/collector.png'},
  { id: 'guardians', name: 'Хранители', age: 'АНГЕЛЬСКИЙ ЧИН', short: 'Создатели равновесия, строгие и беспощадные в своей идее порядка.', full: 'Хранители — не один персонаж, а целый ангельский чин. Они следят за равновесием миров и не любят отклонений от установленного порядка. Они воспринимают эмоции, силу и хаос как угрозу. Их решения холодны и суровы, а милосердие уступает месту ответственности. Из-за собственной непреклонности они нередко становятся зеркалом той самой тьмы, с которой борются.', image1: '/wiki/images/keepers.jpg' },
  { id: 'dima', name: 'Дима', age: '19 лет', short: 'Верный друг Ромы, который пытается держать реальность на расстоянии шуткой.', full: 'Энергичный, разговорчивый и очень живой друг Ромы. Дима постоянно балансирует между шуткой и паникой, но именно он часто не даёт остальным окончательно провалиться в тьму. Он может ошибаться, сомневаться и злиться, но остаётся преданным и готовым идти рядом, даже если сам до конца не понимает, во что именно они ввязались.', image1: '/wiki/images/dima.png' },
  { id: 'sasha', name: 'Саша', age: '19 лет', short: 'Осторожный и впечатлительный друг Ромы, который находит опору в вере и молчаливой преданности.', full: 'Тихий, задумчивый парень, который всегда был тенью шумного Димы, но именно его спокойствие и чуткость часто оказываются тем якорем, который удерживает компанию от полного хаоса. Он искренне верит в добро, много молится и переживает за каждого из друзей, хотя редко говорит об этом вслух. В мире, где смешались смерть, магия и ад, Саша пытается сохранить человечность, даже когда ему самому очень страшно.', image1: '/wiki/images/sasha.png' },
];

const grid = document.getElementById('charactersGrid');
const search = document.getElementById('characterSearch');
const backdrop = document.getElementById('modalBackdrop');
const closeBtn = document.getElementById('modalClose');
const titleEl = document.getElementById('modalTitle');
const ageEl = document.getElementById('modalAge');
const shortEl = document.getElementById('modalShort');
const fullEl = document.getElementById('modalFull');
const image1El = document.getElementById('modalImage1');
const image2El = document.getElementById('modalImage2');

function renderCards(items) {
  grid.innerHTML = '';
  if (!items.length) {
    grid.innerHTML = '<div class="empty-state">Ничего не найдено. Попробуйте другой запрос.</div>';
    return;
  }
  items.forEach((ch) => {
    const card = document.createElement('article');
    card.className = 'character-card';
    card.innerHTML = `
      <div class="card-image"><img src="${ch.image1}" alt="${ch.name}"></div>
      <div class="card-body">
        <div class="meta">${ch.age}</div>
        <h3>${ch.name}</h3>
        <p>${ch.short}</p>
        <div class="card-actions">
          <button class="btn primary" data-open="${ch.id}">читать далее</button>
        </div>
      </div>
    `;
    grid.appendChild(card);
  });

  grid.querySelectorAll('[data-open]').forEach((btn) => {
    btn.addEventListener('click', () => openModal(btn.dataset.open));
  });
}

function openModal(id) {
  const ch = characters.find((x) => x.id === id);
  if (!ch) return;
  titleEl.textContent = ch.name;
  ageEl.textContent = ch.age;
  shortEl.textContent = ch.short;
  fullEl.textContent = ch.full;
  image1El.src = ch.image1;
  image1El.alt = ch.name + ' — фото 1';
  if (ch.image2) {
    image2El.src = ch.image2;
    image2El.alt = ch.name + ' — фото 2';
    image2El.hidden = false;
  } else {
    image2El.removeAttribute('src');
    image2El.alt = '';
    image2El.hidden = true;
  }
  backdrop.classList.add('open');
  backdrop.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  backdrop.classList.remove('open');
  backdrop.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

search.addEventListener('input', () => {
  const q = search.value.trim().toLowerCase();
  const filtered = characters.filter((ch) => ch.name.toLowerCase().includes(q));
  renderCards(filtered);
});

backdrop.addEventListener('click', (e) => {
  if (e.target === backdrop) closeModal();
});
closeBtn.addEventListener('click', closeModal);
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

renderCards(characters);
