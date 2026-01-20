import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { useState } from "react";
import CustomInput from "@/components/CustomInput";
import { useCreatePhysicalProfile } from "@/hooks/useCreatePhysicalProfile";
import { useRouter } from "expo-router";

export default function CreateProfile() {
  const [socialName, setSocialName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<"FEMININO" | "MASCULINO" | "OUTRO" | "">("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  const createPhysicalProfile = useCreatePhysicalProfile();

  const {push} = useRouter() 

  function handleSubmit() {
    const physicalPayload = {
      birthDate,
      gender: gender as "FEMININO" | "MASCULINO",
      height: Number(height),
      weight: Number(weight),
    };

    createPhysicalProfile.mutate(physicalPayload, {
      onSuccess: () => {
        console.log("Perfil físico criado");

        // futuro:
        // updateSocialProfile({ socialName, avatar });
        push("/(tabs)")
      },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu perfil</Text>

      <View style={styles.avatarContainer}>
        {avatar ? (
          <Image source={{ uri: avatar }} style={styles.avatarImage} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text>Avatar</Text>
          </View>
        )}

      </View>
        

      <CustomInput
        label="nome social"
        placeholder="Digite seu nome social"
        value={socialName}
        onChangeText={setSocialName}
        styleContainer={styles.inputSpacing}
      />


      <CustomInput
        label="data de nascimento"
        placeholder="YYYY-MM-DD"
        value={birthDate}
        onChangeText={setBirthDate}
        styleContainer={styles.inputSpacing}
      />

      <Text style={styles.genderLabel}>Gênero</Text>
      <View style={styles.genderContainer}>
        {["FEMININO", "MASCULINO"].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setGender(item as any)}
            style={[
              styles.genderButton,
              gender === item && styles.genderButtonActive,
            ]}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <CustomInput
        label="altura"
        placeholder="Ex: 1.68"
        keyboardType="decimal-pad"
        value={height}
        onChangeText={setHeight}
        styleContainer={styles.inputSpacing}
      />

      <CustomInput
        label="peso"
        placeholder="Ex: 69.0"
        keyboardType="decimal-pad"
        value={weight}
        onChangeText={setWeight}
        styleContainer={styles.inputSpacingLarge}
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitText}>Salvar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    marginBottom: 16,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 24,
    width: "100%",
  },
  avatarImage: {
    width: 96,
    height: 96,
    borderRadius: 48,
  },
  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: "#e5e7eb",
    justifyContent: "center",
    alignItems: "center",
  },
  inputSpacing: {
    marginBottom: 12,
  },
  inputSpacingLarge: {
    marginBottom: 24,
  },
  genderLabel: {
    marginBottom: 8,
  },
  genderContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  genderButton: {
    padding: 8,
    marginRight: 8,
    borderRadius: 6,
    backgroundColor: "#e5e7eb",
  },
  genderButtonActive: {
    backgroundColor: "#22c55e",
  },
  submitButton: {
    backgroundColor: "#22c55e",
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
  },
});

