import { StyleSheet } from 'react-native'
import { colors, metrics } from '../../../styles/'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: metrics.borderRadius,
    padding: metrics.basePadding,
    marginTop: metrics.baseMargin,
    alignItems: 'center',
    maxWidth: (metrics.screenWidth - 60) / 2,
  },

  avatar: {
    width: 50,
    height: 50,
  },

  title: {
    fontSize: 14,
    color: colors.darker,
    fontWeight: 'bold',
    marginTop: metrics.baseMargin,
  },
})

export default styles;
