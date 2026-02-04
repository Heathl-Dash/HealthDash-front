import Attach from "@/components/Attach";
import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import ImageCarrousel from "@/components/ImageCarrousel";
import { Colors } from "@/constants/Colors";
import useAttachById from "@/hooks/useAttach";
import useUpdatePublication from "@/hooks/useUpdatePublication";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const EditPublication = () => {
  const { id, description, attachId, images, publicationType } = useLocalSearchParams<{
    id: string;
    description?: string;
    attachId?: string;
    images?: string;
    publicationType?: string
  }>();
  const router = useRouter();
  const [text, setText] = useState(description ?? "");

  const attachIdNumber = attachId ? Number(attachId) : undefined;
  const { data: attachDraft } = useAttachById(attachIdNumber);

  const parsedImages = useMemo(() => {
    if (!images) return [];
    try {
      const parsed = JSON.parse(images);
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  }, [images]);

  const updateMutation = useUpdatePublication();

  const handleSave = async () => {
    if (!id) return;

    if (!text.trim() && parsedImages.length === 0) {
      Alert.alert("Conteúdo vazio", "Adicione um texto antes de salvar.");
      return;
    }

    try {
      await updateMutation.mutateAsync({ id: Number(id), description: text });
      Alert.alert("Atualizado", "Sua publicação foi atualizada.");
      router.back();
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível editar agora. Tente novamente.");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          title: "Editar publicação",
          headerRight: () => (
            <CustomButton
              variant="primary"
              title="Salvar"
              onPress={handleSave}
              isDisable={updateMutation.isPending}
              isLoading={updateMutation.isPending}
              style={{ backgroundColor: Colors.light.mediumBlue }}
            />
          ),
        }}
      />

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 30}
      >
        <View style={styles.mainContainer}>
          <View style={{ flex: 1 }}>
            <CustomInput
              multiline
              autoFocus
              placeholder="O que você está pensando?"
              styleContainer={{ flex: 1 }}
              style={styles.inputStyle}
              value={text}
              onChangeText={setText}
            />
          </View>

          {parsedImages.length > 0 && (
            <View style={styles.imagesContainer}>
              <ImageCarrousel images={parsedImages} />
            </View>
          )}

          {attachDraft && (
            <Attach attach={attachDraft} type={publicationType} />
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 30,
    paddingBottom: 10,
  },
  inputStyle: {
    flex: 1,
    textAlignVertical: "top",
    color: Colors.light.darkGray,
    fontSize: 18,
    borderWidth: 0,
    marginBottom: 10,
  },
  imagesContainer: {
    marginTop: 10,
    backgroundColor: Colors.light.tertiary,
    padding: 20,
    borderRadius: 25,
  },
});

export default EditPublication;
