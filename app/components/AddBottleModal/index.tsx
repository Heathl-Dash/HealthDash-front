import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View style={styles.modalBackGround}>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Crie uma nova garrafa</Text>
            <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
              <Ionicons name="close-outline" color="white" size={28} />
            </TouchableOpacity>
          </View>
          <View style={styles.formContainer}>
            <CustomInput
              label="Nome"
              style={{ borderColor: "white" }}
              placeholder="nome da garrafa"
            />

            <Text style={{ color: "white", fontWeight: "bold", marginTop: 20 }}>
              Selecione o estilo da garrafa:
            </Text>

            <View style={styles.bottlesContainer}>
              {BOTTLES.map((bottle) => (
                <View style={styles.bottlesContent} key={bottle.idBottleStyle}>
                  <BottleButton
                    name={`Estilo ${bottle.bottleName}`}
                    mlCapacity={bottle.mlBottle}
                    bottleStyle={bottle.idBottleStyle}
                    onPress={() => {}}
                    variant="large"
                    // onPress={() => setSelectedBottleStyle(bottle.idBottleStyle)}
                    // isSelected={selectedBottleStyle === bottle.idBottleStyle}
                  />
                </View>
              ))}
            </View>

            <CustomInput
              label="Capacidade (ml)"
              style={{ borderColor: "white" }}
              placeholder="ex: 500"
            />

            <View style={styles.buttonRow}>
              <CustomButton
                title="Adicionar garrafa"
                variant="outLine"
                style={{ borderColor: "white", width: 190, opacity: 0.9 }}
                styleText={{ color: "white" }}
                onPress={() => {}}
              />
            </View>
          </View>
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
    backgroundColor: "#6CA1D7",
    minHeight: 300,
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
  selected: {
    borderWidth: 3,
    borderColor: "#e0d9ff",
  },
  buttonRow: {
    width: "100%",
    alignItems: "flex-end",
    marginTop: 20,
  },
});
