import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Medicamento = {
  id: string;
  name: string;
  laboratory: string;
  description: string;
};

type PurchaseItem = {
  medicineId: string;
  quantity: number;
  purchasePrice: number;
  salePrice: number;
};

type NewPurchase = {
  date: string;
  provider: string;
  invoiceNumber: string;
  medicineId: string;
  quantity: number;
  precioCompra: number;
  salePrice: number;
};

export default function Compras() {
  const [newPurchase, setNewPurchase] = useState<NewPurchase>({
    date: "",
    provider: "",
    invoiceNumber: "",
    medicineId: "",
    quantity: 0,
    precioCompra: 0,
    salePrice: 0,
  });

  const [listaMedicamentos] = useState<Medicamento[]>([
    { id: "MED001", name: "Acetaminofén", laboratory: "Genfar", description: "Analgésico" },
    { id: "MED002", name: "Ibuprofeno", laboratory: "MK", description: "Antiinflamatorio" },
  ]);

  const [tablaTemporal, setTablaTemporal] = useState<PurchaseItem[]>([]);

  const medEncontrado =
    listaMedicamentos.find((m) => m.id === newPurchase.medicineId) || null;

  const meterALista = () => {
    if (!newPurchase.medicineId) return;
    setTablaTemporal([
      ...tablaTemporal,
      {
        medicineId: newPurchase.medicineId,
        quantity: newPurchase.quantity,
        purchasePrice: newPurchase.precioCompra,
        salePrice: newPurchase.salePrice,
      },
    ]);
  };

  const guardarCompra = () => console.log("Compra guardada");
  const regresar = () => console.log("Volver");

  const obtenerNombre = (id: string) =>
    listaMedicamentos.find((m) => m.id === id)?.name || "";
  const obtenerLab = (id: string) =>
    listaMedicamentos.find((m) => m.id === id)?.laboratory || "";
  const obtenerDesc = (id: string) =>
    listaMedicamentos.find((m) => m.id === id)?.description || "";

  const total = tablaTemporal.reduce(
    (acc, item) => acc + item.purchasePrice * item.quantity,
    0
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Registro de compras</Text>

      {/* DATOS DE LA COMPRA */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Datos de la compra</Text>

        <Text style={styles.inputLabel}>Fecha</Text>
        <TextInput
          style={styles.input}
          placeholder="AAAA-MM-DD"
          placeholderTextColor="#b4b2a9"
          value={newPurchase.date}
          onChangeText={(text) => setNewPurchase({ ...newPurchase, date: text })}
        />

        <Text style={styles.inputLabel}>Proveedor</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del proveedor"
          placeholderTextColor="#b4b2a9"
          value={newPurchase.provider}
          onChangeText={(text) => setNewPurchase({ ...newPurchase, provider: text })}
        />

        <Text style={styles.inputLabel}>Número de factura</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. FAC-0001"
          placeholderTextColor="#b4b2a9"
          value={newPurchase.invoiceNumber}
          onChangeText={(text) => setNewPurchase({ ...newPurchase, invoiceNumber: text })}
        />
      </View>

      {/* BUSCAR MEDICAMENTO */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Buscar medicamento</Text>

        <Text style={styles.inputLabel}>Producto</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={newPurchase.medicineId}
            onValueChange={(value) =>
              setNewPurchase({ ...newPurchase, medicineId: value })
            }
            style={styles.picker}
          >
            <Picker.Item label="Seleccione un producto" value="" />
            {listaMedicamentos.map((med) => (
              <Picker.Item
                key={med.id}
                label={`${med.id} - ${med.name}`}
                value={med.id}
              />
            ))}
          </Picker>
        </View>

        <View style={styles.rowFields}>
          <View style={styles.fieldHalf}>
            <Text style={styles.inputLabel}>Nombre</Text>
            <TextInput
              style={styles.inputReadonly}
              value={medEncontrado?.name || ""}
              editable={false}
              placeholder="Nombre"
              placeholderTextColor="#b4b2a9"
            />
          </View>
          <View style={styles.fieldHalf}>
            <Text style={styles.inputLabel}>Laboratorio</Text>
            <TextInput
              style={styles.inputReadonly}
              value={medEncontrado?.laboratory || ""}
              editable={false}
              placeholder="Laboratorio"
              placeholderTextColor="#b4b2a9"
            />
          </View>
        </View>

        <View style={styles.rowFields}>
          <View style={styles.fieldThird}>
            <Text style={styles.inputLabel}>Cantidad</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#b4b2a9"
              keyboardType="numeric"
              value={String(newPurchase.quantity)}
              onChangeText={(text) =>
                setNewPurchase({ ...newPurchase, quantity: Number(text) })
              }
            />
          </View>
          <View style={styles.fieldThird}>
            <Text style={styles.inputLabel}>Precio compra</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#b4b2a9"
              keyboardType="numeric"
              value={String(newPurchase.precioCompra)}
              onChangeText={(text) =>
                setNewPurchase({ ...newPurchase, precioCompra: Number(text) })
              }
            />
          </View>
          <View style={styles.fieldThird}>
            <Text style={styles.inputLabel}>Precio venta</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#b4b2a9"
              keyboardType="numeric"
              value={String(newPurchase.salePrice)}
              onChangeText={(text) =>
                setNewPurchase({ ...newPurchase, salePrice: Number(text) })
              }
            />
          </View>
        </View>

        <TouchableOpacity style={styles.addButton} onPress={meterALista}>
          <Text style={styles.addButtonText}>+ Agregar producto</Text>
        </TouchableOpacity>
      </View>

      {/* DETALLE DE LA COMPRA */}
      <View style={styles.card}>
        <View style={styles.sectionTitleRow}>
          <Text style={styles.sectionTitle}>Detalle de la compra</Text>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>{tablaTemporal.length} productos</Text>
          </View>
        </View>

        {tablaTemporal.length === 0 ? (
          <Text style={styles.empty}>No hay productos en la lista</Text>
        ) : (
          tablaTemporal.map((item, index) => (
            <View key={index} style={styles.productCard}>
              <Text style={styles.productName}>{obtenerNombre(item.medicineId)}</Text>
              <Text style={styles.productDetail}>
                {obtenerLab(item.medicineId)} · {obtenerDesc(item.medicineId)}
              </Text>
              <View style={styles.productFooter}>
                <Text style={styles.productDetail}>Cant: {item.quantity}</Text>
                <Text style={styles.productDetail}>Compra: ${item.purchasePrice}</Text>
                <Text style={styles.productDetail}>Venta: ${item.salePrice}</Text>
              </View>
            </View>
          ))
        )}

        {tablaTemporal.length > 0 && (
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total de la compra</Text>
            <Text style={styles.totalValue}>${total.toLocaleString()}</Text>
          </View>
        )}
      </View>

      {/* BOTONES */}
      <TouchableOpacity style={styles.saveButton} onPress={guardarCompra}>
        <Text style={styles.buttonText}>Guardar datos</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.exitButton} onPress={regresar}>
        <Text style={styles.exitButtonText}>Volver</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f5f5f3",
  },

  title: {
    fontSize: 22,
    fontWeight: "500",
    marginBottom: 20,
    color: "#1a1a18",
  },

  card: {
    backgroundColor: "#ffffff",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.12)",
  },

  sectionTitle: {
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 1.2,
    textTransform: "uppercase",
    color: "#888780",
    marginBottom: 12,
  },

  sectionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  inputLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "#5f5e5a",
    marginBottom: 4,
  },

  input: {
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.25)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: "#f1efe8",
    fontSize: 14,
    color: "#1a1a18",
  },

  inputReadonly: {
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.15)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: "#e8e6df",
    fontSize: 14,
    color: "#888780",
  },

  pickerWrapper: {
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.25)",
    borderRadius: 8,
    backgroundColor: "#f1efe8",
    marginBottom: 12,
    overflow: "hidden",
  },

  picker: {
    color: "#1a1a18",
    fontSize: 14,
  },

  rowFields: {
    flexDirection: "row",
    gap: 10,
  },

  fieldHalf: {
    flex: 1,
  },

  fieldThird: {
    flex: 1,
  },

  addButton: {
    backgroundColor: "#534AB7",
    borderRadius: 8,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  addButtonText: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 14,
  },

  saveButton: {
    backgroundColor: "#1D9E75",
    padding: 14,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  exitButton: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 10,
    marginBottom: 30,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#ffffff",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 14,
  },

  exitButtonText: {
    color: "#5f5e5a",
    textAlign: "center",
    fontWeight: "500",
    fontSize: 14,
  },

  empty: {
    textAlign: "center",
    padding: 24,
    color: "#b4b2a9",
    fontSize: 14,
  },

  productCard: {
    backgroundColor: "#f1efe8",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.1)",
  },

  productName: {
    fontSize: 14,
    fontWeight: "500",
    color: "#1a1a18",
    marginBottom: 2,
  },

  productDetail: {
    fontSize: 13,
    color: "#5f5e5a",
  },

  productFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  badge: {
    backgroundColor: "#EEEDFE",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },

  badgeText: {
    fontSize: 11,
    fontWeight: "500",
    color: "#3C3489",
  },

  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 12,
    marginTop: 4,
    borderTopWidth: 0.5,
    borderTopColor: "rgba(0,0,0,0.12)",
  },

  totalLabel: {
    fontSize: 13,
    color: "#888780",
  },

  totalValue: {
    fontSize: 18,
    fontWeight: "500",
    color: "#1a1a18",
  },
});
