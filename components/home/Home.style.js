import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container_table: {
        marginTop: 10,
        marginBottom: 10,
        borderColor: '#EAEAEA',
        borderWidth: 1,
        height: 300,
        borderRadius: 5,
        flex: 1,
        overflow:"hidden"
    },

    table_row: {
        flexDirection: "row",
        justifyContent: "space-around",
        borderBottomColor: '#EAEAEA',
        borderBottomWidth: 1,
    },

    table_cell: {
        width: "20%",
        padding: 10,
    },

    table_cell_date_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        flexWrap: "wrap"
    },

    table_cell_action: {
        justifyContent:"center",
        alignItems: 'center',
        width: 10
    },  

    table_cell_title: {
        color: 'grey',
    },

    table_cell_text: {
        textAlign: 'center'
    },

    table_cell_td: {
        fontSize: 10
    },

    edit_ligne: {
        height: 20,
        width: 20,
    },

    calendar: {
        height: 15,
        width: 15
    },

    total_benef: {
        fontWeight: 'bold',
    },

    button_bottom_right:{
        borderColor:'#2196F3',
        borderWidth:1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom:10,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: '#2196F3',
        elevation: 5,
        flexDirection: 'row',
    },

    button_bottom_left: {
        borderColor:'#007AFF',
        borderWidth:1,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom:10,
        marginBottom: 10,
        borderRadius: 20,
        backgroundColor: '#007AFF',
        elevation: 5,
        flexDirection: 'row',
    },

    button_bottom_container:{
        padding: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },  

    button_bottom_text: {
        color: 'white',
        textAlign: 'center'
    },

    icons_button_bottom: {
        width: 15,
        height: 15,
        marginRight: 5
    },

    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    modalContainer: {
        width: '80%',
        backgroundColor: '#FFFFFF',
        paddingHorizontal: 20,
        paddingVertical: 30,
        borderRadius: 20,
        elevation: 20
    },
    modalHeader: {
        width: '100%',
    },

    modalInput: {
        width: '100%',
        flexDirection: 'row',
        marginBottom: 15,
        marginTop: 5,
        borderColor: '#c4c4c4',
        borderWidth: 1,
        borderRadius: 5,
        padding: 8,
        color: '#969696'
    }
});

export default styles;
