import "antd/dist/antd.min.css"
import * as React from "react"
import * as _ from "lodash"
import { Route, Routes } from 'react-router-dom'
import { useAuth } from '../src/contexts/AuthContext'

// Imports for pages
import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from './pages/Login'
import HomepagePage from './pages/Homepage';
import AdministratorPage from "./pages/Administrator";
import ForgotPasswordPage from "./pages/ForgotPassword";
import CreateUserPage from "./pages/Createuser";
import { ConfigProvider } from "antd";
import MenuItemizer from "./pages/Header";
import HeaderNoLogin from "./pages/HeaderNoLogin";
import FooterItem from "./pages/Footer";

function App() {
  // Brings in whether the current user is logged in or not
  const { currentUser } = useAuth()

  return (
        <ConfigProvider
          getPopupContainer={(node) => {
            if (node) {
              return node.parentNode;
            }
            return document.body;
          }}
        >
    <div className="App">
      {_.isNil(currentUser) ? <HeaderNoLogin/> : <MenuItemizer/>}
        <Routes>
        <Route element={<ProtectedRoute />}>
          {/* Pages that are only visible when logged in */}
          <Route path="/" element={<LoginPage />} />
          <Route path="/homepage" element={<HomepagePage />} />
          <Route path="/administrator" element={<AdministratorPage />} />
        </Route>
        {/* Pages that are visible without login */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/forgotPassword" element={<ForgotPasswordPage />} />
          <Route path="/createUser" element={<CreateUserPage />} />
        </Routes>
      <FooterItem/>
    </div>
    </ConfigProvider>
  )
}

export default App;
