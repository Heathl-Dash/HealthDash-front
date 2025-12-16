import { Platform, PermissionsAndroid } from "react-native";

export async function requestStepPermissions(): Promise<boolean> {
  if (Platform.OS === "android") {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACTIVITY_RECOGNITION,
      {
        title: "Permissão para reconhecer atividades",
        message: "Este app precisa acessar seus passos para acompanhar sua atividade física.",
        buttonPositive: "OK",
      }
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  } else {
    // iOS: a permissão de movimento é concedida via configuração automática
    return true;
  }
}
