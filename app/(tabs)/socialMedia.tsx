import AddPublicationButton from "@/components/AddPublicationButton";
import Comments from "@/components/Comments";
import Header from "@/components/Header";
import Publication from "@/components/Publication";
import usePosts from "@/hooks/usePosts";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { ActivityIndicator, Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function SocialMedia() {
  const {
    data: publications = [],
    isLoading: publicationsLoading,
    refetch: refetchPosts,
  } = usePosts();

  const bottomSheetRef = useRef<BottomSheetMethods | null>(null);
  const [selectedPostId, setSelectedPostId] = useState<number | null>(null);

  const router = useRouter();

  const openComments = (publicationId: number) => {
    setSelectedPostId(publicationId);
    bottomSheetRef.current?.expand();
  };

  const AddPublicationClick = () => {
    router.push("/createPublication");
  };

  useFocusEffect(
    useCallback(() => {
      refetchPosts();
    }, [refetchPosts])
  );
  

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 30 }}>
      <Header feedSocialMedia/>
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
      <AddPublicationButton onPress={AddPublicationClick} />
      <Comments bottomSheetRef={bottomSheetRef} postId={selectedPostId} />
    </SafeAreaView>
  );
}
