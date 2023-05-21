import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getItems } from '../../services/actions/burgerConstructor';

import { BrowserRouter, Routes, Route, useLocation, useSearchParams } from 'react-router-dom';

import { searchParamsToObject } from '../../utils/url-decoding';
import { addIngredientToConstructor, RESET_BURGER } from '../../services/actions/burgerConstructor';
import { fetchUserInfo } from '../../services/actions/userAuth';
import { getCookie } from '../../utils/cookie-set-get';

import { ProtectedRouteElement } from '../protected-route-element/protected-route-element';

import { MainPage } from '../../pages/main-page';
import { ProfilePage } from '../../pages/profile-page';
import { UserOrders } from '../../pages/user-orders-page';
import { IngredientPage } from '../../pages/ingredient-page';


import { AuthPage } from '../../pages/auth-page';
import { RegisterForm } from '../register-form/register-form';
import { LoginForm } from '../login-form/login-form';
import { ForgotPasswordForm } from '../forgot-password-form/forgot-password-form';
import { ResetPasswordForm } from '../reset-password-form/reset-password-form';

import { NotFound404Page } from '../../pages/not-found404-page';


import { ModalIngredientDetails } from '../modal-ingredient-details/modal-ingredient-details';


function App(): JSX.Element {

  const location = useLocation();
  // console.log(location);

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


  return (
    //  <BrowserRouter>
    <Routes>
      <Route path="/" element={<MainPage />} />
      {background && <Route path="/" element={<MainPage />}>
        <Route path="/ingredients/:id" element={<ModalIngredientDetails />} />
      </Route>}
      {!background && <Route path="/ingredients/:id" element={<IngredientPage />} />}
      <Route path="/profile" element={<ProtectedRouteElement element={<ProfilePage />} />} />
      <Route path="/profile/orders" element={<ProtectedRouteElement element={<UserOrders />} />} />
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
