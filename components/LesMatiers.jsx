import React from "react";
import { View, Text, StyleSheet, ScrollView ,Image } from "react-native";
import { ProgressBar, Button } from "react-native-paper";

const matieres = [
  { id: 1, name: "الرياضيات", progress: 0 },
  { id: 2, name: "الفيزياء", progress: 20 },
  { id: 3, name: "الكيمياء", progress: 40 },
  { id: 4, name: "اللغة العربية", progress: 60 },
  { id: 5, name: "الإنجليزية", progress: 80 },
];

const LesMatiers = ({ navigation }) => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Class Quiz</Text>
      {matieres.map((matiere) => (
        <View key={matiere.id} style={styles.matiereContainer}>
          <Text style={styles.matiereName}>{matiere.name}</Text>
          <ProgressBar
            progress={matiere.progress / 100}
            color="#3498db"
            style={styles.progressBar}
          />
          <Text style={styles.progressText}>{matiere.progress}%</Text>
          <Button
            mode="contained"
            onPress={() => navigation.navigate("MatiereDetail", { name: matiere.name ,progresse:matiere.progress})}
            style={styles.button}
          >
            تعلم
          </Button>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3498db",
    marginBottom: 20,
  },
  matiereContainer: {
    width: "100%",
    backgroundColor: "#fff",
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    elevation: 3,
    alignItems: "center",
  },
  matiereName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
  progressBar: {
    width: "80%",
    height: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  progressText: {
    fontSize: 16,
    marginBottom: 10,
  },
  button: {
    backgroundColor: "#ff9800",
  },
});

export default LesMatiers;
