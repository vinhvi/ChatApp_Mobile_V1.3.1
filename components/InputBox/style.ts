import { StyleSheet } from 'react-native';
import Colors from '../../constants/Colors';
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
    },
    mainContainer: {
        flexDirection: 'row',
        backgroundColor: 'white',
        padding: 10,
        margin: 10,
        borderRadius: 25,
        marginRight: 10,
        flex: 1,
        alignItems:'flex-end',
    },
    textInput: {
        flex: 1,
        marginHorizontal: 10,
        
    },
    icon: {
        marginHorizontal: 5,
    },
    buttonContainer: {
        backgroundColor: Colors.light.tint,
        borderRadius: 25,
        marginTop: 10,
        marginRight:5,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },


})
export default styles;