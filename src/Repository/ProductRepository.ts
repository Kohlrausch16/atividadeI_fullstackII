import { Product } from "../Model/Product";

class ProductRepository{

    private db = require('../../dbConfig');

    async getAll(): Promise<Product[]>{
        return await this.db.exec('SELECT * FROM product');
    }

    async getById(id: string): Promise<Product>{
        const foundProduct: Product[] = await this.db.exec("SELECT * FROM product WHERE id = ?", [id]); 

        if(foundProduct.length < 1)
            throw new Error(`Produto ${id} não encontrado`);

        return foundProduct[0];
    }

    async getByName(name: string): Promise<Product>{
        const foundProduct: Product[] = await this.db.exec("SELECT * FROM product WHERE name = ?", [name]); 

        if(foundProduct.length < 1)
            throw new Error(`Produto ${name} não encontrado`);

        return foundProduct[0];
    }

    async getByPrice(min: number, max: number): Promise<Product[]>{
        const foundProducts: Product[] = await this.db.exec("SELECT * FROM product WHERE price >= ? and price <= ?", [min, max]); 
        return foundProducts;
    }

    async getByMaterial(material: string): Promise<Product[]>{
        const foundProducts: Product[] = await this.db.exec("SELECT * FROM product WHERE material = ?", [material]); 
        return foundProducts;
    }

    async addProduct(product: Product): Promise<Product>{
        await this.db.exec('INSERT INTO product (id, name, unitPrice, qtd, width, height, length, color, weight, material) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)', [product.id, product.name, product.unitPrice, product.qtd, product.width, product.height, product.length, product.color, product.weight, product.material]);

        return await this.getById(product.id);
    }

    async updateProduct(id: string, product: Product): Promise<Product>{
        console.log(id, ' - ', product);
        await this.db.exec('UPDATE product SET name = ?, unitPrice = ?, qtd = ?, width = ?, height = ?, length = ?, color = ?, weight = ?, material = ? WHERE id = ?', [product.name, product.unitPrice, product.qtd, product.width, product.height, product.length, product.color, product.weight, product.material, id]);

        return await this.getById(id);
    }

    async deleteProduct(id: string): Promise<string>{
        await this.getById(id);
        await this.db.exec('DELETE FROM product WHERE id = ?', [id]);
        return `Produto ${id} deletado com sucesso!`;
    }

}

export default ProductRepository;