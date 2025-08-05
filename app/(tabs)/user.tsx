import BarChart from "@/components/BarChart";
import CustomButton from "@/components/CustomButton";
import UserProfileForm from "@/components/UserProfileForm";
import { Colors } from "@/constants/Colors";
import useAuth from "@/hooks/useAuth";
import useProfile from "@/hooks/useProfile";
import useStorage from "@/hooks/useStorage";
import { getFitData, getWaterIntakes } from "@/lib/axios";
import { Entypo, FontAwesome5, FontAwesome6 } from "@expo/vector-icons";
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import "moment/locale/pt-br";
import React, { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Header from "../../components/Header";
import LineChart from "@/components/LineChart";

moment.locale("pt-br",{week:{dow: 1}});

interface UserProps {
  user?: IProfile;
  isLoading?: boolean;
}

const UserInfo = ({ user, isLoading }: UserProps) => {
  if (isLoading) {
    return (
      <View style={{ padding: 20, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.userInfoContainer}>
      <View style={styles.userInfoWrapper}>
        <Text style={styles.userInfoLabel}>Nome</Text>
        <Text>{user?.name !== null ? user?.name : "Não informado"}</Text>
      </View>
      <View style={styles.userInfoWrapper}>
        <Text style={styles.userInfoLabel}>Altura</Text>
        <Text>{user?.heigth !== null ? user?.heigth : "Não informado"}</Text>
      </View>
      <View style={styles.userInfoWrapper}>
        <Text style={styles.userInfoLabel}>Peso</Text>
        <Text>{user?.weigth !== null ? user?.weigth : "Não informado"}</Text>
      </View>
      <View style={styles.userInfoWrapper}>
        <Text style={styles.userInfoLabel}>Idade</Text>
        <Text>{user?.age !== null ? user?.age : "Não informado"}</Text>
      </View>
      <View style={{ height: 1, backgroundColor: "#ccc", width: "100%", marginVertical: 16 }} />
      <View style={styles.userImcInfo}>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.userInfoLabel}>IMC</Text>
          <Text>{user?.calc_IMC !== null ? user?.calc_IMC : "Não informado"}</Text>
        </View>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.userInfoLabel}>Classificação</Text>
          <Text>
            {user?.imc_classification !== null ? user?.imc_classification : "Não informado"}
          </Text>
        </View>
        <View style={styles.userInfoWrapper}>
          <Text style={styles.userInfoLabel}>Grau de obesidade</Text>
          <Text>{user?.imc_degree !== null ? user?.imc_degree : "Não informado"}</Text>
        </View>
      </View>
    </View>
  );
};

export default function User() {
  const { handleLogout } = useAuth();
  const { profile, profileErro, profileLoading } = useProfile();

  const [isEditing, setIsEditing] = useState(false);

  const handleToggleEdit = () => setIsEditing(!isEditing);

  const today = moment().format("YYYY-MM-DD");

  const { data: waterIntakeData } = useQuery({
    queryKey: ["waterIntakes", today],
    queryFn: () => getWaterIntakes(today),
    enabled: !!today,
  });

  const maxValueWaterIntake = Math.max(...(waterIntakeData?.map((item) => item.total_ml) || [0]));
  const maxYWaterIntake = Math.min(10000, Math.max(2000, maxValueWaterIntake));

  function getWeekDays(dateStr: string) {
    const date = moment(dateStr);
    const startOfWeek = date.clone().startOf("week"); // Sunday
    const week = [];

    for (let i = 0; i < 7; i++) {
      week.push(startOfWeek.clone().add(i, "days").format("YYYY-MM-DD"));
    }

    return week;
  }

  const week = getWeekDays(today);

  const { data: fitData } = useQuery({
    queryKey: ["fitData"],
    queryFn: getFitData,
    select: (data) => {
      return week.map((day) => {
        const found = data.find((item) => item.fit_date === day);

        if (found) {
          return {
            fit_date: found.fit_date,
            steps: parseInt(found.steps as unknown as string) || 0,
            burned_calories:
              parseFloat(parseFloat(found.burned_calories as string).toFixed(2)) || 0,
            distance: parseFloat(parseFloat(found.distance as string).toFixed(2)) || 0,
          };
        }

        return {
          fit_date: day,
          steps: 0,
          burned_calories: 0,
          distance: 0,
        };
      });
    },
  });

  const maxValueCalories = Math.max(...(fitData?.map((item) => item.burned_calories) || [0]));
  const maxYWaterCalorie = Math.min(7000, Math.max(500, maxValueCalories));

  const maxValueSteps = Math.max(...(fitData?.map((item) => item.burned_calories) || [0]));
  const maxYWaterSteps = Math.min(20000, Math.max(9000, maxValueSteps));

  return (
    <SafeAreaView style={{ flexGrow: 1, paddingHorizontal: 30 }}>
      <Header />
      <ScrollView
        contentContainerStyle={{ alignItems: "flex-end", marginTop: 32, paddingBottom: 32 }}
      >
        {!isEditing && (
          <CustomButton
            title={"Editar"}
            variant="outLine"
            shape="rect"
            iconPosition="end"
            icon={<FontAwesome6 name="edit" color={Colors.light.primary} size={16} />}
            onPress={handleToggleEdit}
          />
        )}

        {isEditing ? (
          <UserProfileForm
            initialData={profile}
            onCancel={handleToggleEdit}
            onSaved={handleToggleEdit}
          />
        ) : (
          <>
            <UserInfo user={profile} isLoading={profileLoading} />
            <View style={styles.chartContainer}>
              <View style={{ width: "100%" }}>
                <Text style={styles.chartTitle}>Consumo de água</Text>
                {waterIntakeData && waterIntakeData.length > 0 ? (
                  <BarChart
                    data={waterIntakeData}
                    xKey="date"
                    ykeys="total_ml"
                    formatXLabel={(val) => moment(val).format("ddd")}
                    formatYLabel={(val) => `${val / 1000}L`}
                    domain={{ y: [0, maxYWaterIntake] }}
                  />
                ) : (
                  <Text>Sem dados para exibir</Text>
                )}
              </View>

              <View style={{ width: "100%" }}>
                <Text style={styles.chartTitle}>Gasto de calorias</Text>
                {fitData && fitData.length > 0 ? (
                  <LineChart
                    data={fitData}
                    xKey="fit_date"
                    ykeys="burned_calories"
                    formatXLabel={(val) => moment(val).format("ddd")}
                    formatYLabel={(val) => `${val}Kcal`}
                    domain={{y:[0, maxYWaterCalorie]}}
                    color={Colors.light.accent2}
                  />
                ) : (
                  <Text>Sem dados para exibir</Text>
                )}
              </View>
              <View style={{ width: "100%" }}>
                <Text style={styles.chartTitle}>Passos</Text>
                {fitData && fitData.length > 0 ? (
                  <LineChart
                    data={fitData}
                    xKey="fit_date"
                    ykeys="steps"
                    formatXLabel={(val) => moment(val).format("ddd")}
                    formatYLabel={(val) => `${val}`}
                    domain={{ y: [0, maxYWaterSteps] }}
                    color={Colors.light.accent1}
                  />
                ) : (
                  <Text>Sem dados para exibir</Text>
                )}
              </View>
            </View>
            <View style={styles.buttonContainer}>
              <CustomButton
                title="Sair"
                variant="secondary"
                style={{ backgroundColor: Colors.light.redColor }}
                shape="rect"
                iconPosition="end"
                icon={<Entypo name="log-out" size={18} color={Colors.light.reactNativeWhite} />}
                onPress={handleLogout}
              />
              <CustomButton
                title="Excluir"
                variant="outLine"
                styleText={{ color: Colors.light.redColor }}
                style={{ borderColor: Colors.light.redColor }}
                shape="rect"
                iconPosition="end"
                icon={<FontAwesome5 name="trash" size={16} color={Colors.light.redColor} />}
                onPress={() => {}}
              />
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  userInfoContainer: {
    width: "100%",
    gap: 16,
    marginTop: 32,
  },
  userInfoWrapper: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  userImcInfo: {
    marginTop: 4,
    gap: 16,
  },
  userInfoLabel: {
    fontWeight: "bold",
  },
  buttonContainer: {
    gap: 12,
    marginTop: 44,
    alignSelf: "flex-start",
  },
  chartContainer: {
    width: "100%",
    marginVertical: 20,
    gap: 30,
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
  },
});
