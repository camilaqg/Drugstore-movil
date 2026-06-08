import { Picker } from "@react-native-picker/picker";
import React from "react";
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

type Props = {
  newPurchase: NewPurchase;
  listaMedicamentos: Medicamento[];
  tablaTemporal: PurchaseItem[];
  medEncontrado?: Medicamento | null;

  setNewPurchase: React.Dispatch<React.SetStateAction<NewPurchase>>;

  buscarMed: () => void;
  meterALista: () => void;
  guardarCompra: () => void;
  regresar: () => void;

  obtenerNombre: (id: string) => string;
  obtenerLab: (id: string) => string;
  obtenerDesc: (id: string) => string;
};

export default function Compras({
  newPurchase,
  listaMedicamentos,
  tablaTemporal,
  medEncontrado,
  setNewPurchase,
  buscarMed,
  meterALista,
  guardarCompra,
  regresar,
  obtenerNombre,
  obtenerLab,
  obtenerDesc,
}: Props) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>
        Registro de Compras
      </Text>

      {/* DATOS COMPRA */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          DATOS DE LA COMPRA
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Fecha"
          value={newPurchase.date}
          onChangeText={(text) =>
            setNewPurchase({
              ...newPurchase,
              date: text,
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Proveedor"
          value={newPurchase.provider}
          onChangeText={(text) =>
            setNewPurchase({
              ...newPurchase,
              provider: text,
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Número de factura"
          value={newPurchase.invoiceNumber}
          onChangeText={(text) =>
            setNewPurchase({
              ...newPurchase,
              invoiceNumber: text,
            })
          }
        />
      </View>

      {/* MEDICAMENTO */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          BUSCAR MEDICAMENTO
        </Text>

        <Picker
          selectedValue={newPurchase.medicineId}
          onValueChange={(value) => {
            setNewPurchase({
              ...newPurchase,
              medicineId: value,
            });
            buscarMed();
          }}
        >
          <Picker.Item
            label="Seleccione un producto"
            value=""
          />

          {listaMedicamentos.map((med) => (
            <Picker.Item
              key={med.id}
              label={`${med.id} - ${med.name}`}
              value={med.id}
            />
          ))}
        </Picker>

        <TextInput
          style={styles.input}
          value={medEncontrado?.name || ""}
          editable={false}
          placeholder="Nombre"
        />

        <TextInput
          style={styles.input}
          value={medEncontrado?.laboratory || ""}
          editable={false}
          placeholder="Laboratorio"
        />

        <TextInput
          style={styles.input}
          placeholder="Cantidad"
          keyboardType="numeric"
          value={String(newPurchase.quantity)}
          onChangeText={(text) =>
            setNewPurchase({
              ...newPurchase,
              quantity: Number(text),
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Precio Compra"
          keyboardType="numeric"
          value={String(newPurchase.precioCompra)}
          onChangeText={(text) =>
            setNewPurchase({
              ...newPurchase,
              precioCompra: Number(text),
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Precio Venta"
          keyboardType="numeric"
          value={String(newPurchase.salePrice)}
          onChangeText={(text) =>
            setNewPurchase({
              ...newPurchase,
              salePrice: Number(text),
            })
          }
        />

        <TouchableOpacity
          style={styles.addButton}
          onPress={meterALista}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>

      {/* DETALLE COMPRA */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          DETALLE DE LA COMPRA
        </Text>

        {tablaTemporal.length === 0 ? (
          <Text style={styles.empty}>
            No hay productos en la lista
          </Text>
        ) : (
          tablaTemporal.map((item, index) => (
            <View
              key={index}
              style={styles.productCard}
            >
              <Text>
                ID: {item.medicineId}
              </Text>

              <Text>
                Nombre:{" "}
                {obtenerNombre(item.medicineId)}
              </Text>

              <Text>
                Laboratorio:{" "}
                {obtenerLab(item.medicineId)}
              </Text>

              <Text>
                Descripción:{" "}
                {obtenerDesc(item.medicineId)}
              </Text>

              <Text>
                Cantidad: {item.quantity}
              </Text>

              <Text>
                Compra: ${item.purchasePrice}
              </Text>

              <Text>
                Venta: ${item.salePrice}
              </Text>
            </View>
          ))
        )}
      </View>

      {/* BOTONES */}
      <TouchableOpacity
        style={styles.saveButton}
        onPress={guardarCompra}
      >
        <Text style={styles.buttonText}>
          Guardar Datos
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.exitButton}
        onPress={regresar}
      >
        <Text style={styles.buttonText}>
          Volver
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#f5f5f5",
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },

  addButton: {
    backgroundColor: "#2563eb",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
    marginTop: 10,
  },

  saveButton: {
    backgroundColor: "#16a34a",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },

  exitButton: {
    backgroundColor: "#dc2626",
    padding: 15,
    borderRadius: 10,
    marginBottom: 30,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 16,
  },

  empty: {
    textAlign: "center",
    padding: 15,
  },

  productCard: {
    backgroundColor: "#f9fafb",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
});