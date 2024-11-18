import React from 'react';
import {View, StyleSheet} from 'react-native';
import Colors from '../../utils/Color';
import images from '../../assets/images';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import TouchableComponent from '../TouchableComponent/TouchableComponent';
import {useAppContext} from '../../contexts/context';

// Define your screen names in the navigation
type RootStackParamList = {
  Home: undefined;
  Create: undefined;
  Summary: undefined;
};

type BottomTabNavigationProp = StackNavigationProp<RootStackParamList>;

// Define the BottomTabProps interface
interface BottomTabProps {
  type: string;
  active?: number;
  onPress?: any;
  button?: any;
}

const BottomTab: React.FC<BottomTabProps> = ({type, button}) => {
  // Define the list of images based on type
  let imageList: {
    active?: any;
    inactive?: any;
    screen: keyof RootStackParamList;
  }[] = [];

  const {changeIndex, index} = useAppContext();

  switch (type) {
    case 'bottomTab': //declare all the images and screen navigation for each tab
      imageList = [
        {active: images.Home, inactive: images.Home_Inactive, screen: 'Home'},
        {active: images.Create, inactive: images.Create, screen: 'Create'},
        {
          active: images.Summary,
          inactive: images.Summary_Inactive,
          screen: 'Summary',
        },
      ];
      break;
    case 'button':
      break;
    default:
      imageList = [];
      break;
  }

  const navigation = useNavigation<BottomTabNavigationProp>(); // Correctly typed navigation hook

  const navigateScreen = (screen: keyof RootStackParamList, index: number) => {
    changeIndex(index); //set index to current screen
    navigation.navigate(screen); //navigate to the screen
  };

  return (
    <View style={styles.container}>
      {type === 'button' && (
        <TouchableComponent
          onPress={button?.onPress}
          text={button?.text}
          style={button.style}
        />
      )}
      {type === 'bottomTab' &&
        imageList?.map((image, i) => (
          <TouchableComponent
            key={i}
            onPress={() => navigateScreen(image.screen, i)}
            image={{
              source: i === index ? image.active : image.inactive, //show different images based on the current screen
              style: styles.icon,
            }}
          />
        ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: Colors.DARK_PURPLE,
    justifyContent: 'space-around',
    paddingHorizontal: '10%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingVertical: '4%',
    width: '100%',
    alignItems: 'center',
  },
  icon: {
    resizeMode: 'contain',
  },
});

export default BottomTab;
