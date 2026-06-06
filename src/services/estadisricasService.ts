import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "estadisticasVentas";

export interface EstadisticasVentas {
  ventasHoy: number;
  transacciones: number;
  productosVendidos: number;
  ventasMes: number;
}

export const estadisticasService = {
  async obtener(): Promise<EstadisticasVentas> {
    const data = await AsyncStorage.getItem(STORAGE_KEY);

    if (!data) {
      return {
        ventasHoy: 0,
        transacciones: 0,
        productosVendidos: 0,
        ventasMes: 0,
      };
    }

    return JSON.parse(data);
  },

  async guardar(stats: EstadisticasVentas): Promise<void> {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(stats)
    );
  },
};