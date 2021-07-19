import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Button,
  Alert,
} from 'react-native';
import {Navigation} from 'react-native-navigation';

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

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

const UserPost: React.FC<{title: string; body: string}> = ({title, body}) => {
  return (
    <View style={styles.post}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.body}>{body}</Text>
    </View>
  );
};

const InfoDetailCard: React.FC<{
  user: DataPoint;
  posts: Post[];
  componentId: string;
  deleteCard: (id: number) => void;
}> = ({user, posts, componentId, deleteCard}) => {
  const handleDelete = () => {
    Alert.alert('Alert Title', 'Are you sure you want to delete?', [
      {
        text: 'Yes',
        onPress: () => {
          deleteCard(user.id);
          Navigation.pop(componentId);
        },
      },
      {
        text: 'No',
      },
    ]);
  };

  return (
    <SafeAreaView>
      <Button title="Delete" onPress={handleDelete} color="red"></Button>
      <Text style={styles.heading}>USER INFO</Text>
      <View style={styles.infoCard}>
        <Text style={styles.name}>
          {user.id} {user.name}
        </Text>
        <Text style={styles.phone}>Ph. Num - {user.phone}</Text>
        <Text style={styles.address}>
          Address - {user.address.suite} {user.address.street}{' '}
          {user.address.city}
        </Text>
      </View>
      <Text style={styles.heading}> USER POSTS</Text>
      <FlatList
        data={posts}
        renderItem={({item}) => (
          <UserPost title={item.title} body={item.body}></UserPost>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  infoCard: {borderWidth: 2, padding: 20},
  name: {fontSize: 20},
  phone: {fontStyle: 'italic'},
  address: {fontFamily: 'sans-serif', fontStyle: 'italic'},
  heading: {fontWeight: 'bold', fontSize: 30},
  post: {borderWidth: 1, padding: 10},
  title: {fontWeight: 'bold'},
  body: {fontFamily: 'sans-serif', fontStyle: 'italic'},
});

export default InfoDetailCard;
