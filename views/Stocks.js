import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {useStockApi} from '../hooks/ApiHooks';
import {useEffect} from 'react';

const Stocks = ({navigation}) => {
  const {getCompanies} = useStockApi();

  const fetchCompanies = () => {
    try {
      getCompanies();
    } catch (error) {
      console.log('error with fetching firms', error.message);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Text>stocks</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});

Stocks.propTypes = {
  navigation: PropTypes.object,
};

export default Stocks;
