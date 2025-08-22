import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function FacialLogin() {
  const [facing, setFacing] = useState<CameraType>("front");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanning, setScanning] = useState(false);
  const [scanProgress] = useState(new Animated.Value(0));

  // Simular escaneo facial
  useEffect(() => {
    if (scanning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(scanProgress, {
            toValue: 100,
            duration: 2000,
            useNativeDriver: false,
          }),
          Animated.timing(scanProgress, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: false,
          }),
        ])
      ).start();

      // Simular proceso de reconocimiento facial
      const timer = setTimeout(() => {
        setScanning(false);
        router.replace("/Screen/home");
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [scanning]);

  if (!permission) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.message}>Cargando permisos...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.title}>Login Facial</Text>
        <Text style={styles.message}>
          Necesitamos acceso a tu cámara para el reconocimiento facial
        </Text>
        <TouchableOpacity
          style={styles.permissionButton}
          onPress={requestPermission}
        >
          <Text style={styles.permissionButtonText}>
            Permitir acceso a cámara
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  function startFacialScan() {
    setScanning(true);
    scanProgress.setValue(0);
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <View style={styles.overlay}>
          {scanning && (
            <Animated.View
              style={[
                styles.scanLine,
                {
                  transform: [
                    {
                      translateY: scanProgress.interpolate({
                        inputRange: [0, 100],
                        outputRange: [0, Dimensions.get("window").height - 100],
                      }),
                    },
                  ],
                },
              ]}
            />
          )}

          <Text style={styles.instructionText}>
            {scanning
              ? "Escaneando rostro..."
              : "Mira directamente a la cámara"}
          </Text>

          {scanning ? (
            <View style={styles.scanningContainer}>
              <ActivityIndicator size="large" color="#FFFFFF" />
              <Text style={styles.scanningText}>Verificando identidad...</Text>

              {/* Barra de progreso */}
              <View style={styles.progressBar}>
                <Animated.View
                  style={[
                    styles.progressFill,
                    {
                      width: scanProgress.interpolate({
                        inputRange: [0, 100],
                        outputRange: ["0%", "100%"],
                      }),
                    },
                  ]}
                />
              </View>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.scanButton}
              onPress={startFacialScan}
            >
              <Text style={styles.scanButtonText}>Iniciar Escaneo Facial</Text>
            </TouchableOpacity>
          )}

          <View style={styles.guideTextContainer}>
            <Text style={styles.guideText}>
              ✓ Asegúrate de tener buena iluminación
            </Text>
            <Text style={styles.guideText}>
              ✓ Quítate lentes o accesorios que obstruyan
            </Text>
            <Text style={styles.guideText}>✓ Mantén el rostro centrado</Text>
          </View>
        </View>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  centerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 20,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 30,
    lineHeight: 22,
  },
  camera: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 40,
  },
  scanLine: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: "#007BFF",
    shadowColor: "#007BFF",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 5,
  },
  instructionText: {
    color: "#FFFFFF",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
    marginTop: 50,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 15,
    borderRadius: 10,
  },
  scanButton: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 35,
    paddingVertical: 18,
    borderRadius: 30,
    marginBottom: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  scanButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  scanningContainer: {
    alignItems: "center",
    marginBottom: 30,
    width: "80%",
  },
  scanningText: {
    color: "#FFFFFF",
    marginTop: 15,
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 20,
  },
  progressBar: {
    width: "100%",
    height: 6,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#007BFF",
    borderRadius: 3,
  },
  guideTextContainer: {
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 20,
  },
  guideText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 5,
    textAlign: "center",
  },
  permissionButton: {
    backgroundColor: "#007BFF",
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 20,
  },
  permissionButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
