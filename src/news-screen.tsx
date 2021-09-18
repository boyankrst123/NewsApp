import React, { useEffect, useState, Component } from 'react';
import { ActivityIndicator, FlatList, Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Card, } from 'react-native-elements';

const News = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<any[]>([]);
  
  const getHackerNews = async () => {
     try {
      const response = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
      const json = await response.json();

      const hackerNews = [] as any;
    
      // looping 10 times in order to get that much news articles
      for ( var i = 0; i < 10; i++) {
        const randomStoryID = Math.floor(Math.random() * json.length);
    
        const responseItem = await fetch('https://hacker-news.firebaseio.com/v0/item/' + json[randomStoryID] + '.json');
        const jsonStory = await responseItem.json();

        const responseUser = await fetch('https://hacker-news.firebaseio.com/v0/user/' + jsonStory.by + '.json');
        const jsonUser = await responseUser.json();


        // var timestemp = new Date( 23456789000 ) as any;
        // var formatted = timestemp.format("dd/mm/yyyy hh:MM:ss");

        // filling the empty news array with data for each individual random article
        hackerNews.push( {
          title: jsonStory.title, 
          url: jsonStory.url,
          timestamp: jsonStory.time,
          score: jsonStory.score,
          authorId: jsonUser.id,
          authorKarma: jsonUser.karma
        });
      }

      // Sorting the News by score - from low to high 
      hackerNews.sort((a:any, b:any) => (a.score > b.score) ? 1 : -1);
    
      setData(hackerNews);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getHackerNews();
  }, []);;

  return (
    <ScrollView style={{ padding: 20}}>
      {isLoading ? 
        <View style={[styles.spinnerContainer, styles.spinnerPosition]}>
          <ActivityIndicator size={150} color="#00ff00"/> 
        </View> 
      : (
        <View style={{}}>
        <FlatList
          data={data}
          keyExtractor={({ id }, index,) => id}
          style={styles.newsList}
          contentContainerStyle={{ paddingBottom: 10}}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(item.url);
              }}
            >
              <Card containerStyle={styles.card}>
                <Card.Title style={styles.cardTitle}> 
                  {item.title} 
                </Card.Title>
                <Text style={{marginBottom: 10  }}>
                  {item.url}
                </Text>
                <View>
                  <Text style={styles.cardText}>Time : {item.timestamp}</Text>
                </View>
                <View >
                  <Text style={styles.cardText}>Score : {item.score}</Text>
                </View>
                <Card.Divider/>
                <View>
                  <Text style={styles.cardText}>Author ID :   {item.authorId}</Text>
                </View>
                <View>
                  <Text style={styles.cardText}>Karma :        {item.authorKarma}</Text>
                </View>
              </Card>
            </TouchableOpacity>
          )}
        />
        </View>
      )}
     </ScrollView>
  );
};

const styles = StyleSheet.create({
  spinnerContainer: {
    flex: 1,
    justifyContent: "center",
  },
  spinnerPosition: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  newsList: {
    paddingBottom: 620,
  },
  card: {
    borderWidth:10,
    borderColor: '#f8e4a8',
    backgroundColor: '#c0c8d1',
    borderRadius: 30,
  },
  cardTitle: {
    fontSize:25,
    color: '#000033'
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold'
  }
});

export default News;