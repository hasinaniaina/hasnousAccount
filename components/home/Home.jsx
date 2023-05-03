import { Image, View, FlatList, Text, Button, Modal, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react';
import {  Link, useSearchParams } from 'expo-router';
import icons from '../../constants/icons'
import styles from './Home.style'
import {createTable} from '../../db/database';
import { getListRecipe, updateBenefice, getBenefice, delete_line } from './Home.controller';
import { TextInput } from 'react-native-gesture-handler';

const HomeModal = ({visible, children}) => {
  return (
    <Modal 
      transparent 
      visible={visible}
    >
      <View style={styles.modalBackground}>
        <View style={[styles.modalContainer]}>{children}</View>
      </View>
    </Modal>
  )
}

export default function Home() {  
  let [changed, setChanged]             = React.useState(false);
  let [recipe, setRecipe]               = React.useState([]);
  let [profit, setProfit]               = React.useState('');
  let [visible, setVisible]             = React.useState(false);
  let [benefice, setBenefice]           = React.useState(0);
  let [beneficeCount, setBeneficeCount] = React.useState(0);
  let {change}                          = useSearchParams();


 let getRecipe = () => {
    getListRecipe().then((list_recipe) => {
      if (list_recipe) {
        recipe = list_recipe;
      }
    });

    setChanged(false);
 }

 let calculTotalBenefice = () => {
  getBenefice().then((benefice_provisionned) => {
      let benefice_length       = benefice_provisionned.length
      let total = 0;

      for (let index = 0; index < recipe.length; index++) {
            total += parseFloat(recipe[index].profit)
      }
      total += parseFloat(benefice_provisionned[0].amount);
      setProfit(String(total.toLocaleString()));
      setRecipe(recipe);
      setBeneficeCount(benefice_length);
      setBenefice(benefice_provisionned[0].amount);
  });

  setChanged(false);
}

  useEffect(() => {
    createTable();
    getRecipe();
    calculTotalBenefice();
    setChanged(false);
  }, [change, changed]);


  return (
    <View style={{flex: 1, marginTop:10, paddingLeft: 10, paddingRight: 10}}>
      <Button 
        title='Changer le montant du bénéfice déjà provisionné'
        onPress={() => {
          setVisible(true);
        }}
      />

      <HomeModal visible={visible}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.modalHeader}>
          </View>
          <View>
            <Text style={{fontWeight: 'bold'}}>Bénéfice déjà approsionné en Ariary</Text>
            <TextInput
              style={styles.modalInput} 
              placeholder="Saisir le montant"
              onChangeText={(benef) => {
                setBenefice(benef);
              }}
              keyboardType='numeric'
              defaultValue={(benefice) ? benefice : ''} 
            />
            <Button 
              onPress={() => {
                let result = updateBenefice(benefice, beneficeCount);
                calculTotalBenefice(recipe);
                if (result == 'Ok') {
                  setVisible(false)
                }
              }}
              title="Enregistrer"
            />
            <Text></Text>
            <Button 
              onPress={() => {
                  setVisible(false)
              }}
              title="Retour"
            />
          </View>
        </View>
      </HomeModal>

      <View style={styles.container_table}>
        <View>
            <View style={styles.table_row}>
              <View style={styles.table_cell}>
                <Text style={[styles.table_cell_text, styles.table_cell_title]}>Date</Text>
              </View>
              <View style={styles.table_cell}>
                <Text style={[styles.table_cell_text, styles.table_cell_title]}>Dépenses</Text>
              </View>
              <View style={styles.table_cell}>
                <Text style={[styles.table_cell_text, styles.table_cell_title]}>Bénéfices</Text>
              </View>
              <View style={[styles.table_cell, styles.table_cell_action]}>
              </View>
            </View>

            <FlatList
                data={recipe}
                style={{height: 200}}
                renderItem={({item}) => 
                  <View style={styles.table_row}>
                    <View style={[styles.table_cell, styles.table_cell_date_container]}>
                      <Image 
                        source={icons.calendar}
                        resizeMode='cover'
                        style={styles.calendar}
                      />
                      <Text style={[styles.table_cell_text, styles.table_cell_td]}>{item.date}</Text>
                    </View>
                    <View style={styles.table_cell}>
                      <Text style={[styles.table_cell_text, styles.table_cell_td]}>{parseFloat(item.spent).toLocaleString()} Ariary</Text>
                    </View>
                    <View style={styles.table_cell}>
                      <Text style={[styles.table_cell_text, styles.table_cell_td]}>{parseFloat(item.profit).toLocaleString()} Ariary</Text>
                    </View>
                    <TouchableOpacity style={[styles.table_cell, styles.table_cell_action]} onPress={
                        () => {
                                delete_line(item.id).then((result) => {
                                  if (result == 'Ok') {
                                      setChanged(true)
                                      setRecipe("");
                                      setProfit("");
                                  }
                              })
                            }}>
                        <Image 
                            source={icons.delete_icon}
                            resizeMode='cover'
                            style={styles.delete_ligne}
                        />
                    </TouchableOpacity>
                  </View>
                }
            />
        </View>
      </View>
      <View style={{paddingLeft:10}}>
        <View>
          <Text>
              <Text style={styles.total_benef}>Total Bénéfice</Text>: {profit} Ariary
          </Text>
        </View>
        <View style={styles.button_bottom_container}>
          <Link style={styles.button_bottom_right} href={{ pathname: "/pages/productList", params: {header_title: 'liste des produits'}}}>
            <Image 
              source={icons.list}
              resizeMode='cover'
              style={styles.icons_button_bottom}
            />
            <Text style={styles.button_bottom_text}>Liste des produits</Text>
          </Link>


          <Link style={styles.button_bottom_left} href={{ pathname: "/pages/accountAdd", params: {header_title: 'Compte', rand: Math.random()} }}>
            <Image 
              source={icons.add}
              resizeMode='cover'
              style={styles.icons_button_bottom}
            />
            <Text style={styles.button_bottom_text}>Ajout Compte</Text>
          </Link>
        </View>
      </View>
    </View>
  )
}
