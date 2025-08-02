import CustomButton from "@/components/CustomButton";
import UserProfileForm from "@/components/UserProfileForm";
import { Colors } from "@/constants/Colors";
import useAuth from "@/hooks/useAuth";
import useProfile from "@/hooks/useProfile";
import { Entypo, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import React, { useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import HabitTodoManger from "@/components/HabitTodoManager";

interface UserProps {
  user?: IProfile;
  isLoading?: boolean;
}

const UserInfo = ({ user, isLoading }: UserProps) => {
  if (isLoading) {
    return (
      <View style={{ padding: 20, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.userInfoContainer}>
      <View style={styles.userInfoWrapper}>
        <Text style={styles.userInfoLabel}>Nome</Text>
        <Text>{user?.name !== null ? user?.name : "Não informado"}</Text>
      </View>
      <View style={styles.userInfoWrapper}>
        <Text style={styles.userInfoLabel}>Altura</Text>
        <Text>{user?.heigth !== null ? user?.heigth : "Não informado"}</Text>
      </View>
      <View style={styles.userInfoWrapper}>
        <Text style={styles.userInfoLabel}>Peso</Text>
        <Text>{user?.weigth !== null ? user?.weigth : "Não informado"}</Text>
      </View>
      <View style={styles.userInfoWrapper}>
        <Text style={styles.userInfoLabel}>Idade</Text>
        <Text>{user?.age !== null ? user?.age : "Não informado"}</Text>
      </View>
      <View style={{ height: 1, backgroundColor: "#ccc", width: "100%", marginVertical: 16 }} />
      <View style={styles.userImcInfo}>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.userInfoLabel}>IMC</Text>
          <Text>{user?.calc_IMC !== null ? user?.calc_IMC : "Não informado"}</Text>
        </View>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.userInfoLabel}>Classificação</Text>
          <Text>
            {user?.imc_classification !== null ? user?.imc_classification : "Não informado"}
          </Text>
        </View>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.userInfoLabel}>Grau de obesidade</Text>
          <Text>{user?.imc_degree !== null ? user?.imc_degree : "Não informado"}</Text>
        </View>
      </View>
    </View>
  );
};

export default function User() {
  const { handleLogout } = useAuth();

  const { profile, profileErro, profileLoading } = useProfile();

  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEdit = () => setIsEditing(!isEditing);

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 30 }}>
      <Header />
      <HabitTodoManger
        type="habit"
        mode="edit"
      />
      <View style={{ alignItems: "flex-end", marginTop: 32 }}>
        {!isEditing && (
          <CustomButton
            title={"Editar"}
            variant="outLine"
            shape="rect"
            iconPosition="end"
            icon={<FontAwesome6 name="edit" color={Colors.light.primary} size={16} />}
            onPress={handleToggleEdit}
          />
        )}

        {isEditing ? (
          <UserProfileForm
            initialData={profile}
            onCancel={handleToggleEdit}
            onSaved={handleToggleEdit}
          />
        ) : (
          <>
            <UserInfo user={profile} isLoading={profileLoading} />
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Sair"
                variant="secondary"
                style={{ backgroundColor: Colors.light.redColor }}
                shape="rect"
                iconPosition="end"
                icon={<Entypo name="log-out" size={18} color={Colors.light.reactNativeWhite} />}
                onPress={handleLogout}
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
          </>
        )}
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
