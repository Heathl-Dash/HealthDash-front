import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Attach from "../Attach";

interface PublicationProps {
  title?: string;
  description?: string;
  images?: string[];
  profileId: number;
  isPublic?: boolean;
  type?: "normal" | "toDo" | "habit";
  attach?: IAttach | null;
}

const Publication = ({
  isPublic = true,
  profileId,
  type = "normal",
  attach = null,
  description,
  images,
  title,
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
});
