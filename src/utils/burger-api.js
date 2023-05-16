import { setCookie, getCookie, deleteCookie } from './cookie-set-get'

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

async function registrateNewUserPost({ email, password, name }) {
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

async function authPost({ email, password }) {
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

async function runWithTokenCheck(fetchWithTokenFunc) {
  return (
    fetchWithTokenFunc(getCookie('accessToken'))
      .then((res) => {
        if (res.status === 403 || res.status === 401) {
          // if (res.message === 'jwt expired') {
          return updateAccessTokenPost(getCookie('refreshToken'))
        }
        return res;
      })
      .then((res) => {
        if (res.url === `${apiAuthUrl}/token` && res.ok) {
          return res.json().then(res => {
            setCookie('accessToken', res.accessToken, { 'max-age': 1200, 'path': '/' })
            setCookie('refreshToken', res.refreshToken, { 'max-age': 2500000, 'path': '/' })
            return fetchWithTokenFunc(res.accessToken);
          })
        }
        return res;
      })
      .then(res => {
        // console.log(res)
        return checkResponse(res)
      })
  )
}


async function getUserInfo(accessToken) {
  return fetch(`${apiAuthUrl}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    },
  })
  // .then(res => checkResponse(res))
}

async function patchUserInfo(accessToken, { email, password, name }) {
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
    .then(res => res.json())
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

async function forgotUserPasswordPost({ email }) {
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


async function resetUserPasswordPost({ password, token }) {
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

const checkReponse = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options); //делаем запрос
    return await checkReponse(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await updateAccessTokenPost(getCookie('refreshToken')); //обновляем токен
      setCookie('accessToken', refreshData.accessToken, { 'max-age': 12000, 'path': '/' })
      setCookie('refreshToken', refreshData.refreshToken, { 'max-age': 2500000, 'path': '/' })

      // localStorage.setItem("refreshToken", refreshData.refreshToken);
      // localStorage.setItem("accessToken", refreshData.accessToken); //(или в cookies)
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //вызываем перезапрос данных
      return await checkReponse(res);
    } else {
      return Promise.reject(err);
    }
  }
};


export {
  getIngredients,
  postOrder,
  registrateNewUserPost,
  authPost,
  logoutPost,
  runWithTokenCheck,
  getUserInfo,
  patchUserInfo,
  updateAccessTokenPost,
  forgotUserPasswordPost,
  resetUserPasswordPost,
  fetchWithRefresh
}
