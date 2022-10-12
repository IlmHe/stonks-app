
import {StyleSheet, SafeAreaView, Text} from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../hooks/ApiHooks';
import {useEffect} from 'react';
import {mediaUrl} from '../utils/Variables';
import {Avatar} from '@rneui/themed';
import {useMedia} from '../hooks/ApiHooks';

let imgVar = "";
const UserView = (userMedia) => {
  let avatarData = "";
  const {getAllUsers} = useUser();
  const {getMediaFile} = useMedia();
  const item = userMedia.route.params;

  const fetchUserData = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const res = await getAllUsers(token);
      for (let i = 0; i < res.length; i++) {
        if (res[i].username === item) {
          avatarData = await getMediaFile(res[i].user_id);
          imgVar = avatarData.thumbnails.w160;
          break;
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{item}</Text>
      <Avatar style={styles.avatar}
        source={{uri: mediaUrl + imgVar}}
        size="large"
      />
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2b2e3f',
    paddingTop: 40,
    display: 'flex',
    flexDirection: 'column',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#c7fe61',
  },
  avatar: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    paddingTop: 20,
  }
});

UserView.propTypes = {
  route: PropTypes.object,
};

export default UserView;
