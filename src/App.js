import "antd/dist/antd.min.css"
import * as React from "react"
import * as _ from "lodash"
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useAuth } from '../src/contexts/AuthContext'

import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from './pages/Login'
import HomepagePage from './pages/Homepage';
import AdministratorPage from "./pages/Administrator";
import ForgotPasswordPage from "./pages/ForgotPassword";
import CreateUserPage from "./pages/Createuser";
import MenuItemizer from "./pages/Header";
import HeaderNoLogin from "./pages/HeaderNoLogin";
import FooterItem from "./pages/Footer";

function App() {
  const { currentUser } = useAuth()

  return (
    <div className="App">
      {_.isNil(currentUser) ? <HeaderNoLogin/> : <MenuItemizer/>}
        <Routes>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<LoginPage />} />
          <Route path="/homepage" element={<HomepagePage />} />
          <Route path="/administrator" element={<AdministratorPage />} />
        </Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="/createUser" element={<CreateUserPage />} />
        </Routes>
      <FooterItem/>
    </div>
      
  )
}

export default App;
