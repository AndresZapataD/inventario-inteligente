class Producto {
  constructor(id, nombre, descripcion, precio, stock, categoria) {
    this._id = id;
    this._nombre = nombre;
    this._descripcion = descripcion;
    this._precio = precio;
    this._stock = stock;
    this._categoria = categoria;
    this._fechaCreacion = new Date();
  }

  getId() {
    return this._id;
  }

  getNombre() {
    return this._nombre;
  }

  getDescripcion() {
    return this._descripcion;
  }

  getPrecio() {
    return this._precio;
  }

  getStock() {
    return this._stock;
  }

  getCategoria() {
    return this._categoria;
  }

  getFechaCreacion() {
    return this._fechaCreacion;
  }

  setNombre(nombre) {
    if (!nombre || nombre.trim() === '') {
      throw new Error('El nombre no puede estar vacío');
    }

    this._nombre = nombre;
  }

  setPrecio(precio) {
    if (precio < 0) {
      throw new Error('El precio no puede ser negativo');
    }

    this._precio = precio;
  }

  setStock(stock) {
    if (stock < 0) {
      throw new Error('El stock no puede ser negativo');
    }

    this._stock = stock;
  }

  vender(cantidad) {
    if (cantidad > this._stock) {
      return false;
    }

    this._stock -= cantidad;
    return true;
  }

  reabastecer(cantidad) {
    if (cantidad < 0) {
      throw new Error('La cantidad a reabastecer debe ser positiva');
    }

    this._stock += cantidad;
  }

  toJSON() {
    return {
      id: this._id,
      nombre: this._nombre,
      descripcion: this._descripcion,
      precio: this._precio,
      stock: this._stock,
      categoria: this._categoria,
      fechaCreacion: this._fechaCreacion.toISOString(),
      tipo: 'Producto'
    };
  }
}

export default Producto;