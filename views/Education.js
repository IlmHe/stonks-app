import {Platform, SafeAreaView, StyleSheet, Text} from 'react-native';
import PropTypes from 'prop-types';

const Education = (props) => {
  const {navigation} = props;
  return (
    <SafeAreaView style={styles.droidSafeArea}>
      <Text>education</Text>
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

Education.propTypes = {
  navigation: PropTypes.object,
};

export default Education;
