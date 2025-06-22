import { StyleSheet, Text } from 'react-native'

type Props = {
  title: string
}

const QRTitle = ({title}:Props) => {
  return (
      <Text style={styles.title}>{title}</Text>
  )
}

export default QRTitle

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
})