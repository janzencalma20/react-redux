import React, { Suspense, lazy } from 'react'
import { Navigate, useRoutes, useLocation } from 'react-router-dom'
// layouts
import DashboardLayout from '../customLayouts/dashboard'
import LogoOnlyLayout from '../customLayouts/LogoOnlyLayout'
// components
import LoadingScreen from '../customComponents/LoadingScreen'

import GuestGuard from "../guards/GuestGuard";

import MainLayout from "../layouts/main";

import ComponentAuthGuard from "../guards/ComponentAuthGuard";

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed',
            }),
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  )
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'password/reset/confirm/:uid/:token', element: <ResetPasswordConfirm /> },
        { path: 'verify', element: <VerifyCode /> }
      ]
    },
    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <DashboardLayout />
      ),
      children: [
        { path: '', element: <Navigate to="/auth/login" replace /> },
        { path: 'projects', element: (<ComponentAuthGuard><ProjectDashboard /></ComponentAuthGuard>)},
        { path: 'modelTree', element: (<ComponentAuthGuard><ModelTree /></ComponentAuthGuard>)},
        { path: 'dimensions', element: <ComponentAuthGuard><Dimensions /></ComponentAuthGuard> },
        { path: 'keyDimensions', element: <ComponentAuthGuard><keyDimensions/></ComponentAuthGuard> },
        { path: 'cooling', element: <ComponentAuthGuard><Cooling /></ComponentAuthGuard> },
        { path: 'losses', element: <ComponentAuthGuard><Losses /></ComponentAuthGuard> },
        // { path: 'lptn', element: <ComponentAuthGuard><Lptn /></ComponentAuthGuard> },
        // { path: 'fea', element: <ComponentAuthGuard><Fea /></ComponentAuthGuard> },
        // { path: 'cfd', element: <ComponentAuthGuard><Cfd /></ComponentAuthGuard> },
        { path: 'results', element: <ComponentAuthGuard><Results /></ComponentAuthGuard> },
        { path: 'change-password', element: <ComponentAuthGuard><ChangePassword /></ComponentAuthGuard> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
        element:<MainLayout/>,
        children: [
          {path: '/',element: <LandingPage/>}
        ]
      // element: <Navigate to="/dashboard" replace />,
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ])
}

// IMPORT COMPONENTS

//AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
// const Login=Loadable(lazy(()=>import('../pages/Users/Login')))
// const Register=Loadable(lazy(()=>import('../pages/Users/Signup')))
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));
const ResetPasswordConfirm = Loadable(lazy(() => import('../pages/authentication/ResetPasswordConfirm')));
const ChangePassword = Loadable(lazy(() => import('../pages/Users/changePassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
const LandingPage = Loadable(lazy(() => import('../pages/LandingPage')));

// Dashboard
const ProjectDashboard = Loadable(lazy(() => import('../pages/project')));
const ModelTree = Loadable(lazy(() => import('../pages/ModelTree')));
const Dimensions = Loadable(lazy(() => import('../pages/Dimensions')));
const Cooling = Loadable(lazy(() => import('../pages/Cooling')));
const Losses = Loadable(lazy(() => import('../pages/Losses')));
// const Lptn = Loadable(lazy(() => import('../pages/Lptn')))
// const Fea = Loadable(lazy(() => import('../pages/Fea')))
// const Cfd = Loadable(lazy(() => import('../pages/Cfd')))
const Results = Loadable(lazy(() => import('../pages/Results')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
