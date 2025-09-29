import { Product } from "../Model/Product";
import { v4 as uuidv4 } from "uuid";


class ProductRepository{

    private db: Product[] = [
    {
        "id": "3a6d9d7f-2b1b-4f61-8f52-c5db671c95e2",
        "name": "Mesa de Jantar Retangular",
        "unitPrice": 899.90,
        "qtd": 10,
        "width": 90,
        "height": 75,
        "length": 180,
        "color": ["wood", "black", "white"],
        "weight": 48.5,
        "material": "madeira maciça"
    },
    {
        "id": "b17f6820-8cfa-4b23-b0a2-f4fa44dd10fc",
        "name": "Poltrona Reclinável",
        "unitPrice": 1299.99,
        "qtd": 5,
        "width": 85,
        "height": 105,
        "length": 90,
        "color": ["gray", "blue", "beige"],
        "weight": 34.2,
        "material": "tecido e estrutura de aço"
    },
    {
        "id": "c4a0d4f3-5c8e-49df-91bb-3d6a9344db99",
        "name": "Estante Modular",
        "unitPrice": 649.50,
        "qtd": 8,
        "width": 120,
        "height": 190,
        "length": 35,
        "color": ["white", "oak", "black"],
        "weight": 42.7,
        "material": "MDF laminado"
    },
    {
        "id": "fa865f3d-7e44-4bc2-a41c-d5a60ed4cf50",
        "name": "Luminária de Teto Industrial",
        "unitPrice": 299.00,
        "qtd": 20,
        "width": 40,
        "height": 35,
        "length": 40,
        "color": ["black", "copper", "white"],
        "weight": 3.1,
        "material": "metal"
    },
    {
        "id": "9f3d94a1-3766-404f-9c50-38e0a2a671db",
        "name": "Espelho Decorativo Redondo",
        "unitPrice": 189.90,
        "qtd": 15,
        "width": 70,
        "height": 2,
        "length": 70,
        "color": ["silver", "gold", "black"],
        "weight": 5.8,
        "material": "vidro e moldura metálica"
    }
]

    getAll(): Product[]{
        return this.db;
    }

    getById(id: string): Product{
        const foundProduct: Product[] | undefined = this.db.filter((item: Product) => {
            return item.id === id;
        });
        return foundProduct[0];
    }

    getByName(name: string): Product[]{
        const foundProduct: Product[] | undefined = this.db.filter((item: Product) => {
            return item.name.includes(name);
        });
        return foundProduct;
    }

    getByPrice(min: number, max: number): Product[]{
        const foundProduct: Product[] | undefined = this.db.filter((item: Product) => {
            return min <= item.unitPrice && max >= item.unitPrice;
        });
        return foundProduct;
    }

    getByColor(color: string): Product[]{
        const foundProduct: Product[] | undefined = this.db.filter((item: Product) => {
            return item.color.includes(color);
        });
        return foundProduct;
    }

    getByMaterial(material: string): Product[]{
        const foundProduct: Product[] | undefined = this.db.filter((item: Product) => {
            return item.material.includes(material);
        });
        return foundProduct;
    }

    addProduct(product: Product | undefined): string{
        if(product){
            const url = require("url");
            product.id = uuidv4();
            this.db.push(product);
            
            return url.parse(`http://localhost:3000/produto/${product.id}`);
        }

        return "Não foi possível realizar o cadastro";
    }

    updateProduct(id: string, product: Product): string{
        const foundProduct: Product = this.getById(id);
        
        if(foundProduct){
            const url = require("url");
            product.id = uuidv4();

            const productIndex = this.db.indexOf(foundProduct);
            this.db.splice(productIndex);

            product.id = foundProduct.id;+
            this.db.push(product);
            
            return url.parse(`http://localhost:3000/produto/${id}`);
        }

        return `Producto ${id} não enontrado`;
    }

    deleteProduct(id: string): string{
        const product: Product = this.getById(id);
        if(product){
            const productIndex = this.db.indexOf(product);
            this.db.splice(productIndex);
            return `Produto ${product.name} removido com sucesso!`;
        }
        
        return `Produto ${id} não encontrado!`;
    }

}

export default ProductRepository;