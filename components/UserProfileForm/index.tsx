import React, { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomInput from "@/components/CustomInput";
import { Colors } from "@/constants/Colors";
import { FontAwesome6, MaterialIcons } from "@expo/vector-icons";
import CustomButton from "@/components/CustomButton";
import useUpdateUserProfile from "@/hooks/useUserProfileForm";

interface UserProfileFormProps {
  initialData?: IProfile | null;
  onCancel: () => void;
  onSaved: () => void;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ initialData, onCancel, onSaved }) => {
  const [name, setName] = useState(initialData?.name ?? "");
  const [weigth, setWeigth] = useState(initialData?.weigth ?? "");
  const [heigth, setHeigth] = useState(initialData?.heigth ?? "");
  const [age, setAge] = useState(initialData?.age?.toString() ?? "");

  const updateMutation = useUpdateUserProfile();

  const handleUpdateProfile = () => {
    console.log("Botão clicado");
    updateMutation.mutate(
      {
        name,
        weigth,
        heigth,
        age: Number(age),
      },
      {
        onSuccess: () => {
          onSaved();
        },
        onError: (error) => {
          console.error("Erro ao atualizar perfil:", error);
        },
      }
    );
  };

  return (
    <SafeAreaView>
      <View style={styles.inputsContainer}>
        <View style={styles.row}>
          <View>
            <CustomInput label="Nome" value={name} onChangeText={setName} style={styles.input} />
          </View>
          <View>
            <CustomInput
              label="Altura"
              value={heigth}
              onChangeText={setHeigth}
              style={styles.input}
            />
          </View>
          <View>
            <CustomInput
              label="Peso"
              value={weigth}
              onChangeText={setWeigth}
              style={styles.input}
            />
          </View>
          <View>
            <CustomInput label="Idade" value={age} onChangeText={setAge} style={styles.input} />
          </View>
        </View>
      </View>
      <View style={styles.actionButtons}>
        <CustomButton
          title="Cancelar"
          variant="primary"
          style={{ backgroundColor: Colors.light.mediumGray }}
          shape="rect"
          iconPosition="end"
          icon={<MaterialIcons name="cancel" color={Colors.light.reactNativeWhite} size={16} />}
          onPress={onCancel}
        />
        <CustomButton
          title="Salvar"
          variant="primary"
          shape="rect"
          iconPosition="end"
          icon={<FontAwesome6 name="edit" color={Colors.light.reactNativeWhite} size={16} />}
          onPress={handleUpdateProfile}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  inputsContainer: {
    width: "100%",
    alignSelf: "center",
    marginTop: 8,
  },
  input: {
    width: 146,
    height: 42,
  },
  row: {
    justifyContent: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 20,
  },
  actionButtons: {
    alignSelf: "center",
    marginTop: 32,
    flexDirection: "row",
    gap: 20,
  },
});

export default UserProfileForm;
