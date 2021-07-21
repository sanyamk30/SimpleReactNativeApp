import React, {useState} from 'react';
import {View, Text, TextInput, SafeAreaView, Button, Alert} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {DataPoint} from '../interfaces/DataPoint';

const AddUser: React.FC<{
  len: number;
  appendUser: (user: DataPoint) => void;
  componentId: string;
}> = ({len, appendUser, componentId}) => {
  const [name, setName] = useState<string>('');
  const [street, setStreet] = useState<string>('');
  const [suite, setSuite] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [zipcode, setZipcode] = useState<string>('');
  const [phNumber, setPhNumber] = useState<string>('');

  const handleSubmit = () => {
    let user: DataPoint = {
      id: len + 1,
      name: name,
      address: {
        street: street,
        suite: suite,
        city: city,
        zipcode: zipcode,
      },
      phone: phNumber,
    };
    //appendUser(user);
    Alert.alert('Alert Title', 'Are you sure you want to add?', [
      {
        text: 'Yes',
        onPress: () => {
          appendUser(user);
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
      <View>
        <Text>Name : </Text>
        <TextInput
          value={name}
          onChangeText={value => setName(value)}></TextInput>
      </View>
      <View>
        <Text>Street : </Text>
        <TextInput
          value={street}
          onChangeText={value => setStreet(value)}></TextInput>
        <Text>Suite : </Text>
        <TextInput
          value={suite}
          onChangeText={value => setSuite(value)}></TextInput>
        <Text>City : </Text>
        <TextInput
          value={city}
          onChangeText={value => setCity(value)}></TextInput>
        <Text>Zipcode : </Text>
        <TextInput
          value={zipcode}
          onChangeText={value => setZipcode(value)}></TextInput>
      </View>
      <View>
        <Text>Phone number : </Text>
        <TextInput
          value={phNumber}
          onChangeText={value => setPhNumber(value)}></TextInput>
      </View>
      <Button title="Submit" onPress={handleSubmit} color="#841584"></Button>
    </SafeAreaView>
  );
};

export default AddUser;
