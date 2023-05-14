import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchUserInfo, updateAccessToken, RESET_AUTH_STATE } from "../../services/actions/userAuth";

import { Link, Navigate, useNavigate, useLocation } from 'react-router-dom';

export function ProtectedRouteElement({element}) {

  const dispatch = useDispatch();
  const {fetchUserInfoRequest, fetchUserInfoFailed, updateAccessTokenRequest, updateAccessTokenSuccess, updateAccessTokenFailed, logoutSuccess, authUser} = useSelector(state => state.userAuth);

  const location = useLocation();
  const navigate = useNavigate();

  React.useEffect(() => {dispatch(fetchUserInfo())}, [dispatch])
  React.useEffect(() => {fetchUserInfoFailed && dispatch(updateAccessToken())}, [dispatch, fetchUserInfoFailed])
  React.useEffect(() => {updateAccessTokenSuccess && dispatch(fetchUserInfo())}, [dispatch, updateAccessTokenSuccess])

  React.useEffect(() => {authUser && location?.state?.navigateAfter && navigate(location.state.navigateAfter, {replace: true, state: {}})}, [dispatch, authUser])
  React.useEffect(() => { !fetchUserInfoRequest && !updateAccessTokenRequest && fetchUserInfoFailed && updateAccessTokenFailed && navigate('/login', {replace: true, state: {navigateAfter: location?.state?.navigateAfter, loginMessage: location?.state?.loginMessage}})}, [dispatch, fetchUserInfoRequest, updateAccessTokenRequest, updateAccessTokenFailed, fetchUserInfoFailed])
  React.useEffect(() => {
    if (logoutSuccess) {
      navigate('/', {replace: true});
      dispatch({type: RESET_AUTH_STATE});
    }}, [dispatch, logoutSuccess])


  if (fetchUserInfoRequest || updateAccessTokenRequest) return (<>Загрузка...</>)
  if (authUser) return element
  // if (!authUser) return <Navigate to="/" replace/>
  // if (!fetchUserInfoRequest && !updateAccessTokenRequest && fetchUserInfoFailed && updateAccessTokenFailed) return <Navigate to="/login" replace/>
}
