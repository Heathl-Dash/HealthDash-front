import { Colors } from "@/constants/Colors";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Attach from "../Attach";
import ImageCarrousel from "../ImageCarrousel";

interface PublicationProps {
  publication: IPublication;
  onPressComments: () => void;
}

const Publication = ({ publication, onPressComments }: PublicationProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImage}>
          {publication.profileAvatar !== null ? (
            <Image source={{ uri: publication.profileAvatar }} style={styles.profileAvatar} />
          ) : (
            <View style={styles.profileAvatarNull} />
          )}
        </View>
        <Text>{publication.profileName}</Text>
      </View>
      {publication.description && (
        <View>
          <Text>{publication.description}</Text>
        </View>
      )}

      <View style={[{ gap: 10 }, publication.images && publication.attach && styles.imagesAndAttachStyle]}>
        {publication.images && <ImageCarrousel images={publication.images} />}
        {publication.attach && publication.type != "normal" && (
          <Attach attach={publication.attach} type={publication.type} />
        )}
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.action}>
          {publication.isLike ? (
            <MaterialCommunityIcons size={30} color={Colors.light.darkGray} name="heart" />
          ) : (
            <MaterialCommunityIcons size={30} color={Colors.light.darkGray} name="heart-outline" />
          )}
          <Text>{publication.likesCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={onPressComments}>
          <FontAwesome name="comment-o" size={28} color={Colors.light.darkGray} />{" "}
          <Text>{publication.commentsCount}</Text>
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
  imagesAndAttachStyle: {
    backgroundColor: Colors.light.tertiary,
    padding: 20,
    borderRadius: 25,
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
