import { Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    title: {
        flexDirection: 'row',
        borderColor: '#000000',
        borderWidth: 0.5,
        alignItems: 'center',
        textAlign: 'center',
        height: 24,
        fontStyle: 'bold',
        flexGrow: 1
    }
})
const SchoolTitle = ({ title }) => (
    <>
        <View style={styles.title}>
            <Text>{title}</Text>
        </View> 
    </>
);

export default SchoolTitle;