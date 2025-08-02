import { Colors } from "@/constants/Colors";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
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
  onPressEditBottle: (bottle: IBottle) => void;
}

const WaterModal = ({
  bottles,
  visible,
  onClose,
  onPressBottleButton,
  onPressAddBottle,
  onPressEditBottle,
}: WaterModalProps) => {
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [selectedBottles, setSelectedBottles] = useState<number[]>([]);
  const [isSelectAll, setIsSelectAll] = useState(false);

  const toggleSelectBottle = (id: number) => {
    if (selectedBottles.includes(id)) {
      const newSelection = selectedBottles.filter((bottleId) => bottleId !== id);
      setSelectedBottles(newSelection);
      if (newSelection.length === 0) setIsSelectionMode(false);
    } else {
      setSelectedBottles((prev) => [...prev, id]);
    }
  };

  const handleLongPress = (id: number) => {
    setIsSelectionMode(true);
    setSelectedBottles([id]);
  };

  const handleSelectAll = () => {
    if (selectedBottles.length === bottles.length) {
      setSelectedBottles([]);
      setIsSelectionMode(false);
      setIsSelectAll(false);
    } else {
      setSelectedBottles(bottles.map((b) => b.water_bottle_id));
      setIsSelectionMode(true);
      setIsSelectAll(true);
    }
  };

  const handleCancelSelection = () => {
    setSelectedBottles([]);
    setIsSelectionMode(false);
  };

  useEffect(() => {
    setIsSelectAll(selectedBottles.length === bottles.length && bottles.length > 0);
  }, [selectedBottles, bottles]);

  useEffect(() => {
    if (!visible) {
      setSelectedBottles([]);
      setIsSelectAll(false);
      setIsSelectionMode(false);
    }
  }, [visible]);

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
            {bottles?.length === 0 && (
              <View>
                <Text style={styles.noBottleText}>Cadastre sua primeira garrafa!</Text>
                <View style={styles.bottlesContent}>
                  <ButtonAddBottle onPress={onPressAddBottle} />
                </View>
              </View>
            )}
            {isSelectionMode && (
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <CustomButton
                  title="Selecionar tudo"
                  onPress={handleSelectAll}
                  variant="ghost"
                  icon={
                    isSelectAll ? (
                      <MaterialIcons name="check-box" color="white" size={30} />
                    ) : (
                      <MaterialIcons name="check-box-outline-blank" color="white" size={30} />
                    )
                  }
                  style={{ flex: 1, justifyContent: "flex-start" }}
                  styleText={{ color: "white", opacity: 0.8 }}
                />
                <CustomButton
                  title="Cancelar"
                  onPress={handleCancelSelection}
                  variant="ghost"
                  styleText={{ color: "white", opacity: 0.8 }}
                />
              </View>
            )}
            {bottles?.length === 1 && (
              <View style={styles.bottlesContent}>
                <BottleButton
                  name={bottles[0].bottle_name}
                  mlCapacity={bottles[0].ml_bottle}
                  bottleStyle={bottles[0].id_bottle_style}
                  isSelected={selectedBottles.includes(bottles[0].water_bottle_id)}
                  onPress={() => {
                    if (isSelectionMode) {
                      toggleSelectBottle(bottles[0].water_bottle_id);
                    } else {
                      onPressBottleButton(bottles[0]);
                    }
                  }}
                  onLongPress={() => handleLongPress(bottles[0].water_bottle_id)}
                />
                <ButtonAddBottle onPress={onPressAddBottle} />
              </View>
            )}
            {bottles?.length >= 2 && (
              <>
                <View style={styles.bottlesContent}>
                  {bottles.map((bottle) => (
                    <View style={{ width: "48%" }} key={bottle.water_bottle_id}>
                      <BottleButton
                        mlCapacity={bottle.ml_bottle}
                        name={bottle.bottle_name}
                        bottleStyle={bottle.id_bottle_style}
                        onPress={() => {
                          if (isSelectionMode) {
                            toggleSelectBottle(bottle.water_bottle_id);
                          } else {
                            onPressBottleButton(bottle);
                          }
                        }}
                        onLongPress={() => handleLongPress(bottle.water_bottle_id)}
                        variant="large"
                        isSelected={selectedBottles.includes(bottle.water_bottle_id)}
                      />
                    </View>
                  ))}
                </View>
                {!isSelectionMode && (
                  <View style={styles.buttonRow}>
                    <CustomButton
                      title="Adicionar garrafa"
                      variant="secondary"
                      style={{ width: 190 }}
                      styleText={{ color: "white" }}
                      icon={<Ionicons name="add" color="white" size={24} />}
                      onPress={onPressAddBottle}
                      isDisable={bottles.length >= 4}
                    />
                  </View>
                )}
              </>
            )}
            {isSelectionMode && (
              <View style={{ width: "100%", gap: 10 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
                  {selectedBottles.length === 1 && (
                    <CustomButton
                      title="Editar"
                      onPress={() => {
                        const bottleToEdit = bottles.find(
                          (b) => b.water_bottle_id === selectedBottles[0]
                        );
                        if (bottleToEdit) {
                          onPressEditBottle(bottleToEdit);
                        }
                      }}
                      variant="secondary"
                      style={{ width: "45%" }}
                    />
                  )}
                  {selectedBottles.length >= 1 && (
                    <CustomButton
                      title="Excluir"
                      onPress={() => {
                        // confirmar e excluir
                      }}
                      style={{ width: "45%", backgroundColor: Colors.light.redColor, opacity: 0.9 }}
                      variant="secondary"
                    />
                  )}
                </View>
              </View>
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
