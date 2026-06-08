import { useState } from "react";
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

export default function Inventario() {
  const [listaMeds, setListaMeds] = useState<Medicine[]>([]);
  const [busqueda, setBusqueda] = useState("");

  const [newMedicine, setNewMedicine] = useState<NewMedicine>({
    id: "",
    name: "",
    laboratory: "",
    description: "",
    stock: 0,
    purchasePrice: 0,
    salePrice: 0,
  });

  const seleccionar = (m: Medicine) => {
    setNewMedicine({
      id: m.id,
      name: m.name,
      laboratory: m.laboratory,
      description: m.description,
      stock: m.stock,
      purchasePrice: m.purchasePrice,
      salePrice: m.salePrice,
    });
  };

  const registrar = () => {
    const nuevoMedicamento: Medicine = { ...newMedicine, status: "Disponible" };
    setListaMeds([...listaMeds, nuevoMedicamento]);
    limpiar();
  };

  const actualizar = () => {
    setListaMeds(
      listaMeds.map((m) => (m.id === newMedicine.id ? { ...m, ...newMedicine } : m))
    );
  };

  const borrar = () => {
    setListaMeds(listaMeds.filter((m) => m.id !== newMedicine.id));
    limpiar();
  };

  const limpiar = () => {
    setNewMedicine({
      id: "",
      name: "",
      laboratory: "",
      description: "",
      stock: 0,
      purchasePrice: 0,
      salePrice: 0,
    });
  };

  const irAlMenu = () => console.log("Volver al menú");

  const medsVisibles = listaMeds.filter(
    (m) =>
      m.name.toLowerCase().includes(busqueda.toLowerCase()) ||
      m.id.toLowerCase().includes(busqueda.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Gestión de inventario</Text>

      {/* FORMULARIO */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Datos del medicamento</Text>

        <View style={styles.rowFields}>
          <View style={styles.fieldHalf}>
            <Text style={styles.inputLabel}>ID / Código</Text>
            <TextInput
              style={styles.input}
              placeholder="Ej. MED001"
              placeholderTextColor="#b4b2a9"
              value={newMedicine.id}
              onChangeText={(text) => setNewMedicine({ ...newMedicine, id: text })}
            />
          </View>
          <View style={styles.fieldHalf}>
            <Text style={styles.inputLabel}>Laboratorio</Text>
            <TextInput
              style={styles.input}
              placeholder="Fabricante"
              placeholderTextColor="#b4b2a9"
              value={newMedicine.laboratory}
              onChangeText={(text) => setNewMedicine({ ...newMedicine, laboratory: text })}
            />
          </View>
        </View>

        <Text style={styles.inputLabel}>Nombre comercial</Text>
        <TextInput
          style={styles.input}
          placeholder="Nombre del medicamento"
          placeholderTextColor="#b4b2a9"
          value={newMedicine.name}
          onChangeText={(text) => setNewMedicine({ ...newMedicine, name: text })}
        />

        <Text style={styles.inputLabel}>Descripción</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Analgésico, Antiinflamatorio..."
          placeholderTextColor="#b4b2a9"
          value={newMedicine.description}
          onChangeText={(text) => setNewMedicine({ ...newMedicine, description: text })}
        />

        <View style={styles.rowFields}>
          <View style={styles.fieldThird}>
            <Text style={styles.inputLabel}>Stock</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#b4b2a9"
              keyboardType="numeric"
              value={String(newMedicine.stock)}
              onChangeText={(text) => setNewMedicine({ ...newMedicine, stock: Number(text) })}
            />
          </View>
          <View style={styles.fieldThird}>
            <Text style={styles.inputLabel}>Precio compra</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#b4b2a9"
              keyboardType="numeric"
              value={String(newMedicine.purchasePrice)}
              onChangeText={(text) => setNewMedicine({ ...newMedicine, purchasePrice: Number(text) })}
            />
          </View>
          <View style={styles.fieldThird}>
            <Text style={styles.inputLabel}>Precio venta</Text>
            <TextInput
              style={styles.input}
              placeholder="0"
              placeholderTextColor="#b4b2a9"
              keyboardType="numeric"
              value={String(newMedicine.salePrice)}
              onChangeText={(text) => setNewMedicine({ ...newMedicine, salePrice: Number(text) })}
            />
          </View>
        </View>

        {/* BOTONES DE ACCIÓN */}
        <View style={styles.rowFields}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.btnPrimary]}
            onPress={registrar}
          >
            <Text style={styles.btnTextWhite}>Registrar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.btnSuccess]}
            onPress={actualizar}
          >
            <Text style={styles.btnTextWhite}>Modificar</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.rowFields}>
          <TouchableOpacity
            style={[styles.actionBtn, styles.btnWarning]}
            onPress={limpiar}
          >
            <Text style={styles.btnTextMuted}>Limpiar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionBtn, styles.btnDanger]}
            onPress={borrar}
          >
            <Text style={styles.btnTextRed}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* BUSCADOR */}
      <Text style={styles.inputLabel}>Buscar medicamento</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Nombre o código..."
        placeholderTextColor="#b4b2a9"
        value={busqueda}
        onChangeText={setBusqueda}
      />

      {/* LISTA */}
      <View style={styles.sectionTitleRow}>
        <Text style={styles.sectionTitle}>Inventario actual</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{medsVisibles.length} registros</Text>
        </View>
      </View>

      <FlatList
        data={medsVisibles}
        keyExtractor={(item) => item.id}
        scrollEnabled={false}
        ListEmptyComponent={
          <Text style={styles.empty}>No hay medicamentos registrados</Text>
        }
        renderItem={({ item }) => {
          const stockBajo = item.stock < 10;
          return (
            <TouchableOpacity
              style={stockBajo ? styles.medicineCardLow : styles.medicineCard}
              onPress={() => seleccionar(item)}
            >
              <View style={styles.medicineHeader}>
                <Text style={styles.medicineName}>{item.name}</Text>
                <View style={[styles.stockBadge, stockBajo ? styles.stockBadgeLow : styles.stockBadgeOk]}>
                  <Text style={[styles.stockBadgeText, stockBajo ? styles.stockBadgeTextLow : styles.stockBadgeTextOk]}>
                    Stock: {item.stock}
                  </Text>
                </View>
              </View>
              <Text style={styles.medicineDetail}>
                {item.id} · {item.laboratory}
              </Text>
              <Text style={styles.medicineDetail}>{item.description}</Text>
              <View style={styles.priceRow}>
                <Text style={styles.medicineDetail}>Compra: ${item.purchasePrice}</Text>
                <Text style={styles.medicineDetail}>Venta: ${item.salePrice}</Text>
                <Text style={styles.medicineLab}>{item.status}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />

      {/* SALIR */}
      <TouchableOpacity style={styles.exitButton} onPress={irAlMenu}>
        <Text style={styles.btnTextMuted}>Salir</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f3",
    padding: 16,
  },

  title: {
    fontSize: 22,
    fontWeight: "500",
    color: "#1a1a18",
    marginBottom: 20,
  },

  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
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
    backgroundColor: "#f1efe8",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.25)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize: 14,
    color: "#1a1a18",
  },

  searchBar: {
    backgroundColor: "#f1efe8",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.2)",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#1a1a18",
    marginBottom: 16,
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

  actionBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  btnPrimary: {
    backgroundColor: "#534AB7",
  },

  btnSuccess: {
    backgroundColor: "#1D9E75",
  },

  btnWarning: {
    backgroundColor: "#ffffff",
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.25)",
  },

  btnDanger: {
    backgroundColor: "#FCEBEB",
    borderWidth: 0.5,
    borderColor: "rgba(162,45,45,0.2)",
  },

  btnTextWhite: {
    color: "#ffffff",
    fontWeight: "500",
    fontSize: 14,
  },

  btnTextMuted: {
    color: "#5f5e5a",
    fontWeight: "500",
    fontSize: 14,
  },

  btnTextRed: {
    color: "#A32D2D",
    fontWeight: "500",
    fontSize: 14,
  },

  medicineCard: {
    backgroundColor: "#ffffff",
    borderLeftWidth: 3,
    borderLeftColor: "#534AB7",
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.1)",
  },

  medicineCardLow: {
    backgroundColor: "#ffffff",
    borderLeftWidth: 3,
    borderLeftColor: "#E24B4A",
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.1)",
  },

  medicineHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },

  medicineName: {
    fontSize: 15,
    fontWeight: "500",
    color: "#1a1a18",
  },

  medicineDetail: {
    fontSize: 13,
    color: "#5f5e5a",
    marginBottom: 2,
  },

  medicineLab: {
    fontSize: 12,
    color: "#888780",
  },

  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 8,
  },

  stockBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 999,
  },

  stockBadgeOk: {
    backgroundColor: "#EAF3DE",
  },

  stockBadgeLow: {
    backgroundColor: "#FCEBEB",
  },

  stockBadgeText: {
    fontSize: 11,
    fontWeight: "500",
  },

  stockBadgeTextOk: {
    color: "#3B6D11",
  },

  stockBadgeTextLow: {
    color: "#A32D2D",
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

  empty: {
    textAlign: "center",
    padding: 24,
    color: "#b4b2a9",
    fontSize: 14,
  },

  exitButton: {
    backgroundColor: "#ffffff",
    padding: 14,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 40,
    borderWidth: 0.5,
    borderColor: "rgba(0,0,0,0.25)",
    alignItems: "center",
    justifyContent: "center",
  },
});
