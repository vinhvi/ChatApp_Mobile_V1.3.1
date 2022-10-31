import { StyleSheet } from 'react-native';

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        padding: 10,
    },
    leftContainer: {
        flexDirection: 'row',
    },
    midContainer: {
        justifyContent: 'space-between',
    },
    avatar: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 10,
    },
    username: {
        fontWeight: 'bold',
        fontSize: 17,
    },
    lastMessage: {
        fontSize: 16,
        color: 'gray',
        flexWrap:'wrap',
    },
    time: {
        fontSize: 14,
        color: 'gray',
    }
});
export default style;