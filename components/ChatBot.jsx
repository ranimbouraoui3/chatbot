import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";

const ChatBot = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([{ question: "مرحبا يا صغيري!", response: "كيف يمكنني مساعدتك؟ 😊" }]);
  const [inputText, setInputText] = useState("");
  const chatAnim = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);

  const predefinedQuestions = [
    "كيف يمكنني تشغيل التطبيق؟",
    "ماذا أفعل بعد فتح التطبيق؟",
    "كيف أستخدم الميزات المختلفة؟",
    "هل يمكنني تغيير لغة التطبيق؟",
    "كيف يمكنني مشاركة المحتوى مع أصدقائي؟",
    "هل يمكنني تغيير الخلفية؟"
  ];

  const toggleChat = () => {
    setIsChatOpen(!isChatOpen);
    Animated.timing(chatAnim, {
      toValue: isChatOpen ? 0 : 1,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const sendMessage = async (question) => {
    if (question.trim() === "") return;

    // Add user message first
    setMessages((prevMessages) => [...prevMessages, { question, response: "..." }]);

    try {
      const response = await axios.post(
        "https://chatbot-1-cykp.onrender.com/talk",
        JSON.stringify({ message: question }),
        {
          headers: {
            "Content-Type": "application/json"
          },
          timeout: 30000, // 30 secondes
        }
      );

      setMessages((prevMessages) => {
        const updatedMessages = prevMessages.map((msg) =>
          msg.response === "..." ? { ...msg, response: response.data.response } : msg
        );
        setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 100);
        return updatedMessages;
      });
    } catch (error) {
      console.error("Error:", error);
      setMessages((prevMessages) => [...prevMessages, { question, response: "عذرًا، حدث خطأ. حاول مرة أخرى!" }]);
    }

    setInputText("");
  };

  return (
    <View style={styles.container}>
      {/* 
      <TouchableOpacity style={styles.floatingButton} onPress={toggleChat}>
        <Ionicons name="chatbubble-outline" size={30} color="white" />
      </TouchableOpacity>

      <Animated.View style={[styles.chatBox, { opacity: chatAnim, transform: [{ scale: chatAnim }] }]}>*/}
      <Animated.View style={styles.chatBox}>

        <Text style={styles.chatTitle}>المساعد الذكي</Text>

        {/* Predefined Questions */}
        <FlatList
          data={predefinedQuestions}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.questionButton} onPress={() => sendMessage(item)}>
              <Text style={styles.questionText}>{item}</Text>
            </TouchableOpacity>
          )}
        />

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.messageContainer}>
              <Text style={styles.questionUser}>{item.question}</Text>
              {item.response && <Text style={styles.responseBot}>{item.response}</Text>}
            </View>
          )}
        />

        {/* Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="اكتب سؤالك..."
            placeholderTextColor="#7f8c8d"
            value={inputText}
            onChangeText={setInputText}
          />
          <TouchableOpacity onPress={() => sendMessage(inputText)}>
            <Ionicons name="send" size={24} color="#3498db" />
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 20,
    right: 20,
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
  chatBox: {
    position: "absolute",
    bottom: 80,
    right: 0,
    width: 320,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 2, height: 2 },
    elevation: 5,
    height: 500,
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#3498db",
    marginBottom: 5,
    textAlign: "right",
    writingDirection: "rtl",
  },
  questionButton: {
    backgroundColor: "#ecf0f1",
    padding: 8,
    borderRadius: 5,
    marginVertical: 3,
  },
  questionText: {
    fontSize: 14,
    color: "#2c3e50",
    textAlign: "right",
    writingDirection: "rtl",
  },
  messageContainer: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 5,
  },
  questionUser: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#3498db",
    textAlign: "right",
    writingDirection: "rtl",
  },
  responseBot: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 2,
    textAlign: "right",
    writingDirection: "rtl",
  },
  inputContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: "#ddd",
    paddingTop: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    textAlign: "right",
    writingDirection: "rtl",
    marginLeft: 5,
  },
});

export default ChatBot;
