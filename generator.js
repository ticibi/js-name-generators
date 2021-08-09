window.onload = function() {
    loadScripts();
    randomName();
    addButtons();
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
    genTitle.innerText = button.innerText;
    activeTab = button.innerText;
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
        "Tech Names": TechNames,
        "Fantasy Names F": FantasyNamesF,
        "Fantasy Names M": FantasyNamesM,
        "Town Names": TownNames,
        "Orc Names": OrcNames
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

function generate() {
    if (activeTab == "Saved Names") {
        return
    }
    remove();
    for (i = 0; i < 7; i++) {
        let div = document.createElement("div");
        if (activeTab == "Random Names") {
            var name = randomName();
        } else if(activeTab == "Orc Names") {
            var name = complexName();
        } else {
            var name = generateName(activeTab);
        }
        div.innerHTML = name;
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
    var vowels = "aeiouy";
    var consonants = 'bcdfghjklmnpqrstvwxyz';
    var roll = randomRange(0, 4);
    var name = null;
    switch(roll) {
        case 0:
            name = choice(consonants) + choice(consonants) + choice(vowels) + choice(vowels) + choice(consonants);
            break;
        case 1:
            name = choice(consonants) + choice(vowels) + choice(consonants) + choice(consonants) + choice(vowels) + choice(consonants);
            break;
        case 2:
            name = choice(vowels) + choice(consonants) + choice(vowels) + choice(consonants) + choice(vowels) + choice(consonants);
            break;
        case 3:
            name = choice(consonants) + choice(vowels) + choice(consonants) + choice(vowels) + choice(consonants) + choice(vowels);
            break;
        case 4:
            name = choice(vowels) + choice(consonants) + choice(consonants) + choice(vowels);
            break;
        default:
            name = choice(vowels) + choice(consonants) + choice(consonants);
    }
    return name;
}

function roll() {
    return choice([1, 2])
}

// really bad
function complexName() {
    var data = OrcNames;
    var prefixes = [];
    var middlefixes = [];
    var suffixes = [];
    var adjectives = [];
    for(var x in data.prefix) prefixes.push(x);
    for(var y in data.middlefix) middlefixes.push(y);
    for(var z in data.suffix) suffixes.push(z);
    for(var z in data.adjectives) adjectives.push(z);
    var prefix = choice(prefixes);
    var middlefix = choice(middlefixes);
    if (roll() == 1) {
        var middlefix = choice(middlefixes);
        var suffix = choice(suffixes);
    } else {
        var middlefix = choice(adjectives);
        var suffix = choice(middlefixes);
    }
    var name = prefix + ' ' + middlefix + ' ' + suffix;
    return name;
}
