import {StyleSheet, SafeAreaView, Text} from 'react-native';
import {useUser} from '../hooks/ApiHooks';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import Stock from './Stock';


const User = (route) => {
  const item = route.params;
  console.log('ITEM ', item);
  const {getAllUsers} = useUser();

  const parseUser = async () => {
    try {
      const res = await getAllUsers(item['1. symbol']);

      return (
        <SafeAreaView style={styles.container}>
          <Text>we in this piece</Text>
          <Text style={styles.title}>{item}</Text>
        </SafeAreaView>
      );
    } catch (error) {
      console.log("PARSE ERROR", error);
    }
    ;
  };
  useEffect(() => {
    parseUser();
  }, []);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 40,
  },
});

Stock.propTypes = {
  navigation: PropTypes.object,
  route: PropTypes.object,
};

export default User;
