import {createDatabase} from '../../db/database';
const db = createDatabase();

const addProduct = (product, price, quantity, container_quantity) => {
    if (product && price && quantity && container_quantity) {
        db.transaction(tx => {
            let price_float              = parseFloat(price);
            let quantity_float           = parseFloat(quantity);
            let container_quantity_float = parseFloat(container_quantity);
            
            tx.executeSql('INSERT INTO products (name, price, used_quantity, container_weight) VALUES (?, ?, ?, ?)',
                [product, price_float, quantity_float, container_quantity_float],
                (txObj, resultSet) => {
                    return resultSet;
                }, 
                (txObj, error) => {
                    console.log(error)
                }
            );
        })
    } else {
        showAlert(product, price, quantity, container_quantity);
        return "NOK";
    }
}

const saveProduct = (id, product, price, quantity, container_quantity) => {
    if (product && price && quantity && container_quantity) {
        try {   
            db.transaction(tx => {
                let price_float              = parseFloat(price);
                let quantity_float           = parseFloat(quantity);
                let container_quantity_float = parseFloat(container_quantity);
                
                tx.executeSql('UPDATE products SET name=?, price=?, used_quantity=?, container_weight=? WHERE id=?',
                    [product, price_float, quantity_float, container_quantity_float, id],
                    (txObj, resultSet) => {
                        return resultSet;
                    }, 
                    (txObj, error) => {
                        console.log(error)
                    }
                );
            })
        } catch (error) {
            console.log(error)
        }
    } else {
            showAlert(product, price, quantity, container_quantity);
            return "NOK";
    }   
}


const showAlert = (product, price, quantity, container_quantity) => {
    if (!product) {
        alert('Le champ "Produits" ne doit pas être vide');
    } else if (!price) {
        alert('Le champ "Prix par litre ou kg ou autre" ne doit pas être vide');

    } else if (!quantity) {
        alert('Le champ "Quantité utilisée chaque jour" ne doit pas être vide');

    } else if (!container_quantity) {
        alert('Le champ "Poids du conteneur" ne doit pas être vide');
    }
}

const getListProducts = async (id) => {
    return new Promise((resolve, reject) => {
        db.transaction (tx => {
            tx.executeSql('SELECT * FROM products WHERE id = ?',
                [id],
                (txObj, resultSet) => {
                    let len = resultSet.rows.length;  
                    if (len > 0) {
                        let result = [];
                        for (let i = 0; i < len; i++) {
                            let items = resultSet.rows.item(i);
                            result.push({
                                id:items.id,
                                name: items.name,
                                price: items.price,
                                used_quantity: items.used_quantity,
                                container_weight: items.container_weight
                            });
                        }

                       return resolve(result);
                    }
                    
                },
                (txObj, error) => {
                     return reject('error');
                }
            )
        });
    });
}


exports.addProduct      = addProduct;
exports.getListProducts = getListProducts;
exports.saveProduct     = saveProduct;