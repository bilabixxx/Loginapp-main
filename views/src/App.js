import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn/SignIn";
import SignUp from './pages/Signup/SignUp';
import Dashboard from './pages/Dashboard/Dashboard';
import "bootstrap/dist/css/bootstrap.min.css"
import ProtectedRoutes from "./components/ProtectedRoutes/ProtectedRoutes";
import PageNotFound from "./pages/PageNotFound/PageNotFound";
import Edit from "./pages/Edit/Edit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path="/" element={<ProtectedRoutes />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="edit" element={<Edit />} />
        </Route>
        <Route path="/*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
