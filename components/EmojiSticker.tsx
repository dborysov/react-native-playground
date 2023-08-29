import { ImageURISource, View } from "react-native";
import { PanGestureHandler, PanGestureHandlerGestureEvent, TapGestureHandler } from "react-native-gesture-handler";
import Animated, { useAnimatedGestureHandler, useSharedValue, withSpring } from "react-native-reanimated";

interface Props {
  imageSize: number;
  stickerSource: ImageURISource;
}

export const EmojiSticker: React.FC<Props> = ({ imageSize, stickerSource }) => {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      scaleImage.value = withSpring(scaleImage.value === imageSize ? imageSize * 2 : imageSize);
    },
  });

  const onDrag = useAnimatedGestureHandler<PanGestureHandlerGestureEvent, { translateX: number; translateY: number }>({
    onStart: (_, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = context.translateX + event.translationX;
      translateY.value = context.translateY + event.translationY;
    },
  });

  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <Animated.View style={{ top: -350, transform: [{ translateX }, { translateY }] }}>
        <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
          <Animated.Image source={stickerSource} style={{ width: scaleImage, height: scaleImage }} resizeMode="contain" />
        </TapGestureHandler>
      </Animated.View>
    </PanGestureHandler>
  );
};
