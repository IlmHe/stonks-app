import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Card} from '@rneui/themed';
import {CardDivider} from '@rneui/base/dist/Card/Card.Divider';

const HomeLeaderboardList = ({navigation, data}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <View style={styles.card}>
          <Text style={styles.text}>{item}</Text>
          <CardDivider/>
        </View>
      )}
    />
  );
};
HomeLeaderboardList.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
};

const styles = StyleSheet.create({
  text: {
    color: '#c7fe61',
    marginLeft: '2%',
    fontSize: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
});
export default HomeLeaderboardList;
