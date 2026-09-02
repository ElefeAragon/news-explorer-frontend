const BASE_URL = "https://nomoreparties.co/news/v2";
const API_KEY = import.meta.env.VITE_NEWS_API_KEY;

function getDateDaysAgo(days) {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString().split("T")[0];
}

function getToday() {
  return new Date().toISOString().split("T")[0];
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Error: ${res.status}`);
}

export function searchNews(query) {
  const from = getDateDaysAgo(7);
  const to = getToday();

  const url = `${BASE_URL}/everything?q=${encodeURIComponent(
    query,
  )}&from=${from}&to=${to}&pageSize=100&apiKey=${API_KEY}`;

  return fetch(url).then(checkResponse);
}
