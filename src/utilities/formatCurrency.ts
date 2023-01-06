import { isInputElement } from "react-router-dom/dist/dom";

const CURRENCY_FORMATER = new Intl.NumberFormat(undefined, { currency: "EGP", style: "currency"})
export function formatCurrency( number: number){
    return CURRENCY_FORMATER.format(number)

}