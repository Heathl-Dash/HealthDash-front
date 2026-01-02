import Header from "@/components/Header";
import Publication from "@/components/Publication";
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
  return (
    <SafeAreaView style={{ flex: 1, paddingHorizontal: 30 }}>
      <Header feedSocialMedia />
      <FlatList
        data={PUBLICATIONS || []}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ gap: 25 }}
        renderItem={({ item }) => (
          <Publication
            profileId={item.profileId}
            profileAvatar={item.profileAvatar}
            profileName={item.profileName}
            attach={item.attach}
            description={item.description}
            isPublic={item.isPublic}
            type={item.type}
            isLike={item.isLike}
            likesCount={item.likesCount}
            commentsCount={item.commentsCount}
          />
        )}
        ListEmptyComponent={
          <Text style={{ color: Colors.light.darkGray, textAlign: "center" }}>
            Nenhuma publicação encontrada.
          </Text>
        }
      />

      {/* <View style={{ gap: 10 }}>
        {publications.map((publication, index) => (
          <Publication
            profileId={publication.profileId}
            attach={publication.attach}
            description={publication.description}
            isPublic={publication.isPublic}
            type={publication.type}
            isLike={publication.isLike}
            likesCount={publication.likesCount}
          />
        ))}
      </View> */}
    </SafeAreaView>
  );
}
