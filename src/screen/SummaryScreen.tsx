import React from 'react';
import {View, Text, StyleSheet, SectionList, Image} from 'react-native';
import images from '../assets/images';
import BottomTab from '../components/BottomTab/BottomTab';
import LinearGradient from 'react-native-linear-gradient';
import Color from '../utils/Color';
import {useAppContext} from '../contexts/context';
import IconText from '../components/IconText/IconText';
import TouchableComponent from '../components/TouchableComponent/TouchableComponent';
import ListItem from '../components/ListItem/ListItem';

const SummaryScreen: React.FC = () => {
  const {data} = useAppContext();

  const loadImage = (title: string) => {
    if (title === 'Work and study') {
      return images.WorkSummary;
    } else if (title === 'Life') {
      return images.HomeSummary;
    } else if (title === 'Health and wellness') {
      return images.HealthSummary;
    }
  };

  return (
    <LinearGradient
      colors={[Color.BACKGROUND_PURPLE, Color.BACKGROUND_VIOLET]}
      style={styles.container}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}>
      <View style={styles.title}>
        <View style={styles.headerBlock}>
          <Text style={styles.headerText}>Summary</Text>
        </View>
        <View style={styles.imageBlock}>
          <Image source={images.Bot} />
        </View>
      </View>
      <View style={styles.content}>
        <SectionList
          sections={data}
          keyExtractor={(item, index) => item + index}
          renderItem={({}) => null}
          renderSectionHeader={({section: {title, data}}) => {
            const recordCount = data.length; // Get the number of records in the section
            return (
              <>
                <View style={styles.section}>
                  <View style={styles.flex}>
                    <IconText
                      image={loadImage(title)}
                      text={title}
                      headerView={{flex: 3}}
                    />
                  </View>
                  <TouchableComponent
                    onPress={() => {}}
                    text="Detail"
                    style={styles.button}
                  />
                </View>
                <ListItem
                  item={`This topic has a total of ${recordCount} records.`}
                  textStyle={styles.textStyle}
                />
              </>
            );
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
  },
  title: {flex: 3, width: '100%', flexDirection: 'row'},
  headerText: {
    color: Color.WHITE,
    fontSize: 22,
  },
  headerBlock: {
    flex: 1,
    paddingLeft: '5%',
    justifyContent: 'center',
  },
  imageBlock: {
    flex: 1.5,
  },
  button: {
    width: '100%',
    backgroundColor: Color.PINK,
    color: Color.WHITE,
    textAlign: 'center',
    borderRadius: 20,
    marginTop: '10%',
    marginBottom: '5%',
    textAlignVertical: 'center',
    height: 30,
  },
  description: {
    color: Color.WHITE,
  },
  itemView: {
    marginVertical: '3%',
    marginLeft: '3%',
    borderRadius: 20,
    height: 60,
    justifyContent: 'center',
    borderColor: Color.BORDER_COLOR,
    borderWidth: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingLeft: '3%',
  },
  content: {flex: 12, width: '100%', padding: '6%'},
  section: {
    flexDirection: 'row',
    marginBottom: '3%',
    alignItems: 'center',
  },
  flex: {
    flex: 5,
  },
  textStyle: {color: Color.WHITE, fontSize: 14, fontWeight: 200},
});

export default SummaryScreen;
