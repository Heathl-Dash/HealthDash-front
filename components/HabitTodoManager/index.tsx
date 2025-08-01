import { Colors } from "@/constants/Colors";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomInput from "../CustomInput";
import CustomButton from "../CustomButton";
import { Ionicons } from "@expo/vector-icons";

interface HabitTodoMangerProps {
  mode: "edit" | "create";
  type: "todo" | "habit";
  item?: IToDo | IHabit;
}

const HabitTodoManger = ({ mode, type, item }: HabitTodoMangerProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.modalHeader}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color={Colors.light.reactNativeWhite} />
        </TouchableOpacity>
        <View style={styles.flexSpacer} />
        <View style={styles.textContainer}>
          <Text style={styles.actionDescription}>
            {mode === "create" ? "Criando" : "Editando"} {type === "habit" ? "Hábito" : "Tarefa"}
          </Text>
        </View>
        <View style={styles.flexSpacer} />
      </View>

      <View>
        <CustomInput
          placeholder="Título"
          placeholderTextColor={Colors.light.reactNativeWhite}
          value={item?.title}
          style={{ height: 44, borderColor: Colors.light.reactNativeWhite }}
        />
      </View>
      <View>
        <CustomInput
          placeholder="Descrição"
          placeholderTextColor={Colors.light.reactNativeWhite}
          value={item?.description}
          style={{ height: 44, borderColor: Colors.light.reactNativeWhite }}
        />
      </View>
      {type === "habit" && (
        <View style={styles.habitTypeChoice}>
          <CustomButton
            title="+"
            variant="outLine"
            style={{
              height: 52,
              width: 52,
              borderColor: Colors.light.reactNativeWhite,
              padding: 2,
            }}
            toggle={true}
            toggledColor={Colors.light.reactNativeWhite}
            toggledTextColor={Colors.light.mediumBlue}
            styleText={{ fontSize: 32, color: Colors.light.reactNativeWhite }}
            onPress={() => {}}
          />
          <CustomButton
            title="-"
            variant="outLine"
            style={{
              height: 52,
              width: 52,
              borderColor: Colors.light.reactNativeWhite,
              padding: -2,
            }}
            toggle={true}
            toggledColor={Colors.light.reactNativeWhite}
            toggledTextColor={Colors.light.mediumBlue}
            styleText={{ fontSize: 32, color: Colors.light.reactNativeWhite }}
            onPress={() => {}}
          />
        </View>
      )}
      <View style={styles.actionsButton}>
        {mode === "edit" && (
          <CustomButton
            title="Excluir"
            variant="primary"
            style={{ backgroundColor: Colors.light.redColor }}
            shape="rect"
            onPress={() => {}}
          />
        )}
        <CustomButton
          title="Salvar"
          variant="primary"
          style={{ backgroundColor: Colors.dark.darkBlue }}
          shape="rect"
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    marginBottom: 100,
    backgroundColor: Colors.light.mediumBlue,
    borderRadius: 16,
    padding: 24,
    gap: 24,
  },
  actionsButton: {
    flexDirection: "row",
    alignSelf: "flex-end",
    gap: 24,
  },
  habitTypeChoice: {
    flexDirection: "row",
    gap: 32,
    alignSelf: "center",
  },
  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
  },
  flexSpacer: {
    flex: 1,
  },
  textContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  actionDescription: {
    color: Colors.light.reactNativeWhite,
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default HabitTodoManger;
