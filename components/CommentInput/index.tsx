import { Colors } from "@/constants/Colors";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import CustomInput from "../CustomInput";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

interface CommentInputProps {
  profileAvatar: string | null;
  profileUserName: string;
}

const CommentInput = ({ profileAvatar, profileUserName }: CommentInputProps) => {
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
      </View>
      <View style={styles.content}>
        <Text style={styles.username}>{profileUserName}</Text>
        <CustomInput InputComponent={BottomSheetTextInput} style={styles.inputStyle}/>
      </View>
    </View>
  );
};

export default CommentInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
    padding: 16,
    flex: 1
  },
  content: {
    flex: 1,
    paddingTop: 3,
    paddingHorizontal: 3,
    gap: 5,
  },
  username: {
    fontWeight: 600,
  },
  profileContainer: {
    flexDirection: "row",
    gap: 10,
    alignItems: "flex-start",
  },
  profileImage: {
    width: 35,
    height: 35,
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
  seeMore: {
    fontWeight: "700",
  },
  inputStyle:{
    borderColor: Colors.light.lightGray
  }
});
