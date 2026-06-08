import React from "react";
import {
    FlatList,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

type Medicine = {
  id: string;
  name: string;
  laboratory: string;
  description: string;
  stock: number;
  purchasePrice: number;
  salePrice: number;
  status: string;
};

type NewMedicine = {
  id: string;
  name: string;
  laboratory: string;
  description: string;
  stock: number;
  purchasePrice: number;
  salePrice: number;
};

type Props = {
  listaMeds: Medicine[];
  newMedicine: NewMedicine;

  setNewMedicine: React.Dispatch<React.SetStateAction<NewMedicine>>;

  buscar: (value: string) => void;
  seleccionar: (m: Medicine) => void;

  actualizar: () => void;
  borrar: () => void;
  registrar: () => void;
  limpiar: () => void;
  irAlMenu: () => void;
};

export default function Inventario({
  listaMeds,
  newMedicine,
  setNewMedicine,
  buscar,
  seleccionar,
  actualizar,
  borrar,
  registrar,
  limpiar,
  irAlMenu,
}: Props) {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gestión de Inventario</Text>

      <View style={styles.card}>
        <Text style={styles.sectionTitle}>
          DATOS DEL MEDICAMENTO
        </Text>

        <TextInput
          style={styles.input}
          placeholder="ID / Código"
          value={newMedicine.id}
          onChangeText={(text) =>
            setNewMedicine({
              ...newMedicine,
              id: text,
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Nombre Comercial"
          value={newMedicine.name}
          onChangeText={(text) =>
            setNewMedicine({
              ...newMedicine,
              name: text,
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Laboratorio"
          value={newMedicine.laboratory}
          onChangeText={(text) =>
            setNewMedicine({
              ...newMedicine,
              laboratory: text,
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Descripción"
          value={newMedicine.description}
          onChangeText={(text) =>
            setNewMedicine({
              ...newMedicine,
              description: text,
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Stock"
          keyboardType="numeric"
          value={String(newMedicine.stock)}
          onChangeText={(text) =>
            setNewMedicine({
              ...newMedicine,
              stock: Number(text),
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Precio Compra"
          keyboardType="numeric"
          value={String(newMedicine.purchasePrice)}
          onChangeText={(text) =>
            setNewMedicine({
              ...newMedicine,
              purchasePrice: Number(text),
            })
          }
        />

        <TextInput
          style={styles.input}
          placeholder="Precio Venta"
          keyboardType="numeric"
          value={String(newMedicine.salePrice)}
          onChangeText={(text) =>
            setNewMedicine({
              ...newMedicine,
              salePrice: Number(text),
            })
          }
        />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Buscar medicamento..."
        onChangeText={buscar}
      />

      <Text style={styles.sectionTitle}>
        INVENTARIO ACTUAL
      </Text>

      <FlatList
        data={listaMeds}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.medicineCard}
            onPress={() => seleccionar(item)}
          >
            <Text style={styles.medicineName}>
              {item.name}
            </Text>

            <Text>ID: {item.id}</Text>
            <Text>Lab: {item.laboratory}</Text>
            <Text>Stock: {item.stock}</Text>
            <Text>
              Compra: ${item.purchasePrice}
            </Text>
            <Text>
              Venta: ${item.salePrice}
            </Text>
            <Text>
              Estado: {item.status}
            </Text>
          </TouchableOpacity>
        )}
      />

      <View style={styles.buttonsContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={actualizar}
        >
          <Text style={styles.buttonText}>
            Modificar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={borrar}
        >
          <Text style={styles.buttonText}>
            Eliminar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={registrar}
        >
          <Text style={styles.buttonText}>
            Registrar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={limpiar}
        >
          <Text style={styles.buttonText}>
            Limpiar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={irAlMenu}
        >
          <Text style={styles.buttonText}>
            Salir
          </Text>
        </TouchableOpacity>
      </View>
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
    borderRadius: 10,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    backgroundColor: "#fff",
  },

  medicineCard: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  medicineName: {
    fontWeight: "bold",
    fontSize: 16,
    marginBottom: 5,
  },

  buttonsContainer: {
    marginTop: 20,
    marginBottom: 30,
  },

  button: {
    backgroundColor: "#2563eb",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});