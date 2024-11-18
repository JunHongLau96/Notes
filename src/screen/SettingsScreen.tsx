import React, {useState} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import Header from '../components/Header/Header';
import images from '../assets/images';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../utils/Color';
import {useNavigation, NavigationProp} from '@react-navigation/native';
import ListItem from '../components/ListItem/ListItem';
import {RootStackParamList} from '../navigation/navigator';
import {useAppContext} from '../contexts/context';
import BottomTab from '../components/BottomTab/BottomTab';
import Toast from '../components/Toast/Toast';

const SettingsScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const settings = [
    {
      imageLeft: images.Online,
      title: 'Online Customer',
      imageRight: images.Arrow,
    },
    {imageLeft: images.User, title: 'User Agreement', imageRight: images.Arrow},
    {
      imageLeft: images.Privacy,
      title: 'Privacy Policy',
      imageRight: images.Arrow,
    },
    {imageLeft: images.Info, title: 'About Us', imageRight: images.Arrow},
  ];

  const [toastVisible, setToastVisible] = useState(false);

  const showToast = () => {
    setToastVisible(true);
  };

  const {deleteAll, changeIndex} = useAppContext();

  const clear = () => {
    showToast();
    deleteAll();
  };

  const goBack = () => {
    navigation.goBack();
    changeIndex(1);
  };

  return (
    <LinearGradient
      colors={[Color.BACKGROUND_VIOLET, Color.BACKGROUND_PURPLE]}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <Header
        headerText="Settings"
        imageLeft={{source: images.Back}}
        imageLeftOnPress={goBack}
      />
      <View style={styles.list}>
        <Toast
          message="All notes have been cleared"
          visible={toastVisible}
          duration={3000}
          onClose={() => setToastVisible(false)} // Hide toast after duration
        />
        <FlatList
          data={settings}
          keyExtractor={(item, index) => `${item.title}-${index}`}
          renderItem={({item}) => (
            <ListItem
              imageLeft={item.imageLeft}
              item={item.title}
              imageRight={item.imageRight}
            />
          )}
        />
      </View>
      <BottomTab
        type="button"
        button={{
          onPress: clear,
          text: 'Delete',
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
  list: {flex: 11, padding: '5%', width: '100%'},
});

export default SettingsScreen;
