const validation = {
    nome: {
        valueMissing: "O campo de nome não pode estar vazio.",
        patternMismatch: "Por favor, preencha um nome válido.",
    },
    apelido: {
        valueMissing: "O campo apelido não pode estar vazio.",
        patternMismatch: "Por favor, preencha um apelido válido.",
    },
    email: {
        valueMissing: "O campo de e-mail não pode estar vazio.",
        typeMismatch: "Por favor, preencha um email válido.",
        tooShort: "Por favor, preencha um e-mail válido."
    },
    senha: {
        valueMissing: "O campo de senha não pode estar vazio.",
        typeMismatchNumb: "A senha deve ter no minimo 1 numero",
        typeMismatchMinusc: "A senha deve ter no minimo 1 letras minúsculas",
        typeMismatchMaiusc: "A senha deve ter no minimo 1 letras maiúsculas",
        typeMismatchCarac: "A senha deve ter no minimo 8 caracteres",
        typeMismatchCaracEspec: "A senha deve ter no minimo 1 caracteres especial",
        tooShort: "Verifique a senha, o minimo é de 8 caracteres !."
    },
    confirmarSenha: {
        valueMissing: "O campo de senha não pode estar vazio.",
        typeMismatch: "Por favor, preencha uma senha válida.",
        tooShort: "Verifique a senha, o minimo é de 8 caracteres !."
    },
    image: {
        valueMissing: 'Por favor anexar uma foto de perfil'
    }
};

export default validation