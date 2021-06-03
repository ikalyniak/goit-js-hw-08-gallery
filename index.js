import gallery from './gallery-items.js';

/**
 * Разбей задание на несколько подзадач:
1-Создание и рендер разметки по массиву данных и предоставленному шаблону.
2-Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
3-Открытие модального окна по клику на элементе галереи.
4-Подмена значения атрибута src элемента img.lightbox__image.
5-Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
6-Очистка значения атрибута src элемента img.lightbox__image. 
Это необходимо для того, чтобы при следующем открытии модального окна, 
пока грузится изображение, мы не видели предыдущее.
7-Дополнительно
Следующий функционал не обязателен при сдаче задания, но будет хорошей практикой по работе с событиями.
7.1- Закрытие модального окна по клику на div.lightbox__overlay.
7.2- Закрытие модального окна по нажатию клавиши ESC.
7.3- Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".


 * 
 */

const galleryContainerRef = document.querySelector('.js-gallery');
const lightboxRef = document.querySelector('.js-lightbox');
const lightboxOverlayRef = document.querySelector('.lightbox__overlay');
const lightboxImageRef = document.querySelector('.lightbox__image');
const modalCloseBtnRef = document.querySelector('[data-action="close-lightbox"]');

//------- 1------- Создание и рендер разметки по массиву данных и предоставленному шаблону.
const galleryMarkup = createGalleryMarkup(gallery);
galleryContainerRef.insertAdjacentHTML('beforeend', galleryMarkup);


function createGalleryMarkup(gallery) {
  return gallery.map(({ preview, original, description }) => {
    return `
  <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>
  `;
  }).join('');
};

//------- 2------- Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
galleryContainerRef.addEventListener('click', onGalleryContainerClick)

//------- 3------- Открытие модального окна по клику на элементе галереи.
function onGalleryContainerClick(event) {
  event.preventDefault();
  // console.log(event.target.src);
  // console.log(event.target.dataset.source);

  if (!event.target.classList.contains('gallery__image')) return;

  //------- 4------- Подмена значения атрибута src элемента img.lightbox__image.
  // const newSrc = event.target.getAttribute('data-source');
  // lightboxImageRef.setAttribute('src', `${newSrc}`);
  lightboxImageRef.src = event.target.dataset.source;
  lightboxImageRef.alt = event.target.getAttribute('alt');

  lightboxRef.classList.add('is-open');
};

 //------- 5------- Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
modalCloseBtnRef.addEventListener('click', onModalCloseBtn);
function onModalCloseBtn() {
  lightboxRef.classList.remove('is-open');
  //------- 6------- Очистка значения атрибута src элемента img.lightbox__image.
  lightboxImageRef.src = '';
};

//------- 7.1------- Закрытие модального окна по клику на div.lightbox__overlay.
lightboxRef.addEventListener('click', onLightboxClick);
function onLightboxClick(event) {
 
  if (event.target.classList.contains('lightbox__image')) return;

  lightboxRef.classList.remove('is-open');
  lightboxImageRef.src = '';
};

//------- 7.2------- Закрытие модального окна по нажатию клавиши ESC.
window.addEventListener('keydown', onKeyEscape);
function onKeyEscape(event) {
  if (event.key === 'Escape') {
    lightboxRef.classList.remove('is-open');
  lightboxImageRef.src = '';
  };
};

//------- 7.3------- Пролистывание изображений галереи в открытом модальном окне клавишами "влево" и "вправо".
const arrayImages = [];
gallery.forEach(item => {
  arrayImages.push(item.original)
});

window.addEventListener('keydown', onArrow);
function onArrow (event) {
  let newIndex;
  const currentId = arrayImages.indexOf(lightboxImageRef.src);
  console.log(currentId)
  console.log(event.key)
  if (event.key === 'ArrowLeft' || event.key === 'ArrowDown') {
    newIndex = currentId - 1;
    if (newIndex === -1) {
      newIndex = arrayImages.length - 1;
    }
  } else if (event.key === 'ArrowRight' || event.key === 'ArrowUp') {
    newIndex = currentId + 1;
    if (newIndex === arrayImages.length) {
      newIndex = 0;
    }
  }
  lightboxImageRef.src = arrayImages[newIndex];
}