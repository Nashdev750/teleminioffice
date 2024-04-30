import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    details: {
        flexDirection: 'row',
        borderColor: '#000000',
        borderWidth: 0.5,
        alignItems: 'center',
        textAlign: 'center',
        height: 24, 
        flexGrow: 1
    }
})
const SchoolDetail = ({ details }) => (
    <>
        <View style={styles.deatils}>
            <Text>{details}</Text>
        </View>
    </>
);

export default SchoolDetail;