import { MaterialIcons } from "@expo/vector-icons";
import { GestureResponderEvent, Pressable, StyleSheet, View } from "react-native";

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
}

export const CircleButton: React.FC<Props> = ({ onPress }) => {
  return (
    <View style={styles.container}>
      <Pressable style={styles.button} onPress={onPress}>
        <MaterialIcons name="add" size={38} color="#25292e" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 84,
    height: 84,
    marginHorizontal: 60,
    borderWidth: 4,
    borderColor: "#ffd33d",
    borderRadius: 42,
    padding: 3,
  },
  button: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 42,
    backgroundColor: "#fff",
  },
});
