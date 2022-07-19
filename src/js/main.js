/**
 *  @package CashMoney-NFT
*/

import { menuToggle } from './modules/menu';

ready((event) => {

    // Load Menu Toggle
    menuToggle();

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