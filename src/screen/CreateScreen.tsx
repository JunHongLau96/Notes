import React, {useState} from 'react';
import {View, StyleSheet, TextInput} from 'react-native';
import Header from '../components/Header/Header';
import images from '../assets/images';
import BottomTab from '../components/BottomTab/BottomTab';
import LinearGradient from 'react-native-linear-gradient';
import {Dropdown} from 'react-native-element-dropdown';
import Color from '../utils/Color';
import {useNavigation} from '@react-navigation/native';
import {useAppContext} from '../contexts/context';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/navigator';

const CreateScreen: React.FC = () => {
  //initialise data
  const [category, setCategory] = useState<string>('');
  const pickerItem: {index: number; label?: string; value?: string}[] = [
    {index: 1, label: 'Work and study', value: 'Work and study'},
    {index: 2, label: 'Life', value: 'Life'},
    {index: 3, label: 'Health and wellness', value: 'Health and wellness'},
  ];
  const [text, onChangeText] = useState<string>('');
  const {add, changeIndex} = useAppContext();
  type CreateScreenNavigationProp = StackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<CreateScreenNavigationProp>(); // Correctly typed navigation hook

  const handleAdd = () => {
    if (category && text) {
      add(category, text);
      navigation.navigate('Home');
      changeIndex(0); //change index to settings screen index
    }
  };

  const goBack = () => {
    navigation.goBack();
    changeIndex(0); //change index to settings screen index
  };

  return (
    <LinearGradient
      colors={[Color.BACKGROUND_PURPLE, Color.BACKGROUND_VIOLET]}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <Header
        headerText="New Note"
        imageLeft={{source: images.Back}}
        imageLeftOnPress={goBack}
      />
      <View style={styles.midContainer}>
        <Dropdown
          style={styles.picker}
          data={pickerItem}
          placeholderStyle={styles.textStyle}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder="Select Category"
          value={category}
          onChange={item => setCategory(item.value || '')}
          iconStyle={styles.iconStyle}
          selectedTextStyle={styles.textStyle}
        />
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={text}
          placeholder="Please input note content"
          placeholderTextColor={Color.WHITE}
          multiline={true}
          maxLength={200}
        />
      </View>
      <BottomTab
        type="button"
        button={{
          onPress: handleAdd,
          text: 'Save',
          style: styles.button,
        }}
      />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  midContainer: {flex: 11, padding: '5%', width: '100%'},
  picker: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
    marginVertical: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Color.BORDER_COLOR,
    padding: '4%',
  },
  pickerItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
  },
  iconStyle: {
    width: 30,
    height: 30,
    color: Color.WHITE,
  },
  textStyle: {color: Color.WHITE, fontWeight: 300},
  input: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Semi-transparent background
    marginVertical: 8,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: Color.BORDER_COLOR,
    padding: '4%',
    color: Color.WHITE,
    height: '60%',
    textAlignVertical: 'top',
    fontSize: 16,
    fontWeight: 300,
  },
  button: {
    width: '100%',
    height: 35,
    backgroundColor: Color.PINK,
    color: Color.WHITE,
    textAlign: 'center',
    borderRadius: 30,
    marginTop: '10%',
    marginBottom: '5%',
    textAlignVertical: 'center',
  },
});

export default CreateScreen;
