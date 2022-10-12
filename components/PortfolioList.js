import {Alert, FlatList} from 'react-native';
import PropTypes from 'prop-types';
import {Button, ListItem} from '@rneui/themed';
import {useMedia, useTag} from '../hooks/ApiHooks';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PortfolioList = ({navigation, data}) => {
  const {deleteMedia} = useMedia();
  const {deleteTag} = useTag();

  const handleSell = async (item) => {
    try {
      const token = await AsyncStorage.getItem('userToken');

      const mediaRes = await deleteMedia(token, item.file_id);
      console.log(mediaRes);
      const tagRes = await deleteTag(token, item.tag_id);
      console.log(tagRes);
    } catch (error) {
      console.log(error.message);
    }

    Alert.alert('Your sell was succesful', '', [
      {
        text: 'OK',
      },
    ]);
  };

  return (
    <FlatList
      data={data[0]}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <ListItem containerStyle={{backgroundColor: '#2b2e3f'}} bottomDivider>
          <ListItem.Content>
            <ListItem.Title
              numberOfLines={1}
              h5
              style={{fontWeight: 'bold', color: 'white'}}
            >
              {item.title}
            </ListItem.Title>
          </ListItem.Content>

          <ListItem.Content right>
            <Button
              size="sm"
              title="SELL"
              titleStyle={{fontWeight: 'bold'}}
              buttonStyle={{backgroundColor: '#D2042D'}}
              onPress={() => handleSell(item)}
            />
          </ListItem.Content>
        </ListItem>
      )}
    />
  );
};

PortfolioList.propTypes = {
  navigation: PropTypes.object,
  data: PropTypes.object,
};

export default PortfolioList;
