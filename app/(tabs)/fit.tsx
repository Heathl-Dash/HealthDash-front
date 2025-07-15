import { View, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import React from 'react'
import Header from "../../components/Header";

export default function Fit() {
  return (
    <SafeAreaView>
      <Header/>
      <Text>pagina Fit</Text>
    </SafeAreaView>
  )
}