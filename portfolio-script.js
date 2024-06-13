// Пункти призначення на боковій панелі
const destIds = [
  "resume-dest",
  "education-dest",
  "portfolio-dest",
  "reviews-dest",
  "contacts-dest",
];
// Блоки з контентом
const blockIds = [
  "resume-block",
  "education-block",
  "portfolio-block",
  "reviews-block",
  "contacts-block",
];
const unselectedDestClass = "unselected-dest";
const selectedDestClass = "selected-dest";

// Вкладки в портфоліо
const portfolioTabIds = [
  "all-pf-tab",
  "graphic-design-pf-tab",
  "photography-pf-tab",
  "web-design-pf-tab",
]
const unselectedTabClass = "unselected-pf-tab";
const selectedTabClass = "selected-pf-tab";
const pfLayout16Class = "pf-layout16";
const pfLayout4Class = "pf-layout4";
const portfolioItems = [
    { src: "resources/graphic_design_1.jpg", tabId: "graphic-design-pf-tab" },
    { src: "resources/graphic_design_2.jpg", tabId: "graphic-design-pf-tab" },
    { src: "resources/graphic_design_3.jpg", tabId: "graphic-design-pf-tab" },
    { src: "resources/graphic_design_4.jpg", tabId: "graphic-design-pf-tab" },
    { src: "resources/photography_1.jpg", tabId: "photography-pf-tab" },
    { src: "resources/photography_2.jpg", tabId: "photography-pf-tab" },
    { src: "resources/photography_3.jpg", tabId: "photography-pf-tab" },
    { src: "resources/photography_4.jpg", tabId: "photography-pf-tab" },
    { src: "resources/web_design_1.jpg", tabId: "web-design-pf-tab" },
    { src: "resources/web_design_2.jpg", tabId: "web-design-pf-tab" },
    { src: "resources/web_design_3.jpg", tabId: "web-design-pf-tab" },
    { src: "resources/web_design_4.jpg", tabId: "web-design-pf-tab" },
]


// Оновити кольори пунктів на боковій панелі
// в залежності від позиції прокрутки
function updateSideBar() {
  // Очистити (зробити неактивними) усі пунтки призначення
  const dests = destIds.map((id) => document.getElementById(id));
  dests.forEach((dest) => (dest.className = unselectedDestClass));

  // Отримати поточний блок
  const scrollY = window.scrollY; // Позиція скролу
  const blocks = blockIds.map((id) => document.getElementById(id));
  const prevBlocks = blocks.filter((block) => getPosition(block).y <= scrollY);
  let currentBlock = prevBlocks
    .sort((a, b) => getPosition(a).y - getPosition(b).y)
    .slice(-1)[0];

  // Поміняти клас (колір) для поточного пункту призначення
  blocks.forEach((block, index) => {
    if (block.id === currentBlock.id) {
      const dest = dests[index];
      dest.className = selectedDestClass; // Заміняє попередні класи
    }
  });
}

// Зв'язати пункти призначення на боковій панелі з блоками
destIds
  .map((destId) => document.getElementById(destId))
  .forEach(function(dest, index) {
    const block = document.getElementById(blockIds[index]);
    dest.addEventListener("click", () => scrollToElement(block));
  });

// Вертикальна прокрутка до елемента  
function scrollToElement(element) {
  window.scrollTo(0, getPosition(element).y);
}

// Отримати абсолютну позицію елемента
function getPosition(element) {
  const rect = element.getBoundingClientRect();
  return {
    x: rect.left + window.scrollX,
    y: rect.top + window.scrollY,
  };
}

// Оновлення портфоліо після натискання на вкладку
function updatePortfolio(currentTabId) {
  // Оновити класи (кольори) для вкладок  
  portfolioTabIds
    .map((id) => document.getElementById(id))
    .forEach((tab) => {
        if (tab.id === currentTabId) {
            tab.className = selectedTabClass;
        } else {
            tab.className = unselectedTabClass;
        }
    });

  // Генерація вмісту для портфоліо
  console.log("Portfolio content generation")
  const pfLayout = document.getElementById("pf-layout");
  pfLayout.innerHTML = "";  // Видалити усі дочірні роботи
  let pfItems = []
  if (currentTabId == "all-pf-tab") {
    pfLayout.className = pfLayout16Class;
    pfItems = getFirstN(portfolioItems, 16)
  } else {
    pfLayout.className = pfLayout4Class;
    pfItems = getFirstN(portfolioItems.filter((item) => item.tabId === currentTabId), 4);
  }
  pfItems.forEach(function (item) {
    pfLayout.innerHTML += "<img src=\"" + item.src + "\" class=\"portfolio-item\">"
  });
}

// Отримати перші N елементів з масиву
function getFirstN(arr, n) {
  const endIndex = Math.min(n, arr.length);
  return arr.slice(0, endIndex);
}

// Прослуховувати кнопки вкладок портфоліо
portfolioTabIds
  .map((tabId) => document.getElementById(tabId))
  .forEach((tab) => {
    tab.addEventListener("click", () => updatePortfolio(tab.id))
  });

// Прослуховування прокрутки
window.addEventListener("scroll", updateSideBar);

// Ініціалізація бокової панелі
updateSideBar();

// Ініціалізація портфоліо
updatePortfolio(portfolioTabIds[0]);