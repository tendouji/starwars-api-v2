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


window.onload = function() {
    menuSelect = document.querySelector('header select');
    menuSelect.onchange = function(){
        window.location = menuSelect.options[menuSelect.selectedIndex].value;
    };

    messagePanel = document.getElementById('messagePanel');
    if(navigator.onLine) {
        preloader = document.getElementById('preloader');
        spaceshipList = document.getElementById('spaceshipList');
        messagePanel.innerHTML = messageList['start'];
        loadShipInfo(0);
    } else {
        messagePanel.innerHTML = messageList['noInternet'];
        return;
    }

};

function loadShipInfo(n) {
    if(n < shipList.length) {
        var xhttp = new XMLHttpRequest();
        xhttp.open("GET", swapiUrl + shipList[n] + '/', true);
        xhttp.send();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                //document.getElementById("demo").innerHTML = this.responseText;
                var dataObj = JSON.parse(this.responseText), 
                    tempObj = {};
                for(var a in shipAttributes) {
                    tempObj[shipAttributes[a]] = shipAttributes[a] == 'crew' ? parseInt(dataObj[shipAttributes[a]], 10) : dataObj[shipAttributes[a]];
                }
                shipsInfo.push(tempObj)
                showPreloader(n+1, shipList.length );
                loadShipInfo(n+1);
            }
        };
    } else {
        //loading complete
        shipsInfo.sort(sortArray);
        populateChart();
    }
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
        '                   <a class="edit-link" href="javascript:swapCrewCountView(', ship,', \'edit\')">[&nbsp;<span class="icon-edit"></span>EDIT&nbsp;]</a>',
        '                   <div class="edit-panel">',
        '                       <span class="label">No. of Crew</span>',
        '                       <input type="text" class="input" placeholder="', shipsInfo[ship].crew, '" />',
        '                       <div class="button-area">',
        '                           <input type="button" class="button" value="Submit" onclick="editCrewCount(', ship,')" />',
        '                           <input type="button" class="button" value="Cancel" onclick="swapCrewCountView(', ship,', \'preview\')" />',
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

    spaceshipList.style.display = 'none';
    spaceshipList.innerHTML = resultStr;
    fadeIn(spaceshipList);
}

function swapCrewCountView(n, panel) {
    var shipPanel = document.getElementById('ship' + n),
        previewPanel = shipPanel.querySelector('.preview-panel'),
        editPanel = shipPanel.querySelector('.edit-panel'),
        editLink = shipPanel.querySelector('.edit-link');

    if(panel == 'preview') {
        previewPanel.style.display = 'block';
        editPanel.style.display = 'none';
        editLink.style.display = 'block';
    } else {
        previewPanel.style.display = 'none';
        editPanel.style.display = 'block';
        editLink.style.display = 'none';
    }
}

function editCrewCount(n) {
    var shipPanel = document.getElementById('ship' + n),
        crewValue = shipPanel.querySelector('.input').value;

    shipsInfo[n].crew = parseInt(crewValue, 10);

    shipsInfo.sort(sortArray);
    populateChart();
}

function fadeIn(elm, display) {
    elm.style.opacity = 0;
    elm.style.display = display || "block";

    (function fade() {
        var val = parseFloat(elm.style.opacity);
        if (!((val += .1) > 1)) {
            elm.style.opacity = val;
            requestAnimationFrame(fade);
        }
    })();
}

function sortArray(a, b) {
    return (a.crew < b.crew) ? 1 : ((b.crew < a.crew) ? -1 : 0);
}

function showPreloader(curStep, totalSteps) {
    var percent = Math.ceil( (curStep / totalSteps) * 100 ),
        percentText = percent + '%';
    preloader.style.display = 'block';
    preloader.style.width = percentText;
    preloader.innerHTML = percentText;
    if(percent == 100) {
        setTimeout(function() {
            preloader.style.display = 'none';
        }, 500);
    }
}
