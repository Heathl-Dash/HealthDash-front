import { Colors } from "@/constants/Colors";
import useDeletePublication from "@/hooks/useDeletePublication";
import useProfile from "@/hooks/useProfile";
import { useToggleCollection } from "@/hooks/useToggleCollection";
import { useToggleLike } from "@/hooks/useToggleLike";
import { DropDownOption } from "@/types/dropdownOptions";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React from "react";
import { Alert, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Attach from "../Attach";
import ImageCarrousel from "../ImageCarrousel";
import DropDown from "../dropDown";

interface PublicationProps {
  publication: IPublication;
  onPressComments: () => void;
  savedCollectionId?: number | null;
}

const Publication = ({ publication, onPressComments, savedCollectionId }: PublicationProps) => {
  const { profile } = useProfile();
  const isMyPublication = profile?.id === publication.profileId;
  const isCollected = publication.isCollected ?? false;
  const saveLabel = isCollected ? "Remover dos salvos" : "Salvar";
  const router = useRouter();
  const deleteMutation = useDeletePublication();
  const toggleCollectionMutation = useToggleCollection(publication.id);

  const handleEdit = () => {
  router.push({
    pathname: "/editPublication/[id]",
    params: {
      id: publication.id.toString(),
      description: publication.description ?? "",
      images: JSON.stringify(publication.images ?? []),
      attachId: publication.attach?.originalId?.toString(),
      publicationType: publication.type,
    },
  });
};

  const handleDelete = () => {
    Alert.alert("Excluir publicação", "Tem certeza que deseja excluir?", [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Excluir",
        style: "destructive",
        onPress: () => {
          deleteMutation.mutate(publication.id, {
            onSuccess: () => {
              Alert.alert("Excluída", "Sua publicação foi removida.");
            },
            onError: () => {
              Alert.alert("Erro", "Não foi possível excluir agora. Tente novamente.");
            },
          });
        },
      },
    ]);
  };

  const handleToggleSave = () => {
    if (savedCollectionId == null) {
      Alert.alert(
        "Coleção indisponível",
        "Não foi possível localizar a coleção Salvos. Tente novamente mais tarde."
      );
      return;
    }
    toggleCollectionMutation.mutate({ isCollected, collectionId: savedCollectionId });
  };

  const dropdownItems: DropDownOption[] = isMyPublication
    ? [
        { label: saveLabel, onPress: handleToggleSave },
        { label: "Editar", onPress: handleEdit },
        { label: "Excluir", onPress: handleDelete },
      ]
    : [{ label: saveLabel, onPress: handleToggleSave }];

  const toggleLikeMutation = useToggleLike(publication.id);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileImage}>
          <TouchableOpacity
            onPress={() => {
              router.push({
                pathname: "/account/[id]",
                params: { id: publication.profileId },
              });
            }}
          >
            {publication.profileAvatar !== null ? (
              <Image source={{ uri: publication.profileAvatar }} style={styles.profileAvatar} />
            ) : (
              <View style={styles.profileAvatarNull} />
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            flex: 1,
            justifyContent: "space-between",
            alignItems: "center",
            boxSizing: "border-box",
          }}
        >
          <Text>{publication.profileName}</Text>
          <DropDown
            icon={
              <MaterialCommunityIcons
                name="dots-vertical"
                color={Colors.light.darkGray}
                size={20}
              />
            }
            options={dropdownItems}
          />
        </View>
      </View>
      <View style={{ minHeight: 100 }}>
        {publication.description && (
          <View>
            <Text>{publication.description}</Text>
          </View>
        )}
        <View
          style={[
            { gap: 10 },
            publication.images && publication.attach && styles.imagesAndAttachStyle,
          ]}
        >
          {publication.images && publication.images.length > 0 && (
            <ImageCarrousel images={publication.images} />
          )}
          {publication.attach && publication.type != "normal" && (
            <Attach attach={publication.attach} type={publication.type} />
          )}
        </View>
      </View>
      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.action} onPress={() => toggleLikeMutation.mutate()}>
          {publication.isLike ? (
            <MaterialCommunityIcons size={30} color={Colors.light.darkGray} name="heart" />
          ) : (
            <MaterialCommunityIcons size={30} color={Colors.light.darkGray} name="heart-outline" />
          )}
          <Text>{publication.likesCount}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.action} onPress={onPressComments}>
          <FontAwesome name="comment-o" size={28} color={Colors.light.darkGray} />
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
    position: "relative",
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
