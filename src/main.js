import './css/styles.css';
import './css/exercises.css';
import axios from 'axios';

const BASE_URL = 'https://your-energy.b.goit.study/api';

// --- ЕЛЕМЕНТИ DOM ---
const container = document.querySelector('#exercises-container');
const categoryLabel = document.querySelector('#category-label');
const breadcrumbSeparator = document.querySelector('#exercises-breadcrumb-separator');
const searchForm = document.querySelector('#search-form');
const filterList = document.querySelector('.filter-list');
const backBtn = document.querySelector('#exercises-back-btn');
const paginationContainer = document.querySelector('#pagination-container');
const footerForm = document.querySelector('.footer-form');

// Стан застосунку
let currentFilter = 'Muscles';
let currentCategory = '';
let currentPage = 1;

// --- 1. ЦИТАТА ДНЯ ---
async function fetchQuote() {
  try {
    const response = await axios.get(`${BASE_URL}/quote`);
    const { quote, author } = response.data;
    const quoteText = document.querySelector('#quote-text');
    const quoteAuthor = document.querySelector('#quote-author');
    if (quoteText && quoteAuthor) {
      quoteText.textContent = quote;
      quoteAuthor.textContent = author;
    }
  } catch (error) {
    console.error('Помилка завантаження цитати:', error);
  }
}

// --- 2. ФІЛЬТРИ (КАТЕГОРІЇ) ---
async function fetchFilters(filterName = 'Muscles', page = 1) {
  try {
    currentFilter = filterName;
    currentPage = page;
    
    categoryLabel.textContent = '';
    categoryLabel.classList.add('is-hidden');
    breadcrumbSeparator.classList.add('is-hidden');
    searchForm.classList.add('is-hidden');

    const response = await axios.get(`${BASE_URL}/filters`, {
      params: { filter: filterName, page, limit: 12 }
    });

    renderFilters(response.data.results);
    renderPagination(response.data.totalPages, page, 'filters');
    
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.filter === filterName);
    });
  } catch (error) {
    console.error('Помилка завантаження фільтрів:', error);
  }
}

function renderFilters(filters) {
  container.innerHTML = filters.map(({ filter, name, imgURL }) => `
    <li class="filter-card" data-name="${name}" data-filter="${filter}" style="background-image: linear-gradient(0deg, rgba(17, 17, 17, 0.5), rgba(17, 17, 17, 0.5)), url('${imgURL}')">
      <div class="filter-card-content">
        <p class="filter-card-name">${name}</p>
        <p class="filter-card-type">${filter}</p>
      </div>
    </li>
  `).join('');
}

// --- 3. ВПРАВИ ---
async function fetchExercises(filterType, categoryName, page = 1, keyword = '') {
  try {
    currentCategory = categoryName;
    currentPage = page;

    const paramKey = filterType.toLowerCase().replace(' ', '');
    const key = (paramKey === 'bodyparts') ? 'bodypart' : paramKey.slice(0, -1); 

    const params = { [key]: categoryName, page, limit: 10 };
    if (keyword) params.keyword = keyword;

    const response = await axios.get(`${BASE_URL}/exercises`, { params });
    
    categoryLabel.textContent = categoryName;
    categoryLabel.classList.remove('is-hidden');
    breadcrumbSeparator.classList.remove('is-hidden');
    searchForm.classList.remove('is-hidden');

    renderExercises(response.data.results);
    renderPagination(response.data.totalPages, page, 'exercises');
  } catch (error) {
    console.error('Помилка завантаження вправ:', error);
  }
}

function renderExercises(exercises) {
  if (exercises.length === 0) {
    container.innerHTML = `<p class="no-results">Sorry, no exercises found for your request.</p>`;
    return;
  }
  container.innerHTML = exercises.map(({ rating, name, burnedCalories, bodyPart, target, _id }) => `
    <li class="exercise-item">
      <div class="exercise-card-top">
        <span class="workout-label">WORKOUT</span>
        <span class="rating">${rating.toFixed(1)} ⭐</span>
        <button class="start-btn" data-id="${_id}">Start →</button>
      </div>
      <h3 class="exercise-name">${name}</h3>
      <div class="exercise-info">
        <p><span>Burned:</span> ${burnedCalories} / 3 m</p>
        <p><span>Part:</span> ${bodyPart}</p>
        <p><span>Target:</span> ${target}</p>
      </div>
    </li>
  `).join('');
}

// --- 4. ПАГІНАЦІЯ ---
function renderPagination(totalPages, currentPage, type) {
  if (totalPages <= 1) {
    paginationContainer.innerHTML = '';
    return;
  }
  let markup = '';
  for (let i = 1; i <= totalPages; i++) {
    markup += `<button class="pagination-btn ${i === Number(currentPage) ? 'active' : ''}" data-page="${i}" data-type="${type}">${i}</button>`;
  }
  paginationContainer.innerHTML = markup;
}

// --- 5. РЕЙТИНГ (PATCH) ---
async function patchRating(id, rating, email, comment) {
  try {
    await axios.patch(`${BASE_URL}/exercises/${id}/rating`, {
      rate: Number(rating),
      email,
      review: comment,
    });
    alert('Rating submitted successfully!');
  } catch (error) {
    const status = error.response?.status;
    alert(status === 409 ? 'You have already rated this exercise.' : 'Error submitting rating.');
  }
}

// --- 6. МОДАЛЬНЕ ВІКНО ---
async function openModal(id) {
  try {
    const response = await axios.get(`${BASE_URL}/exercises/${id}`);
    const data = response.data;

    const modalMarkup = `
      <div class="modal-overlay is-open" id="modal-overlay">
        <div class="modal-content">
          <button class="modal-close-btn" id="modal-close">✖</button>
          <img src="${data.gifUrl}" alt="${data.name}" class="modal-image">
          <div class="modal-details">
            <h2 class="exercise-name">${data.name}</h2>
            <p class="rating">${data.rating.toFixed(1)} ⭐</p>
            <hr>
            <div class="exercise-info">
              <p><span>Target:</span> ${data.target}</p>
              <p><span>Body Part:</span> ${data.bodyPart}</p>
              <p><span>Equipment:</span> ${data.equipment}</p>
              <p><span>Calories:</span> ${data.burnedCalories} / ${data.time} min</p>
            </div>
            <p class="exercise-description">${data.description}</p>
            <div class="modal-btns">
                <button class="add-fav-btn">Add to favorites ❤️</button>
                <button class="rating-btn">Give a rating</button>
            </div>
          </div>
        </div>
      </div>
    `;

    document.body.insertAdjacentHTML('beforeend', modalMarkup);
    const overlay = document.querySelector('#modal-overlay');

   
    document.querySelector('.rating-btn').onclick = () => {
      const ratingFormHtml = `
        <div class="rating-overlay" id="rating-overlay">
          <div class="rating-modal">
            <h3>Rating</h3>
            <p class="rating-value">0.0</p>
            <div class="stars-container">
              ${[1, 2, 3, 4, 5].map(i => `<span class="star" data-value="${i}">☆</span>`).join('')}
            </div>
            <form id="rating-form">
              <input type="email" name="email" placeholder="Email" required />
              <textarea name="comment" placeholder="Your comment" required></textarea>
              <button type="submit" class="submit-rating">Send</button>
              <button type="button" class="close-rating">Cancel</button>
            </form>
          </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', ratingFormHtml);

      const rOverlay = document.querySelector('#rating-overlay');
      const stars = rOverlay.querySelectorAll('.star');
      let selectedRating = 0;

      stars.forEach(star => {
        star.onclick = () => {
          selectedRating = star.dataset.value;
          rOverlay.querySelector('.rating-value').textContent = `${selectedRating}.0`;
          stars.forEach(s => s.textContent = s.dataset.value <= selectedRating ? '★' : '☆');
        };
      });

      document.querySelector('#rating-form').onsubmit = async (e) => {
        e.preventDefault();
        if (selectedRating === 0) return alert('Please select a star rating!');
        await patchRating(id, selectedRating, e.target.email.value, e.target.comment.value);
        rOverlay.remove();
      };
      document.querySelector('.close-rating').onclick = () => rOverlay.remove();
    };

    
    const closeModal = () => { overlay.remove(); document.removeEventListener('keydown', handleEsc); };
    const handleEsc = (e) => { if (e.key === 'Escape') closeModal(); };
    document.querySelector('#modal-close').onclick = closeModal;
    overlay.onclick = (e) => { if (e.target === overlay) closeModal(); };
    document.addEventListener('keydown', handleEsc);

  } catch (err) { console.error(err); }
}

// --- 7. ПІДПИСКА (POST) ---
footerForm?.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = e.target.elements[0].value.trim();
  try {
    await axios.post(`${BASE_URL}/subscription`, { email });
    alert('Thank you for subscribing!');
    e.target.reset();
  } catch (error) {
    alert(error.response?.status === 409 ? 'Already subscribed.' : 'Error. Try again.');
  }
});

// --- 8. ОБРОБНИКИ ПОДІЙ ---
filterList?.addEventListener('click', (e) => {
  if (e.target.classList.contains('filter-btn')) fetchFilters(e.target.dataset.filter);
});

backBtn?.addEventListener('click', () => fetchFilters(currentFilter));

container?.addEventListener('click', (e) => {
  const card = e.target.closest('.filter-card');
  if (card) return fetchExercises(card.dataset.filter, card.dataset.name);

  const startBtn = e.target.closest('.start-btn');
  if (startBtn) openModal(startBtn.dataset.id);
});

paginationContainer?.addEventListener('click', (e) => {
  if (!e.target.classList.contains('pagination-btn')) return;
  const page = e.target.dataset.page;
  if (e.target.dataset.type === 'filters') fetchFilters(currentFilter, page);
  else fetchExercises(currentFilter, currentCategory, page);
});

searchForm?.addEventListener('submit', (e) => {
  e.preventDefault();
  fetchExercises(currentFilter, currentCategory, 1, document.querySelector('#search-input').value.trim());
});

// СТАРТ
fetchQuote();
fetchFilters();