import { MaterialIcons } from "@expo/vector-icons";
import { ComponentProps } from "react";
import { GestureResponderEvent, Pressable, StyleSheet, Text } from "react-native";

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
  icon: ComponentProps<typeof MaterialIcons>["name"];
  label: string;
}

export const IconButton: React.FC<Props> = ({ onPress, icon, label }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <MaterialIcons name={icon} size={24} color="#fff" />
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: { justifyContent: "center", alignItems: "center" },
  label: { color: "#fff", marginTop: 12 },
});
