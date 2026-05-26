import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";

import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";

import Inventario from "../pages/Inventario";
import ProductoForm from "../pages/ProductForm";

import Clientes from "../pages/Clientes";
import ClienteForm from "../pages/ClienteForm";

import VentaList from "../pages/ventas/VentaList";
import VentaForm from "../pages/ventas/VentaForm";

export default function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

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

        <Route
          path="/clientes"
          element={<Clientes />}
        />

        <Route
          path="/clientes/nuevo"
          element={<ClienteForm />}
        />

        <Route
          path="/clientes/:id/editar"
          element={<ClienteForm />}
        />

        {/* ========================= */}
        {/* RUTAS VENTAS */}
        {/* ========================= */}

        <Route
          path="/ventas"
          element={<VentaList />}
        />

        <Route
          path="/ventas/nueva"
          element={<VentaForm />}
        />

      </Routes>

    </BrowserRouter>

  );

}