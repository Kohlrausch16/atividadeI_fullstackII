import yup, {array, number, object, string} from 'yup';

export const productValidator = object().shape({
    name: string().required("Nome do produto não informado!"),
    unitPrice: number().required("Preço do produto não informado!").min(0),
    qtd: number().required("Quantidade do produto não informada!").min(0),
    width: number().required("Profundidade do produto não informada!").min(0),
    height: number().required("Altura do produto não informada!").min(0),
    length: number().required("Largura do produto não informada!").min(0),
    color: string().nullable(),
    weight: number().required("Peso do produto não informado!").min(0),
    material: string().required("Material do produto não informado!")
});