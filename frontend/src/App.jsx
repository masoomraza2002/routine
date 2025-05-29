// frontend/src/App.jsx
import { Routes, Route, Navigate } from "react-router-dom"; 
import Login from "./pages/Login/Login.jsx"
import Register from "./pages/register/Register.jsx";
import Home from "./pages/home/Home.jsx"; 
import Entry from "./pages/entry/Entries.jsx";
import Routine from "./pages/routine/Routines.jsx";
import Meal from "./pages/meal/Meal.jsx";
import { useContext } from "react";
import { AuthContext } from "./authContext.jsx";
import Landing from "./pages/Landing/Landing.jsx"; 
import Navbar from "./components/Navbar/Navbar.jsx"
import Footer from "./components/Footer/Footer.jsx";

function App() {
    const { user } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
        if (!user) { 
            return <Navigate to="/login" replace state={{ from: window.location.pathname }} />;
        }
        return children;
    };

    return (
        <>
            <Navbar />  
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} /> 
                <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
                <Route path="/entries" element={<ProtectedRoute><Entry /></ProtectedRoute>} />
                <Route path="/meals" element={<ProtectedRoute><Meal /></ProtectedRoute>} />
                <Route path="/routines" element={<ProtectedRoute><Routine /></ProtectedRoute>} />
 
                <Route path="*" element={<h1>404 - Page Not Found</h1>} />
            </Routes>
            <Footer /> 
        </>
    );
}

export default App;
