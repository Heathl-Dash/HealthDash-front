import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Alert, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WaterButton from "../components/WaterButton";
import WaterModal from "../components/WaterModal";
import { editWaterGoal, getWaterGoal } from "../lib/axios";
import AddBottleModal from "../components/AddBottleModal";


export default function HomeScreen() {
  const [waterModalIsOpen, setWaterModalIsOpen] = useState(false);
  const [addBottleModalIsOpen, setAddBottleModalIsOpen] = useState(false);

  const { data: waterGoal, error, refetch} = useQuery({
    queryKey: ["waterGoal"],
    queryFn: getWaterGoal,
  });


  const queryClient = useQueryClient();

  const openWaterModal = async () => {
    setWaterModalIsOpen(true);
    await queryClient.refetchQueries({
      queryKey: ["waterGoal"],
    });
    
    if(error){
      Alert.alert('Ops, aconteceu algum erro :(')
    }
  };

  const updateWaterGoalWithBottle = async(bottle: IBottle) => {
    if (!waterGoal) return

    const newMlDrinked = waterGoal.ml_drinked + bottle.ml_bottle
    
    try {
      await editWaterGoal({
        ml_drinked: newMlDrinked,
      });

      await queryClient.invalidateQueries({
        queryKey: ["waterGoal"],
      });
    } catch (err) {
      console.error("Erro ao atualizar ml_drinked:", err);
    }
  };

  const handleCloseWaterModal = () => {
    setWaterModalIsOpen(false);
  };
  const handleCloseAddBottleModal = () => {
    setAddBottleModalIsOpen(false);
  };

  const openAddBottle = () =>{
    setAddBottleModalIsOpen(true)
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "50%", padding: 5 }}></View>
        <View style={{ width: "50%", padding: 5 }}>
          <WaterButton
            mlDrinked={waterGoal?.ml_drinked ?? 0}
            waterGoal={waterGoal?.ml_goal ?? 2000}
            onPress={openWaterModal}
          />
        </View>
      </View>

      <WaterModal
        bottles={waterGoal?.bottles || []}
        onClose={handleCloseWaterModal}
        visible={waterModalIsOpen}
        onPressBottleButton={updateWaterGoalWithBottle}
        onPressAddBottle={openAddBottle}
      />
      <AddBottleModal
        onClose={handleCloseAddBottleModal}
        visible={addBottleModalIsOpen}
      />

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 16,
  },
  text: {
    color: "black",
    marginBottom: 20,
  },
});
