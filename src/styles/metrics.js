import { Dimensions } from 'react-native';

const { height, width } = Dimensions.get('window');

export default {
  baseMargin: 10,
  basePadding: 20,
  baseRadius: 3,

  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
}
