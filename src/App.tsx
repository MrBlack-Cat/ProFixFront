import './i18n';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import LoginPage from './pages/Login/LoginPage';
import HomePage from './pages/HomePage/HomePage';  
import RegisterPage from './pages/Register/RegisterPage';
import CreateClientProfilePage from './pages/ClientProfile/CreateClient/CreateClientProfilePage';
import CreateServiceProviderProfilePage from './pages/ServiceProviderProfile/CreateServiceProviderProfilePage';
import CategoryPage from './pages/Category/CategoryPage';
import ServiceProviderProfilePage from './pages/ServiceProviderDashboard/ServiceProviderProfilePage';
import ViewProviderProfilePage from './pages/ViewProviderProfile/ViewProviderProfilePage';
import ClientProfilePage from './pages/ClientProfile/ClientProfilePage/ClientProfilePage';
import ViewClientProfilePage from './pages/ViewClientProfilePage/ViewClientProfilePage';
import ChatPage from './pages/ChatPage/ChatPage';
import MessagesPage from './pages/Messaging/MessagesPage';
import AllProvidersPage from './pages/AllProviders/AllProvidersPage';
import ChatPageChatBox from './pages/ChatPage/ChatPageChatBox'
import AllPostsPage from './pages/AllPostsPage/AllPostsPage';
// import AdminPanelPage from './pages/Admin/AdminLayout';


import AdminLayout from "./pages/Admin/AdminLayout";
import Dashboard from "./pages/Admin/Dashboard";
import Users from "./pages/Admin/Users";
import Providers from "./pages/Admin/Providers";
import Posts from "./pages/Admin/Posts";
import Reviews from "./pages/Admin/Reviews";
import Settings from "./pages/Admin/Settings";






function App() {
  return (
    
    <Router>
      <div className="min-h-screen bg-sky-100 text-gray-800 scroll-smooth">
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
            <Route path="/client-profile/" element={<ClientProfilePage />} />
            <Route path="/clients/:id" element={<ViewClientProfilePage />} />
            <Route path="/chat/:otherUserId" element={<ChatPage />} />
            <Route path="/messages" element={<MessagesPage />} />
            <Route path="/service-providers" element={<AllProvidersPage />} />
            <Route path="/chat" element={<ChatPageChatBox />} />
            <Route path="/posts" element={<AllPostsPage />} />


            //Admin routes 
          <Route path="/admin" element={<AdminLayout />}>
            <Route path="admin-dashboard" element={<Dashboard />} />
            <Route path="users" element={<Users />} />
            <Route path="providers" element={<Providers />} />
            <Route path="posts" element={<Posts />} />
            <Route path="reviews" element={<Reviews />} />
            <Route path="settings" element={<Settings />} />
            <Route path="*" element={<div className="text-center mt-10">404 - Page Not Found</div>} />
          </Route>   

   
          </Routes>
      </div>
    </Router>
  );
}

export default App;
