const apiUrl = 'https://norma.nomoreparties.space/api';
const apiAuthUrl = 'https://norma.nomoreparties.space/api/auth';


function checkResponse(res) {
  if (res.ok) return res.json();
  if (res.url === `${apiAuthUrl}/login` && res.status === 401) return res.json();
  if (res.url === `${apiAuthUrl}/register` && res.status === 403) return res.json();
  return Promise.reject(res.status);
}

async function getIngredients() {
  return fetch(`${apiUrl}/ingredients`)
    .then(res => checkResponse(res))
}

async function postOrder(ingredientsId, accessToken) {
  return fetch(`${apiUrl}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    },
    body: JSON.stringify({
      ingredients: ingredientsId
    }),
  })
    .then(res => checkResponse(res))
}

async function registrateNewUserPost({email, password, name}) {
  return fetch(`${apiAuthUrl}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password,
      name
    }),
  })
  .then(res => checkResponse(res))
}

async function authPost({email, password}) {
  return fetch(`${apiAuthUrl}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email,
      password
    }),
  })
  .then(res => checkResponse(res))
}

async function logoutPost(refreshToken) {
  return fetch(`${apiAuthUrl}/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: refreshToken
    }),
  })
  .then(res => checkResponse(res))
}

async function getUserInfo(accessToken) {
  return fetch(`${apiAuthUrl}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    },
  })
  .then(res => checkResponse(res))
}

async function patchUserInfo(accessToken, {email, password, name}) {
  return fetch(`${apiAuthUrl}/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    },
    body: JSON.stringify({
      email,
      password,
      name
    }),
  })
  .then(res => checkResponse(res))
}

async function updateAccessTokenPost(refreshToken) {
  return fetch(`${apiAuthUrl}/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      token: refreshToken
    }),
  })
  .then(res => checkResponse(res))
}

async function forgotUserPasswordPost({email}) {
  return fetch(`${apiUrl}/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email
    }),
  })
  .then(res => checkResponse(res))
}


async function resetUserPasswordPost({password, token}) {
  return fetch(`${apiUrl}/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      password,
      token
    }),
  })
  .then(res => checkResponse(res))
}


export {
   getIngredients,
   postOrder,
   registrateNewUserPost,
   authPost,
   logoutPost,
   getUserInfo,
   patchUserInfo,
   updateAccessTokenPost,
   forgotUserPasswordPost,
   resetUserPasswordPost }
