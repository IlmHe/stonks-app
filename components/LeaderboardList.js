import {FlatList, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {Card} from '@rneui/themed';

const LeaderboardList = ({navigation, data}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <Card style={styles.card}>
          <Text onPress={() => {
            navigation.navigate('User', item);
          }} style={styles.text}>{item}</Text>
        </Card>
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

  },
  card: {
    display: 'flex',
    flexDirection: 'column',
  },
});
export default LeaderboardList;
