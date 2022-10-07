import {Platform, StyleSheet, View, SafeAreaView, Text} from 'react-native';
import PropTypes from 'prop-types';
import React, {Component} from 'react';

const Profile = (props) => {
  const {navigation} = props;
  return (
    <View style={styles.container}>
      <View style={styles.undefined} />
      <View style={styles.undefined} />
      <Text style={styles.placeholderName}>PlaceholderName</Text>
      <Text style={styles.followers}>Followers</Text>
      <Text style={styles.loremIpsum}>23</Text>
      <View style={styles.rect} />
      <View style={styles.rect2} />
      <Text style={styles.follow2}>FOLLOW!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
  container: {
    flex: 1,
  },
  undefined: {},
  placeholderName: {
    top: 310,
    left: 127,
    position: 'absolute',
    color: '#121212',
  },
  followers: {
    top: 340,
    left: 127,
    position: 'absolute',
    color: '#121212',
  },
  loremIpsum: {
    top: 340,
    left: 222,
    position: 'absolute',
    color: '#121212',
  },
  rect: {
    top: 460,
    left: 56,
    width: 263,
    height: 190,
    position: 'absolute',
    backgroundColor: '#E6E6E6',
  },
  rect2: {
    top: 102,
    left: 101,
    width: 173,
    height: 161,
    position: 'absolute',
    backgroundColor: '#E6E6E6',
  },
  follow2: {
    top: 398,
    left: 153,
    position: 'absolute',
    color: '#121212',
  },
});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
