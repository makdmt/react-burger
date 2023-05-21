export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}


export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}


// const signIn = async form => {
//   const data = await loginRequest(form)
//     .then(res => {
//       let authToken;
//             // Ищем интересующий нас заголовок
//       res.headers.forEach(header => {
//         if (header.indexOf('Bearer') === 0) {
//                     // Отделяем схему авторизации от "полезной нагрузки токена",
//                     // Стараемся экономить память в куках (доступно 4кб)
//           authToken = header.split('Bearer ')[1];
//         }
//       });
//       if (authToken) {
//                 // Сохраняем токен в куку token
//         setCookie('token', authToken);
//       }
//       return res.json();
//     })
//     .then(data => data);

//   if (data.success) {
//         // Сохраняем пользователя в состояние приложения и нормализуем поле id (_id => id)
//     setUser({ ...data.user, id: data.user._id });
//   }
// };
