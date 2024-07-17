import { View, Text, ScrollView, Image, Alert } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

import { Link, router } from 'expo-router'

import { images } from '../../constants';
import FormField from '../../components/FormField';
import CustomButtons from '../../components/CustomButtons';
import { signIn } from '../../lib/appwrite';

const SignIn = () => {

  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const submit = async () => {
    if ( form.email === "" || form.password === "") {
      Alert.alert("Error", "Please fill in all fields");
    }

    setIsSubmitting(true);
    try {
      await signIn(form.email, form.password);
      router.replace("/home");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full flex justify-center min-h-[85vh] px-4 my-6">

          <Image
            source={images.logo}
            className="w-[130px] h-[84px]"
            resizeMode="contain"
          />
          <Text className="text-2xl text-white mt-10 font-psemibold">
            Login to Aora
          </Text>

          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) =>
              setForm({
                ...form,
                email: e,
              })
            }
            otherStyles="mt-7"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) =>
              setForm({
                ...form,
                password: e,
              })}
            otherStyles="mt-7"
          />
          <CustomButtons
            title ='Sign-In'
            handlePress={submit}
            containerStyles={'mt-7'}
            isLoading={isSubmitting}
          />

          <View className='justify-center pt-5 flex-row gap-2'>
            <Text className='text-lg text-gray-100 font-pregular'>
              Don't Have an account?
            </Text>
            <Link href={'/sign-up'} className='text-lg font-psemibold text-secondary-100'>
              Sign-Up
            </Link>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default SignIn