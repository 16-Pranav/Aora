import { Link, router } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButtons from "../components/CustomButtons";
// import "react-native-url-polyfill/auto";
import {images} from  '../constants'

export default function App() {
  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className=" w-full items-center justify-center h-full px-4">
          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            className="max-w-[380px] h-[300px]"
            resizeMode="contain"
          />

          <View className="relative mt-5">
            <Text className="text-white text-center text-3xl font-bold">
              Discover Endless Possiblities with 
              <Text className="text-secondary-200"> Aora</Text>
              <Image
                source={images.path}
                className={'w-[100px] h-[15px] absolute -bottom-5 -right-7'}
                resizeMode="contain"
              />
            </Text>
          </View>

          <Text className='text-sm font-pregular text-gray-100 mt-7 text-center'>Where creativity meets innovation:
            Embark ona journey of limitless exploration with Aora
          </Text>

          <CustomButtons
            title="Continue with Email"
            handlePress={() => router.push('/sign-in')}
            containerStyles ="w-full mt-7"
          />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#161622" style="light"/>
    </SafeAreaView>
  );
}