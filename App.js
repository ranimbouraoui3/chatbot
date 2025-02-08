/*import React, { useState } from "react";
import { View, Button } from "react-native";
import PlantGrowth from "./components/PlantGrowth";

const App = () => {
  const [value, setValue] = useState(1);

  const changeImage = () => {
    setValue((prev) => (prev === 8 ? 1 : prev + 1)); // Passe à l’image suivante
  };

  return (
    
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <PlantGrowth value={value} />
      <Button title="Changer d'image" onPress={changeImage} />
    </View>
  );
};


export default App;*/
/*
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Accueil from "./components/Accueil"; // Assure-toi que le chemin est correct

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Accueil} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;*/
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Accueil from "./components/Accueil";
import MatiereDetail from "./components/MatiereDetail";
import LesMatiers from "./components/LesMatiers";
import ChatBot from "./components/ChatBot";
import ChatBotButton from "./components/ChatBotButton"; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Accueil" component={Accueil} />
        <Stack.Screen name="LesMatiers" component={LesMatiers} />
        <Stack.Screen name="MatiereDetail" component={MatiereDetail} />
      </Stack.Navigator>
      <ChatBotButton />
    </NavigationContainer>
  );
}


