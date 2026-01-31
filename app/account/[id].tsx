import Comments from "@/components/Comments";
import CustomButton from "@/components/CustomButton";
import Header from "@/components/Header";
import Publication from "@/components/Publication";
import { Colors } from "@/constants/Colors";
import { useFollowStatus } from "@/hooks/useFollowStatus";
import useProfile from "@/hooks/useProfile";
import useProfileById from "@/hooks/useProfileById";
import { useProfilePosts } from "@/hooks/useProfilePost";
import useSavedCollectionId from "@/hooks/useSavedCollectionId";
import { useToggleFollow } from "@/hooks/useToggleFollow";
import { MaterialIcons, Octicons } from "@expo/vector-icons";
import ReadMore from "@fawazahmed/react-native-read-more";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React, { useRef, useState } from "react";
import {
  ActivityIndicator,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const AccountPage = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();

  const { profile: myProfile } = useProfile();

  const numericId =
    id === "me" ? myProfile?.id : id ? Number(id) : undefined;

  const isMyProfile = numericId === myProfile?.id;

  const {
    profile: currentProfile,
    profileLoading,
    profileErro,
  } = useProfileById(numericId);

  const { data: followStatus, isLoading: followStatusLoading } =
    useFollowStatus(!isMyProfile ? numericId : undefined);

  const { data: posts = [], isLoading: postsLoading } =
    useProfilePosts(currentProfile?.id);

  const { data: savedCollectionId } = useSavedCollectionId();

  const toggleFollow = useToggleFollow(currentProfile?.id ?? 0);

  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  if (profileLoading) {
    return (
      <SafeAreaView>
        <ActivityIndicator size="large" color={Colors.light.primary} />
      </SafeAreaView>
    );
  }

  if (!currentProfile || profileErro) {
    return (
      <SafeAreaView>
        <Text>Perfil não encontrado</Text>
      </SafeAreaView>
    );
  }

  const followers = currentProfile.followersNumber ?? 0;
  const following = currentProfile.followingNumber ?? 0;

  const followersNumber =
    followers > 1000 ? `${(followers / 1000).toFixed(1)}k` : followers;

  const followingNumber =
    following > 1000 ? `${(following / 1000).toFixed(1)}k` : following;

  const isFollowing = followStatus?.is_following ?? false;
  const isFollowed = followStatus?.is_followed ?? false;

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
            {currentProfile.avatarUrl ? (
              <Image
                source={{ uri: currentProfile.avatarUrl }}
                style={styles.profileAvatar}
              />
            ) : (
              <View style={styles.profileAvatarNull} />
            )}
          </View>

          <View style={styles.infoContainer}>
            <Text style={styles.infoName}>{currentProfile.socialName}</Text>

            <View style={styles.followingContainer}>
              <Text>{followersNumber} seguidores</Text>
              <Text>|</Text>
              <Text>{followingNumber} seguindo</Text>
            </View>
          </View>
        </View>

        {currentProfile.bio && (
          <ReadMore
            numberOfLines={2}
            seeLessText="Ver menos"
            seeMoreText="Ver mais"
            seeMoreStyle={styles.seeMore}
            seeLessStyle={styles.seeMore}
          >
            <Text>{currentProfile.bio}</Text>
          </ReadMore>
        )}
      </View>

        {isMyProfile ? (
          <CustomButton
            title="Editar perfil"
            variant="outLine"
            onPress={() => router.push("/createProfile?edit=true")}
            style={{ borderColor: Colors.light.secondary, width: "50%" }}
            styleText={{ color: Colors.light.secondary }}
            icon={
              <MaterialIcons
                name="edit"
              size={20}
              color={Colors.light.secondary}
            />
          }
          iconPosition="end"
        />
      ) : (
        <View>
          {isFollowing ? (
            <CustomButton
              title="Deixar de seguir"
              variant="outLine"
              style={{ width: "50%", opacity: 0.7 }}
              onPress={toggleFollow.mutate}
            />
          ) : (
            <CustomButton
              title={isFollowed ? "Seguir de Volta" : "Seguir"}
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
              <Publication
                publication={item}
                onPressComments={() => openComments(item.id)}
                savedCollectionId={savedCollectionId}
              />
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
