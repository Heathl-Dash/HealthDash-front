import Header from "@/components/Header";
import { Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function SocialMedia() {
  return(
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 30 }}>
      <Header feedSocialMedia/>
      <Text>Rede Social</Text>
    </SafeAreaView>
  )
}