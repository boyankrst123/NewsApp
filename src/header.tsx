import React from 'react';
import { Text, View } from 'react-native';
import { Header } from 'react-native-elements';

const MainHeader = () => {
  return (
    <View>
      <Header
        centerComponent={{ text: 'Hacker News ! ', style: { color: '#fff',fontSize:42, fontWeight: 'bold' }}}
        containerStyle={{
          backgroundColor: '#a5d6a7',
          height: 200,
          borderWidth: 25,
          borderColor: '#f8e4a8',
          justifyContent: 'space-around',
        }}
      />
      <Text style={{margin: 10,fontSize:24, textAlign: 'center'}}>
        Here are 10 random articles sorted by score. 
      </Text>
    </View>
  );
};

export default MainHeader;