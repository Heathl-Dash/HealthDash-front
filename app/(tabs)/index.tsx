import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import WaterButton from "../components/WaterButton";
import WaterModal from "../components/WaterModal";
import { editWaterGoal, getWaterGoal } from "../lib/axios";


export default function HomeScreen() {
  const [waterModalIsOpen, setWaterModalIsOpen] = useState(false);

  const { data: waterGoal, error, refetch} = useQuery({
    queryKey: ["waterGoal"],
    queryFn: getWaterGoal,
  });


  const queryClient = useQueryClient();
  const handleWaterButton = async () => {
    setWaterModalIsOpen(true);
    await queryClient.refetchQueries({
    queryKey: ["waterGoal"],
  });
    
  };

  const handleBottleButton = async(bottle: IBottle) => {
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

  const handleClose = () => {
    setWaterModalIsOpen(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "50%", padding: 5 }}></View>
        <View style={{ width: "50%", padding: 5 }}>
          <WaterButton
            mlDrinked={waterGoal?.ml_drinked ?? 0}
            waterGoal={waterGoal?.ml_goal ?? 2000}
            onPress={handleWaterButton}
          />
        </View>
      </View>

      <WaterModal
        bottles={waterGoal?.bottles || []}
        onClose={handleClose}
        visible={waterModalIsOpen}
        onPressBottleButton={handleBottleButton}
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
