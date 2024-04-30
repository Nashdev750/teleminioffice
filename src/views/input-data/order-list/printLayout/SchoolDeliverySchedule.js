import { Document, Text, Page, StyleSheet, View, Image } from '@react-pdf/renderer';
import SchoolTitle from './SchoolTitle'
import SchoolDetail from './SchoolDetail'

const styles = StyleSheet.create({
    page: {
        marginTop: 5,
        padding: 5,
        fontSize: 9,
        flexDirection: "column",
    },
    layout: {
        marginTop: 30,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    view: {
        fontSize: 30,
    },
    image: {
        width: 100,
        height: 100,
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    reportMunicipality: {
        fontSize: 10,
        textAlign: 'center',
        textTransform: 'uppercase',
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    titleContainer: {
        flexDirection: 'row',
        textAlign: 'center',
        alignItems: 'center',
    },
    pageNumbers: {
        flexDirection: 'row',
        position: 'absolute',
        fontSize: 7,
        bottom: 20,
        marginLeft: 60,
        left: 0,
        right: 0,
        textAlign: 'center'
    },
    reportTitle: {
        fontSize: 11,
        textAlign: 'center',
        textTransform: 'uppercase',
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

const SchoolDeliverySchedule = () => (
    <Document >
        <Page size="A4" style={styles.page}>
            <View style={styles.titleContainer}>
                <SchoolTitle title='ABINALA PRIMARY SCHOOL' />
            </View>
            <View style={styles.titleContainer}>
                <SchoolTitle title='DRY PRODUCTS' />
            </View>
            <View style={styles.titleContainer}>
                <SchoolTitle title='SCHOOL SPECIFIC DELIVERY SCHEDULE 2022/2023' />
            </View>
            <View>
                <SchoolDetail details='EMIS Number:' />
                <SchoolDetail details='700161687' />
            </View>
        </Page>
    </Document >);

export default SchoolDeliverySchedule;