import React from 'react';
import {View, StyleSheet, SectionList} from 'react-native';
import Header from '../components/Header/Header';
import images from '../assets/images';
import BottomTab from '../components/BottomTab/BottomTab';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../utils/Color';
import IconText from '../components/IconText/IconText';
import ListItem from '../components/ListItem/ListItem';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootStackParamList} from '../navigation/navigator';
import {useAppContext} from '../contexts/context';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const {data} = useAppContext();

  const loadImage = (title: string) => {
    //load image dynamically based on title
    if (title === 'Work and study') {
      return images.Work;
    } else if (title === 'Life') {
      return images.Life;
    } else if (title === 'Health and wellness') {
      return images.Health;
    }
  };

  const getTop3Item = () => {
    return data.map(section => {
      // Take the last 3 items from the section's data without modifying the original array
      const top3Items = [...section.data]
        .reverse()
        .slice(-3)
        .map(item => item.slice(0, 20)); // Limit each item to the first 20 characters;
      return {...section, data: top3Items};
    });
  };

  return (
    <LinearGradient
      colors={[Color.BACKGROUND_PURPLE, Color.BACKGROUND_VIOLET]}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <Header
        headerText="Home"
        imageRight={{source: images.Settings}}
        imageLeftOnPress={() => navigation.goBack()}
        imageRightOnPress={() => navigation.navigate('Settings')}
      />
      <View style={styles.section}>
        <IconText
          image={images.Recently_Created}
          text="Recently Created"
          textStyle={styles.text}
        />
        <SectionList
          sections={getTop3Item()} // Pass the processed data
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <ListItem item={item} imageRight={images.Arrow} />
          )}
          renderSectionHeader={({section: {title}}) => {
            if (!title) {
              return null; // If there's no title, return null
            }
            return <IconText image={loadImage(title)} text={title} />;
          }}
        />
      </View>
      <BottomTab type="bottomTab" active={0} />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  section: {
    flex: 11,
    paddingHorizontal: '5%',
    width: '100%',
  },
  text: {color: Color.WHITE, fontSize: 16, fontWeight: 300, paddingLeft: '3%'},
});

export default HomeScreen;
