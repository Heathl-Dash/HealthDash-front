import useWater from "@/hooks/useWater";
import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AddBottleModal from "../../components/AddBottleModal";
import Header from "../../components/Header";
import WaterButton from "../../components/WaterButton";
import WaterModal from "../../components/WaterModal";

export default function HomeScreen() {
  const {
    handleCloseAddBottleModal,
    handleCloseWaterModal,
    openAddBottle,
    openWaterModal,
    updateWaterGoalWithBottle,
    waterGoal,
    waterModalIsOpen,
    addBottleModalIsOpen,
  } = useWater();

  return (
    <SafeAreaView>
      <Header/>
      <View style={styles.container}>
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
        <AddBottleModal onClose={handleCloseAddBottleModal} visible={addBottleModalIsOpen} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 0,
    padding: 16,
  },
  text: {
    color: "black",
    marginBottom: 20,
  },
});
