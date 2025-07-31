import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, View } from "react-native";
import { FontAwesome6 } from "@expo/vector-icons";

interface IMCCardProp {
  calcIMC: number | null;
  imcClassification?: string;
}

const imcStatusMap = {
  "Magreza": {
    grau: "0",
    icon: "person-circle-xmark",
    color: "#FFF99B", 
  },
  "Normal": {
    grau: "0",
    icon: "person-circle-check",
    color: "#528D95", 
  },
  "Sobrepeso": {
    grau: "I",
    icon: "person-circle-exclamation",
    color: "#FDB875", 
  },
  "Obesidade": {
    grau: "II",
    icon: "person-circle-xmark",
    color: "#FF746D", 
  },
  "Obesidade Grave": {
    grau: "III",
    icon: "skull-crossbones",
    color: "#7F1D1D", 
  }
};

const IMCCard = ({ calcIMC, imcClassification }: IMCCardProp) => {
  const status = imcStatusMap[imcClassification] || {
    icon: "person-circle-question",
    color: Colors.light.darkGray,
  };

  return (
    <View style={styles.container}>
      <Text style={{ fontSize:18, fontWeight: "bold", color: Colors.light.mediumGray}}>IMC</Text>
      <View style={styles.imcResult}>
        <FontAwesome6 
          name={status.icon} 
          color={status.color} 
          size={52}
        />
        {calcIMC !== null && (
          <Text style={{ fontSize: 28, fontWeight: "bold", color: Colors.light.mediumGray }}>
            {calcIMC?.toFixed(1)}
          </Text>
        )}
      </View>
    </View>
  );
};

export default IMCCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "transparent",
    borderRadius: 18,
    borderWidth: 2,
    borderColor: Colors.light.lightGray,
    alignItems: "center",
    justifyContent: "space-around",
    height: 120,
    marginTop: 2,
  },
  imcResult: {
    display: "flex",
    flexDirection: "row",
    alignItems: "baseline",
    gap: 20,
    padding: 0,
    margin: 0
  },
});
