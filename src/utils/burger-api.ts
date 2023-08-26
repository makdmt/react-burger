import { setCookie, getCookie } from './cookie-set-get'
import { IServerResponse, TResponseBody, IFetchRequest, IIngredient, IOrderDetails, TUserDataForm, TUserAuthForm, TUserDataServerResponce } from '../services/types/data';
import { TUserData } from '../services/types/data';

const apiUrl: string = 'https://norma.nomoreparties.space/api';
const apiAuthUrl: string = 'https://norma.nomoreparties.space/api/auth';


// function checkResponse(res: IServerResponse): Promise<any> {
//   if (res.ok) return res.json();
//   if (res.url === `${apiAuthUrl}/login` && res.status === 401) return res.json();
//   if (res.url === `${apiAuthUrl}/register` && res.status === 403) return res.json();
//   return Promise.reject(res.status);
// }

const checkResponse = (res: IServerResponse): Promise<TResponseBody | any> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

async function getIngredients(): Promise<TResponseBody<'data', Array<IIngredient>>> {
  return fetch(`${apiUrl}/ingredients`)
    .then(res => checkResponse(res))
}

async function postOrder(ingredientsId: ReadonlyArray<string>, accessToken: string ):Promise<TResponseBody<'order', IOrderDetails>> {
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

async function registrateNewUserPost({ email, password, name }: TUserDataForm): Promise<TResponseBody> {
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

async function authPost({ email, password }: TUserAuthForm): Promise<TResponseBody & { accessToken: string, refreshToken: string, user: TUserDataServerResponce }> {
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

async function logoutPost(refreshToken: string): Promise<TResponseBody> {
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

export const getUserInfoConf: {url: string, options: IFetchRequest} = {
  url: `${apiAuthUrl}/user`,
  options: {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      get authorization () { return getCookie('accessToken')},
    }
  }
}


async function getUserInfo(accessToken: string): Promise<IServerResponse> {
  return fetch(`${apiAuthUrl}/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'authorization': accessToken
    },
  })
  // .then(res => checkResponse(res))
}

export const patchUserInfoConf: {url: string, options: IFetchRequest & {body?: string}} = {
  url: `${apiAuthUrl}/user`,
  options: {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'authorization': getCookie('accessToken')
    }
  }
}

async function patchUserInfo(accessToken: string, { email, password, name }: TUserDataForm): Promise<IServerResponse> {
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

async function updateAccessTokenPost(refreshToken: string): Promise<TResponseBody<'accessToken' | 'refreshToken', string>> {
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

async function forgotUserPasswordPost({ email }: {email: string}): Promise<TResponseBody> {
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


async function resetUserPasswordPost({ password, token }: {password: string, token: string}): Promise<TResponseBody> {
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



const fetchWithRefresh = async (url: string, options: IFetchRequest): Promise<TResponseBody<'user', TUserDataServerResponce>> => {
  try {
    const res = await fetch(url, options); //делаем запрос
    return await checkResponse(res);
  } catch (err: any) {
    if (err.message === "jwt expired") {
      const refreshData = await updateAccessTokenPost(getCookie('refreshToken')); //обновляем токен
      setCookie('accessToken', refreshData.accessToken, { 'max-age': 12000, 'path': '/' })
      setCookie('refreshToken', refreshData.refreshToken, { 'max-age': 2500000, 'path': '/' })
      // localStorage.setItem("refreshToken", refreshData.refreshToken);
      // localStorage.setItem("accessToken", refreshData.accessToken); //(или в cookies)
      options.headers.authorization = refreshData.accessToken;
      const res = await fetch(url, options); //вызываем перезапрос данных
      return await checkResponse(res);
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
  getUserInfo,
  patchUserInfo,
  updateAccessTokenPost,
  forgotUserPasswordPost,
  resetUserPasswordPost,
  fetchWithRefresh
}
