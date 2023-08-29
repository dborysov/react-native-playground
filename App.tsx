import domtoimage from "dom-to-image";
import { captureRef } from "react-native-view-shot";
import { StatusBar } from "expo-status-bar";
import * as ImagePicker from "expo-image-picker";
import { ImageURISource, Platform, StyleSheet, View } from "react-native";
import PlaceholderImage from "./assets/images/background-image.png";
import { ImageViewer } from "./components/ImageViewer";
import { Button } from "./components/Button";
import { useRef, useState } from "react";
import { IconButton } from "./components/IconButton";
import { CircleButton } from "./components/CircleButton";
import { EmojiPicker } from "./components/EmojiPicker";
import { EmojiList } from "./components/EmojiList";
import { EmojiSticker } from "./components/EmojiSticker";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { saveToLibraryAsync, usePermissions } from "expo-media-library";

const App: React.FC = () => {
  const [status, requestPermission] = usePermissions();

  if (status === null) requestPermission();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAppOptionsVisible, setIsAppOptionsVisible] = useState(false);

  const [image, setImage] = useState(PlaceholderImage);

  const pickImageAsync = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0]);

      setIsAppOptionsVisible(true);
    } else {
      console.log("Cancelled");
    }
  };

  const onReset = () => {
    setIsAppOptionsVisible(false);
    setPickedEmoji(null);
    setImage(PlaceholderImage);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const [pickedEmoji, setPickedEmoji] = useState<ImageURISource>(null);

  const imageRef = useRef();

  const onSaveImageAsync = async () => {
    if (Platform.OS !== "web") {
      try {
        const localUri = await captureRef(imageRef, {
          height: 440,
          quality: 1,
        });

        await saveToLibraryAsync(localUri);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        const dataUrl = await domtoimage.toJpeg(imageRef.current, {
          quality: 0.95,
          width: 320,
          height: 440,
        });

        let link = document.createElement("a");
        link.download = "sticker-smash.jpeg";
        link.href = dataUrl;
        link.click();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <GestureHandlerRootView style={styles.container}>
      <View style={styles.imageContainer}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer placeholderImageSource={image} />
          {pickedEmoji && <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />}
        </View>
      </View>

      {isAppOptionsVisible ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="refresh" label="Reset" onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
          </View>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button onPress={pickImageAsync} theme="primary" label={"Choose a photo"}></Button>
          <Button label={"Use this photo"} onPress={() => setIsAppOptionsVisible(true)}></Button>
        </View>
      )}

      <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
        <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
      </EmojiPicker>

      <StatusBar style="light" />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});

export default App;
