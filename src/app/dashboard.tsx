import { router } from "expo-router";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function Dashboard() {

  const usuarioActual = "Administrador";

  const salir = () => {
    router.replace("/");
  };

  return (
    <ScrollView style={styles.container}>

      {/* Header */}
      <View style={styles.header}>

        <Image
          source={require("../../assets/images/flor.png")}
          style={styles.logo}
        />

        <View style={styles.headerText}>
          <Text style={styles.titulo}>
            Bienvenida al sistema
          </Text>

          <Text style={styles.subtitulo}>
            Seleccione un módulo para continuar
          </Text>
        </View>

      </View>

      {/* Usuario */}
      <View style={styles.userSection}>

        <Text style={styles.admin}>
          {usuarioActual}
        </Text>

        <TouchableOpacity
          style={styles.logout}
          onPress={salir}
        >
          <Text style={styles.logoutText}>
            Salir
          </Text>
        </TouchableOpacity>

      </View>

      {/* Tarjetas */}
      <View style={styles.cardsContainer}>

        {/* Inventario */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/inventario" as any)}
        >
          <Image
            source={require("../../assets/images/cajita.png")}
            style={styles.icon}
          />

          <Text style={styles.cardTitle}>
            Inventario
          </Text>

          <Text style={styles.cardText}>
            Aquí puede ver y manejar los productos
          </Text>
        </TouchableOpacity>

        {/* Compras */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/compras" as any)}
        >
          <Image
            source={require("../../assets/images/carrito.png")}
            style={styles.icon}
          />

          <Text style={styles.cardTitle}>
            Compras
          </Text>

          <Text style={styles.cardText}>
            Aquí registra las compras de la droguería
          </Text>
        </TouchableOpacity>

        {/* Ventas */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/ventas" as any)}
        >
          <Image
            source={require("../../assets/images/venta.png")}
            style={styles.icon}
          />

          <Text style={styles.cardTitle}>
            Ventas
          </Text>

          <Text style={styles.cardText}>
            Control de las ventas realizadas
          </Text>
        </TouchableOpacity>

        {/* Informes */}
        <TouchableOpacity
          style={styles.card}
          onPress={() => router.push("/informes" as any)}
        >
          <Image
            source={require("../../assets/images/informe.png")}
            style={styles.icon}
          />

          <Text style={styles.cardTitle}>
            Informes
          </Text>

          <Text style={styles.cardText}>
            Reportes del negocio
          </Text>
        </TouchableOpacity>

      </View>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    marginTop: 30,
  },

  logo: {
    width: 60,
    height: 60,
    resizeMode: "contain",
  },

  headerText: {
    marginLeft: 15,
  },

  titulo: {
    fontSize: 22,
    fontWeight: "bold",
  },

  subtitulo: {
    color: "#666",
  },

  userSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },

  admin: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },

  logout: {
    backgroundColor: "#d9534f",
    padding: 10,
    borderRadius: 10,
    width: 100,
  },

  logoutText: {
    color: "#fff",
    textAlign: "center",
  },

  cardsContainer: {
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    alignItems: "center",
    elevation: 3,
  },

  icon: {
    width: 70,
    height: 70,
    resizeMode: "contain",
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },

  cardText: {
    textAlign: "center",
    color: "#666",
  },
});