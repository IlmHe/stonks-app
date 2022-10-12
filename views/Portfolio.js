import {
  Dimensions,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import PropTypes from 'prop-types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useEffect, useState} from 'react';
import {useTag} from '../hooks/ApiHooks';
import PortfolioList from '../components/PortfolioList';

const Portfolio = ({navigation}) => {
  const {getFilesByTag} = useTag();
  const [stocks, setStocks] = useState([{}]);

  const getFiles = async () => {
    const userId = await AsyncStorage.getItem('user_id');

    const res = await getFilesByTag(userId);

    setStocks([res]);
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <View style={{alignContent: 'center', marginBottom: 5}}>
        <Text
          style={{
            color: 'white',
            fontWeight: 'bold',
            fontSize: 23,
            alignSelf: 'center',
            padding: 20,
          }}
        >
          Your Portfolio
        </Text>
      </View>
      <PortfolioList navigation={navigation} data={stocks} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  droidSafeArea: {
    flex: 1,
    backgroundColor: '#2b2e3f',
    paddingTop: Platform.OS === 'android' ? 30 : 0,
  },
});

Portfolio.propTypes = {
  navigation: PropTypes.object,
};

export default Portfolio;
