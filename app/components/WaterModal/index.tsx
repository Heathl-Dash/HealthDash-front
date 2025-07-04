import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, View } from "react-native";
import CustomButton from "../CustomButton";

interface WaterModelProps {
  bottles: IBottle[];
  visible: boolean;
  onClose: () => void;
}

const WaterModel = ({ bottles, visible, onClose }: WaterModelProps) => {
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View style={styles.modalBackGround}>
        <View style={styles.container}>
          <Text style={styles.title}>Registre seu consumo de água</Text>
          <View>
            {bottles.length == 0 && (
              <View>
                <Text style={styles.noBottleText}>Cadastre sua primeira garrafa!</Text>
                <View></View>
              </View>
            )}
          </View>
          {bottles.length > 2 && (
            <CustomButton
              title="Adicionar garrafa"
              variant="outLine"
              style={{ borderColor: "white" }}
              styleText={{ color: "white" }}
              icon={<Ionicons name="add" color="white" size={24} />}
              onPress={() => {}}
            />
          )}
        </View>
      </View>
    </Modal>
  );
};

export default WaterModel;

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 20,
    textAlign: "center",
    backgroundColor: "#6CA1D7",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
  },
  noBottleText: {
    color: "white",
    textAlign: "center",
    marginVertical: 16,
  },
});
