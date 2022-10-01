import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';
import {useStockApi} from '../hooks/ApiHooks';

const Stocks = ({navigation}) => {
  const {companiesArray} = useStockApi();
  const {companyArray} = useStockApi();


  console.log(companyArray);

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
