import yup, {array, number, object, string} from 'yup';

export const userValidator = object().shape({
    name: string().required("Nome do produto não informado!"),
    password: string().required("Senha não informada!"),
    role: string().required("Cargo não informado")
});