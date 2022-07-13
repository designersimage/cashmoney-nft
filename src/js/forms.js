/**
 *  @package CashMoney-NFT
*/

import { contactForm } from './modules/contact'

ready((event) => {

    // Load Contact Form
    contactForm();

    // Load Modal JS
    //modal();

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