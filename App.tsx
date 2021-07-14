import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
  SafeAreaView,
} from 'react-native';
import axios from 'axios';

interface dataPoint {
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

const URL = 'https://jsonplaceholder.typicode.com/users';

const App = () => {
  const [data, setData] = useState<dataPoint[]>([]);
  const [renderedData, setRenderedData] = useState<dataPoint[]>([]);
  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);

  const appendNext = () => {
    let tempData: dataPoint[] = renderedData;
    for (let i = offset; i < offset + limit; i++) {
      if (!data[i]) return;
      //Alert.alert(JSON.stringify(data[i]));
      tempData.push(data[i]);
    }
    setOffset(offset + limit);
    setRenderedData(tempData);
    Alert.alert(JSON.stringify(renderedData.length));
  };

  const renderHeader = () => {
    return <Text style={styles.header}>Details of Users</Text>;
  };

  const randomGender = () => {
    let num: number = Math.floor(Math.random() * 2);
    return num == 0 ? 'Male' : 'Female';
  };

  const randomAge = () => {
    return Math.floor(Math.random() * 60) + 20;
  };

  useEffect(() => {
    axios
      .get<dataPoint[]>(URL)
      .then(response => {
        let tempData: dataPoint[] = [...response.data];
        for (let i = 10; i < 50; i++) {
          let copy = {...response.data[i % 10]};
          copy.id = i + 1;
          tempData.push(copy);
        }
        setData(tempData);
      })
      .catch(error => Alert.alert(error));

    appendNext();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={renderedData}
        onEndReached={appendNext}
        onEndReachedThreshold={0.1}
        renderItem={({item}) => (
          <View style={styles.infoCard}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.phone}>Ph. Num - {item.phone}</Text>
            <Text style={styles.address}>
              Address - {item.address.suite} {item.address.street}{' '}
              {item.address.city}
            </Text>
            <Text>Gender : {randomGender()}</Text>
            <Text>Age : {randomAge()}</Text>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  infoCard: {borderWidth: 2, padding: 20},
  name: {fontSize: 20},
  phone: {fontStyle: 'italic'},
  address: {fontFamily: 'sans-serif', fontStyle: 'italic'},
  header: {
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 50,
  },
});

export default App;
