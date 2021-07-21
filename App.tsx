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
import {Navigation} from 'react-native-navigation';
import {DataPoint} from './interfaces/DataPoint';
import {Post} from './interfaces/Post';

interface IProps {
  componentId: string;
}

const URL = 'https://jsonplaceholder.typicode.com/users';
const URL_Posts = 'https://jsonplaceholder.typicode.com/posts';

const App: React.FC<IProps> = ({componentId}) => {
  const [dataLoaded, setDataLoaded] = useState<boolean>(false);
  const [data, setData] = useState<DataPoint[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [renderedData, setRenderedData] = useState<DataPoint[]>([]);
  const [offset, setOffset] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const [nameFilter, setNameFilter] = useState<string>('');

  const appendNext = () => {
    if (offset >= data.length) return;
    let tempData: DataPoint[] = renderedData;
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
    let copy: DataPoint[] = data.filter(item => {
      if (item.id > offset) return false;
      let name: string = item.name.toUpperCase();
      if (name.indexOf(nameFilter.toUpperCase()) > -1) {
        return true;
      } else return false;
    });
    setRenderedData(copy);
  };

  const deleteCard = (id: number) => {
    let filteredData: DataPoint[] = data.filter(item => item.id !== id);
    setData(filteredData);

    filteredData = renderedData.filter(item => item.id !== id);
    setRenderedData(filteredData);
  };

  const getPosts = (id: number) => {
    let userPosts: Post[] = posts.filter(post => post.userId === id);
    //console.log(userPosts.length);
    return userPosts;
  };

  const appendUser = (user: DataPoint) => {
    let tempData: DataPoint[] = [user].concat(data);

    setData(tempData);

    let tempRenderedData: DataPoint[] = [user].concat(renderedData);

    setRenderedData(tempRenderedData);
  };

  const addButtonClick = () => {
    Navigation.push(componentId, {
      component: {
        name: 'AddUser',
        passProps: {
          len: data.length,
          appendUser: appendUser,
          componentId: componentId,
        },
        options: {
          topBar: {
            title: {
              text: 'Add User Page',
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

  useEffect(() => {
    appendNext();
  }, [dataLoaded]);

  useEffect(() => {
    axios.get<DataPoint[]>(URL).then(response => {
      let tempData: DataPoint[] = [...response.data];
      for (let i = 10; i < 50; i++) {
        let copy = {...response.data[i % 10]};
        copy.id = i + 1;
        tempData.push(copy);
      }
      setData(tempData);
      setDataLoaded(true);
    });

    axios.get<Post[]>(URL_Posts).then(response => {
      setPosts(response.data);
    });
    //console.log(posts);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.input}
        value={nameFilter}
        onChangeText={value => setNameFilter(value)}
        placeholder="Search using name"></TextInput>
      <Button title="Search" onPress={filterNames} color="#841584"></Button>
      <Button
        title="Add user"
        onPress={addButtonClick}
        color="#841584"></Button>
      <FlatList
        data={renderedData}
        onEndReached={appendNext}
        onEndReachedThreshold={0.1}
        renderItem={({item}) => (
          <InfoCard
            item={item}
            deleteCard={deleteCard}
            posts={getPosts(item.id)}
            componentId={componentId}
          />
        )}
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
