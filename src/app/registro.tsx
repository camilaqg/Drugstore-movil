import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";

export default function Registro() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registrar = async () => {
    if (password.length < 6) {
      Alert.alert(
        "Error",
        "La contraseña debe tener mínimo 6 caracteres"
      );
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert(
        "Error",
        "Las contraseñas no coinciden"
      );
      return;
    }

    await AsyncStorage.setItem(
      "usuario",
      JSON.stringify({
        name,
        email,
        username,
        password,
      })
    );

    Alert.alert(
      "Éxito",
      "Usuario registrado correctamente"
    );

    router.replace("/");
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
    >
      <View style={styles.card}>

        <Image
          source={require("../../assets/images/flor.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>
          Droguería Pili
        </Text>

        <Text style={styles.subtitle}>
          Crear Cuenta
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Nombre completo"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          style={styles.input}
          placeholder="Correo"
          value={email}
          onChangeText={setEmail}
        />

        <TextInput
          style={styles.input}
          placeholder="Usuario"
          value={username}
          onChangeText={setUsername}
        />

        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        {password.length < 6 && password !== "" && (
          <Text style={styles.error}>
            *Mínimo 6 caracteres*
          </Text>
        )}

        <TextInput
          style={styles.input}
          placeholder="Confirmar contraseña"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        {password !== confirmPassword &&
          confirmPassword !== "" && (
            <Text style={styles.error}>
              *Las contraseñas no coinciden*
            </Text>
          )}

        <TouchableOpacity
          style={styles.button}
          onPress={registrar}
        >
          <Text style={styles.buttonText}>
            Registrarse
          </Text>
        </TouchableOpacity>

      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    backgroundColor: "#f0f9f9",
    padding: 20,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    elevation: 5,
  },

  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    resizeMode: "contain",
    marginBottom: 15,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },

  subtitle: {
    textAlign: "center",
    marginBottom: 25,
    color: "#666",
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
  },

  error: {
    textAlign: "center",
    marginBottom: 10,
  },

  button: {
    backgroundColor: "#6aa84f",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
  },

  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
});