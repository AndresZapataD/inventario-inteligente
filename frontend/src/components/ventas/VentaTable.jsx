import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Box,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Tooltip
} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ventaService from "../../services/ventaService";

export default function VentaTable({ ventas = [], onVentasUpdate = null }) {

  const navigate = useNavigate();
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedVenta, setSelectedVenta] = useState(null);

  const handleEdit = (id) => {
    navigate(`/ventas/editar/${id}`);
  };

  const handleViewDetails = (venta) => {
    setSelectedVenta(venta);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedVenta(null);
  };

  const handleDelete = async (id) => {
    if (window.confirm("¿Está seguro que desea eliminar esta venta?")) {
      try {
        await ventaService.delete(id);
        if (onVentasUpdate) {
          onVentasUpdate();
        }
        alert("Venta eliminada exitosamente");
      } catch (error) {
        alert("Error al eliminar la venta: " + error.message);
      }
    }
  };

  const getEstadoColor = (estado) => {
    switch (estado) {
      case "PAGADA":
        return { color: "success", icon: "✓" };
      case "PENDIENTE":
        return { color: "warning", icon: "⏱" };
      case "ANULADA":
        return { color: "error", icon: "✕" };
      default:
        return { color: "default", icon: "−" };
    }
  };

  return (
    <>
      {ventas.length === 0 ? (
        <Box sx={{ 
          p: 4, 
          textAlign: "center",
          borderRadius: 2,
          backgroundColor: "#f5f5f5"
        }}>
          <Typography variant="h6" color="textSecondary" sx={{ mb: 1 }}>
            📭 Sin resultados
          </Typography>
          <Typography color="textSecondary">
            No hay ventas que coincidan con los filtros seleccionados
          </Typography>
        </Box>
      ) : (
        <TableContainer sx={{ borderRadius: 1, overflow: "hidden" }}>
          <Table>
            <TableHead>
              <TableRow sx={{ 
                backgroundColor: "#667eea",
                "& th": { color: "white", fontWeight: "bold" }
              }}>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>ID</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Cliente</TableCell>
                <TableCell align="right" sx={{ color: "white", fontWeight: "bold" }}>Total</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Método Pago</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Estado</TableCell>
                <TableCell sx={{ color: "white", fontWeight: "bold" }}>Fecha</TableCell>
                <TableCell align="center" sx={{ color: "white", fontWeight: "bold" }}>Acciones</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {ventas.map((venta, index) => (
                <TableRow 
                  key={venta.id} 
                  hover
                  sx={{
                    backgroundColor: index % 2 === 0 ? "#ffffff" : "#f9f9f9",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#f0f0f7",
                      boxShadow: "inset 0 0 10px rgba(102, 126, 234, 0.1)"
                    }
                  }}
                >
                  <TableCell sx={{ fontWeight: "bold", color: "#667eea" }}>
                    #{venta.id}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" sx={{ fontWeight: 500 }}>
                      {venta.Cliente?.nombre || "Sin cliente"}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" sx={{ fontWeight: "bold", color: "#28a745" }}>
                      ${parseFloat(venta.total).toFixed(2)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={venta.metodoPago || "No especificado"}
                      size="small"
                      variant="outlined"
                      sx={{ 
                        borderColor: "#667eea",
                        color: "#667eea",
                        fontWeight: 500
                      }}
                    />
                  </TableCell>

                  <TableCell>
                    <Chip 
                      label={venta.estado === "PAGADA" ? "Pagada" : venta.estado === "PENDIENTE" ? "Pendiente" : "Anulada"}
                      color={getEstadoColor(venta.estado).color}
                      variant="filled"
                      size="small"
                      sx={{ fontWeight: "bold" }}
                    />
                  </TableCell>

                  <TableCell>
                    <Typography variant="body2">
                      {venta.createdAt
                        ? new Date(venta.createdAt).toLocaleDateString("es-ES")
                        : "-"}
                    </Typography>
                  </TableCell>

                  <TableCell align="center">
                    <Tooltip title="Ver detalles">
                      <IconButton
                        size="small"
                        color="info"
                        onClick={() => handleViewDetails(venta)}
                        sx={{
                          backgroundColor: "#e3f2fd",
                          "&:hover": { backgroundColor: "#bbdefb" }
                        }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Editar">
                      <IconButton
                        size="small"
                        color="primary"
                        onClick={() => handleEdit(venta.id)}
                        sx={{
                          backgroundColor: "#e8f5e9",
                          "&:hover": { backgroundColor: "#c8e6c9" }
                        }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Eliminar">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDelete(venta.id)}
                        sx={{
                          backgroundColor: "#ffebee",
                          "&:hover": { backgroundColor: "#ffcdd2" }
                        }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Dialog para ver detalles */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ 
          backgroundColor: "#667eea", 
          color: "white",
          fontWeight: "bold"
        }}>
          📋 Detalles de la Venta
        </DialogTitle>
        <DialogContent>
          {selectedVenta && (
            <Box sx={{ mt: 3, display: "flex", flexDirection: "column", gap: 2 }}>
              <Box sx={{ 
                p: 2, 
                backgroundColor: "#f5f5f5",
                borderRadius: 1,
                borderLeft: "4px solid #667eea"
              }}>
                <Typography variant="caption" color="textSecondary" sx={{ display: "block", mb: 0.5 }}>
                  ID de Venta
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  #{selectedVenta.id}
                </Typography>
              </Box>

              <Box sx={{ 
                p: 2, 
                backgroundColor: "#f5f5f5",
                borderRadius: 1,
                borderLeft: "4px solid #667eea"
              }}>
                <Typography variant="caption" color="textSecondary" sx={{ display: "block", mb: 0.5 }}>
                  Cliente
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {selectedVenta.Cliente?.nombre || "Sin cliente"}
                </Typography>
              </Box>

              <Box sx={{ 
                p: 2, 
                backgroundColor: "#f5f5f5",
                borderRadius: 1,
                borderLeft: "4px solid #28a745"
              }}>
                <Typography variant="caption" color="textSecondary" sx={{ display: "block", mb: 0.5 }}>
                  Total
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#28a745" }}>
                  ${parseFloat(selectedVenta.total).toFixed(2)}
                </Typography>
              </Box>

              <Box sx={{ 
                p: 2, 
                backgroundColor: "#f5f5f5",
                borderRadius: 1,
                borderLeft: "4px solid #667eea"
              }}>
                <Typography variant="caption" color="textSecondary" sx={{ display: "block", mb: 0.5 }}>
                  Método de Pago
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {selectedVenta.metodoPago || "No especificado"}
                </Typography>
              </Box>

              <Box sx={{ 
                p: 2, 
                backgroundColor: "#f5f5f5",
                borderRadius: 1,
                borderLeft: "4px solid #667eea"
              }}>
                <Typography variant="caption" color="textSecondary" sx={{ display: "block", mb: 0.5 }}>
                  Estado
                </Typography>
                <Chip 
                  label={selectedVenta.estado === "PAGADA" ? "Pagada" : selectedVenta.estado === "PENDIENTE" ? "Pendiente" : "Anulada"}
                  color={getEstadoColor(selectedVenta.estado).color}
                  sx={{ fontWeight: "bold" }}
                />
              </Box>

              <Box sx={{ 
                p: 2, 
                backgroundColor: "#f5f5f5",
                borderRadius: 1,
                borderLeft: "4px solid #667eea"
              }}>
                <Typography variant="caption" color="textSecondary" sx={{ display: "block", mb: 0.5 }}>
                  Fecha
                </Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {selectedVenta.createdAt
                    ? new Date(selectedVenta.createdAt).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric"
                      })
                    : "-"}
                </Typography>
              </Box>

              {selectedVenta.DetalleVentas && selectedVenta.DetalleVentas.length > 0 && (
                <Box sx={{ 
                  p: 2, 
                  backgroundColor: "#f5f5f5",
                  borderRadius: 1,
                  borderLeft: "4px solid #667eea"
                }}>
                  <Typography variant="caption" color="textSecondary" sx={{ display: "block", mb: 1 }}>
                    Productos
                  </Typography>
                  {selectedVenta.DetalleVentas.map((detalle, idx) => (
                    <Box key={idx} sx={{ 
                      p: 1, 
                      mb: 1,
                      backgroundColor: "white",
                      borderRadius: 0.5,
                      borderLeft: "3px solid #667eea"
                    }}>
                      <Typography variant="body2" sx={{ fontWeight: 500 }}>
                        {detalle.Producto?.nombre}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        Cantidad: {detalle.cantidad} | Subtotal: ${parseFloat(detalle.subtotal).toFixed(2)}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleCloseDialog} variant="contained" sx={{ backgroundColor: "#667eea" }}>
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}