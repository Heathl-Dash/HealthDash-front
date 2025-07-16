import { Colors } from "@/constants/Colors";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { forwardRef, useMemo } from "react";
import { StyleSheet, Text, View } from "react-native";

interface ResultNutritionSearchProps {
  aliment: string;
  nutritionResult: INutritionInfo;
  isLoading?: boolean;
}

const ResultNutritionSearch = forwardRef<BottomSheetMethods, ResultNutritionSearchProps>(
  ({ nutritionResult, aliment, isLoading }, ref) => {
    const snapPoints = useMemo(() => ["13%", "80%"], []);

    return (
      <BottomSheet
        ref={ref}
        index={-1}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        containerStyle={{ zIndex: 1000 }}
      >
        <View style={[styles.container, {paddingBottom: 100}]}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>Informações nutricionais</Text>
            <Text style={styles.alimentTitle}>{aliment}</Text>
          </View>

          {isLoading && <Text>Carregando...</Text>}

          {nutritionResult && (
            <BottomSheetScrollView
              contentContainerStyle={{
                flexGrow: 1,
              }}
            >
              <>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Macronutrientes</Text>
                  <View style={styles.resultLine}>
                    <Text style={styles.infoTitle}>Calorias</Text>
                    <Text>{nutritionResult.calories}</Text>
                  </View>
                  <View style={styles.resultLine}>
                    <Text style={styles.infoTitle}>Carboidratos</Text>
                    <Text>{nutritionResult.carbohydrates}</Text>
                  </View>
                  <View style={styles.resultLine}>
                    <Text style={styles.infoTitle}>Fibras</Text>
                    <Text>{nutritionResult.fiber}</Text>
                  </View>
                  <View style={styles.resultLine}>
                    <Text style={styles.infoTitle}>Açúcar</Text>
                    <Text>{nutritionResult.sugar}</Text>
                  </View>
                  <View style={styles.resultLine}>
                    <Text style={styles.infoTitle}>Proteína</Text>
                    <Text>{nutritionResult.protein}</Text>
                  </View>
                  <View style={styles.resultLine}>
                    <Text style={styles.infoTitle}>Gordura</Text>
                    <Text>{nutritionResult.fats}</Text>
                  </View>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Vitaminas</Text>
                  {nutritionResult.vitamins?.map((vit, index) => (
                    <Text key={index} style={styles.listItem}>
                      • {vit}
                    </Text>
                  ))}
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Minerais</Text>
                  {nutritionResult.minerals?.map((mineral, index) => (
                    <Text key={index} style={styles.listItem}>
                      • {mineral}
                    </Text>
                  ))}
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Índice Glicêmico</Text>
                  <Text>{nutritionResult.glycemic_index}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Bom para</Text>
                  <Text>{nutritionResult.good_for}</Text>
                </View>
                <View style={styles.section}>
                  <Text style={styles.sectionTitle}>Não recomendado para</Text>
                  <Text>{nutritionResult.bad_for}</Text>
                </View>
              </>
            </BottomSheetScrollView>
          )}
        </View>
      </BottomSheet>
    );
  }
);

export default ResultNutritionSearch;

const styles = StyleSheet.create({
  container: {
    padding: 16,
    paddingHorizontal: 25,
    marginBottom: 20,
  },
  titleContainer: {
    width: "100%",
    marginBottom: 20,
  },
  title: {
    fontWeight: "700",
    color: Colors.light.darkGray,
    fontSize: 18,
  },
  alimentTitle: {
    fontWeight: "900",
    color: Colors.light.lightGray,
    fontSize: 20,
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontWeight: "700",
    color: Colors.light.darkGray,
    marginBottom: 10,
    fontSize: 16,
  },
  resultLine: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  infoTitle: {
    fontWeight: "900",
    color: Colors.light.darkGray,
  },
  listItem: {
    marginLeft: 10,
    marginBottom: 4,
    color: Colors.light.darkGray,
  },
});
