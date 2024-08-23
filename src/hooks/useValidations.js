/* eslint-disable no-unused-vars */
import validation from "utils/validations";
import { regex } from "utils/errorsRegexPassword";

/* hook personalizado de validação do formulario de cadastro de usuário */
export const useValidations = () => {
    const formValue = ['nome', 'apelido', 'email', 'senha', 'confirmarSenha', 'image'];

    const validationsEmptPass = (valuesForm, valuesErrors) => {
        const typeArrayErrors = [
            'typeMismatchCaracEspec',
            'typeMismatchNumb',
            'typeMismatchMinusc',
            'typeMismatchMaiusc',
            'typeMismatchCarac',
        ]

        const errors = {};

        /* Verificar mensagem de erros de campo em branco */
        formValue.forEach(name => {
            if (!valuesForm.senha) {
                if (!!valuesForm[name]) errors[name] = null;
                if (!valuesForm[name]) errors[name] = valuesErrors[name];
            }
        })

        /*  verificar erros de validação de senha */
        typeArrayErrors.forEach(erro => {
            if (!!valuesForm.senha) {
                if (!regex[erro].test(valuesForm.senha)) errors['senha'] = validation['senha'][erro];
            }
        })

        return errors;
    };

    const validate = (values) => {
        const errors = {};

        /* Verificar a validação de senha e confirmação */
        if (values.senha !== values.confirmarSenha) {
            errors['confirmarSenha'] = 'As senhas não são iguais. tente novamente';
        };

        /* Verificar os campos obrigatório */
        formValue.forEach(name => {
            if (!values[name]) {
                errors[name] = validation[name]['valueMissing'];
            }
            if (!regex.regexEmail.test(values['email'])) {
                errors['email'] = validation['email']['typeMismatch'];
            }
        });

        return errors;

    };

    return {
        validate,
        validationsEmptPass,
    }
}