import React from "react";
import HomeScreen from "./HomeScreen";
import { View, Text } from "react-native";
import Weatherapi from "./Weatherapi";
// import Practice from "./Practice";

function App() {
  return (
    <View className="flex flex-1">
      <HomeScreen />
      {/* <Practice/> */}
      {/* <Weatherapi/> */}
    </View>
  );
}

export default App;
