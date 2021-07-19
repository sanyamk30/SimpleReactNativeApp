import React from 'react';
import {View, Text, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {Navigation} from 'react-native-navigation';

interface DataPoint {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

const InfoCard: React.FC<{
  item: DataPoint;
  deleteCard: (id: number) => void;
  posts: Post[];
  componentId: string;
}> = ({item, deleteCard, posts, componentId}) => {
  const randomGender = () => {
    let num: number = Math.floor(Math.random() * 2);
    return num == 0 ? 'Male' : 'Female';
  };

  const randomAge = () => {
    return Math.floor(Math.random() * 60) + 20;
  };

  const handleLongPress = () => {
    Alert.alert('Alert Title', 'Are you sure you want to delete?', [
      {
        text: 'Yes',
        onPress: () => {
          deleteCard(item.id);
        },
      },
      {
        text: 'No',
      },
    ]);
  };

  const handlePress = () => {
    Navigation.push(componentId, {
      component: {
        name: 'UserProfile',
        passProps: {
          user: item,
          posts: posts,
          componentId: componentId,
          deleteCard: deleteCard,
        },
        options: {
          topBar: {
            title: {
              text: 'Details Page',
              color: 'white',
            },
            background: {
              color: '#841584',
            },
          },
        },
      },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress} onLongPress={handleLongPress}>
      <View style={styles.infoCard}>
        <Text style={styles.name}>
          {item.id} {item.name}
        </Text>
        <Text style={styles.phone}>Ph. Num - {item.phone}</Text>
        <Text style={styles.address}>
          Address - {item.address.suite} {item.address.street}{' '}
          {item.address.city}
        </Text>
        <Text>Gender : {randomGender()}</Text>
        <Text>Age : {randomAge()}</Text>
        <Text>Posts : {posts.length}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  infoCard: {borderWidth: 2, padding: 20},
  name: {fontSize: 20},
  phone: {fontStyle: 'italic'},
  address: {fontFamily: 'sans-serif', fontStyle: 'italic'},
});

export default InfoCard;
