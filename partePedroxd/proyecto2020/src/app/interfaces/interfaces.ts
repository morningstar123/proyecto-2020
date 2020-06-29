export interface RespuestaProductos {
  ok: boolean;
  productos: Producto[];
}

export interface Producto {
  imagen?: string[];
  _id?: string;
  nombre?: string;
  marca?: string;
  descripcion?: string;
  precio?: number;
}