import './css/styles.css'; // Або шлях до твого головного CSS
import './css/exercises.css';

import axios from 'axios';

console.log("🚀 Ура! JS працює, і axios готовий до бою!");

// Функція для отримання цитати дня (це найпростіше для старту)
async function getQuote() {
  try {
    const response = await axios.get('https://your-energy.b.goit.study/api/quote');
    console.log("Ось твоя цитата з сервера:", response.data);
  } catch (error) {
    console.error("Щось пішло не так із запитом:", error);
  }
}

getQuote();