import Producto from './Producto.js';

class ProductoPerecedero extends Producto {
  constructor(id, nombre, descripcion, precio, stock, categoria, fechaVencimiento) {
    super(id, nombre, descripcion, precio, stock, categoria);

    this._fechaVencimiento = new Date(fechaVencimiento);
  }

  getFechaVencimiento() {
    return this._fechaVencimiento;
  }

  estaVencido() {
    const ahora = new Date();
    return ahora > this._fechaVencimiento;
  }

  diasHastaVencimiento() {
    const ahora = new Date();
    const diferencia = this._fechaVencimiento - ahora;
    return Math.floor(diferencia / (1000 * 60 * 60 * 24));
  }

  vender(cantidad) {
    if (this.estaVencido()) {
      console.warn(`⚠ Producto ${this.getNombre()} está vencido`);
      return false;
    }

    return super.vender(cantidad);
  }

  toJSON() {
    const productoBase = super.toJSON();

    return {
      ...productoBase,
      fechaVencimiento: this._fechaVencimiento.toISOString(),
      diasHastaVencimiento: this.diasHastaVencimiento(),
      estaVencido: this.estaVencido(),
      tipo: 'ProductoPerecedero'
    };
  }
}

export default ProductoPerecedero;