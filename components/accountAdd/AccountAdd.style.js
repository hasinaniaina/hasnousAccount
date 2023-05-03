import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        margin: 10,
        padding: 10,
        borderColor: '#EAEAEA',
        borderWidth: 1,
        borderRadius: 5,
        height: '100%',
    },

    text_input: {
        marginBottom: 15,
        marginTop: 5,
        borderColor: '#c4c4c4',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        color: '#969696',
    },

    text_input_total_earn_today: {
        marginBottom: 15,
        marginTop: 5,
        borderColor: '#c4c4c4',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        color: '#969696',
        width: 200
    },

    text_label_total_earn_today_container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent:'space-between'
    },

    text_input_disabled: {
        marginBottom: 15,
        marginTop: 5,
        borderColor: '#c4c4c4',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        color: '#000000',
        backgroundColor: '#EAE9E9'
    },

    text_input_disabled_footer: {
        marginBottom: 15,
        marginTop: 5,
        borderColor: '#c4c4c4',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        color: '#000000',
        backgroundColor: '#EAE9E9',
        width: 200
    },

    container_text_input: {
        margin: 10,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent:'center'
    },

    text_label_container: {
        width: 200,
        marginRight: 10
    },

    button_bottom_right:{
        borderColor:'#2196F3',
        borderWidth:1,
        borderRadius: 20,
        backgroundColor: '#2196F3',
        elevation: 10,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom:10,
        marginBottom: 10,
        flexDirection: 'row',
    },

    button_bottom_left: {
        borderColor:'#007AFF',
        borderWidth:1,
        borderRadius: 20,
        backgroundColor: '#007AFF',
        elevation: 5,
        paddingLeft: 30,
        paddingRight: 30,
        paddingTop: 10,
        paddingBottom:10,
        marginBottom: 10,
        flexDirection: 'row',
    },

    button_bottom_container:{
        flexDirection: 'row',
        justifyContent: 'space-between'
    },  

    button_bottom_text: {
        color: 'white',
        textAlign: 'center'
    },

    icons_button_bottom: {
        width: 15,
        height: 15,
    },

    pickedDateContainer: {
        padding: 20,
        backgroundColor: '#eee',
        borderRadius: 10,
    },

    pickedDate: {
        fontSize: 18,
        color: 'black',
        textAlign: 'center'
    },
    
    btnContainer: {
        padding: 30,
    },
    // This only works on iOS
    
    datePicker: {
    width: 320,
    height: 260,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-start',
    },
});

export default styles;
