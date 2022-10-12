import {FlatList, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {CardDivider} from '@rneui/base/dist/Card/Card.Divider';

const LeaderboardList = ({navigation, data}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Text onPress={() => {
            navigation.navigate('UserView', item);
          }} style={styles.text}>{item}<View style={styles.test}><Text
            style={styles.XP}>  XP</Text></View></Text>
          <CardDivider style={styles.divider}/>
        </View>
      )}
    />
  );
};


LeaderboardList.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
};

const styles = StyleSheet.create({
  text: {
    color: '#c7fe61',
    marginLeft: '10%',
    fontSize: 20,
    fontWeight: 'bold',
  },
  test: {
    display: 'flex',
  },
  XP: {
    color: '#c7fe61',
    fontSize: 20,
    fontWeight: 'bold',
  },
  card: {
    display: 'flex',
    padding: 10,

  },
  divider: {
    width: '80%',
    alignSelf: 'center',
    paddingTop: 10,
  },
});
export default LeaderboardList;
