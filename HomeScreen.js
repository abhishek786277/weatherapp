import {
  View,
  Text,
  SafeAreaView,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useEffect, useState } from "react";
import { searchdata, forecastdata } from "./Weatherapi";

function HomeScreen() {
  useEffect(() => {
    loadweatherdata();
  }, []);

  const loadweatherdata = async () => {
    const data = await forecastdata({ cityname: "london" });
    data ? (setcountry(data) , setloading(false)) : null ;
  };

  const [showsearch, setshowsearch] = useState(false);
  const [datalocation, setdatalocation] = useState([]);
  const [country, setcountry] = useState({});
  const [loading, setloading] = useState(true);

  const search = async (value) => {
    if (value.length > 2) {
      const data2 = await searchdata({ cityname: value });
      data2.map((arr) => setdatalocation(arr));
      setdatalocation(data2);
    }
  };

  const searchbutton = async (name) => {
    console.log("search button");
    setdatalocation([]);
    setloading(true);
    setshowsearch(false);
    const data = await forecastdata({ cityname: name });
    setcountry(data);
    setloading(false);

    // console.log(country);
    // console.log(country.current)
    // console.log(country.location)
  };
  const { current, location } = country;

  return (
    <View className=" flex flex-1 bg-gray-800 ">
      {/* <Image
        blurRadius={70}
        source={require("./img/bgimgg.jpg")}
        className="h-full w-full absolute"
      /> */}
      {loading ? (
        <View className=" flex flex-1 bg-slate-700 justify-center items-center">
          <Text className="text-white font-medium text-3xl">
            Loading.............
          </Text>
        </View>
      ) : (
        <SafeAreaView className=" flex flex-1 bg-slate-700 justify-evenly">
          <View className="mt-4 w-full px-4 flex-row">
            {showsearch ? (
              <View className="bg-white rounded-full h-9 w-full">
                <TextInput
                  onChangeText={search}
                  placeholder="Search City"
                  placeholderTextColor={"grey"}
                  className=" px-4 font-bold py-2"
                />
              </View>
            ) : null}
            <TouchableOpacity
              className=" w-16 bg-gray-500 p-2 rounded-full absolute right-4"
              onPress={() => setshowsearch(!showsearch)}
            >
              <Text className="text-white">Serach</Text>
            </TouchableOpacity>
          </View>
          <View className="p-4 items-center">
            {datalocation.length > 0 && showsearch ? (
              <View className="bg-white px-4 py-2  rounded-2xl mt-3 absolute z-10 w-full">
                {datalocation.map((loc, index) => (
                  <TouchableOpacity
                    key={index}
                    onPress={() => searchbutton(loc.name)}
                  >
                    <Text className="Text">
                      {index + 1} {loc.name} {loc.country}{" "}
                    </Text>
                    <View className="h-0.5 my-1 bg-gray-500"></View>
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}
          </View>
          <View className="  items-center">
            <Text className="text-white text-2xl">{location?.name}</Text>
            <Text className="text-white text-xl">{location?.country}</Text>
            <Image
              source={{ uri: `https://${current?.condition?.icon}` }}
              className="h-52 w-52"
            />
          </View>
          <View className=" items-center">
            <Text className="text-white text-5xl font-bold">
              {current?.temp_c}
            </Text>
            <Text className="text-white text-xl font-semibold">
              {current?.condition?.text}
            </Text>
          </View>
          <View></View>
          <View className="flex-row ">
            <View className="mx-3 flex-row items-center">
              <Image source={require("./img/wind.png")} />
              <Text className="text-white text-xl ">{current?.wind_kph}km</Text>
            </View>
            <View className="mx-2 flex-row items-center">
              <Image source={require("./img/drop.png")} />
              <Text className="text-white text-xl mx-2">
                {current?.humidity}%
              </Text>
            </View>
            <View className="mx-3 flex-row items-center">
              <Image source={require("./img/sun.png")} />
              <Text className="text-white text-xl mx-2">6:05 Am</Text>
            </View>
          </View>
          <View className="">
            <ScrollView
              horizontal={true}
              className="flex-row gap-4 px-4 "
              showsHorizontalScrollIndicator={false}
            >
              {country?.forecast?.forecastday?.map((item, index) => {
                // console.log(item);

                return (
                  <View
                    className="h-26 w-32 bg-slate-600 rounded-2xl items-center"
                    key={index}
                  >
                    {/* {console.log(item)} */}
                    <Image
                      source={{ uri: `https://${item?.day?.condition?.icon}` }}
                      className="h-16 w-16"
                    />
                    <Text className="text-white">{item?.day?.condition?.text}</Text>
                    <Text className="text-white">{item.date}</Text>
                    <Text className="text-white">{item?.day?.avgtemp_c}°</Text>
                  </View>
                );
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  );
}

export default HomeScreen;
