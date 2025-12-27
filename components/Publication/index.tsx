import { Colors } from "@/constants/Colors";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Attach from "../Attach";

interface PublicationProps {
  title?: string;
  description?: string;
  images?: string[];
  profileId: number;
  profileName: string;
  profileAvatar: string | null;
  isPublic?: boolean;
  type?: "normal" | "toDo" | "habit";
  attach?: IAttach | null;
  isLike?: boolean;
  likesCount: number;
  commentsCount: number;
}

const Publication = ({
  isPublic = true,
  profileId,
  type = "normal",
  attach = null,
  description,
  images,
  title,
  isLike,
  likesCount,
  commentsCount,
  profileName,
  profileAvatar,
}: PublicationProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImage}>
          {profileAvatar !== null ? (
            <Image source={{ uri: profileAvatar }} style={styles.profileAvatar} />
          ) : (
            <View style={styles.profileAvatarNull} />
          )}
        </View>
        <Text>{profileName}</Text>
      </View>
      {description && (
        <View>
          <Text>{description}</Text>
        </View>
      )}

      {attach && type != "normal" && <Attach attach={attach} type={type} />}
      {images && <View>imagens</View>}

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.action}>
          {isLike ? (
            <MaterialCommunityIcons size={30} color={Colors.light.darkGray} name="heart" />
          ) : (
            <MaterialCommunityIcons size={30} color={Colors.light.darkGray} name="heart-outline" />
          )}
          <Text>{likesCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action}>
          <FontAwesome name="comment-o" size={28} color={Colors.light.darkGray} />{" "}
          <Text>{commentsCount}</Text>
        </TouchableOpacity>
      </View>
      <View style={{ width: "100%", borderTopColor: Colors.light.lightGray, borderTopWidth: 1 }} />
    </View>
  );
};

export default Publication;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 10,
  },
  profileContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 50,
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
  actionsContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  action: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
  },
});
