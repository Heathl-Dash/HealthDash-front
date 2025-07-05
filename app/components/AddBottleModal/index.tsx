import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface AddBottleModalProps {
  visible: boolean;
  onClose: () => void;
}

const AddBottleModal = ({ visible, onClose }: AddBottleModalProps) => {
  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Crie uma nova garrafa</Text>
          <TouchableOpacity style={styles.closeIcon} onPress={onClose}>
            <Ionicons name="close-outline" color="white" size={28} />
          </TouchableOpacity>
        </View>
        <View>
          
        </View>
      </View>
    </Modal>
  );
};

export default AddBottleModal;

const styles = StyleSheet.create({
  container: {
    width: "90%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
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
});
