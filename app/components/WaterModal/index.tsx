import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BottleButton from "../BottleButton";
import CustomButton from "../CustomButton";
import ButtonAddBottle from "./ButtonAddBottle";

interface WaterModalProps {
  bottles: IBottle[];
  visible: boolean;
  onClose: () => void;
  onPressBottleButton: (bottle: IBottle) => void;
  onPressAddBottle: () => void;
}

const WaterModal = ({
  bottles,
  visible,
  onClose,
  onPressBottleButton,
  onPressAddBottle,
}: WaterModalProps) => {
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <Pressable style={styles.modalBackGround} onPress={onClose}>
        <Pressable style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Registre seu consumo de água</Text>
            <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
              <Ionicons name="close-outline" color="white" size={28} />
            </TouchableOpacity>
          </View>
          <View style={styles.bottlesContainer}>
            {bottles?.length == 0 && (
              <View>
                <Text style={styles.noBottleText}>Cadastre sua primeira garrafa!</Text>
                <View style={styles.bottlesContent}>
                  <ButtonAddBottle onPress={onPressAddBottle} />
                </View>
              </View>
            )}
            {bottles?.length == 1 && (
              <View style={styles.bottlesContent}>
                <BottleButton
                  name={bottles[0].bottle_name}
                  mlCapacity={bottles[0].ml_bottle}
                  bottleStyle={bottles[0].id_bottle_style}
                  onPress={() => onPressBottleButton(bottles[0])}
                />
                <ButtonAddBottle onPress={onPressAddBottle} />
              </View>
            )}
            {bottles?.length >= 2 && (
              <>
                <View style={[styles.bottlesContent]}>
                  {bottles?.map((bottle) => (
                    <View style={{ width: "48%" }} key={bottle.water_bottle_id}>
                      <BottleButton
                        mlCapacity={bottle.ml_bottle}
                        name={bottle.bottle_name}
                        bottleStyle={bottle.id_bottle_style}
                        onPress={() => onPressBottleButton(bottle)}
                        variant="large"
                      />
                    </View>
                  ))}
                </View>
                <View style={styles.buttonRow}>
                  <CustomButton
                    title="Adicionar garrafa"
                    variant="outLine"
                    style={{ borderColor: "white", width: 190, opacity: 0.9 }}
                    styleText={{ color: "white" }}
                    icon={<Ionicons name="add" color="white" size={24} />}
                    onPress={onPressAddBottle}
                    isDisable={bottles.length >= 4}
                  />
                </View>
              </>
            )}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default WaterModal;

const styles = StyleSheet.create({
  modalBackGround: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
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
  noBottleText: {
    color: "white",
    textAlign: "center",
    marginVertical: 16,
  },
  bottlesContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
  },
  bottlesContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    paddingVertical: 30,
    flexWrap: "wrap",
  },
  buttonRow: {
    width: "100%",
    alignItems: "flex-end",
  },
});
