/**
 *  @package CashMoney-NFT
*/
import { modal } from './modules/modal';
import { contactForm } from './modules/contact'

ready((event) => {

    // Load Modal JS
    modal();

    // Load Contact Form
    contactForm();

})

/*
    --------------------------------------------------
    |   DOCUMENT READY FUNCTION                      |
    --------------------------------------------------
*/
function ready(callbackFunction) {
    if(document.readyState != 'loading') {
        callbackFunction(event);
    } else {
        document.addEventListener("DOMContentLoaded", callbackFunction);
    }
}