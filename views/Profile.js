import {useContext, useEffect, useState} from 'react';
import {MainContext} from '../contexts/MainContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useTag} from '../hooks/ApiHooks';
import {mediaUrl} from '../utils/Variables';
import {Avatar, Button, Card, Icon, ListItem, Text} from '@rneui/themed';
import PropTypes from 'prop-types';

const Profile = ({navigation}) => {
  const {isLoggedIn, setIsLoggedIn, user} = useContext(MainContext);
  const [avatar, setAvatar] = useState('https://placekitten.com/640');
  const {getFilesByTag} = useTag();

  const fetchAvatar = async () => {
    try {
      const avatarArray = await getFilesByTag('avatar_' + user.user_id);
      console.log('avatarArray', user, avatarArray);
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
    <Card>
      <Card.Title>Full name: {user.full_name}</Card.Title>
      <Card.Image source={{uri: avatar}} />
      <ListItem>
        <Avatar
          icon={{name: 'contact-mail', type: 'material'}}
          containerStyle={{backgroundColor: 'darkred'}}
        />
        <Text> {user.email}</Text>
      </ListItem>
      <ListItem>
        <Icon name="person" />
        <Text>
          User: {user.username} (id: {user.user_id})
        </Text>
      </ListItem>

      <Button title="Logout" onPress={logOut} />
    </Card>
  );
};

Profile.propTypes = {
  navigation: PropTypes.object,
};

export default Profile;
