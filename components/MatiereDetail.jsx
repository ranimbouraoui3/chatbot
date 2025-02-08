import React, { useState, useEffect } from "react";
import { Audio } from 'expo-av';
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

const getImageForProgress = (progress) => {
  if (progress < 20 && progress >= 0) {
    return require("../assets/images/superSad.png");
  } else if (progress < 40 && progress >= 20) {
    return require("../assets/images/sad.png");
  } else if (progress < 60 && progress >= 40) {
    return require("../assets/images/normal.png");
  } else if (progress < 80 && progress >= 60) {
    return require("../assets/images/happy.png");
  } else {
    return require("../assets/images/super.png");
  }
};

const getSoundForProgress = (progress) => {
  if (progress < 20 && progress >= 0) {
    return require("../assets/audio/superSad.mp3");
  } else if (progress < 40 && progress >= 20) {
    return require("../assets/audio/sad.mp3");
  } else if (progress < 60 && progress >= 40) {
    return require("../assets/audio/normal.mp3");
  } else if (progress < 80 && progress >= 60) {
    return require("../assets/audio/happy.mp3");
  } else {
    return require("../assets/audio/super.mp3");
  }
};

const MatiereDetail = ({ route, navigation }) => {
  const { name, progresse } = route.params;
  const [sound, setSound] = useState();
  const [hasPermission, setHasPermission] = useState(false);

  // Vérification des permissions audio au montage du composant
  useEffect(() => {
    const checkPermissions = async () => {
      const { status } = await Audio.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    };
    checkPermissions();
  }, []);

  const playSound = async () => {
    if (!hasPermission) {
      console.log("Permission audio non accordée.");
      return;
    }

    try {
      // Stop any previous sound before playing a new one
      if (sound) {
        await sound.stopAsync();
        await sound.unloadAsync();
      }

      const soundFile = getSoundForProgress(progresse);
      console.log("Fichier audio en cours de chargement :", soundFile);

      const { sound: newSound, status } = await Audio.Sound.createAsync(
        soundFile
      );
      setSound(newSound);

      console.log("Statut du son :", status);

      // Démarrer la lecture du son
      await newSound.playAsync();
      console.log("Le son a commencé à jouer");
    } catch (error) {
      console.error("Erreur lors de la lecture du son :", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{name}</Text>
      <Text style={styles.description}>
        مرحبًا بك في صفحة التعلم الخاصة بـ {name}. هنا يمكنك استكشاف الدروس والتحديات الخاصة بهذه المادة!
      </Text>
      <TouchableOpacity onPress={playSound}>
        <Image source={getImageForProgress(progresse)} style={styles.image} />
        <Text style={styles.clickText}>اضغط هنا</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#3498db",
    marginBottom: 10,
  },
  description: {
    fontSize: 18,
    textAlign: "center",
  },
  image: {
    width: 50,
    height: 50,
    marginTop: 10,
    marginLeft: 20, // Décalage à gauche
  },
  clickText: {
    marginTop: 10,
    fontSize: 16,
    color: "#3498db",
    fontWeight: "bold",
  }
});

export default MatiereDetail;
