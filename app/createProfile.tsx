import CustomInput from "@/components/CustomInput";
import ImageInput from "@/components/ImageInput";
import { Colors } from "@/constants/Colors";
import { useCreateProfile } from "@/hooks/useCreateProfile";
import { useProfile } from "@/hooks/useProfile";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";
import { uploadProfileAvatar } from "@/lib/profile";
import { storage } from "@/service/storage";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { decodeToken } from "./utils/decodeToken";

type Gender = "FEMININO" | "MASCULINO" | "OUTRO" | "";

export default function CreateProfile() {
  const [socialName, setSocialName] = useState("");
  const [userName, setUserName] = useState("");
  const [bio, setBio] = useState("");
  const [avatar, setAvatar] = useState("");
  const [birthDay, setBirthDay] = useState("");
  const [birthMonth, setBirthMonth] = useState("");
  const [birthYear, setBirthYear] = useState("");
  const [gender, setGender] = useState<Gender>("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [hasHydrated, setHasHydrated] = useState(false);

  const { edit } = useLocalSearchParams<{ edit?: string }>();

  const isEdit = edit === "true";

  const { profile } = useProfile(isEdit);

  useEffect(() => {
    if (isEdit) return;

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
  }, [isEdit]);

  const createPhysicalProfile = useCreateProfile();
  const updatePhysicalProfile = useUpdateProfile();

  const router = useRouter();

  useEffect(() => {
    if (!isEdit || !profile || hasHydrated) return;

    setSocialName(profile.socialName ?? "");
    setBio(profile.bio ?? "");
    setAvatar(profile.avatarUrl ?? "");
    setHeight(profile.height ? String(profile.height) : "");
    setWeight(profile.weight ? String(profile.weight) : "");

    const profileAny = profile as any;
    const rawBirthDate = profileAny?.birthDate ?? profileAny?.birth_date;
    if (rawBirthDate && typeof rawBirthDate === "string") {
      const [year, month, day] = rawBirthDate.split("-");
      setBirthYear(year ?? "");
      setBirthMonth(month ?? "");
      setBirthDay(day ?? "");
    }

    const rawGender = profileAny?.gender;
    if (rawGender === "FEMININO" || rawGender === "MASCULINO" || rawGender === "OUTRO") {
      setGender(rawGender);
    }

    if (typeof profileAny?.isPublic === "boolean") {
      setIsPublic(profileAny.isPublic);
    }

    if (typeof profileAny?.userName === "string") {
      setUserName(profileAny.userName);
    }

    setHasHydrated(true);
  }, [hasHydrated, isEdit, profile]);

  useEffect(() => {
    if (!isEdit || userName) return;

    async function loadUserName() {
      const tokens = await storage.getTokens();
      if (!tokens?.access) return;

      const decoded = decodeToken(tokens.access);
      if (decoded?.preferred_username) {
        setUserName(decoded.preferred_username);
      }
    }

    loadUserName();
  }, [isEdit, userName]);

  const isLocalAvatar =
    avatar.startsWith("file://") || avatar.startsWith("content://") || avatar.startsWith("ph://");

  async function handleSubmit() {
    const birthDate = `${birthYear}-${birthMonth.padStart(2, "0")}-${birthDay.padStart(2, "0")}`;

    if (isEdit) {
      if (avatar && isLocalAvatar) {
        await uploadProfileAvatar(avatar);
      }

      await updatePhysicalProfile.mutateAsync({
        isPublic,
        birthDate,
        bio,
        socialName,
        userName,
        height: Number(height),
        weight: Number(weight),
        gender: gender as Exclude<Gender, "">,
      });

      router.back();
      return;
    }

    await createPhysicalProfile.mutateAsync({
      socialName,
      birthDate,
      gender: gender as Exclude<Gender, "">,
      height: Number(height),
      weight: Number(weight),
    });

    console.log("Perfil físico criado");
    router.replace("/(tabs)");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 30}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Meu perfil</Text>

          {isEdit && (
            <View style={styles.avatarContainer}>
              {avatar ? (
                <Image
                  source={{ uri: avatar || "https://via.placeholder.com/96" }}
                  style={styles.avatarImage}
                />
              ) : (
                <ImageInput onChangeImage={setAvatar} label="" style={styles.avatarPlaceholder} />
              )}

              <View>
                <ImageInput onChangeImage={setAvatar} label="Trocar avatar" />
              </View>
            </View>
          )}

          <CustomInput
            label="nome social"
            placeholder="Digite seu nome social"
            value={socialName}
            onChangeText={setSocialName}
            styleContainer={styles.inputSpacing}
            placeholderTextColor={Colors.light.darkGray}
          />

          {isEdit && (
            <CustomInput
              label="username"
              placeholder="Digite seu username"
              value={userName}
              onChangeText={setUserName}
              styleContainer={styles.inputSpacing}
              placeholderTextColor={Colors.light.darkGray}
            />
          )}

          {isEdit && (
            <CustomInput
              label="Bio"
              placeholder="Digite seu nome social"
              value={bio}
              onChangeText={setBio}
              styleContainer={styles.inputSpacing}
              placeholderTextColor={Colors.light.darkGray}
            />
          )}

          <Text style={styles.label}>* Data de nascimento</Text>

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

          {isEdit && (
            <>
              <Text style={styles.genderLabel}>Visibilidade</Text>
              <View style={styles.genderContainer}>
                {[
                  { label: "Público", value: true },
                  { label: "Privado", value: false },
                ].map((item) => (
                  <TouchableOpacity
                    key={item.label}
                    onPress={() => setIsPublic(item.value)}
                    style={[
                      styles.genderButton,
                      isPublic === item.value && styles.genderButtonActive,
                    ]}
                  >
                    <Text>{item.label}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </>
          )}

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
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginBottom: 50,
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
    borderRadius: 50,
    backgroundColor: "#e5e7eb",
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
