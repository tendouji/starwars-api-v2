var shipList = [5, 9, 10, 11, 15],
    swapiDomain = 'https://swapi.co/api/',
    swapiUrl = swapiDomain + 'starships/',
    shipAttributes = ['name', 'model', 'manufacturer', 'crew', 'edited'],
    shipsInfo = [],

    messageList = {
        'start': 'Getting content from ' + swapiDomain + '...', 
        'noInternet': 'You seemed to be offline! Please check your Internet connection.'
    },

    /* dom element */
    preloader,
    menuSelect,
    messagePanel,
    spaceshipList;

$(function() {
    menuSelect = $('header select');
    menuSelect.on('change', function(e) {
        window.location = $(this).find('option:selected').val();
    });

    messagePanel = $('#messagePanel');
    if(navigator.onLine) {
        preloader = $('#preloader');
        spaceshipList = $('#spaceshipList');
        messagePanel.text( messageList['start'] );
        loadShipInfo();
    } else {
        messagePanel.text( messageList['noInternet'] );
        return;
    }
});


function loadShipInfo() {
    var deferredCall = [];
    $.each(shipList, function(index, value) {
        deferredCall.push( $.get(swapiUrl + value + '/') );
    });

    $.when.apply($, deferredCall)
        .done(function() {
            $.each(arguments, function(index, arr) {            
                var dataObj = arr[0];
                    tempObj = {};
                for(var a in shipAttributes) {
                    tempObj[shipAttributes[a]] = shipAttributes[a] == 'crew' ? parseInt(dataObj[shipAttributes[a]], 10) : dataObj[shipAttributes[a]];
                }
                shipsInfo.push(tempObj);
                showPreloader( index+1, shipList.length );
            });
            shipsInfo.sort(sortArray);
        });
}

function populateChart() {
    var resultStr = '';
    for(var ship in shipsInfo) {
        var templateStrPre = [
        '<li>',
        '   <div class="ship" id="ship', ship ,'">',
        '       <h3 class="name"><span class="icon-spaceship"></span>', shipsInfo[ship].name, '</h3>',
        '       <div class="info">',
        '           <ul>',
        '               <li class="list-crew">',
        '                   <a class="edit-link" href="#">[&nbsp;<span class="icon-edit"></span>EDIT&nbsp;]</a>',
        '                   <div class="edit-panel">',
        '                       <span class="label">No. of Crew</span>',
        '                       <input type="number" class="input" placeholder="', shipsInfo[ship].crew, '" />',
        '                       <div class="button-area">',
        '                           <input type="button" class="button edit-btn" value="Submit" />',
        '                           <input type="button" class="button cancel-btn" value="Cancel" />',
        '                       </div>',
        '                   </div>',
        '                   <div class="preview-panel">',
        '                       <span class="label">No. of Crew</span>',
        '                       <span class="value">', shipsInfo[ship].crew, '</span>',
        '                       <div class="infographic">'
        ],
        templateStrPost = [
        '                       </div>', 
        '                   </div>', 
        '               </li>', 
        '               <li class="list-model">', 
        '                   <span class="label"><span class="icon-model"></span> Model</span>', 
        '                   <span class="value">', shipsInfo[ship].model, '</span>', 
        '               </li>', 
        '               <li class="list-manufacturer">', 
        '                   <span class="label"><span class="icon-manufacturer"></span> Manufacturer</span>', 
        '                   <span class="value">', shipsInfo[ship].manufacturer, '</span>', 
        '               </li>', 
        '               <li class="list-date">', 
        '                   <span class="label"><span class="icon-date"></span> Edited</span>', 
        '                   <span class="value">', shipsInfo[ship].edited, '</span>', 
        '               </li>', 
        '           </ul>', 
        '       </div>', 
        '   </div>', 
        '</li>'
        ],
        crewIconStr = [];
        for(var i=0; i<shipsInfo[ship].crew; i++) {
            if(i >= 10) {
                crewIconStr.push('<span class="icon-plus"></span><span class="icon-plus"></span>');
                break;
            } else {
                crewIconStr.push('<span class="icon-crew"></span>');
            }
        }

        var fullArr = templateStrPre.concat(crewIconStr);
        fullArr = fullArr.concat(templateStrPost);

        resultStr += fullArr.join(''); 
    }

    spaceshipList.hide().html(resultStr).fadeIn(200);
}

function swapCrewCountView(n, panel) {
    var shipPanel = $('#ship' + n),
        previewPanel = shipPanel.find('.preview-panel'),
        editPanel = shipPanel.find('.edit-panel'),
        editLink = shipPanel.find('.edit-link');

    if(panel == 'preview') {
        previewPanel.show();
        editPanel.hide();
        editLink.show();
    } else {
        previewPanel.hide();
        editPanel.show();
        editLink.hide();
    }
}

function editCrewCount(n) {
    var shipPanel = $('#ship' + n),
        crewValue = shipPanel.find('.input').val();

    if(crewValue == '') {
        alert('Please enter a value');
    } else {
        shipsInfo[n].crew = parseInt(crewValue, 10);
        shipsInfo.sort(sortArray);
        populateChart();
    }
}

function sortArray(a, b) {
    return (a.crew < b.crew) ? 1 : ((b.crew < a.crew) ? -1 : 0);
}

function showPreloader(curStep, totalSteps) {
    var percent = Math.ceil( (curStep / totalSteps) * 100 ),
        percentText = percent + '%';
    preloader.show()
        .delay(50)
        .animate({width:percentText}, 100,
            function() {
                $(this).text(percentText);
                if(percent >= 100) {
                    $(this).delay(500).fadeOut(200, function() {
                        populateChart();

                        spaceshipList.on('click', '.edit-link, .cancel-btn, .edit-btn', function(e) {
                            e.preventDefault();
                            var id = ( $(this).parents('.ship').attr('id') ).replace('ship', '');
                            if( $(this).hasClass('edit-link') )     swapCrewCountView(id, 'edit');
                            if( $(this).hasClass('cancel-btn') )    swapCrewCountView(id, 'preview');
                            if( $(this).hasClass('edit-btn') )      editCrewCount(id);
                        });
                    });
                }
            }
        );
}
