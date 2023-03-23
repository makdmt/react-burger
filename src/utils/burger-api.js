const apiUrl = 'https://norma.nomoreparties.space/api';

function checkResponse(res) {
  if (res.ok) return res.json();
  return Promise.reject(res.status)
}

async function getIngredients() {
  return fetch(`${apiUrl}/ingredients`)
    .then(res => checkResponse(res))
}

async function postOrder(ingredientsId) {
  return fetch(`${apiUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      ingredients: ingredientsId
    }),
  })
    .then(res => checkResponse(res))
}


export { getIngredients, postOrder }
