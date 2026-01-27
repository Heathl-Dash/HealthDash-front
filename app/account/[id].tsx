import Comments from "@/components/Comments";
import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import Publication from "@/components/Publication";
import { Colors } from "@/constants/Colors";
import { useFollowStatus } from "@/hooks/useFollowStatus";
import useProfile from "@/hooks/useProfile";
import useProfileById from "@/hooks/useProfileById";
import { useProfilePosts } from "@/hooks/useProfilePost";
import { useToggleFollow } from "@/hooks/useToggleFollow";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import ReadMore from "@fawazahmed/react-native-read-more";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { ActivityIndicator, Image, StatusBar, StyleSheet, Text, View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { profile, profileLoading } = useProfile();

  const numericId = id ? Number(id) : undefined;
  const isMyProfile = id === "me" || (numericId ? numericId === profile?.id : false);
  const {
    profile: profileById,
    profileLoading: profileByIdLoading,
    profileErro: profileByIdErro,
  } = useProfileById(!isMyProfile ? numericId : undefined);

  const { data: followStatus, isLoading: followStatusLoading } = useFollowStatus(
    !isMyProfile ? numericId : undefined
  );

  const currentProfile: IProfile | undefined = isMyProfile ? profile : profileById;

  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const isFollowing = !isMyProfile ? (followStatus?.is_following ?? false) : false;
  const isFollowed = !isMyProfile ? (followStatus?.is_followed ?? false) : false;

  const { data: posts = [], isLoading: postsLoading } = useProfilePosts(currentProfile?.id);

  const toggleFollow = useToggleFollow(currentProfile?.id ?? 0);

  if (!currentProfile && (profileLoading || profileByIdLoading)) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </SafeAreaView>
    );
  }

  if (!currentProfile || profileByIdErro) {
    return (
      <SafeAreaView>
        <Text>Perfil não encontrado</Text>
      </SafeAreaView>
    );
  }

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
          {!isMyProfile && isFollowing ? (
            <CustomButton
              title="Deixar de seguir"
              variant="outLine"
              style={{ width: "50%", opacity: 0.7 }}
              onPress={toggleFollow.mutate}
            />
          ) : isFollowed ? (
            <CustomButton
              title="Seguir de Volta"
              variant="secondary"
              icon={<Octicons name="plus" color="white" size={20} />}
              style={{ width: "50%" }}
              onPress={toggleFollow.mutate}
            />
          ) : (
            <CustomButton
              title="Seguir"
              variant="secondary"
              icon={<Octicons name="plus" color="white" size={20} />}
              style={{ width: "50%" }}
              onPress={toggleFollow.mutate}
            />
          )}
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
