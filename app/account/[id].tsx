import Header from "@/components/Header";
import { Colors } from "@/constants/Colors";
import useProfile from "@/hooks/useProfile";
import ReadMore from "@fawazahmed/react-native-read-more";
import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const MOCK_USERS: IProfile[] = [
  {
    id: 11,
    name: "Gabriella Silva",
    email: "gabriella@email.com",
    weigth: "58",
    heigth: "1.65",
    age: 24,
    calc_IMC: 21.3,
    imc_classification: "Normal",
    imc_degree: "Grau 0",
    bio: "Apaixonada por tecnologia e bem-estar.",
    avatar: null,
    followingNumber: 128,
    followersNumber: 342,
  },
  {
    id: 22,
    name: "Lucas Andrade",
    email: "lucas.andrade@email.com",
    weigth: "82",
    heigth: "1.78",
    age: 29,
    calc_IMC: 25.9,
    imc_classification: "Sobrepeso",
    imc_degree: "Grau I",
    bio: "Corrida, café e constância. Corrida, café e constância. Corrida, café e constância. Corrida, café e constância. Corrida, café e constância.",
    avatar: "https://i.pravatar.cc/300?img=12",
    followingNumber: 589,
    followersNumber: 1200,
  },
  {
    id: 33,
    name: "Marina Costa",
    email: "marina.costa@email.com",
    weigth: "64",
    heigth: "1.70",
    age: 26,
    calc_IMC: 22.1,
    imc_classification: "Normal",
    imc_degree: "Grau 0",
    bio: "Yoga, leitura e hábitos simples.",
    avatar: "https://i.pravatar.cc/300?img=32",
    followingNumber: 210,
    followersNumber: 198,
  },
];

const AccountPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { profile, profileLoading } = useProfile();

  const isMyProfile = id === "me" || id === profile?.id;

  const currentProfile: IProfile = isMyProfile
    ? profile
    : MOCK_USERS.find((u) => u.id === Number(id));

  if (profileLoading && isMyProfile) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </SafeAreaView>
    );
  }

  const followersNumber =
    currentProfile.followersNumber > 1000
      ? `${currentProfile.followersNumber / 1000}k`
      : currentProfile.followersNumber;

  const followingNumber =
    currentProfile.followingNumber > 1000
      ? `${currentProfile.followingNumber / 1000}k`
      : currentProfile.followingNumber;

  return (
    <SafeAreaView style={{ paddingHorizontal: 30, flexGrow: 1, backgroundColor: "white" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Header accountPage />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            {currentProfile.avatar !== null ? (
              <Image source={{ uri: currentProfile.avatar }} style={styles.profileAvatar} />
            ) : (
              <View  style={styles.profileAvatarNull}/>
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoName}>{currentProfile?.name}</Text>
            <View style={styles.followingContainer}>
              <Text style={styles.followingContainer}>{followersNumber ?? "--"} seguidores</Text>
              <Text style={styles.followingContainer}>|</Text>
              <Text style={styles.followingContainer}>{followingNumber ?? "--"} Seguindo</Text>
            </View>
          </View>
        </View>
        {currentProfile?.bio && (
          <View>
            <ReadMore
              numberOfLines={2}
              seeLessText="Ver menos"
              seeMoreText="Ver mais"
              seeMoreStyle={styles.seeMore}
              seeLessStyle={styles.seeMore}
            >
              <Text>{currentProfile.bio}</Text>
            </ReadMore>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    gap: 10,
    paddingBottom: 25,
  },
  headerContent: {
    flexDirection: "row",
  },
  avatarContainer: {
    width: 70,
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: Colors.light.primary,
    overflow: "hidden"
  },
   profileAvatar: {
    width: "100%",
    height: "100%",
  },
  profileAvatarNull: {
    width: "100%",
    height: "100%",
    backgroundColor: Colors.light.primary,
  },
  infoContainer: {
    paddingLeft: 20,
    justifyContent: "center",
  },
  infoName: {
    color: Colors.light.darkGray,
    fontWeight: "700",
  },
  followingContainer: {
    flexDirection: "row",
    gap: 10,
    color: Colors.light.mediumGray,
  },
  seeMore: {
    color: Colors.light.primary,
    fontWeight: "700",
  },
});

export default AccountPage;
