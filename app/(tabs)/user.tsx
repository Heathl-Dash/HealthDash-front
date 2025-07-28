import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import CustomButton from "@/components/CustomButton";
import { Entypo, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { View, Text, StyleSheet } from "react-native";
import { Line } from "react-native-svg";

interface UserProps {
  user?: IProfile;
}

const UserInfo = ({ user }: UserProps) => {
  return (
    <View style={styles.userInfoContainer}>
      <View style={styles.userInfoWrapper}>
        <Text style={styles.userInfoLabel}>Nome</Text>
        <Text>Beltrano</Text>
      </View>
      <View style={styles.userInfoWrapper}>
        <Text style={styles.userInfoLabel}>Altura</Text>
        <Text>1.75</Text>
      </View>
      <View style={styles.userInfoWrapper}>
        <Text style={styles.userInfoLabel}>Peso</Text>
        <Text>70</Text>
      </View>
      <View style={styles.userInfoWrapper}>
        <Text style={styles.userInfoLabel}>Idade</Text>
        <Text>18</Text>
      </View>
      <View style={{ height: 1, backgroundColor: "#ccc", width: "100%", marginVertical: 16 }} />
      <View style={styles.userImcInfo}>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.userInfoLabel}>IMC</Text>
          <Text>18,5</Text>
        </View>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.userInfoLabel}>Classificação</Text>
          <Text>Normal</Text>
        </View>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.userInfoLabel}>Grau de obesidade</Text>
          <Text>0</Text>
        </View>
      </View>
    </View>
  );
};

export default function User() {
  const userInfoText = [
    { label: "Nome" },
    { label: "Altura" },
    { label: "Peso" },
    { label: "Idade" },
  ];

  const IMCInfoText = [{ label: "Classificação" }, { label: "Grau IMC" }];

  return (
    <SafeAreaView>
      <Header />
      <View style={{ width: "88%", marginLeft: 24, alignItems: "flex-end", marginTop: 32 }}>
        <CustomButton
          title="Editar"
          variant="outLine"
          shape="rect"
          iconPosition="end"
          icon={<FontAwesome6 name="edit" color={Colors.light.primary} size={16} />}
          onPress={() => {}}
        />
        <UserInfo />
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Sair"
            variant="secondary"
            style={{backgroundColor:Colors.light.redColor}}
            shape="rect"
            iconPosition="end"
            icon={<Entypo name="log-out" size={18} color={Colors.light.reactNativeWhite} />}
            onPress={() => {}}
          />
          <CustomButton
            title="Excluir"
            variant="outLine"
            styleText={{color:Colors.light.mediumGray}}
            style={{borderColor:Colors.light.mediumGray}}
            shape="rect"
            iconPosition="end"
            icon={<FontAwesome5 name="trash" size={16} color={Colors.light.mediumGray} />}
            onPress={() => {}}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    width: "100%",
    gap: 16,
    marginTop: 32,
  },
  userInfoWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  userImcInfo: {
    marginTop: 4,
    gap: 16,
  },
  userInfoLabel: {
    fontWeight: "bold",
  },
  buttonContainer: {
    gap: 12,
    marginTop: 44,
    alignSelf: "flex-start"
  }
});
