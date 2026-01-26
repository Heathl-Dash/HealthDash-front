import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import CustomInput from "../CustomInput";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";

interface CommentInputProps {
  profileAvatar: string | null;
  profileUserName: string;
  value: string;
  onChangeText: (text: string) => void;
  onSubmit: () => void;
  submitting?: boolean;
  disabled?: boolean;
}

const CommentInput = ({
  profileAvatar,
  profileUserName,
  value,
  onChangeText,
  onSubmit,
  submitting = false,
  disabled = false,
}: CommentInputProps) => {
  const canSubmit = !disabled && !submitting && value.trim().length > 0;
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
        <View style={styles.inputRow}>
          <CustomInput
            InputComponent={BottomSheetTextInput}
            style={styles.inputStyle}
            value={value}
            onChangeText={onChangeText}
            placeholder="Escreva um comentário"
            multiline
            returnKeyType="send"
            onSubmitEditing={onSubmit}
            editable={!disabled}
          />
          <TouchableOpacity
            style={[styles.sendButton, !canSubmit && styles.sendButtonDisabled]}
            onPress={onSubmit}
            disabled={!canSubmit}
          >
            <MaterialCommunityIcons
              name="send"
              size={18}
              color={canSubmit ? Colors.light.primary : Colors.light.mediumGray}
            />
          </TouchableOpacity>
        </View>
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
    width:"78%",
    paddingTop: 3,
    paddingHorizontal: 3,
    gap: 5,
  },
  inputRow: {
    flex: 1,
    flexDirection: "row",
    alignItems: "flex-end",
    gap: 8,
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
    borderColor: Colors.light.lightGray,
    color: Colors.light.darkGray,
    minHeight: 40,
    paddingRight: 36,
  },
  sendButton: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.light.tertiary,
  },
  sendButtonDisabled: {
    opacity: 0.5,
  }
});
