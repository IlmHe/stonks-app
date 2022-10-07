import {Input, Button, Text, Card} from '@rneui/themed';
import {Controller, useForm} from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import {useContext, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMedia, useTag} from '../hooks/ApiHooks';
import {Alert} from 'react-native';
import PropTypes from 'prop-types';
import {MainContext} from '../contexts/MainContext';
import {applicationTag} from '../utils/Variables';

const Upload = ({navigation}) => {
  const [mediafile, setMediafile] = useState(null);
  const [mediatype, setMediatype] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const {postMedia} = useMedia();
  const {postTag} = useTag();
  const {update, setUpdate} = useContext(MainContext);

  const {
    control,
    handleSubmit,
    setValue,
    formState: {errors},
  } = useForm({
    defaultValues: {title: '', description: ''},
  });

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    });
    console.log('file: ', result);
    if (!result.cancelled) {
      setMediafile(result.uri);
      setMediatype(result.type);
    }
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    const allItemData = {
      description: data.description,
      shortDescription: "data.shortDescription",
      age: data.age,
    };
    const filename = mediafile.split('/').pop();
    let extension = filename.split('.').pop();
    // change jpg to jpeg
    extension = extension === 'jpg' ? 'jpeg' : extension;
    formData.append('file', {
      uri: mediafile,
      name: filename,
      type: mediatype + '/' + extension,
    });
    formData.append('description', JSON.stringify(allItemData));
    console.log('formdata ', formData);
    // console.log('onSubmit formdata', formData);
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('userToken');
      const mediaResponse = await postMedia(token, formData);
      console.log('onSubmit upload', mediaResponse);
      const tag = {file_id: mediaResponse.file_id, tag: applicationTag};
      const tagResponse = await postTag(token, tag);
      console.log('onSubmit postTag', tagResponse);
      Alert.alert(mediaResponse.message, '', [
        {
          text: 'Ok',
          onPress: () => {
            resetForm();
            setUpdate(!update);
            navigation.navigate('Home');
          },
        },
      ]);
    } catch (error) {
      console.error('onSubmit upload failed', error);
      // TODO: add error user notification
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    setMediafile(null);
    setMediatype(null);
    setValue('title', '');
    setValue('description', '');
  };

  return (
    <Card>
      <Card.Image source={{uri: mediafile || 'https://placekitten.com/300'}} />
      <Controller
        control={control}
        rules={{
          required: true,
          minLength: 3,
        }}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Title"
            autoCapitalize="words"
            errorMessage={
              (errors.title?.type === 'required' && (
                <Text>This is required.</Text>
              )) ||
              (errors.title?.type === 'minLength' && <Text>Min 3 chars!</Text>)
            }
          />
        )}
        name="title"
      />
      <Controller
        control={control}
        render={({field: {onChange, onBlur, value}}) => (
          <Input
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            placeholder="Description"
          />
        )}
        name="description"
      />

      <Button title="Select media" onPress={pickImage} />
      <Button title="Reset" onPress={resetForm} />
      <Button
        title="Upload media"
        disabled={!mediafile}
        loading={isLoading}
        onPress={handleSubmit(onSubmit)}
      />
    </Card>
  );
};

Upload.propTypes = {
  navigation: PropTypes.object,
};

export default Upload;
