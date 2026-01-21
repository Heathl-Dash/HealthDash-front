import CustomInput from "@/components/CustomInput";
import ImageInput from "@/components/ImageInput";
import { Colors } from "@/constants/Colors";
import { useCreatePhysicalProfile } from "@/hooks/useCreatePhysicalProfile";
import { storage } from "@/service/storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { decodeToken } from "./utils/decodeToken";

export default function CreateProfile() {
  const [socialName, setSocialName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState<"FEMININO" | "MASCULINO" | "OUTRO" | "">("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");

  useEffect(() => {
    async function loadUserInfo() {
      const tokens = await storage.getTokens();

      if (!tokens?.access) return;

      const decoded = decodeToken(tokens.access);

      if (decoded?.name) {
        setSocialName(decoded.name);
      }

      if (decoded?.picture) {
        setAvatar(decoded.picture);
      }
    }

    loadUserInfo();
  }, []);

  const createPhysicalProfile = useCreatePhysicalProfile();

  const { push } = useRouter();

  function handleSubmit() {
    const birthDate = `${birthYear}-${birthMonth.padStart(2, "0")}-${birthDay.padStart(2, "0")}`;

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
        push("/(tabs)");
      },
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meu perfil</Text>

      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: avatar || "https://via.placeholder.com/96" }}
          style={styles.avatarImage}
        />

        <View>
          <ImageInput onChangeImage={setAvatar} label="Trocar avatar" />
        </View>
      </View>

      <CustomInput
        label="nome social"
        placeholder="Digite seu nome social"
        value={socialName}
        onChangeText={setSocialName}
        styleContainer={styles.inputSpacing}
        placeholderTextColor={Colors.light.darkGray}
      />

      <Text style={styles.label}>Data de nascimento</Text>

      <View style={styles.dateContainer}>
        <CustomInput
          placeholder="DD"
          keyboardType="number-pad"
          maxLength={2}
          value={birthDay}
          onChangeText={setBirthDay}
          styleContainer={styles.dateInput}
          placeholderTextColor={Colors.light.darkGray}
        />

        <CustomInput
          placeholder="MM"
          keyboardType="number-pad"
          maxLength={2}
          value={birthMonth}
          onChangeText={setBirthMonth}
          styleContainer={styles.dateInput}
          placeholderTextColor={Colors.light.darkGray}
        />

        <CustomInput
          placeholder="AAAA"
          keyboardType="number-pad"
          maxLength={4}
          value={birthYear}
          onChangeText={setBirthYear}
          styleContainer={styles.dateInput}
          placeholderTextColor={Colors.light.darkGray}
        />
      </View>

      <Text style={styles.genderLabel}>Gênero</Text>
      <View style={styles.genderContainer}>
        {["FEMININO", "MASCULINO"].map((item) => (
          <TouchableOpacity
            key={item}
            onPress={() => setGender(item as any)}
            style={[styles.genderButton, gender === item && styles.genderButtonActive]}
          >
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <CustomInput
        label="altura"
        placeholder="Ex: 168"
        keyboardType="decimal-pad"
        value={height}
        onChangeText={setHeight}
        styleContainer={styles.inputSpacing}
        placeholderTextColor={Colors.light.darkGray}
      />

      <CustomInput
        label="peso"
        placeholder="Ex: 69.0"
        keyboardType="decimal-pad"
        value={weight}
        onChangeText={setWeight}
        styleContainer={styles.inputSpacingLarge}
        placeholderTextColor={Colors.light.darkGray}
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
    color: Colors.light.darkGray,
  },
  inputSpacingLarge: {
    marginBottom: 24,
    color: Colors.light.darkGray,
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
    backgroundColor: Colors.light.secondary,
  },
  submitButton: {
    backgroundColor: Colors.light.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: "center",
  },
  submitText: {
    color: "#fff",
    fontWeight: "600",
  },
  label: {
    marginBottom: 8,
  },

  dateContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },

  dateInput: {
    flex: 1,
    marginRight: 8,
  },
});
