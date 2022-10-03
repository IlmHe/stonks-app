import {Platform, SafeAreaView, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {useStockApi} from '../hooks/ApiHooks';
import {useEffect, useState} from 'react';
import List from '../components/List';
import {Input} from '@rneui/themed';

const Stocks = ({navigation}) => {
  const {getCompanies} = useStockApi();
  const [inputText, setInputText] = useState('A');
  const [companiesArray, setCompaniesArray] = useState([]);

  const fetchFirms = async () => {
    try {
      const res = await getCompanies(inputText);

      setCompaniesArray(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchFirms();
  }, []);

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Input
        placeholder="Example: AAPL"
        onChangeText={(text) => setInputText(text)}
        onSubmitEditing={fetchFirms}
      />
      <List navigation={navigation} data={companiesArray} />
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
