import { Colors } from "@/constants/Colors";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Attach from "../Attach";

interface PublicationProps {
  title?: string;
  description?: string;
  images?: string[];
  profileId: number;
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
}: PublicationProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImage}></View>
        <Text>Fulano</Text>
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
          <FontAwesome name="comment-o" size={28} color={Colors.light.darkGray}/> <Text>{commentsCount}</Text>
        </TouchableOpacity>
      </View>
      <View style={{width: '100%', borderTopColor: Colors.light.lightGray, borderTopWidth: 1}}/>
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
