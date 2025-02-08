import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { RadioButton } from "react-native-paper";

const Accueil = ({ navigation }) => {
  const [selectedLevel, setSelectedLevel] = useState(1); // Niveau sélectionné (par défaut : 1)

  // Fonction pour obtenir l'image selon la valeur sélectionnée
  const getImage = (value) => {
    const images = {
      1: require("../assets/images/1.png"),
      2: require("../assets/images/2.png"),
      3: require("../assets/images/3.png"),
      4: require("../assets/images/4.png"),
      5: require("../assets/images/5.png"),
      6: require("../assets/images/6.png"),
      7: require("../assets/images/7.png"),
      8: require("../assets/images/8.png"),
    };
    return images[value] || images[1]; // Image par défaut si la valeur est invalide
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.appName}>Class Quiz</Text>
      <Text style={styles.progressText}>تقدمي</Text>
      <Image source={getImage(selectedLevel)} style={styles.treeImage} />
      <View style={styles.radioContainer}>
        <RadioButton.Group
          onValueChange={(value) => setSelectedLevel(value)}
          value={selectedLevel}
        >
          <View style={styles.radioOption}>
            <RadioButton value={1} />
            <Text style={styles.radioText}>المستوى 1</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value={2} />
            <Text style={styles.radioText}>المستوى 2</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value={3} />
            <Text style={styles.radioText}>المستوى 3</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value={4} />
            <Text style={styles.radioText}>المستوى 4</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value={5} />
            <Text style={styles.radioText}>المستوى 5</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value={6} />
            <Text style={styles.radioText}>المستوى 6</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value={7} />
            <Text style={styles.radioText}>المستوى 7</Text>
          </View>
          <View style={styles.radioOption}>
            <RadioButton value={8} />
            <Text style={styles.radioText}>المستوى 8</Text>
          </View>
        </RadioButton.Group>
      </View>

      {/* Bouton Learn en arabe */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("LesMatiers")}>
        <Text style={styles.buttonText}>تعلم</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 20, // Ajout de padding pour espacer les éléments
  },
  treeImage: {
    width: 150,
    height: 200,
    marginBottom: 20, // Espacement entre l'image et le texte
  },
  appName: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#3498db",
    marginBottom: 20,
  },
  progressText: {
    fontSize: 22,
    color: "#333",
    marginBottom: 30,
  },
  radioContainer: {
    marginBottom: 20,
  },
  radioOption: {
    flexDirection: "row",
    alignItems: "center",
  },
  radioText: {
    fontSize: 18,
    marginLeft: 8,
  },
  button: {
    backgroundColor: "#ff9800",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 25,
    elevation: 5,
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Accueil;
