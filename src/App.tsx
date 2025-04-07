import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/HomePage';  
import RegisterPage from './pages/Register/RegisterPage';
import CreateClientProfilePage from './pages/ClientProfile/CreateClientProfilePage';
import CreateServiceProviderProfilePage from './pages/ServiceProviderProfile/CreateServiceProviderProfilePage';
import CategoryPage from './pages/CategoryPage';
import ServiceProviderProfilePage from './pages/ServiceProviderDashboard/ServiceProviderProfilePage';
import ViewProviderProfilePage from './pages/ViewProviderProfile/ViewProviderProfilePage';




function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white text-gray-800 scroll-smooth">
        <Navbar /> 
        
          <Routes> 
            <Route path="/" element={<HomePage />} /> 
            <Route path="/login" element={<LoginPage />} /> 
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/client-profile/create" element={<CreateClientProfilePage />} />
            <Route path="/serviceprofile/create" element={<CreateServiceProviderProfilePage />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/service-profile" element={<ServiceProviderProfilePage />} />
            <Route path="/service-provider/:id" element={<ViewProviderProfilePage />} />



   
          </Routes>
      </div>
    </Router>
  );
}

export default App;
