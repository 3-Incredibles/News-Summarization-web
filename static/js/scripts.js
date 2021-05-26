/*!
 * Start Bootstrap - One Page Wonder v6.0.0 (https://startbootstrap.com/theme/one-page-wonder)
 * Copyright 2013-2021 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-one-page-wonder/blob/master/LICENSE)
 */

//import { fs } from 'fs';

//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
    dragText = dropArea.querySelector("header"),
    button = dropArea.querySelector("button"),
    input = dropArea.querySelector("input");
let file; //this is a global variable and we'll use it inside multiple functions


button.onclick = () => {
    input.click(); //if user click on the button then the input also clicked
}

input.addEventListener("change", function() {
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = this.files[0];
    dropArea.classList.add("active");
    showFile(); //calling function
});


//If user Drag File Over DropArea
dropArea.addEventListener("dragover", (event) => {
    event.preventDefault(); //preventing from default behaviour
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DropArea
dropArea.addEventListener("dragleave", () => {
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event) => {
    event.preventDefault(); //preventing from default behaviour
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = event.dataTransfer.files[0];
    showFile(); //calling function
});

let audioFile;

function showFile() {
    let fileType = file.type; //getting selected file type
    let validExtensions = ["audio/wav", "audio/mpeg"]; //adding some valid audio extensions in array
    if (validExtensions.includes(fileType)) { //if user selected file is an image file
        let fileReader = new FileReader(); //creating new FileReader object
        fileReader.onload = () => {
            let fileURL = fileReader.result; //passing user file source in fileURL variable
            audioFile = fileURL
                //creating an audio tag and passing user selected file source inside src attribute
            let audTag = `<audio controls><source src="${fileURL}" type="audio/wav">Your browser does not support the audio element.</audio>`;

            dropArea.innerHTML = audTag; //adding that created audio tag inside dropArea container

        }
        fileReader.readAsDataURL(file);
    } else {
        alert("Please upload a WAV File!");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }
}

const trans = document.getElementById('transcript'),
    summary = document.getElementById('summary'),
    summ_button = document.getElementById('summarize');

summ_button.onclick = () => {
    //if user clicks on the summarize button

    trans.style.display = 'flex';
    summary.style.display = 'flex';
    readText('C:/xampp/htdocs/Summarization/content/Speech_to_Text_Test_Document.txt');
    displaySummary('../content/Speech_to_Text_Test_Documentation.txt');

    //displaySummary("Hakuna Matata");
}


//filePath = ;

function readText(filePath) {

    var output = ""; //placeholder for text output
    if (filePath.files && filePath.files[0]) {
        alert("hehe")
        reader.onload = function(e) {
            output = e.target.result;
            displaySummary(output);
        }; //end onload()
        reader.readAsText(filePath.files[0]);
    }
    return true;
}

function displayTranscript(txt) {
    var el = document.getElementById('trans_para');
    el.innerHTML = txt;
    return true;
}

function displaySummary(txt) {
    var el = document.getElementById('sum_para');
    el.innerHTML = txt;
    return true;
}