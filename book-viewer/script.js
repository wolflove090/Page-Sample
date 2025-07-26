const params = new URLSearchParams(location.search);
const bookDir = params.get("book") || "book1";
const imageBasePath = `./books/${bookDir}/`;

let currentSpread = 0;
const leftPage = document.getElementById('left-page');
const rightPage = document.getElementById('right-page');
const pageSound = document.getElementById('page-sound');

// 画像パス構築
const images = {
  cover: `${imageBasePath}00.png`,
  spreads: []
};

let totalSpreads = 0;
fetch(`${imageBasePath}pages.json`)
  .then(res => res.json())
  .then(data => {
    totalSpreads = data.spreadCount;
    preloadImage(images.cover);
    for (let i = 1; i <= totalSpreads; i++) {
      const a = `${imageBasePath}${String(i).padStart(2, '0')}-a.png`;
      const b = `${imageBasePath}${String(i).padStart(2, '0')}-b.png`;
      images.spreads.push({ left: a, right: b });
      preloadImage(a);
      preloadImage(b);
    }
    updateView();
  });

const preloadImage = (src) => {
  const img = new Image();
  img.src = src;
};

function updateView() {
  leftPage.innerHTML = '';
  rightPage.innerHTML = '';

  if (currentSpread === 0) {
    rightPage.innerHTML = `<img src="${images.cover}" alt="cover">`;
  } else {
    const spread = images.spreads[currentSpread - 1];
    leftPage.innerHTML = `<img src="${spread.left}" alt="left page">`;
    rightPage.innerHTML = `<img src="${spread.right}" alt="right page">`;
  }
}

function playSound() {
  pageSound.currentTime = 0;
  pageSound.play();
}

leftPage.onclick = () => {
  if (currentSpread > 0) {
    currentSpread--;
    updateView();
    playSound();
  }
};

rightPage.onclick = () => {
  if (currentSpread < totalSpreads) {
    currentSpread++;
    updateView();
    playSound();
  } else {
    location.href = "../index.html";
  }
};
