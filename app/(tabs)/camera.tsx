import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { useCallback, useRef, useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";
// @ts-ignore
import ScannerBorder from "../../assets/images/scanner.png";
import { horizontalScale, verticalScale } from "@/utils/screen";
import { Colors } from "@/constants/Colors";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [scanComplete, setScanComplete] = useState<boolean>(false);
  const [scannedData, setScannedData] = useState<string | null>(null);

  const bottomSheetRef = useRef<BottomSheet>(null);

  if (!permission) {
    return (
      <View>
        <Text style={styles.message}>Awaiting Permissions</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  return (
    <GestureHandlerRootView>
      <View style={styles.container}>
        <CameraView
          style={styles.camera}
          facing={facing}
          barcodeScannerSettings={{
            barcodeTypes: ["qr"],
          }}
          onBarcodeScanned={(data) => {
            if (!scanComplete) {
              setScannedData(data.data);
              setScanComplete(true);
              bottomSheetRef.current?.expand();
            } else {
              return;
            }
          }}
        >
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={toggleCameraFacing}
            >
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </CameraView>
        <Image
          source={ScannerBorder}
          height={verticalScale(400)}
          width={horizontalScale(400)}
          resizeMethod="scale"
          style={{
            position: "absolute",
            left: horizontalScale(120),
            right: horizontalScale(120),
          }}
        />
        <BottomSheet
          ref={bottomSheetRef}
          snapPoints={["40%"]}
          onChange={() => {}}
          enablePanDownToClose={true}
          index={-1}
          backgroundStyle={{ backgroundColor: Colors.secondary }}
          onClose={() => {
            setScanComplete(false);
          }}
        >
          <BottomSheetView style={styles.bottomSheetContentContainer}>
            <Text
              style={{
                textAlign: "center",
                fontFamily: "SfProMedium",
              }}
            >
              {" "}
              {scannedData + "\n\n\n\n" + "Close to Scan Again"}
            </Text>
          </BottomSheetView>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    fontFamily: "SfProMedium",
    fontSize: 28,
    color: Colors.balck,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "transparent",
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  bottomSheetContentContainer: {
    flex: 1,
    backgroundColor: Colors.secondary,
    borderTopLeftRadius: horizontalScale(30),
    borderTopRightRadius: horizontalScale(30),
    marginHorizontal: horizontalScale(16),
    alignItems: "center",
    paddingTop: verticalScale(36),
  },
});
