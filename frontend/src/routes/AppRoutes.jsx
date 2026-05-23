import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Inventario from "../pages/Inventario";
import ProductoForm from "../pages/ProductForm";

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* LOGIN */}

        <Route
          path="/"
          element={<Login />}
        />

        {/* DASHBOARD */}

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        {/* INVENTARIO */}

        <Route
          path="/inventario"
          element={<Inventario />}
        />


        <Route
          path="/productos/nuevo"
          element={<ProductoForm />}
        />


        <Route
          path="/productos/editar/:id"
          element={<ProductoForm />}
        />

      </Routes>

    </BrowserRouter>
  );
}