import useProfile from "@/hooks/useProfile";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Comment from "../Comment";
import CommentInput from "../CommentInput";

// vai fazer a requisição quando for montado

const COMMENTS: IComment[] = [
  {
    id: 1,
    profileId: 23,
    content:
      "Muito Beem! Muito Beem!Muito Beem!Muito Beem!Muito Beem! Muito Beem! Muito Beem! Muito Beem! Muito Beem! Muito Beem! Muito Beem! Muito Beem! Muito Beem! Muito Beem!Muito Beem!Muito Beem!Muito Beem!Muito Beem!Muito Beem!Muito Beem!Muito Beem!Muito Beem!Muito Beem!Muito Beem!Muito Beem! Muito Beem!",
    profileAvatar: null,
    profileUserName: "coisinha",
  },
  {
    id: 2,
    profileId: 23,
    content: "Muito Beem! ",
    profileAvatar: null,
    profileUserName: "coisinha",
  },
  {
    id: 3,
    profileId: 23,
    content: "Muito Beem! ",
    profileAvatar: null,
    profileUserName: "coisinha",
  },
  {
    id: 4,
    profileId: 23,
    content: "Muito Beem! ",
    profileAvatar: null,
    profileUserName: "coisinha",
  },
  {
    id: 5,
    profileId: 23,
    content: "Muito Beem! ",
    profileAvatar: null,
    profileUserName: "coisinha",
  },
  {
    id: 6,
    profileId: 23,
    content: "Muito Beem! ",
    profileAvatar: null,
    profileUserName: "coisinha",
  },
  {
    id: 7,
    profileId: 23,
    content: "Muito Beem! ",
    profileAvatar: null,
    profileUserName: "coisinha",
  },
  {
    id: 8,
    profileId: 23,
    content: "Muito Beem! ",
    profileAvatar: null,
    profileUserName: "coisinha",
  },
  {
    id: 9,
    profileId: 23,
    content: "Muito Beem! ",
    profileAvatar: null,
    profileUserName: "coisinha",
  },
  {
    id: 10,
    profileId: 23,
    content: "Muito Beem! ",
    profileAvatar: null,
    profileUserName: "coisinha",
  },
  {
    id: 11,
    profileId: 23,
    content: "Muito Beem! ",
    profileAvatar: null,
    profileUserName: "coisinha",
  },
  {
    id: 12,
    profileId: 23,
    content: "Muito Beem! ",
    profileAvatar: null,
    profileUserName: "coisinha",
  },
];

interface CommentsProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
}

const Comments = ({ bottomSheetRef }: CommentsProps) => {
  const snapPoints = useMemo(() => ["100%", "80%"], []);
  const { profile } = useProfile();
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      containerStyle={{ zIndex: 1000 }}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
    >
      <BottomSheetScrollView contentContainerStyle={styles.content}>
        {COMMENTS.map((comment) => (
          <Comment key={comment.id} comment={comment} />
        ))}
      </BottomSheetScrollView>
      <View style={styles.inputContainer}>
        <CommentInput profileAvatar={profile?.avatar ?? null} profileUserName={profile?.socialName}/>
      </View>
    </BottomSheet>
  );
};

export default Comments;

const styles = StyleSheet.create({
  content: {
    padding: 16,
    gap: 25,
    paddingHorizontal: 25,
  },
  inputContainer: {
    width: "100%",
    borderTopWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fff",
  },
});
