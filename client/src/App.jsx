import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AppLoader } from './components/baseComponents/AppLoader';
import './assets/css/style.css'

const App = () => {
  const Login = React.lazy(() => import('./pages/Login'));
  const Signup = React.lazy(() => import('./pages/Signup'));
  const Home = React.lazy(() => import('./pages/Home'));
  const NotFound = React.lazy(() => import('./pages/NotFound'));
  return (
    <Router>
      <Suspense fallback={<AppLoader />}>
        <Routes>
          <Route index={true} path="/" element={<Navigate to={`/login`} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path='*' element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App