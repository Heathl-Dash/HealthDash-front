import Comments from "@/components/Comments";
import Publication from "@/components/Publication";
import { Colors } from "@/constants/Colors";
import { adaptPostToPublication } from "@/app/adapters/publicationAdapters";
import { getCollectionById } from "@/lib/profile";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useRef, useState } from "react";
import { ActivityIndicator, FlatList, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Collection() {
  const { id } = useLocalSearchParams();
  const collectionId = Array.isArray(id) ? id[0] : id;

  const {
    data: publications = [],
    isLoading: publicationsLoading,
  } = useQuery({
    queryKey: ["collection", collectionId],
    queryFn: async () => {
      if (!collectionId) return [];
      const data = await getCollectionById(Number(collectionId));
      const items = Array.isArray(data) ? data : data?.content ?? [];
      return items.map((post: any) => ({
        ...adaptPostToPublication(post),
        isCollected: true,
      }));
    },
    enabled: !!collectionId,
  });

  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const openComments = (publicationId: number) => {
    setSelectedPostId(publicationId);
    bottomSheetRef.current?.expand();
  };

  return (
    <SafeAreaView style={{ flexGrow: 1, paddingHorizontal: 30 }}>
      <Stack.Screen options={{ title: "Salvos" }} />

      <FlatList
        data={publications}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 25 }}
        renderItem={({ item }) => (
          <Publication publication={item} onPressComments={() => openComments(item.id)} />
        )}
        ListEmptyComponent={
          publicationsLoading ? (
            <ActivityIndicator size="large" color={Colors.light.darkGray} />
          ) : (
            <Text style={{ color: Colors.light.darkGray, textAlign: "center" }}>
              Nenhuma publicação encontrada.
            </Text>
          )
        }
      />
      <Comments bottomSheetRef={bottomSheetRef} postId={selectedPostId} />
    </SafeAreaView>
  );
}
