import { Colors } from "@/constants/Colors";
import useHabit from "@/hooks/useHabit";
import useTodo from "@/hooks/useToDo";
import { habitForm, toDoForm } from "@/lib/axios";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomButton from "../CustomButton";
import CustomInput from "../CustomInput";

interface HabitTodoMangerProps {
  mode: "edit" | "create";
  type: "todo" | "habit";
  backFont: "nutri" | "fit";
  visible: boolean;
  item?: IToDo | IHabit;
  onClose?: () => void;
}

function isHabit(item: IToDo | IHabit): item is IHabit {
  return "positive" in item && "negative" in item;
}

const HabitTodoManager = ({
  mode,
  type,
  item,
  visible,
  backFont,
  onClose,
}: HabitTodoMangerProps) => {
  const {
    createNutriHabitMutation,
    deleteNutriHabitMutation,
    editNutriHabitMutation,
    createFitHabitMutation,
    deleteFitHabitMutation,
    editFitHabitMutation,
  } = useHabit();
  const {
    createNutriToDoMutation,
    editNutriToDoMutation,
    deleteNutriToDoMutation,
    deleteFitToDoMutation,
    editFitToDoMutation,
    createFitToDoMutation,
  } = useTodo();

  const [title, setTitle] = useState(item?.title ?? "");
  const [description, setDescription] = useState(item?.description ?? "");
  const [positive, setPositive] = useState(
    (type === "habit" && (item as IHabit)?.positive) ?? false
  );
  const [negative, setNegative] = useState(
    (type === "habit" && (item as IHabit)?.negative) ?? false
  );

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setPositive(false);
    setNegative(false);
  };

  const { mutate: createNutriHabit } = createNutriHabitMutation();
  const { mutate: editNutriHabit } = editNutriHabitMutation();
  const { mutate: deleteNutriHabit } = deleteNutriHabitMutation();

  const { mutate: createNutriToDo } = createNutriToDoMutation();
  const { mutate: editNutriToDo } = editNutriToDoMutation();
  const { mutate: deleteNutriToDo } = deleteNutriToDoMutation();

  const { mutate: createFitHabit } = createFitHabitMutation();
  const { mutate: editFitHabit } = editFitHabitMutation();
  const { mutate: deleteFitHabit } = deleteFitHabitMutation();

  const { mutate: createFitToDo } = createFitToDoMutation();
  const { mutate: editFitToDo } = editFitToDoMutation();
  const { mutate: deleteFitToDo } = deleteFitToDoMutation();

  const handleSave = () => {
    const payload = { title, description };

    if (!title.trim()) {
      alert("O título é obrigatório.");
      return;
    }

    if (type === "habit") {
      const habitPayload: habitForm = {
        title,
        description: description.trim() || "",
        positive,
        negative,
      };

      if (mode === "edit" && item?.id) {
        if (backFont === "nutri") {
          editNutriHabit(
            { id: item.id, habitData: habitPayload },
            {
              onSuccess: () => {
                resetForm();
                onClose?.();
              },
            }
          );
        } else {
          editFitHabit(
            { id: item.id, habitData: habitPayload },
            {
              onSuccess: () => {
                resetForm();
                onClose?.();
              },
            }
          );
        }
      } else {
        if (backFont === "nutri") {
          createNutriHabit(habitPayload, {
            onSuccess: () => {
              resetForm();
              onClose?.();
            },
          });
        } else {
          createFitHabit(habitPayload, {
            onSuccess: () => {
              resetForm();
              onClose?.();
            },
          });
        }
      }
    } else {
      const toDoPayload: toDoForm = {
        title,
        description: description.trim() || "",
      };

      if (mode === "edit" && item?.id) {
        if (backFont === "nutri") {
          editNutriToDo(
            { id: item.id, toDoData: toDoPayload },
            {
              onSuccess: () => {
                resetForm();
                onClose?.();
              },
              onError: (err) => {
                console.error("Erro ao editar:", err);
              },
            }
          );
        } else {
          editFitToDo(
            { id: item.id, toDoData: toDoPayload },
            {
              onSuccess: () => {
                resetForm();
                onClose?.();
              },
            }
          );
        }
      } else {
        if (backFont === "nutri") {
          createNutriToDo(toDoPayload, {
            onSuccess: () => {
              resetForm();
              onClose?.();
            },
          });
        } else {
          createFitToDo(toDoPayload, {
            onSuccess: () => {
              resetForm();
              onClose?.();
            },
          });
        }
      }
    }
  };

  useEffect(() => {
    if (mode === "edit" && item) {
      setTitle(item.title || "");
      setDescription(item.description || "");

      if (type === "habit" && isHabit(item)) {
        setPositive(item.positive ?? false);
        setNegative(item.negative ?? false);
      }
    } else {
      setTitle("");
      setDescription("");
      setPositive(false);
      setNegative(false);
    }
  }, [mode, item, type]);

  const handleDelete = () => {
    if (!item?.id) return;

    if (type === "habit") {
      if (backFont === "nutri") {
        deleteNutriHabit(item.id, {
          onSuccess: () => {
            onClose?.();
          },
        });
      } else {
        deleteFitHabit(item.id, {
          onSuccess: () => {
            onClose?.();
          },
        });
      }
    } else {
      if (backFont === "nutri") {
        deleteNutriToDo(item.id, {
          onSuccess: () => {
            onClose?.();
          },
        });
      } else {
        deleteFitToDo(item.id, {
          onSuccess: () => {
            onClose?.();
          },
        });
      }
    }
  };

  return (
    <Modal visible={visible} onRequestClose={onClose} transparent>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.modalHeader}>
            <TouchableOpacity>
              <Ionicons
                name="arrow-back"
                size={24}
                color={Colors.light.reactNativeWhite}
                onPress={onClose}
              />
            </TouchableOpacity>
            <View style={styles.flexSpacer} />
            <View style={styles.textContainer}>
              <Text style={styles.actionDescription}>
                {mode === "create" ? "Criando" : "Editando"}{" "}
                {type === "habit" ? "Hábito" : "Tarefa"}
              </Text>
            </View>
            <View style={styles.flexSpacer} />
          </View>
          <View>
            <CustomInput
              placeholder="Título"
              placeholderTextColor={Colors.light.reactNativeWhite}
              value={title}
              onChangeText={setTitle}
              style={{
                height: 44,
                borderColor: Colors.light.reactNativeWhite,
                color: Colors.light.reactNativeWhite,
              }}
            />
          </View>
          <View>
            <CustomInput
              placeholder="Descrição"
              placeholderTextColor={Colors.light.reactNativeWhite}
              value={description}
              onChangeText={setDescription}
              style={{
                height: 44,
                borderColor: Colors.light.reactNativeWhite,
                color: Colors.light.reactNativeWhite,
              }}
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
                toggled={positive}
                toggledColor={Colors.light.reactNativeWhite}
                toggledTextColor={Colors.light.mediumBlue}
                styleText={{ fontSize: 32, color: Colors.light.reactNativeWhite }}
                onPress={() => setPositive(!positive)}
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
                toggled={negative}
                toggledColor={Colors.light.reactNativeWhite}
                toggledTextColor={Colors.light.mediumBlue}
                styleText={{ fontSize: 32, color: Colors.light.reactNativeWhite }}
                onPress={() => setNegative(!negative)}
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
                onPress={handleDelete}
              />
            )}
            <CustomButton
              title="Salvar"
              variant="primary"
              style={{ backgroundColor: Colors.light.secondary }}
              shape="rect"
              onPress={handleSave}
            />
          </View>
        </View>
      </View>
    </Modal>
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
    width: "88%",
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
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});

export default HabitTodoManager;
