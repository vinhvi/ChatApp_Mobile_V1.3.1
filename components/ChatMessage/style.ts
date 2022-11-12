import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
const styles = StyleSheet.create({
    container: {
        padding: 10,
    },
    messageBox: {
        backgroundColor: 'gray',
        marginRight: 50,
        borderRadius: 20,
        padding: 5,
    
    },
    name: {
        color: Colors.light.tint,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    message: {
        padding:10,
    },
    time: {
        alignSelf: 'flex-end',
    },

})
export default styles;