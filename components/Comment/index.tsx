import { Colors } from "@/constants/Colors";
import ReadMore from "@fawazahmed/react-native-read-more";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

interface CommentProps {
  comment: IComment;
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImage}>
          {comment.profileAvatar !== null ? (
            <Image source={{ uri: comment.profileAvatar }} style={styles.profileAvatar} />
          ) : (
            <View style={styles.profileAvatarNull} />
          )}
        </View>
      </View>
      <View style={styles.content}>
        <Text style={styles.username}>{comment.profileUserName}</Text>
        <ReadMore
          numberOfLines={4}
          seeLessText="Ver menos"
          seeMoreText="Ver mais"
          seeMoreStyle={styles.seeMore}
          seeLessStyle={styles.seeMore}
        >
          {comment.content}
        </ReadMore>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  content:{
    paddingTop:3,
    paddingHorizontal:3,
    gap:5,
  },
  username:{
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
});

export default Comment;
