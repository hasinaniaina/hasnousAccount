import {createDatabase} from '../../db/database';

const db = createDatabase();

const getListProducts = async () => {
    return  new Promise((resolve, reject) => {
        db.transaction (tx => {
            tx.executeSql('SELECT * FROM products',
                [],
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
                        resolve(result);
                    }
                    
                },
                (txObj, error) => {
                     reject('error');
                }
            )
        });
    });
}

const delete_line = (id) => {
    return  new Promise((resolve, reject) => {
        db.transaction (tx => {
            tx.executeSql('DELETE FROM products WHERE id=?',
                [id],
                (txObj, resultSet) => {
                    return resolve('Ok');
                },
                (txObj, error) => {
                    return reject(error);
                }
            )
        });
    });
}



// export default ListProducts;
exports.getListProducts =  getListProducts;
exports.delete_line     =  delete_line;