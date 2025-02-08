import React from "react";
import { Image, View } from "react-native";

const PlantGrowth = ({ value }) => {
  // Associer chaque valeur à une image
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

  return (
    <View>
      <Image source={images[value]} style={{ width: 150, height: 200 }} />
    </View>
  );
};

export default PlantGrowth;

