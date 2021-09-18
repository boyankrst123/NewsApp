/**
 * React Native App for displaying random News articles from HackerNews
-----------------------------------------------------------------------
 * Made by : Boyan Krastenyakov // 09.18.2021
 */

import React from 'react';
import {
  SafeAreaView,
  View,
} from 'react-native';

import News from './src/news-screen';
import MainHeader from './src/header';

const App = () => {
  return (
    <SafeAreaView>
      <View>
        <MainHeader/>
        <News/>
      </View>
    </SafeAreaView>
  );
};

export default App;
