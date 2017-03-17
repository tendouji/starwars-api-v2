(function(app) {
    app.AppUIMain = 
        ng.core.Component({
            selector: 'ui-main',
            template: `
                <main id="display">
                    <div class="wrapper">
                        <ul id="spaceshipList">
                            <li>
                                <div id="messagePanel" class="message-panel"></div>
                            </li>
                        </ul>
                    </div>
                </main>
                `
        })
        .Class({
            constructor: function() {
                this.constants = {
                    shipList        : [5, 9, 10, 11, 15],
                    swapiDomain     : 'http://swapi.co/api/',
                    swapiUrl        : 'starships/',
                    shipAttributes  : ['name', 'model', 'manufacturer', 'crew', 'edited'],
                    messageList     : {
                                        'start': ['Getting content from ', '...'], 
                                        'noInternet': 'You seemed to be offline! Please check your Internet connection.'
                                    }
                };
                this.shipsInfo = [];
                this.domElements = {
                    preloader       : null,
                    menuSelect      : null,
                    messagePanel    : null,
                    spaceshipList   : null
                };

                this.initLayout();
                console.log(this);
            },
            initLayout: function() {
                this.domElements.menuSelect = document.querySelector('header select');
                /*menuSelect.onchange = function(){
                    window.location = menuSelect.options[menuSelect.selectedIndex].value;
                };*/
            }
        });
})(window.app || (window.app = {}));