import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  CHeader,
  CToggler,
  CHeaderBrand,
  CHeaderNav,
  CHeaderNavItem,
  CHeaderNavLink,
  CSubheader,
  CBreadcrumbRouter,
  CLink
} from '@coreui/react'
import CIcon from '@coreui/icons-react'

// routes config
import routes from '../routes'

import {
  TheHeaderDropdown,
  TheHeaderDropdownMssg,
  TheHeaderDropdownNotif,
  TheHeaderDropdownTasks
} from './index'

import { toggleSideBar } from '../Redux/sidebarSlice'
import userManager from 'src/Helper/userManager'

const TheHeader = () => {
  const dispatch = useDispatch()
  const sidebarShow = useSelector(state => state.sidebar.sidebarShow)

  const mytoggleSidebar = () => {
    const val = [true, 'responsive'].includes(sidebarShow) ? false : 'responsive'
    dispatch(toggleSideBar(val))
  }

  const toggleSidebarMobile = () => {
    const val = [false, 'responsive'].includes(sidebarShow) ? true : 'responsive'
    dispatch(toggleSideBar(val))
  }

  ////
  const onLoginButtonClick = event => {
    event.preventDefault();
    userManager.signinRedirect();
  };

  const onLogoutButtonClick = event => {
    event.preventDefault();
    userManager.signoutRedirect({ id_token_hint: user.id_token });
    userManager.removeUser(); // removes the user data from sessionStorage
  };

  const user = useSelector(state => state.oidc.user)
  //const expier = useSelector(state => state.oidc.user.expired)
  const isAuthenticated = user && !user.expired
  const isAdmin = isAuthenticated && user.profile['role'] === 'Admin';
  console.log({user})

  return (
    <CHeader withSubheader>
      <CToggler
        inHeader
        className="ml-md-3 d-lg-none"
        onClick={toggleSidebarMobile}
      />
      <CToggler
        inHeader
        className="ml-3 d-md-down-none"
        onClick={mytoggleSidebar}
      />
      <CHeaderBrand className="mx-auto d-lg-none" to="/">
        <CIcon name="logo" height="48" alt="Logo" />
        
      </CHeaderBrand>

      <CHeaderNav className="d-md-down-none mr-auto">
        <CHeaderNavItem className="px-3" >
          <CHeaderNavLink to="/dashboard">Dashboard</CHeaderNavLink>
        </CHeaderNavItem>
        {isAuthenticated ? (
          <div>
            <div className="text-primary" to="/profile">
              {user.profile.given_name}
            </div>
          </div>
        ) : (
          <React.Fragment />
        )}
        <div>
          <button
            className="btn btn-primary"
            onClick={
              isAuthenticated ? onLogoutButtonClick : onLoginButtonClick
            }
          >
            {isAuthenticated ? 'Log Out' : 'Log In'}
          </button>
        </div>
        {isAdmin ? (
          <div>
            <button className="btn btn-warning">Admin</button>
          </div>
        ) : (
          <React.Fragment />
        )}
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink to="/users">Users</CHeaderNavLink>
        </CHeaderNavItem>
        <CHeaderNavItem className="px-3">
          <CHeaderNavLink>Settings</CHeaderNavLink>
        </CHeaderNavItem>
      </CHeaderNav>

      <CHeaderNav className="px-3">
        <TheHeaderDropdownNotif />
        <TheHeaderDropdownTasks />
        <TheHeaderDropdownMssg />
        <TheHeaderDropdown />
      </CHeaderNav>

      <CSubheader className="px-3 justify-content-between">
        <CBreadcrumbRouter
          className="border-0 c-subheader-nav m-0 px-0 px-md-3"
          routes={routes}
        />
        <div className="d-md-down-none mfe-2 c-subheader-nav">
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-speech" alt="Settings" />
          </CLink>
          <CLink
            className="c-subheader-nav-link"
            aria-current="page"
            to="/dashboard"
          >
            <CIcon name="cil-graph" alt="Dashboard" />&nbsp;Dashboard
          </CLink>
          <CLink className="c-subheader-nav-link" href="#">
            <CIcon name="cil-settings" alt="Settings" />&nbsp;Settings
          </CLink>
        </div>
      </CSubheader>
    </CHeader>
  )
}

export default TheHeader
