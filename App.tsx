import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Alert,
  SafeAreaView,
  TextInput,
  Button,
} from 'react-native';
import axios from 'axios';
import InfoCard from './components/InfoCard';

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
  const [nameFilter, setNameFilter] = useState('');

  const appendNext = () => {
    let tempData: dataPoint[] = renderedData;
    for (let i = offset; i < offset + limit; i++) {
      if (!data[i]) return;
      let name: string = data[i].name.toUpperCase();
      if (name.indexOf(nameFilter.toUpperCase()) > -1) tempData.push(data[i]);
    }
    setOffset(offset + limit);
    setRenderedData(tempData);
    //Alert.alert(JSON.stringify(renderedData.length));
  };

  const renderHeader = () => {
    return <Text style={styles.header}>Details of Users</Text>;
  };

  const filterNames = () => {
    let copy: dataPoint[] = data.filter(item => {
      if (item.id > limit) return false;
      let name: string = item.name.toUpperCase();
      if (name.indexOf(nameFilter.toUpperCase()) > -1) {
        return true;
      } else return false;
    });
    setRenderedData(copy);
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
      <TextInput
        style={styles.input}
        value={nameFilter}
        onChangeText={value => setNameFilter(value)}
        placeholder="Search using name"></TextInput>
      <Button title="Search" onPress={filterNames}></Button>
      <FlatList
        data={renderedData}
        onEndReached={appendNext}
        onEndReachedThreshold={0.1}
        renderItem={({item}) => <InfoCard item={item} />}
        keyExtractor={item => item.id.toString()}
        ListHeaderComponent={renderHeader}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  header: {
    fontFamily: 'Helvetica',
    fontWeight: 'bold',
    fontSize: 50,
  },
  input: {
    height: 40,
    borderWidth: 1,
  },
});

export default App;
