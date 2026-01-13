import { Colors } from "@/constants/Colors";
import React, { useState } from "react";
import { Image, StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

interface ImageCarrouselProps {
  images: string[];
}

const ImageCarrousel = ({ images }: ImageCarrouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  return (
    <View style={styles.container}>
      <PagerView
        style={styles.carrouselContainer}
        initialPage={0}
        onPageSelected={(e) => setActiveIndex(e.nativeEvent.position)}
      >
        {images.map((image, index) => (
          <View style={styles.page} key={index}>
            <Image
              source={{
                uri: image,
              }}
              style={styles.image}
            />
          </View>
        ))}
      </PagerView>
      <View style={styles.dotContainer}>
        {images.map((_, index) => (
          <View key={index} style={[styles.dot, activeIndex === index && styles.dotActive]} />
        ))}
      </View>
    </View>
  );
};

export default ImageCarrousel;

const styles = StyleSheet.create({
  container: {
    gap: 5,
  },
  carrouselContainer: {
    width: "100%",
    aspectRatio: 1,
  },
  page: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    borderRadius: 15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  dotContainer: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  dot: {
    width: 5,
    aspectRatio: 1,
    borderRadius: 50,
    backgroundColor: Colors.light.lightGray,
  },
  dotActive: {
    backgroundColor: Colors.light.secondary,
  },
});
