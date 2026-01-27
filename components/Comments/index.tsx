import useProfile from "@/hooks/useProfile";
import useCommentsByPost from "@/hooks/useCommentsByPost";
import useCreateComment from "@/hooks/useCreateComment";
import useDeleteComment from "@/hooks/useDeleteComment";
import BottomSheet, { BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, StyleSheet, Text, View } from "react-native";
import Comment from "../Comment";
import CommentInput from "../CommentInput";

interface CommentsProps {
  bottomSheetRef: React.RefObject<BottomSheetMethods | null>;
  postId: number | null;
}

const Comments = ({ bottomSheetRef, postId }: CommentsProps) => {
  const snapPoints = useMemo(() => ["100%", "80%"], []);
  const { profile } = useProfile();
  const { data: comments = [], isLoading } = useCommentsByPost(postId ?? undefined);
  const [content, setContent] = useState("");
  const createCommentMutation = useCreateComment(postId ?? 0);
  const deleteCommentMutation = useDeleteComment(postId ?? 0);
  useEffect(() => {
    setContent("");
  }, [postId]);
  const renderBackdrop = useCallback(
    (props: React.ComponentProps<typeof BottomSheetBackdrop>) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} />
    ),
    []
  );
  const handleSubmit = () => {
    const trimmed = content.trim();
    if (!postId || !trimmed || createCommentMutation.isPending) return;
    createCommentMutation.mutate(
      { content: trimmed },
      {
        onSuccess: () => {
          setContent("");
        },
      }
    );
  };
  const handleLongPress = (comment: IComment) => {
    if (!postId || comment.profileId !== profile?.id) return;
    Alert.alert("Excluir comentário", "Tem certeza que deseja excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          deleteCommentMutation.mutate(comment.id);
        },
      },
    ]);
  };
  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      enablePanDownToClose
      backdropComponent={renderBackdrop}
      backgroundStyle={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}
      containerStyle={{ zIndex: 1000 }}
      keyboardBehavior="extend"
      keyboardBlurBehavior="restore"
    >
      <BottomSheetScrollView contentContainerStyle={styles.content}>
        {isLoading ? (
          <ActivityIndicator size="large" color="#999" />
        ) : comments.length ? (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onLongPress={handleLongPress}
              disabled={comment.profileId !== profile?.id}
            />
          ))
        ) : (
          <Text style={styles.emptyText}>Sem comentários ainda.</Text>
        )}
      </BottomSheetScrollView>
      <View style={styles.inputContainer}>
        <CommentInput
          profileAvatar={profile?.avatar ?? null}
          profileUserName={profile?.socialName ?? ""}
          value={content}
          onChangeText={setContent}
          onSubmit={handleSubmit}
          submitting={createCommentMutation.isPending}
          disabled={!postId}
        />
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
  emptyText: {
    color: "#999",
    textAlign: "center",
  },
});
