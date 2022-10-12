import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/Variables';
import {Avatar, Button, Card, Icon, ListItem, Text} from '@rneui/themed';
import PropTypes from 'prop-types';
import {Platform, StyleSheet, View} from 'react-native';

const Profile = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('https://placekitten.com/640');
  const {getFilesByTag} = useTag();

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      const avatarFile = avatarArray.pop();
      setAvatar(mediaUrl + avatarFile.filename);
    } catch (error) {
      console.error('fethAvatar', error.message);
    }
  };

  useEffect(() => {
    fetchAvatar();
  }, []);

  console.log('Profile', isLoggedIn);

  const logOut = async () => {
    try {
      setIsLoggedIn(false);
      await AsyncStorage.clear();
    } catch (error) {
      console.error('Profile - logout', error);
    }
  };

  return (
    <View style={styles.container}>
      <Card.Title style={styles.title}>{user.username}</Card.Title>
      <Card.Image style={styles.img} source={{uri: avatar}}/>
      <Avatar
        icon={{name: 'contact-mail', type: 'material'}}
      />
      <Text style={styles.email}> {user.email}</Text>
      <Icon name="person" style={styles.icon}
      />
      <Text style={styles.text}>
        User: {user.username} (id: {user.user_id})
      </Text>
      <View style={styles.btn}>
        <Button title="Logout" onPress={logOut}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  CardImg: {
    backgroundColor: '#2b2e3f',
  },
  avatar: {
    marginTop: 10,
  },
  userData: {
    backgroundColor: '#2b2e3f',
  },
  container: {
    backgroundColor: '#2b2e3f',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    backgroundColor: '#2b2e3f',
    color: '#c7fe61',
    fontSize: 35,
  },
  img: {
    width: 200,
    height: 200,
  },
  text: {
    color: 'white',
    fontSize: 20,
  },
  email: {
    color: 'white',
    fontSize: 20,
    marginBottom: 20,
  },
  btn: {
    marginTop: 20,
    color: 'white',
    width: 200,
  },
  icon: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 5,
  },

});

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
