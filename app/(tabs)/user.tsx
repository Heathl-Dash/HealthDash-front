import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import CustomButton from "@/components/CustomButton";
import { Entypo, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { Colors } from "@/constants/Colors";
import { View, Text, StyleSheet } from "react-native";
import useProfile from "@/hooks/useProfile";

interface UserProps {
  user?: IProfile;
}

const UserInfo = ({ user }: UserProps) => {
  return (
    <View style={styles.userInfoContainer}>
      <View style={styles.userInfoWrapper}>
        <Text style={styles.userInfoLabel}>Nome</Text>
        <Text>{user?.name}</Text>
      </View>
      <View style={styles.userInfoWrapper}>
        <Text style={styles.userInfoLabel}>Altura</Text>
        <Text>{user?.heigth}</Text>
      </View>
      <View style={styles.userInfoWrapper}>
        <Text style={styles.userInfoLabel}>Peso</Text>
        <Text>{user?.weigth}</Text>
      </View>
      <View style={styles.userInfoWrapper}>
        <Text style={styles.userInfoLabel}>Idade</Text>
        <Text>{user?.age}</Text>
      </View>
      <View style={{ height: 1, backgroundColor: "#ccc", width: "100%", marginVertical: 16 }} />
      <View style={styles.userImcInfo}>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.userInfoLabel}>IMC</Text>
          <Text>{user?.calc_IMC}</Text>
        </View>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.userInfoLabel}>Classificação</Text>
          <Text>{user?.imc_classification}</Text>
        </View>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.userInfoLabel}>Grau de obesidade</Text>
          <Text>{user?.imc_degree}</Text>
        </View>
      </View>
    </View>
  );
};

export default function User() {
  const { profile, profileErro, profileLoading } = useProfile();

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
        <UserInfo user={profile} />
        <View style={styles.buttonContainer}>
          <CustomButton
            title="Sair"
            variant="secondary"
            style={{ backgroundColor: Colors.light.redColor }}
            shape="rect"
            iconPosition="end"
            icon={<Entypo name="log-out" size={18} color={Colors.light.reactNativeWhite} />}
            onPress={() => {}}
          />
          <CustomButton
            title="Excluir"
            variant="outLine"
            styleText={{ color: Colors.light.redColor }}
            style={{ borderColor: Colors.light.redColor }}
            shape="rect"
            iconPosition="end"
            icon={<FontAwesome5 name="trash" size={16} color={Colors.light.redColor} />}
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
    alignSelf: "flex-start",
  },
});
