/**
 *  @package CashMoney-NFT
*/

/*
    --------------------------------------------------
    |   MENU FUNCTIONS                               |
    --------------------------------------------------
*/

export const menuToggle = () => {

    const menu = document.querySelector('#menu');
    const menu_btn = document.querySelector('#menu-toggle');

    menu_btn.addEventListener('click', (e) => {
        if ( menu_btn.classList.contains('closed') ) {
            menu.classList.remove('closed');
            menu.classList.add('open');

            menu_btn.classList.remove('closed');
            menu_btn.classList.add('open');

            return;
        }

        menu.classList.remove('open');
        menu.classList.add('closed')

        menu_btn.classList.remove('open');
        menu_btn.classList.add('closed');
        return;
    })

}