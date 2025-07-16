import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Modal, Text, TouchableOpacity, View } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import BottleButton from "../BottleButton";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";
import { styles } from './style';
import useAddBottleModel from "./useAddBottleModel";

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
  const {
    mlBottleError,
    nameBottleError,
    nameBottleValue,
    mlBottleValue,
    onSaveBottle,
    selectedBottleStyle,
    setSelectedBottleStyle,
    setMLBottleValue,
    setNameBottleValue,
  } = useAddBottleModel({ onClose });

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
                  style={{ borderColor: "white", width: '45%', opacity: 0.9 }}
                  styleText={{ color: "white" }}
                  onPress={onSaveBottle}
                />
                <CustomButton 
                  title="Cancelar"
                  variant="ghost"
                  style={{width:'45%'}}
                  styleText={{ color: "white"}}
                  onPress={onClose}
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

