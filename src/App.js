import "antd/dist/antd.min.css"
import * as React from "react"
import { AuthProvider } from "./contexts/AuthContext"
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import ProtectedRoute from "./components/ProtectedRoute";
import LoginPage from './pages/Login'
import HomepagePage from './pages/Homepage';
import AdministratorPage from "./pages/Administrator";
import ForgotPasswordPage from "./pages/ForgotPassword";
import CreateUserPage from "./pages/Createuser";

function App() {
  return (
    <div className="App">
          <BrowserRouter>
            <AuthProvider>
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
            </AuthProvider>
         </BrowserRouter> 
      </div>
      
  )
}

export default App;
