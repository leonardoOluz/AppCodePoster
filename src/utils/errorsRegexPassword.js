/* eslint-disable no-useless-escape */
export const regex = {
    typeMismatchNumb: /^(?=.*[0-9])/,
    typeMismatchMinusc: /^(?=.*[a-z])/,
    typeMismatchMaiusc: /^(?=.*[A-Z])/,
    typeMismatchCarac: /^([a-zA-Z0-9]{8,})/,
    typeMismatchCaracEspec: /^(?=.*[$*&@#])/,
    regexEmail: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
}
