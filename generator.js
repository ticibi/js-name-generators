window.onload = function() {
    loadScripts();
    randomName();
    createDropdowns();
    //addButtons();
};

document.onload = function() {
    generate();
};

const GENS = [
    "Company Names",
    "Fantasy Names",
    "Random Names",
]

const SUBGENS = [
    ['Tech', 'Business'],
    ['Masculine', 'Feminine', 'Town', 'Orc'],
    ['Random'],
]

var savedNames = []
var charBox = document.getElementById("charBox");
charBox.style.visibility = "hidden";
var navbar = document.getElementById("navbar");
var charBoxInputC = document.getElementById("charBoxInputC");
var charBoxInputV = document.getElementById("charBoxInputV");
var genTabs = document.getElementById("genTabs");
var namesList = document.getElementById("namesList");
var genTitle = document.getElementById("genTitle");
var genBtn = document.getElementById("genBtn");
var activeTab = GENERATORS[0];
genTitle.innerText = 'Select a Generator';

function loadScripts() {
    for(var i=0; i < GENERATORS.length - 1; i++) {
        var scriptTag = document.createElement("script");
        var filename = GENERATORS[i].split(" ").join("");
        try {
            scriptTag.setAttribute("src", "data/" + filename + ".js");
        } catch (error) {
            console.log(error);
        }
        document.head.appendChild(scriptTag);
    }
}

function createDropdowns() {
    for (var i=0; i < GENS.length; i++) {
        let div = document.createElement("div");
        div.className = "dropdown";
        let btn = document.createElement("button");
        btn.className = "btn btn-primary dropdown-toggle nav-link";
        btn.innerText = GENS[i];
        btn.setAttribute("type", "button");
        btn.setAttribute("data-bs-toggle", "dropdown");
        btn.setAttribute("aria-expanded", "false");
        let ul = document.createElement("ul");
        ul.className = "dropdown-menu dropdown-menu-dark";
        ul.setAttribute("aria-labelledby", "dropdownMenuButton2");
        for (var j=0; j < SUBGENS[i].length; j++) {
            let li = document.createElement("li");
            li.innerText = SUBGENS[i][j];
            li.className = "dropdown-item";
            li.id = GENS[i] + " " + SUBGENS[i][j];
            li.addEventListener('click', function() {
                toggleTab(this);
            });
            ul.appendChild(li);
        }
        div.appendChild(btn);
        div.appendChild(ul);
        navbar.append(div);
    }
}

function addButtons() {
    for(var i=0; i < GENERATORS.length; i++){
        var li = document.createElement('div');
        li.id = GENERATORS[i];
        li.className = 'nav-item';
        var btn = document.createElement('button');
        btn.id = 'genTitleBtn';
        btn.className = 'nav-link text-center';
        btn.innerText = GENERATORS[i];
        btn.addEventListener('click', function() {
            toggleTab(this);
        });
        li.appendChild(btn);
        genTabs.appendChild(li);
    }
}

function toggleTab(button) {
    genBtn.innerText = "Generate";
    genTitle.innerText = button.id;
    activeTab = button.id;
    console.log(button.id);
    generate();
}

function randomRange(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function choice(array) {
    var index = Math.floor(Math.random() * array.length);
    return array[index];
}

function weightedChoice(weightedArray) {
    var items = [];
    var weights = [];
    for (i = 0; i < weightedArray.length; i++) {
        items.push(i[0]);
        weights.push(i[1]);
    }
    for (i = 0; i < weightedArray.length; i++) {
        weights[i] += weights[i - 1] || 0;
    }
    var random = Math.random() * weights[weights.length - 1];
    for (i = 0; i < weights.length; i++) {
        if (weights[i] > random) {
            break;
        }
        return items[i];
    }
}

function checkActiveTab(tabName) {
    switch (tabName) {
        case "Random Names Random":
            var name = randomName();
            charBox.style.visibility = "visible";
            return name;
    
        case "Fantasy Names Orc":
            var name = complexName();
            charBox.style.visibility = "hidden";
            return name;

        case "Saved Names":
            charBox.style.visibility = "hidden";
            return null;

        default:
            var name = generateName(activeTab);
            charBox.style.visibility = "hidden";
            return name;
    }
}

function generate() {
    if (activeTab == "Saved Names") {
        return
    }
    remove();
    for (i = 0; i < 7; i++) {
        var tabName = checkActiveTab(activeTab);
        let div = document.createElement("div");
        div.innerHTML = tabName;
        div.id = "generatedName";
        div.className = "fs-4 btn";
        div.style = "text-transform: capitalize; border: thin; background: none; padding: 0px;";
        div.addEventListener('click', function() {
            addSaved(this);
        });
        namesList.append(div);
    }
}

function formName(isWeighted, prefixes, middlefixes, suffixes) {
    if (isWeighted == false) {
        var prefix = choice(prefixes);
        var middlefix = choice(middlefixes);
        var suffix = choice(suffixes);
        var name = prefix + middlefix + suffix;
    } 
    if (isWeighted == true) {
        var prefix = weightedChoice(prefixes);
        var middlefix = weightedChoice(middlefixes);
        var suffix = weightedChoice(suffixes);
        var name = prefix + middlefix + suffix;
    }
    return name;
}

function generateName(tabName) {
    const DATATABLE = {
        "Company Names Tech": TechNames,
        "Fantasy Names Feminine": FantasyNamesF,
        "Fantasy Names Masculine": FantasyNamesM,
        "Fantasy Names Town": TownNames,
        "Fantasy Names Orc": OrcNames
    };
    var data = DATATABLE[tabName];
    var prefixes = [];
    var middlefixes = [];
    var suffixes = [];
    for(var x in data.prefix) prefixes.push(x);
    for(var y in data.middlefix) middlefixes.push(y);
    for(var z in data.suffix) suffixes.push(z);
    var name = formName(false, prefixes, middlefixes, suffixes);
    return name;
}

function checkActiveTab(tabName) {
    switch (tabName) {
        case "Random Names":
            var name = randomName();
            charBox.style.visibility = "visible";
            return name;
    
        case "Orc Names":
            var name = complexName();
            charBox.style.visibility = "hidden";
            return name;

        case "Saved Names":
            charBox.style.visibility = "hidden";
            return null;

        default:
            var name = generateName(activeTab);
            charBox.style.visibility = "hidden";
            return name;
    }
}

function generate() {
    if (activeTab == "Saved Names") {
        return
    }
    remove();
    for (i = 0; i < 7; i++) {
        var tabName = checkActiveTab(activeTab);
        let div = document.createElement("div");
        div.innerHTML = tabName;
        div.id = "generatedName";
        div.className = "fs-4 btn";
        div.style = "text-transform: capitalize; border: thin; background: none; padding: 0px;";
        div.addEventListener('click', function() {
            addSaved(this);
        });
        namesList.append(div);
    }
}

function addSaved(button) {
    if(!savedNames.includes(button.innerText)) {
        savedNames.push(button.innerText);
    } else if(savedNames.includes(button.innerText)) {
        savedNames.splice(savedNames.indexOf(button.innerText));
    }
}

function displaySaved() {
    remove();
    genBtn.innerText = "Saved Names";
    activeTab = "Saved Names";
    genTitle.innerText = "Saved Names";
    for (i = 0; i < savedNames.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = savedNames[i];
        div.id = "generatedName";
        div.className = "fs-4 btn";
        div.style = "text-transform: capitalize; color: gold; border: thin; background: none; padding: 0px;";
        namesList.append(div);
    }
}

function remove() {
    while (namesList.hasChildNodes()) {
        namesList.removeChild(namesList.lastChild);
    }
    if(activeTab == "Saved Names") {
        savedNames = [];
    }
}

function randomName() {
    if (charBoxInputC.value.length > 0 & charBoxInputV.value.length > 0) {
        var consonants = charBoxInputC.value.split(' ');
        var vowels = charBoxInputV.value.split(' ');
        var len = randomRange(2, 5);
    } else {
        var vowels = "aeiouy";
        var consonants = 'bcdfghjklmnpqrstvwxyz';
        var len = randomRange(3, 8);
    }
    var name = '';
    var table = {
        0: consonants,
        1: vowels
    };
    for (var i=0; i<len; i++) {
        name += choice(table[i % 2]);
    }
    return name;
}

// really bad
function complexName() {
    var data = OrcNames;
    var prefixes = [];
    var middlefixes = [];
    var suffixes = [];
    var adjectives = [];
    for (var x in data.prefix) prefixes.push(x);
    for (var y in data.middlefix) middlefixes.push(y);
    for (var z in data.suffix) suffixes.push(z);
    for (var z in data.adjectives) adjectives.push(z);
    var prefix = choice(prefixes);
    var middlefix = choice(middlefixes);
    var suffix = choice(suffixes);
    var roll = choice([0,1]);
    if (roll == 1) {
        var adj = choice(adjectives);
    } else {
        var adj = '';
    }
    var name = prefix + ' ' + adj + ' ' + middlefix + ' ' + suffix;
    return name;
}

function addSaved(button) {
    if(!savedNames.includes(button.innerText)) {
        savedNames.push(button.innerText);
    } else if(savedNames.includes(button.innerText)) {
        savedNames.splice(savedNames.indexOf(button.innerText));
    }
}

function displaySaved() {
    remove();
    genBtn.innerText = "Saved Names";
    activeTab = "Saved Names";
    genTitle.innerText = "Saved Names";
    for (i = 0; i < savedNames.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = savedNames[i];
        div.id = "generatedName";
        div.className = "fs-4 btn";
        div.style = "text-transform: capitalize; color: gold; border: thin; background: none; padding: 0px;";
        namesList.append(div);
    }
}
