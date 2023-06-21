import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../../services/actions/burgerConstructor';

import { BrowserRouter, Routes, Route, useLocation, useSearchParams } from 'react-router-dom';

import { searchParamsToObject } from '../../utils/url-decoding';
import { addIngredientToConstructor, RESET_BURGER } from '../../services/actions/burgerConstructor';
import { fetchUserInfo } from '../../services/actions/userAuth';
import { getCookie } from '../../utils/cookie-set-get';

import { WS_FEED_CONNECTION_START, WS_FEED_CONNECTION_CLOSED } from '../../services/actions/wsFeed';

import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';

import { MainPage } from '../../pages/main-page';
import { FeedPage } from '../../pages/feed-page';
import { ProfilePage } from '../../pages/profile-page';
import { UserOrdersPage } from '../../pages/user-orders-page';
import { IngredientPage } from '../../pages/ingredient-page';


import { AuthPage } from '../../pages/auth-page';
import { RegisterForm } from '../register-form/register-form';
import { LoginForm } from '../login-form/login-form';
import { ForgotPasswordForm } from '../forgot-password-form/forgot-password-form';
import { ResetPasswordForm } from '../reset-password-form/reset-password-form';

import { NotFound404Page } from '../../pages/not-found404-page';

import { ModalIngredientDetails } from '../modal-ingredient-details/modal-ingredient-details';
import { ModalHistOrderDetails } from '../modal-hist-order-details/modal-hist-order-details';
import { OrderHistPage } from '../../pages/order-hist-page';
import { UserOrderHistPage } from '../../pages/user-order-hist-page';


function App(): JSX.Element {

  React.useEffect(() => {
    fetch(`http://127.0.0.1:3000/parse`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // 'Content-Type': 'text/plain'
      },
      body: JSON.stringify({
        domainName: 'https://test.com/'
      }),
    })
      .then(res => console.log(res))
  })

  // React.useEffect(async () => {
  //   const res = await axios.post('http://127.0.0.1:3001/', {
  //     answer: 42
  //   });
  //   res.data;
  // })

  // React.useEffect(() => {
  //   fetch(`http://127.0.0.1:3001`)
  //     .then(res => console.log(res))
  // },[])

const location = useLocation();

const background = location.state?.background || null;

const { items: allIngredients, currentBurgerItems } = useSelector(store => store.burgerConstructor);
const dispatch = useDispatch();

React.useEffect(() => {
  dispatch(getItems());
  if (!!getCookie('refreshToken')) {
    dispatch(fetchUserInfo())
  }
}, [dispatch])


const initialUrlParams = React.useRef(location.search);

// React.useEffect(() => {
//   console.log('app смонтировался')
// }, [])

React.useEffect(() => {
  if (currentBurgerItems.length === 0) {
    dispatch({ type: RESET_BURGER })
    if (!!allIngredients.length && initialUrlParams.current.length > 0 && initialUrlParams.current.length < 400) {
      const burgerConfigFromUrl = searchParamsToObject(initialUrlParams.current);
      // console.log(burgerConfigFromUrl);
      for (let key in burgerConfigFromUrl) {
        // console.log(`${key} значение ${burgerConfigFromUrl[key]}`)
        for (let i = 0; i < Math.min(3, burgerConfigFromUrl[key]); i++) {
          // console.log(`${key} значение ${burgerConfigFromUrl[key]}`)
          allIngredients.some(ingredient => ingredient._id === key) && dispatch(addIngredientToConstructor(key, allIngredients));
        }
      }
    }
  }
}, [allIngredients])


React.useEffect(() => {
  dispatch({ type: WS_FEED_CONNECTION_START });
  return () => dispatch({ type: WS_FEED_CONNECTION_CLOSED });
}, [])


return (
  //  <BrowserRouter>
  <Routes>
    <Route path="/" element={<MainPage />} />
    {background && <Route path="/" element={<MainPage />}>
      <Route path="/ingredients/:id" element={<ModalIngredientDetails />} />
    </Route>}
    {!background && <Route path="/ingredients/:id" element={<IngredientPage />} />}
    <Route path="/feed" element={<FeedPage />} />
    {background && <Route path="/feed" element={<FeedPage />}>
      <Route path="/feed/:id" element={<ModalHistOrderDetails />} />
    </Route>}
    {!background && <Route path="/feed/:id" element={<OrderHistPage />} />}
    <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />
    <Route path="/profile/orders" element={<ProtectedRouteElement element={<UserOrdersPage />} />} />
    {background && <Route path="/profile/orders" element={<ProtectedRouteElement element={<UserOrdersPage />} />}>
      <Route path="/profile/orders/:id" element={<ModalHistOrderDetails />} />
    </Route>}
    {!background && <Route path="/profile/orders/:id" element={<UserOrderHistPage />} />}
    <Route path="/login" element={<AuthPage children={<LoginForm />} />} />
    <Route path="/register" element={<AuthPage children={<RegisterForm />} />} />
    <Route path="/forgot-password" element={<AuthPage children={<ForgotPasswordForm />} />} />
    <Route path="/reset-password" element={<AuthPage children={<ResetPasswordForm />} />} />
    <Route path="/auth" element={<ProtectedRouteElement />} />
    <Route path="*" element={<NotFound404Page />} />
  </Routes>

  // </BrowserRouter>
);
}

export default App;
