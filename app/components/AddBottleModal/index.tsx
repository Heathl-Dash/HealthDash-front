import { createBottles } from "@/app/lib/axios";
import { Ionicons } from "@expo/vector-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BottleButton from "../BottleButton";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";

const BOTTLES = [
  {
    bottleName: "",
    mlBottle: 0,
    idBottleStyle: 1,
    waterBottleId: 0,
  },
  {
    bottleName: "",
    mlBottle: 0,
    idBottleStyle: 2,
    waterBottleId: 0,
  },
  {
    bottleName: "",
    mlBottle: 0,
    idBottleStyle: 3,
    waterBottleId: 0,
  },
  {
    bottleName: "",
    mlBottle: 0,
    idBottleStyle: 4,
    waterBottleId: 0,
  },
];

interface AddBottleModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddBottleModal = ({ visible, onClose }: AddBottleModalProps) => {
  const [nameBottleValue, setNameBottleValue] = useState("");
  const [selectedBottleStyle, setSelectedBottleStyle] = useState(1);
  const [mlBottleValue, setMLBottleValue] = useState("0");

  const [nameBottleError, setNameBottleError] = useState("");
  const [mlBottleError, setMLBottleError] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createBottles,
    onSuccess: () => {
      console.log("Garrafa criada com sucesso!");

      setNameBottleValue("");
      setMLBottleValue("0");
      setSelectedBottleStyle(1);
      setNameBottleError("");
      setMLBottleError("");
      onClose();

      queryClient.invalidateQueries({ queryKey: ["waterGoal"] });
    },
    onError: (error) => {
      console.log("Erro ao criar garrafa:", error);
    },
  });

  const onSaveBottle = () => {
    let isValid = true;

    setNameBottleError("");
    setMLBottleError("");

    if (nameBottleValue.trim() === "") {
      setNameBottleError("O nome da garrafa é obrigatório.");
      isValid = false;
    }
    if (mlBottleValue.trim() === "" || Number(mlBottleValue) <= 0) {
      setMLBottleError("Informe um valor válido em mL.");
      isValid = false;
    }

    if (!isValid) return;

    setNameBottleError("");
    setMLBottleError("");

    const bottleData = {
      bottle_name: nameBottleValue,
      ml_bottle: Number(mlBottleValue),
      water_bottle_id: selectedBottleStyle,
    };

    mutation.mutate(bottleData);
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View style={styles.modalBackGround}>
        <View style={styles.container}>
          <KeyboardAwareScrollView>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>Crie uma nova garrafa</Text>
              <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
                <Ionicons name="close-outline" color="white" size={28} />
              </TouchableOpacity>
            </View>
            <View style={styles.formContainer}>
              <CustomInput
                label="Nome"
                value={nameBottleValue}
                onChangeText={setNameBottleValue}
                style={{ borderColor: "white" }}
                placeholder="nome da garrafa"
                errorMessage={nameBottleError}
              />
              <Text style={{ color: "white", fontWeight: "bold", marginTop: 20 }}>
                Selecione o estilo da garrafa:
              </Text>
              <View style={styles.bottlesContainer}>
                {BOTTLES.map((bottle) => (
                  <View style={styles.bottlesContent} key={bottle.idBottleStyle}>
                    <BottleButton
                      name={nameBottleValue}
                      mlCapacity={Number(mlBottleValue)}
                      bottleStyle={bottle.idBottleStyle}
                      variant="large"
                      onPress={() => setSelectedBottleStyle(bottle.idBottleStyle)}
                      isSelected={selectedBottleStyle === bottle.idBottleStyle}
                    />
                  </View>
                ))}
              </View>
              <CustomInput
                label="Capacidade (ml)"
                style={{ borderColor: "white" }}
                placeholder="ex: 500"
                keyboardType="numeric"
                value={mlBottleValue}
                onChangeText={setMLBottleValue}
                errorMessage={mlBottleError}
              />
              <View style={styles.buttonRow}>
                <CustomButton
                  title="Salvar garrafa"
                  variant="outLine"
                  style={{ borderColor: "white", width: 190, opacity: 0.9 }}
                  styleText={{ color: "white" }}
                  onPress={onSaveBottle}
                />
              </View>
            </View>
          </KeyboardAwareScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default AddBottleModal;

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: "#4288ca",
    minHeight: 100,
    maxHeight: "80%",
    overflow: "hidden",
  },
  titleContainer: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  title: {
    width: "100%",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  closeIcon: {
    position: "absolute",
    right: 0,
    top: 0,
  },
  formContainer: {
    width: "100%",
    gap: 10,
    alignItems: "center",
  },
  bottlesContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: 12,
    paddingVertical: 10,
    flexWrap: "wrap",
  },
  bottlesContent: {
    width: "48%",
    borderRadius: 12,
  },
  buttonRow: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 20,
  },
});
