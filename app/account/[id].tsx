import Comments from "@/components/Comments";
import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import Publication from "@/components/Publication";
import { Colors } from "@/constants/Colors";
import useProfile from "@/hooks/useProfile";
import { useProfilePosts } from "@/hooks/useProfilePost";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import ReadMore from "@fawazahmed/react-native-read-more";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { ActivityIndicator, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const MOCK_USERS: IProfile[] = [
  {
    id: 11,
    socialName: "Gabriella Silva",
    email: "gabriella@email.com",
    weight: 58.0,
    height: 1.65,
    age: 24,
    imc: 21.3,
    imcDescription: "Normal",
    bio: "Apaixonada por tecnologia e bem-estar.",
    avatarUrl: null,
    followingNumber: 128,
    followersNumber: 342,
  },
  {
    id: 22,
    socialName: "Lucas Andrade",
    email: "lucas.andrade@email.com",
    weight: 82,
    height: 1.78,
    age: 29,
    imc: 25.9,
    imcDescription: "Sobrepeso",
    bio: "Corrida, café e constância. Corrida, café e constância. Corrida, café e constância. Corrida, café e constância. Corrida, café e constância.",
    avatarUrl: "https://i.pravatar.cc/300?img=12",
    followingNumber: 589,
    followersNumber: 1200,
  },
  {
    id: 33,
    socialName: "Marina Costa",
    email: "marina.costa@email.com",
    weight: 64,
    height: 1.7,
    age: 26,
    imc: 22.1,
    imcDescription: "Normal",
    bio: "Yoga, leitura e hábitos simples.",
    avatarUrl: "https://i.pravatar.cc/300?img=32",
    followingNumber: 210,
    followersNumber: 198,
  },
];

const AccountPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { profile, profileLoading } = useProfile();

  const isMyProfile = id === "me" || Number(id) === profile?.id;

  const currentProfile: IProfile = isMyProfile
    ? profile
    : MOCK_USERS.find((u) => u.id === Number(id));

  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  if (!currentProfile) {
    return (
      <SafeAreaView>
        <Text>Perfil não encontrado</Text>
      </SafeAreaView>
    );
  }

  if (profileLoading && isMyProfile) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </SafeAreaView>
    );
  }
  const { data: posts = [], isLoading: postsLoading } = useProfilePosts(currentProfile?.id);

  const followers = currentProfile.followersNumber ?? 0;
  const following = currentProfile.followingNumber ?? 0;

  const followersNumber =
    followers > 1000 ? `${(followers / 1000).toFixed(1)}k` : followers || "--";

  const followingNumber =
    following > 1000 ? `${(following / 1000).toFixed(1)}k` : following || "--";

  const openComments = (publicationId: number) => {
    setSelectedPostId(publicationId);
    bottomSheetRef.current?.expand();
  };

  console.log(currentProfile)
  return (
    <SafeAreaView style={{ paddingHorizontal: 30, flexGrow: 1, backgroundColor: "white" }}>
      <Stack.Screen options={{ headerShown: false }} />
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />

      <Header accountPage />
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <View style={styles.avatarContainer}>
            {currentProfile.avatarUrl !== null ? (
              <Image source={{ uri: currentProfile.avatarUrl }} style={styles.profileAvatar} />
            ) : (
              <View style={styles.profileAvatarNull} />
            )}
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.infoName}>{currentProfile?.socialName}</Text>
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
      {isMyProfile ? (
        <View>
          <CustomButton
            title="Editar perfil"
            variant="outLine"
            onPress={() => {}}
            style={{ borderColor: Colors.light.secondary, width: "50%" }}
            styleText={{ color: Colors.light.secondary }}
            icon={<MaterialIcons name="edit" size={20} color={Colors.light.secondary} />}
            iconPosition="end"
          />
        </View>
      ) : (
        <View>
          <CustomButton
            title="Seguir"
            variant="primary"
            icon={<Octicons name="plus" color="white" size={20} />}
            style={{ width: "50%" }}
            onPress={() => {}}
          />
          <CustomButton
            title="Deixar de seguir"
            variant="secondary"
            style={{ width: "50%" }}
            onPress={() => {}}
          />
        </View>
      )}

      <View style={styles.publicationsContainer}>
        {postsLoading ? (
          <ActivityIndicator size="large" color={Colors.light.primary} />
        ) : (
          <FlatList
            data={posts}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <Publication publication={item} onPressComments={() => openComments(item.id)} />
            )}
            contentContainerStyle={{ gap: 20, paddingBottom: 40 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
      <Comments bottomSheetRef={bottomSheetRef} postId={selectedPostId} />
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
    overflow: "hidden",
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
  publicationsContainer: {
    gap: 5,
    marginTop: 50,
    marginBottom: 50,
  },
});

export default AccountPage;
