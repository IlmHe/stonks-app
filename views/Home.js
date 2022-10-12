import {
  Button, Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useContext, useEffect, useState} from 'react';
import {CardDivider} from '@rneui/base/dist/Card/Card.Divider';
import HomeLeaderboardList from '../components/HomeLeaderboardList';
import {MainContext} from '../contexts/MainContext';
import {vh, vw} from 'react-native-expo-viewport-units';


const Home = ({navigation}) => {
  const {user} = useContext(MainContext);
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
      const userss = [];
      for (let i = 0; i < res.length; i++) {
        userss[i] = res[i].username;
      }
      setUsers(userss);
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
        <Text style={styles.username}>Welcome back, {user.username}</Text>
        <Text style={styles.profit}>Profit today:</Text>
        <Text style={styles.profitNmr}>-26.53$</Text>
        <Image source={{uri:"https://i.imgur.com/Zik99SY.png"}} style={styles.image} />
      </View>
      <CardDivider/>
      <Button title={'Open leaderboard'} color='#2b2e3f' onPress={() => {
        navigation.navigate('Leaderboard');
      }}></Button>
      <HomeLeaderboardList navigation={navigation} data={users}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  portfolio: {
    display: 'flex',
    height: '50%',
    alignItems: 'center',
    marginTop: 50,
  },
  image: {
    marginTop: 10,
    width: vw(60),
    height: vh(30),
  },
  profitNmr: {
    marginTop: 10,
    color: '#b90000',
  },
  profit: {
    fontSize: 20,
    marginTop: 20,
    color: '#c7fe61',
  },
  username: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#c7fe61',
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
    maxHeight: '40%',
  },
  Text: {
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',
  },
  cardItem: {},
  View: {
    display: 'flex',
    alignContent: 'flex-end',
  },
});

Home.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default Home;
