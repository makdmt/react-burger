import React from "react";

import { useSelector, useDispatch } from '../../services/types/index';
import { fetchUserInfo, RESET_AUTH_STATE } from "../../services/actions/userAuth";
import { getCookie } from "../../utils/cookie-set-get";

import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';

export const ProtectedRouteElement = ({element}: {element?: JSX.Element}): JSX.Element | null => {

  const dispatch = useDispatch();
  const { fetchUserInfoRequest, fetchUserInfoFailed, updateAccessTokenRequest, logoutSuccess, authUser } = useSelector(state => state.userAuth);

  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!!getCookie('refreshToken')) {
      dispatch(fetchUserInfo())
    } else {
      navigate('/login', { replace: true, state: { navigateAfter: location?.state?.navigateAfter, loginMessage: location?.state?.loginMessage } })
    }
  }, [dispatch])


  React.useEffect(() => { authUser && location?.state?.navigateAfter && navigate(location.state.navigateAfter, { replace: true, state: {} }) }, [dispatch, authUser])
  React.useEffect(() => { !fetchUserInfoRequest && fetchUserInfoFailed && navigate('/login', { replace: true, state: { navigateAfter: location?.state?.navigateAfter, loginMessage: location?.state?.loginMessage } }) }, [dispatch, fetchUserInfoRequest, fetchUserInfoFailed])
  React.useEffect(() => {
    if (logoutSuccess) {
      navigate('/', { replace: true });
      dispatch({ type: RESET_AUTH_STATE });
    }
  }, [dispatch, logoutSuccess])


  if (fetchUserInfoRequest || updateAccessTokenRequest) return (<>Загрузка...</>)
  if (authUser && !!element) return element
  return null;
}
