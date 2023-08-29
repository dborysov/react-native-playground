import { StyleSheet, Image, type ImageSourcePropType } from "react-native";

interface Props {
  placeholderImageSource: ImageSourcePropType;
}

export const ImageViewer: React.FC<Props> = ({ placeholderImageSource }) => {
  return <Image source={placeholderImageSource} style={styles.image} />;
};

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
