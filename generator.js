window.onload = function onLoad() {
    generate();
}

const contentContainer = document.getElementById("content");
const contentTitle = document.getElementById("title");

const tab1 = document.getElementById("tech");
const tab2 = document.getElementById("fant");

var activeId = "fant";

function toggleTab(button) {
    if (button.id == "tech") {
        contentTitle.innerText = "Tech Company Name Generator";
        activeId = "tech";
        tab1.classList.add("active");
        tab2.classList.remove("active")
    }
    if (button.id == "fant") {
        contentTitle.innerText = "Fantasy Name Generator (f)";
        activeId = "fant";
        tab1.classList.remove("active");
        tab2.classList.add("active")
    }
    generate();
}

function choice(arr) {
    var index = Math.floor(Math.random() * arr.length);
    return arr[index];
}

function generateName() {
    if (activeId === "tech") {
        var prefix = choice(prefixes);
        var middlefix = choice(middlefixes);
        var suffix = choice(suffixes);
    } else if (activeId === "fant") {
        var prefix = choice(female_prefixes);
        var middlefix = choice(female_middlefixes);
        var suffix = choice(female_suffixes);
    }
    return prefix + middlefix + suffix;
}

function generate() {
    remove();
    for (i = 0; i < 7; i++) {
        let div = document.createElement("div");
        var name = generateName(activeId);
        div.innerHTML = name;
        div.id = "generated";
        div.className = "fs-4 text-light";
        div.style = "text-transform: capitalize";
        contentContainer.append(div);
    }
}
 
function remove() {
    for (i = 0; i < 7; i++) {
        let div = document.getElementById("generated");
        if (div == null) {
            return
        }       
        contentContainer.removeChild(div);
    }
}
