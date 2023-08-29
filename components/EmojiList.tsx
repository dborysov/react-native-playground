import Emoji1 from "../assets/images/emoji1.png";
import Emoji2 from "../assets/images/emoji2.png";
import Emoji3 from "../assets/images/emoji3.png";
import Emoji4 from "../assets/images/emoji4.png";
import Emoji5 from "../assets/images/emoji5.png";
import Emoji6 from "../assets/images/emoji6.png";
import { FlatList, Image, ImageURISource, Platform, Pressable, StyleSheet } from "react-native";

const emoji = [Emoji1, Emoji2, Emoji3, Emoji4, Emoji5, Emoji6];

interface Props {
  onSelect: (emoji: ImageURISource) => void;
  onCloseModal: () => void;
}

export const EmojiList: React.FC<Props> = ({ onCloseModal, onSelect }) => (
  <FlatList
    horizontal
    showsHorizontalScrollIndicator={Platform.OS === "ios"}
    data={emoji}
    contentContainerStyle={styles.container}
    renderItem={({ item, index }) => (
      <Pressable
        onPress={() => {
          onSelect(item);
          onCloseModal();
        }}
      >
        <Image source={item} key={index} style={styles.image} />
      </Pressable>
    )}
  />
);

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  image: {
    width: 100,
    height: 100,
    marginRight: 20,
  },
});
