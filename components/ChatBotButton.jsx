import React, { useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ChatBot from "./ChatBot";

export default function ChatBotButton() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <View style={styles.container}>
      {isChatOpen && <ChatBot />}
      <TouchableOpacity style={styles.floatingButton} onPress={() => setIsChatOpen(!isChatOpen)}>
        <Ionicons name="chatbubble-ellipses-outline" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 1000, // S'assurer qu'il est au-dessus des autres éléments
  },
  floatingButton: {
    backgroundColor: "#3498db",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
  },
});
