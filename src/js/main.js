/**
 *  @package CashMoney-NFT
*/

import { menuToggle } from './modules/menu';

ready((event) => {

    // Load Menu Toggle
    menuToggle();

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