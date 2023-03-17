const apiUrl = 'https://norma.nomoreparties.space/api';

function checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(res.status)
}

async function getIngredients() {
  return fetch(`${apiUrl}/ingredients`)
    .then(res => checkResponse(res))
}

export { getIngredients }
