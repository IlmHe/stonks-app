import {
  FlatList,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import {useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import List from '../components/List';
import {useEffect, useState} from 'react';
import {Card} from '@rneui/themed';


const Home = ({navigation}) => {
  const {getAllUsers} = useUser();
  const [inputText, setInputText] = useState('');
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
      console.log('USERS', res.username);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    leaderboardFetch();
  }, []);

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <FlatList style={styles.list}
                data={users}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({item}) => (
                  <View style={styles.View}>
                    <Card style={styles.listItem}>
                      <Text style={styles.Text}>{item}</Text>
                    </Card>
                  </View>
                )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#2b2e3f',
    paddingTop: Platform.OS === 'android' ? 40 : 0,
  },
  list: {
    display: 'flex',
    flexDirection: 'column',
    color: '#2b2e3f',
  },
  Text: {
    fontSize: 20,
    color: 'black',
    alignSelf: 'center',

  },
  listItem: {
    borderRadius: 10,
    borderColor: 'white',
    padding: 10,
    color: '#2b2e3f',
  },
  View: {
    backgroundColor: '#2b2e3f',
  }
});

Home.propTypes = {
  navigation: PropTypes.object,
};

export default Home;
