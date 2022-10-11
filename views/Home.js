import {
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {CardDivider} from '@rneui/base/dist/Card/Card.Divider';
import HomeLeaderboardList from '../components/HomeLeaderboardList';


const Home = ({navigation}) => {
  const {getAllUsers} = useUser();
  const [users, setUsers] = useState({
    email: '',
    user_id: '',
    username: '',
  });
  const leaderboardFetch = async () => {
    const token = await AsyncStorage.getItem('userToken');
    try {
      const res = await getAllUsers(token);
      setUsers(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    leaderboardFetch();
  }, []);

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <View style={styles.portfolio}>
        <Text>PORTFOLIO</Text>
      </View>
      <CardDivider />
      <HomeLeaderboardList navigation={navigation} data={users} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  portfolio: {
    height: '50%',
  },
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#2b2e3f',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
    justifyContent: 'space-between',
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    color: '#2b2e3f',
    maxHeight: '50%',
  },
  Text: {
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
  },
  cardItem: {
  },
  View: {
    display: 'flex',
    alignContent: 'flex-end',
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
