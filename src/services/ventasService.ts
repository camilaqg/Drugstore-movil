import AsyncStorage from "@react-native-async-storage/async-storage";

export interface Venta {
  fechaVenta: string;
  Cliente: string;
  Factura: string;
  Codigo: string;
  Medicamento: string;
  Laboratorio: string;
  Cantidad: number;
  Precio: number;
  Total: number;
}

const STORAGE_KEY = "ventas";

export const ventasService = {

  async obtenerVentas(): Promise<Venta[]> {

    const ventas = await AsyncStorage.getItem(
      STORAGE_KEY
    );

    if (!ventas) {
      return [];
    }

    return JSON.parse(ventas);
  },

  async guardarVenta(
    nuevaVenta: Venta
  ): Promise<void> {

    const ventas = await this.obtenerVentas();

    ventas.push(nuevaVenta);

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(ventas)
    );
  },

  async actualizarVentas(
    ventas: Venta[]
  ): Promise<void> {

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(ventas)
    );
  },

  async eliminarVenta(
    factura: string
  ): Promise<void> {

    const ventas = await this.obtenerVentas();

    const ventasFiltradas = ventas.filter(
      venta => venta.Factura !== factura
    );

    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(ventasFiltradas)
    );
  },

  async buscarPorFactura(
    factura: string
  ): Promise<Venta | undefined> {

    const ventas = await this.obtenerVentas();

    return ventas.find(
      venta => venta.Factura === factura
    );
  }
};