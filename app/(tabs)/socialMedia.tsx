import AddPublicationButton from "@/components/AddPublicationButton";
import Comments from "@/components/Comments";
import Header from "@/components/Header";
import Publication from "@/components/Publication";
import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Text } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { Colors } from "react-native/Libraries/NewAppScreen";

export default function SocialMedia() {
  const PUBLICATIONS: IPublication[] = [
    {
      id: 1,
      description:
        "Começando a compartilhar um pouco da minha rotina por aqui. A ideia é registrar pequenos momentos, aprendizados do dia a dia e acompanhar minha evolução ao longo do tempo.",
      profileId: 1,
      profileName: "Fulano01",
      profileAvatar: null,
      isPublic: true,
      type: "habit",
      images: [
        "https://inovaveterinaria.com.br/wp-content/uploads/2015/04/gato-sem-raca-INOVA-1024x683.jpg",
        "https://static.vecteezy.com/system/resources/thumbnails/002/098/203/small/silver-tabby-cat-sitting-on-green-background-free-photo.jpg",
      ],
      attach: {
        title: "Beber mais água",
        description:
          "Objetivo de manter uma boa hidratação ao longo do dia, lembrando de beber água regularmente.",
        positiveCount: 3,
        negativeCount: 0,
        isPositive: true,
        isNegative: true,
      },
      isLike: true,
      likesCount: 37,
      commentsCount: 3,
    },
    {
      id: 2,
      description:
        "Começando a compartilhar um pouco da minha rotina por aqui. A ideia é registrar pequenos momentos, aprendizados do dia a dia e acompanhar minha evolução ao longo do tempo.",
      profileId: 1,
      profileName: "Fulano01",
      profileAvatar: null,
      isPublic: true,
      type: "toDo",
      images: null,
      attach: {
        title: "Beber mais água",
        description:
          "Objetivo de manter uma boa hidratação ao longo do dia, lembrando de beber água regularmente.",
        done: false,
      },
      isLike: false,
      likesCount: 80,
      commentsCount: 12,
    },
    {
      id: 3,
      description:
        "Começando a compartilhar um pouco da minha rotina por aqui. A ideia é registrar pequenos momentos, aprendizados do dia a dia e acompanhar minha evolução ao longo do tempo.",
      profileId: 2,
      profileName: "Sicrano",
      profileAvatar: "https://cdn.omlet.com/images/originals/breed_abyssinian_cat.jpg",
      isPublic: true,
      type: "toDo",
      images: null,
      attach: {
        title: "Beber mais água",
        description:
          "Objetivo de manter uma boa hidratação ao longo do dia, lembrando de beber água regularmente.",
        done: true,
      },
      isLike: false,
      likesCount: 0,
      commentsCount: 0,
    },
  ];

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

  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 30 }}>
      <Header feedSocialMedia />
      <FlatList
        data={PUBLICATIONS || []}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 25 }}
        renderItem={({ item }) => (
          <Publication publication={item} onPressComments={() => openComments(item.id)} />
        )}
        ListEmptyComponent={
          <Text style={{ color: Colors.light.darkGray, textAlign: "center" }}>
            Nenhuma publicação encontrada.
          </Text>
        }
      />
      <AddPublicationButton onPress={AddPublicationClick} />
      <Comments bottomSheetRef={bottomSheetRef} />
    </SafeAreaView>
  );
}
