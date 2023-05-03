import { Text, SafeAreaView, TextInput, View, ScrollView, Image, TouchableOpacity } from 'react-native'
import styles from './ProductAdd.style';
import {React, useEffect, useState } from 'react';
import icons from '../../constants/icons';
import {  Link } from 'expo-router';
import { addProduct, getListProducts, saveProduct} from './ProductAdd.controller';
import { useSearchParams, useRouter } from 'expo-router';


export default  function ProductAdd() {
  const [product, setProduct]                  = useState("");
  const [price, setPrice]                      = useState("");
  const [quantity, setQuantity]                = useState("");
  const [container_weight, setContainerWeight] = useState("");
  const {id}                                   = useSearchParams();
  const router                                 = useRouter();

  useEffect(() => {
    if (id) {
        let allData = [];
        getListProducts(id).then((result) => {
          setProduct(result[0].name);
          setPrice(result[0].price);
          setQuantity(result[0].used_quantity);
          setContainerWeight(result[0].container_weight);
        })
    }
  }, [id])

  return (
    <SafeAreaView style={{flex: 1}}>
      <ScrollView style={styles.container}>
        <SafeAreaView style={styles.container_text_input}>
          <Text>Produit</Text>
          <TextInput
            placeholder='Entrer le nom produit'
            style={styles.text_input}
            onChangeText={text => {
              setProduct(text)
            }}
            defaultValue={product}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.container_text_input}>
          <Text>Prix en Ariary par litre ou kg ou autre</Text>
          <TextInput 
            placeholder='Entrer le prix (en chiffre uniquement)'
            style={styles.text_input}
            defaultValue={price}
            onChangeText={(text) => {
              setPrice(text)
            }}
            keyboardType='numeric'
          />
        </SafeAreaView>
        <SafeAreaView style={styles.container_text_input}>
          <Text>Quantité utilisée chaque jour (en Kg/L/autre)</Text>
          <TextInput
            placeholder='Entrer la quantité du produit (en chiffre uniquement)'
            style={styles.text_input}
            onChangeText={(text) => {
              setQuantity(text)
            }}
            keyboardType='numeric'  
            defaultValue={quantity}
          />
        </SafeAreaView>
        <SafeAreaView style={styles.container_text_input}>
          <Text>Poids du recipient qui contiendra le produit (en Kg)</Text>
          <TextInput
            placeholder='Entrer la poid du recipient contenant le produit (en chiffre uniquement)'
            style={styles.text_input}
            onChangeText={(text) => {
              setContainerWeight(text)
            }}
            keyboardType='numeric'
            defaultValue={container_weight}
          />
        </SafeAreaView>
        <View style={{padding:10}}>
          <View style={styles.button_bottom_container}>
              <Link style={styles.button_bottom_right}  href={{ pathname: "/pages/productList", params: {header_title: 'liste des produits', changed: true}}}>
                  <Image 
                  source={icons.back}
                  resizeMode='cover'
                  style={styles.icons_button_bottom}
                  />  
                  <Text style={styles.button_bottom_text}>Retour</Text>
              </Link>


              <TouchableOpacity style={styles.button_bottom_left} onPress={() => {
                    if (!id) {    
                      let result = addProduct(product, price, quantity, container_weight);
                      if (result != 'NOK') {
                        setProduct('');
                        setPrice('');
                        setContainerWeight('');
                        setQuantity('');
                        alert('Ajout réussi');
                      }
                    } else {
                      let result = saveProduct(id, product, price, quantity, container_weight);
                      if (result != 'NOK') {
                        router.push('/pages/productList', {header_title: 'liste des produits'});
                      }
                    }
                  }
                }
                  >
                  <Image 
                  source={icons.save_quit}
                  resizeMode='cover'
                  style={styles.icons_button_bottom}
                  />
                  <Text style={styles.button_bottom_text}>Enregistrer</Text>
              </TouchableOpacity>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  )
}
