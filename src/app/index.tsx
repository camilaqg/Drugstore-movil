import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [errorCampos, setErrorCampos] = useState(false);
  const [errorCredenciales, setErrorCredenciales] = useState(false);

  const login = async () => {
    if (!username || !password) {
      setErrorCampos(true);
      setErrorCredenciales(false);
      return;
    }

    setErrorCampos(false);

    // Administrador
    if (username === "admin" && password === "1234") {
      setErrorCredenciales(false);
      router.push("/dashboard" as any);
      return;
    }

    // Usuario registrado
    const usuarioGuardado = await AsyncStorage.getItem("usuario");

    if (usuarioGuardado) {
      const datos = JSON.parse(usuarioGuardado);

      if (
        username === datos.username &&
        password === datos.password
      ) {
        setErrorCredenciales(false);
        router.push("/dashboard" as any);
        return;
      }
    }

    setErrorCredenciales(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>

        <Image
          source={require("../../assets/images/flor.png")}
          style={styles.logo}
        />

        <Text style={styles.title}>
          Droguería Pili
        </Text>

        <Text style={styles.subtitle}>
          SISTEMA DE GESTIÓN
        </Text>

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

        {errorCampos && (
          <Text style={styles.error}>
            *Campos obligatorios*
          </Text>
        )}

        {errorCredenciales && (
          <Text style={styles.error}>
            *Usuario o contraseña incorrectos*
          </Text>
        )}

        <TouchableOpacity
          style={styles.button}
          onPress={login}
        >
          <Text style={styles.buttonText}>
            Ingresar
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => router.push("/registro" as any)}
        >
          <Text style={styles.link}>
            ¿No tienes cuenta? Regístrate
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f9f9",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  card: {
    width: "100%",
    maxWidth: 400,
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 20,
    elevation: 5,
  },

  logo: {
    width: 100,
    height: 100,
    alignSelf: "center",
    marginBottom: 15,
    resizeMode: "contain",
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
    marginBottom: 12,
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

  error: {
    textAlign: "center",
    marginBottom: 10,
  },

  link: {
    textAlign: "center",
    marginTop: 15,
    color: "blue",
  },
});