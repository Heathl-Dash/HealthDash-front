import CustomButton from "@/components/CustomButton";
import CustomInput from "@/components/CustomInput";
import Attach from "@/components/Attach";
import AttachSelectorModal from "@/components/AttachSelectorModal";
import ImageInput from "@/components/ImageInput";
import { Colors } from "@/constants/Colors";
import { Entypo, MaterialCommunityIcons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useCreatePublication from "@/hooks/useCreatePublication";

const CreatePublication = () => {
  const { attachType: attachTypeParam, attachDraft: attachDraftParam } =
    useLocalSearchParams<{
      attachType?: string;
      attachDraft?: string;
    }>();
  const [images, setImages] = useState<string[]>([]);
  const [attachType, setAttachType] = useState<"habit" | "toDo" | null>(null);
  const [attachDraft, setAttachDraft] = useState<IAttach | null>(null);
  const [isAttachModalVisible, setIsAttachModalVisible] = useState(false);
  const [description, setDescription] = useState("");
  const show = images.length > 0;
  const router = useRouter();
  const { handlePublish, isSaving } = useCreatePublication({
    description,
    images,
    attachDraft,
    attachType,
    onSuccess: () => {
      setDescription("");
      setImages([]);
      setAttachDraft(null);
      setAttachType(null);
      Alert.alert("Publicado", "Sua publicação foi criada com sucesso.");
      router.back();
    },
  });

  const openAttachModal = () => {
    setIsAttachModalVisible(true);
  };

  const parseAttachDraft = (rawAttach?: string): IAttach | null => {
    if (!rawAttach) return null;
    try {
      const parsed = JSON.parse(rawAttach);
      return parsed && typeof parsed === "object" ? (parsed as IAttach) : null;
    } catch {
      return null;
    }
  };

  React.useEffect(() => {
    if (attachDraft || attachType) return;

    if (attachTypeParam !== "habit" && attachTypeParam !== "toDo") return;
    const parsedAttach = parseAttachDraft(
      typeof attachDraftParam === "string" ? attachDraftParam : undefined
    );
    if (!parsedAttach) return;

    setAttachType(attachTypeParam);
    setAttachDraft(parsedAttach);
  }, [attachDraft, attachType, attachDraftParam, attachTypeParam]);

  const handleSelectHabit = (habit: IHabit) => {
    const attach: IAttach = {
      title: habit.title,
      description: habit.description ?? undefined,
      isPositive: habit.positive ?? false,
      isNegative: habit.negative ?? false,
      positiveCount: habit.positive_count,
      negativeCount: habit.negative_count,
    };
    setAttachType("habit");
    setAttachDraft(attach);
    setIsAttachModalVisible(false);
  };

  const handleSelectTodo = (todo: IToDo) => {
    const attach: IAttach = {
      title: todo.title,
      description: todo.description ?? undefined,
      done: todo.done,
    };
    setAttachType("toDo");
    setAttachDraft(attach);
    setIsAttachModalVisible(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "white" }}>
      <Stack.Screen
        options={{
          title: "Criar publicação",
          headerRight: () => (
            <CustomButton
              variant="primary"
              title="Publicar"
              onPress={handlePublish}
              isDisable={isSaving}
              isLoading={isSaving}
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
              value={description}
              onChangeText={setDescription}
            />
          </View>

          <View style={styles.bottomContent}>
            {show && (
              <View style={styles.imagesContainer}>
                {images &&
                  images.map((img) => (
                    <Image source={{ uri: img }} key={img} style={styles.image} />
                  ))}
              </View>
            )}

            {!!attachDraft && attachType && (
              <View style={styles.attachContainer}>
                <Attach type={attachType} attach={attachDraft} />
              </View>
            )}

            <View style={styles.optionsContainer}>
              <ImageInput
                onChangeImages={setImages}
                allowsMultipleSelection
                label="Adicionar imagem"
                icon={<Entypo name="attachment" size={20} />}
              />
              <CustomButton
                title="hábito/tarefa"
                onPress={openAttachModal}
                variant="tertiary"
                shape="rect"
                icon={<MaterialCommunityIcons name="clipboard-text-outline" size={20} />}
              />
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>

      <AttachSelectorModal
        visible={isAttachModalVisible}
        onClose={() => setIsAttachModalVisible(false)}
        onSelectHabit={handleSelectHabit}
        onSelectTodo={handleSelectTodo}
      />
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
  bottomContent: {
    marginTop: "auto",
  },
  attachContainer: {
    marginBottom: 12,
  },
  imagesContainer: {
    flexDirection: "row",
    width: "100%",
    height: 110,
    alignItems: "center",
    gap: 15,
    padding: 10,
    backgroundColor: Colors.light.tertiary,
    marginBottom: 15,
    borderRadius: 10,
  },
  image: {
    borderRadius: 8,
    height: "90%",
    aspectRatio: 1,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    gap: 10,
    paddingBottom: Platform.OS === "android" ? 60 : 0,
  },
});

export default CreatePublication;
