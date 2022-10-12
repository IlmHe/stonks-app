import {Button, FlatList, StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {Card} from '@rneui/themed';

const HomeLeaderboardList = ({navigation, data}) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <Card style={styles.card}>
          <Text style={styles.text}>{item}</Text>
        </Card>
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
  color: 'black',
  },
  card: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
  },
});
export default HomeLeaderboardList;
