import {FlatList, StyleSheet, Text, View} from 'react-native';
import {useUser} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Leaderboard = async () => {
  const token = await AsyncStorage.getItem('userToken');
  const {getAllUsers} = useUser();
  const lleaderboardArray = ['test', 'test2', 'test3'];
  // let leaderboardArray = [];
  // try {
  // const token = await AsyncStorage.getItem('userToken');
  // const allUsers = await getAllUsers(token);
  // allUsers.forEach((user) => {
  //   leaderboardArray.push(user);
  // });
  // console.log('leaderboardArray', leaderboardArray);
  // } catch (error) {
  //   console.log('error', error);
  // }

  return (
    <FlatList style={styles.flatListStyle}
              data={getAllUsers(token)}
              renderItem={({item}) => (
                <View>
                  <Text>{item}</Text>
                </View>
              )}
    />
  );
};

const styles = StyleSheet.create({
  flatListStyle: {
    backgroundColor: '#ff0000',
    width: '100%',
  },
});

export default Leaderboard;
