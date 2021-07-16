import React, {useEffect} from 'react';
import {View, Text, StyleSheet, Alert} from 'react-native';

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

const InfoCard: React.FC<{item: dataPoint}> = ({item}) => {
  const randomGender = () => {
    let num: number = Math.floor(Math.random() * 2);
    return num == 0 ? 'Male' : 'Female';
  };

  const randomAge = () => {
    return Math.floor(Math.random() * 60) + 20;
  };

  return (
    <View style={styles.infoCard}>
      <Text style={styles.name}>
        {item.id} {item.name}
      </Text>
      <Text style={styles.phone}>Ph. Num - {item.phone}</Text>
      <Text style={styles.address}>
        Address - {item.address.suite} {item.address.street} {item.address.city}
      </Text>
      <Text>Gender : {randomGender()}</Text>
      <Text>Age : {randomAge()}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  infoCard: {borderWidth: 2, padding: 20},
  name: {fontSize: 20},
  phone: {fontStyle: 'italic'},
  address: {fontFamily: 'sans-serif', fontStyle: 'italic'},
});

export default InfoCard;
