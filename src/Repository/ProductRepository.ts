const db = require('../../InMemoryDB.json');

class ProductRepository{

    getAll(){
        return db;
    }

}

export default ProductRepository;