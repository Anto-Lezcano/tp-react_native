import { router } from "expo-router";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function Login() {
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Bienvenido</Text>
        <Text style={styles.subtitle}>Inicia sesión en tu cuenta</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Usuario</Text>
            <TextInput
              placeholder="malias_23"
              placeholderTextColor="#aaa"
              style={styles.input}
            />
            <View style={styles.inputIcon}>
              <Text style={styles.icon}>👤</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              placeholder="**********"
              placeholderTextColor="#aaa"
              secureTextEntry={true}
              style={styles.input}
            />
            <View style={styles.inputIcon}>
              <Text style={styles.icon}>🔒</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.loginButton}
            onPress={() => router.replace("/Screen/home")}
          >
            <Text style={styles.loginButtonText}>Ingresar</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>o</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            style={styles.cameraButton}
            onPress={() => router.replace("/Screen/camera")}
          >
            <Text style={styles.cameraButtonIcon}>📷</Text>
            <Text style={styles.cameraButtonText}>Acceso Facial</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>¿Olvidaste tu contraseña?</Text>
        <TouchableOpacity>
          <Text style={styles.footerLink}>Recuperar aquí</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f6fb",
  },
  header: {
    alignItems: "center",
    paddingTop: 100,
    paddingBottom: 60,
    backgroundColor: "#0d6efd",
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
    height: 220,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "rgba(255, 255, 255, 0.9)",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
  },
  formContainer: {
    paddingHorizontal: 30,
    paddingTop: 30,
    paddingBottom: 80,
  },
  inputContainer: {
    marginBottom: 25,
    position: "relative",
  },
  label: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 10,
    color: "#333",
    marginLeft: 5,
  },
  input: {
    borderWidth: 1.5,
    borderColor: "#d0d7de",
    borderRadius: 16,
    paddingHorizontal: 50,
    paddingVertical: 16,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
    fontWeight: "500",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inputIcon: {
    position: "absolute",
    left: 15,
    top: 45,
    width: 28,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    fontSize: 20,
  },
  loginButton: {
    backgroundColor: "#0d6efd",
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    marginTop: 15,
    marginBottom: 15,
    shadowColor: "#0d6efd",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
  divider: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 25,
  },
  dividerLine: {
    flex: 1,
    height: 1.5,
    backgroundColor: "#d0d7de",
  },
  dividerText: {
    marginHorizontal: 15,
    color: "#777",
    fontWeight: "600",
    fontSize: 14,
  },
  cameraButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#198754",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 20,
    shadowColor: "#198754",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 6,
  },
  cameraButtonIcon: {
    fontSize: 22,
    marginRight: 10,
  },
  cameraButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
  footer: {
    paddingVertical: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  footerText: {
    color: "#666",
    fontSize: 14,
    marginBottom: 6,
  },
  footerLink: {
    color: "#0d6efd",
    fontSize: 15,
    fontWeight: "600",
  },
});
