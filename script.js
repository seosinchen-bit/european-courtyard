const $ = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);

/* =========================
   01. SCROLL PROGRESS
========================= */

const progress = $('.progress span');

function updateProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (!progress || max <= 0) return;
  progress.style.width = `${(window.scrollY / max) * 100}%`;
}

window.addEventListener('scroll', updateProgress);
updateProgress();


/* =========================
   02. MENU
========================= */

const panel = $('.menu-panel');
const menuButton = $('.menu-btn');
const closeMenu = $('.close-menu');

if (menuButton) {
  menuButton.addEventListener('click', () => {
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
  });
}

if (closeMenu) {
  closeMenu.addEventListener('click', () => {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  });
}

$$('.menu-grid a').forEach(link => {
  link.addEventListener('click', () => {
    panel.classList.remove('open');
    panel.setAttribute('aria-hidden', 'true');
  });
});


/* =========================
   03. CUSTOM CURSOR
========================= */

const dot = $('.cursor-dot');
const ring = $('.cursor-ring');

let mouseX = 0;
let mouseY = 0;
let ringX = 0;
let ringY = 0;

window.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  if (dot) {
    dot.style.transform =
      `translate(${mouseX}px, ${mouseY}px)`;
  }
});

function cursorAnimation() {

  ringX += (mouseX - ringX) * 0.15;
  ringY += (mouseY - ringY) * 0.15;

  if (ring) {
    ring.style.transform =
      `translate(${ringX}px, ${ringY}px)`;
  }

  requestAnimationFrame(cursorAnimation);
}

cursorAnimation();


/* =========================
   04. HERO PARALLAX
========================= */

window.addEventListener('scroll', () => {

  const hero = $('.hero-image');

  if (!hero) return;

  const y = window.scrollY * 0.08;

  hero.style.transform =
    `scale(1.08) translateY(${y}px)`;
});


/* =========================
   05. PRINCIPLES
========================= */

const principleData = {

  axis: [
    '01',
    'AXIS',
    '以入口—中心—景观点形成清晰的视觉秩序。'
  ],

  frame: [
    '02',
    'FRAME',
    '建筑边界与绿篱共同构成连续的景观框景。'
  ],

  reflection: [
    '03',
    'REFLECTION',
    '水面作为柔性界面，连接休闲、桥与植物岛。'
  ],

  garden: [
    '04',
    'GARDEN ROOM',
    '将周边空间切分成可停留、可漫游的花园房间。'
  ]

};

$$('.principle').forEach(button => {

  button.addEventListener('click', () => {

    $$('.principle')
      .forEach(item => item.classList.remove('active'));

    button.classList.add('active');

    const data =
      principleData[button.dataset.principle];

    if (!data) return;

    $('.stage-number').textContent = data[0];
    $('.principle-stage h3').textContent = data[1];
    $('.principle-stage p').textContent = data[2];

    $('.principle-stage').classList.remove('flash');

    void $('.principle-stage').offsetWidth;

    $('.principle-stage').classList.add('flash');

  });

});


/* =========================
   06. MASTERPLAN
========================= */

const planData = {

  court: [
    'CENTRAL COURT',
    '主庭院 / 大尺度留白',
    '几何骨架形成庭院的核心留白，让入口、花园和水院围绕中心建立秩序。'
  ],

  water: [
    'WATER GARDEN',
    '水院 / 木桥 / 植物岛',
    '曲水把动线向左展开，木桥与植物岛让水体同时成为边界与路径。'
  ],

  formal: [
    'FORMAL GARDEN',
    '几何花园 / 喷泉',
    '对称花园提供秩序性的对景，用重复、比例和修剪强化欧洲庭院语言。'
  ],

  lawn: [
    'LAWN ROOM',
    '草坪 / 休憩 / 观景',
    '草坪作为较开放的终点空间，形成从几何核心向自然边界的释放。'
  ]

};

$$('.plan-hot').forEach(button => {

  button.addEventListener('click', () => {

    const data =
      planData[button.dataset.plan];

    if (!data) return;

    $$('.plan-hot')
      .forEach(item => item.classList.remove('selected'));

    button.classList.add('selected');

    const info = $('.planInfo');

    info.innerHTML = `
      <span>${data[0]}</span>
      <strong>${data[1]}</strong>
      <em>${data[2]}</em>
    `;

    info.classList.remove('update');

    void info.offsetWidth;

    info.classList.add('update');

  });

});


/* =========================
   07. JOURNEY
========================= */

const journeyData = {

  arrive: [
    'ARRIVE',
    '硬质铺装收束视线，入口先建立清晰的方向感。'
  ],

  discover: [
    'DISCOVER',
    '水面把动线向左展开，从硬质入口转入更自然的花园体验。'
  ],

  pause: [
    'PAUSE',
    '桥与平台提供停留节点，让穿越被切成可感知的片段。'
  ],

  release: [
    'RELEASE',
    '草坪与花园形成开敞终点，空间从围合走向松弛。'
  ],

  'water-island': [
    'WATER ISLAND',
    '植物岛把水面从功能转化为景观核心。'
  ],

  bridge: [
    'BRIDGE WALK',
    '木桥制造节奏，形成动态的穿越体验。'
  ],

  fountain: [
    'FORMAL FOUNTAIN',
    '对称花园为自然水院提供秩序性的对景。'
  ]

};

$$('.journey-hot').forEach(button => {

  button.addEventListener('click', () => {

    const data =
      journeyData[button.dataset.journey];

    if (!data) return;

    $$('.journey-hot')
      .forEach(item => item.classList.remove('selected'));

    button.classList.add('selected');

    $('.journeyCaption').innerHTML = `
      <b>${data[0]}</b>
      <br>
      ${data[1]}
    `;

  });

});


/* =========================
   08. LANDSCAPE NODES
========================= */

const nodeData = {

  'water-island': [
    'WATER ISLAND',
    '植物岛把水面从功能转化为景观核心。',
    '水 / 植物 / 停留'
  ],

  bridge: [
    'BRIDGE WALK',
    '木桥制造节奏，形成动态的穿越体验。',
    '木 / 水 / 动线'
  ],

  fountain: [
    'FORMAL FOUNTAIN',
    '对称花园为自然水院提供秩序性的对景。',
    '几何 / 喷泉 / 对景'
  ]

};


function openNode(key) {

  const data = nodeData[key];

  if (!data) return;

  openModal(
    data[0],
    data[2],
    data[1]
  );

}


$$('[data-node]').forEach(button => {

  button.addEventListener('click', () => {

    openNode(button.dataset.node);

  });

});


/* =========================
   09. DESIGN ANALYSIS
========================= */

const analysisData = {

  circulation:
    'CIRCULATION — 入口 → 中央庭院 → 水院 → 花园；让动线从入口收束，再被水面向左展开。',

  water:
    'WATER SYSTEM — 水体作为边界与路径的柔性界面，把木桥、平台和植物岛组织成连续体验。',

  planting:
    'PLANTING — 乔木背景 + 灌木层次 + 季相花境；用层次控制尺度，同时保持中央空间开敞。'

};

$$('.analysis-card').forEach(button => {

  button.addEventListener('click', () => {

    $$('.analysis-card')
      .forEach(item => item.classList.remove('active'));

    button.classList.add('active');

    $('.analysis-detail').textContent =
      analysisData[button.dataset.analysis];

  });

});


/* =========================
   10. MATERIAL
========================= */

const detailData = {

  stone: [
    '浅色石材',
    '建立明亮、克制的硬质基底，让水与植物成为更柔软的视觉层。'
  ],

  wood: [
    '暖木色桥面',
    '用温暖材质强调桥作为“穿越”的节点，让水面产生节奏。'
  ],

  hedge: [
    '深绿修剪绿篱',
    '强化几何秩序，作为建筑边界与花园之间的连续框景。'
  ],

  water: [
    '柔和水面',
    '作为柔性界面连接休闲、桥与植物岛，软化正式核心。'
  ]

};

$$('[data-detail]').forEach(button => {

  button.addEventListener('click', () => {

    const data =
      detailData[button.dataset.detail];

    if (!data) return;

    $('.detail-pop').innerHTML = `
      <b>${data[0]}</b>
      <br>
      ${data[1]}
    `;

  });

});


/* =========================
   11. PERSPECTIVE SWITCH
========================= */

$$('.persp-btn').forEach(button => {

  button.addEventListener('click', () => {

    $$('.persp-btn')
      .forEach(item => item.classList.remove('active'));

    button.classList.add('active');

    const image =
      $('#perspectiveImg');

    if (!image) return;

    image.style.opacity = '0';

    setTimeout(() => {

      image.src = button.dataset.img;

      image.onload = () => {
        image.style.opacity = '1';
      };

    }, 180);

  });

});


/* =========================
   12. MODAL
========================= */

const modal = $('#modal');

function openModal(eyebrow, title, text) {

  if (!modal) return;

  $('#modalEyebrow').textContent = eyebrow;
  $('#modalTitle').textContent = title;
  $('#modalText').textContent = text;

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');

  document.body.classList.add('modal-open');

}

function closeModal() {

  if (!modal) return;

  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');

  document.body.classList.remove('modal-open');

}


$$('[data-modal]').forEach(button => {

  button.addEventListener('click', () => {

    const data = {

      massing: [
        '01 / MASSING',
        '边界先行，空间后生长',
        '用连续的墙体、树阵和绿篱建立庭院的秩序感。'
      ],

      atmosphere: [
        '02 / ATMOSPHERE',
        '让水成为第二条路径',
        '桥、平台与植物岛围绕水面形成环形体验。'
      ]

    }[button.dataset.modal];

    if (!data) return;

    openModal(
      data[0],
      data[1],
      data[2]
    );

  });

});


if ($('.modal-close')) {
  $('.modal-close').addEventListener(
    'click',
    closeModal
  );
}

if ($('.modal-backdrop')) {
  $('.modal-backdrop').addEventListener(
    'click',
    closeModal
  );
}

document.addEventListener('keydown', e => {

  if (e.key === 'Escape') {
    closeModal();
  }

});


/* =========================
   13. IMAGE LIGHTBOX
========================= */

function createLightbox() {

  if ($('#imageLightbox')) return;

  const box = document.createElement('div');

  box.id = 'imageLightbox';

  box.innerHTML = `
    <div class="lightbox-bg"></div>

    <button class="lightbox-close">
      ×
    </button>

    <img class="lightbox-image" src="" alt="">

    <div class="lightbox-caption"></div>
  `;

  document.body.appendChild(box);

}

createLightbox();


function openImage(image) {

  const box = $('#imageLightbox');
  const bigImage = $('.lightbox-image');
  const caption = $('.lightbox-caption');

  if (!box || !bigImage) return;

  bigImage.src = image.src;

  bigImage.alt = image.alt || '';

  caption.textContent =
    image.alt || 'European Courtyard';

  box.classList.add('show');

}


function closeImage() {

  const box = $('#imageLightbox');

  if (box) {
    box.classList.remove('show');
  }

}


$$(
  '.sketch-image img,' +
  '.plan-board img,' +
  '.journey-map img,' +
  '.nodes-image img,' +
  '.detail-photo img,' +
  '.perspective-main img'
).forEach(image => {

  image.addEventListener('click', () => {

    openImage(image);

  });

});


$('.lightbox-bg').addEventListener(
  'click',
  closeImage
);

$('.lightbox-close').addEventListener(
  'click',
  closeImage
);

document.addEventListener('keydown', e => {

  if (e.key === 'Escape') {
    closeImage();
  }

});


/* =========================
   14. IMAGE HOVER EFFECT
========================= */

$$(
  '.frame-card,' +
  '.plan-board,' +
  '.journey-map,' +
  '.nodes-image,' +
  '.detail-photo,' +
  '.perspective-main'
).forEach(card => {

  card.addEventListener('mousemove', e => {

    if (window.innerWidth < 800) return;

    const rect =
      card.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) / rect.width;

    const y =
      (e.clientY - rect.top) / rect.height;

    const image =
      card.querySelector('img');

    if (!image) return;

    const moveX =
      (x - 0.5) * 8;

    const moveY =
      (y - 0.5) * 8;

    image.style.transform =
      `scale(1.025) translate(${moveX}px, ${moveY}px)`;

  });

  card.addEventListener('mouseleave', () => {

    const image =
      card.querySelector('img');

    if (!image) return;

    image.style.transform =
      'scale(1) translate(0,0)';

  });

});


/* =========================
   15. SCROLL REVEAL
========================= */

const revealItems = document.querySelectorAll(
  '.section-kicker,' +
  '.intro-copy,' +
  '.principles,' +
  '.frame-card,' +
  '.sketch-copy,' +
  '.plan-board,' +
  '.journey-map,' +
  '.nodes-grid,' +
  '.analysis-card,' +
  '.detail-layout,' +
  '.perspective-stage'
);

const revealObserver =
  new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.classList.add(
            'visible'
          );

        }

      });

    },
    {
      threshold: 0.12
    }
  );


revealItems.forEach(item => {

  item.classList.add('scroll-reveal');

  revealObserver.observe(item);

});


/* =========================
   16. BUTTON HOVER
========================= */

$$('button, a').forEach(element => {

  element.addEventListener(
    'mouseenter',
    () => {
      document.body.classList.add('hovering');
    }
  );

  element.addEventListener(
    'mouseleave',
    () => {
      document.body.classList.remove('hovering');
    }
  );

});
