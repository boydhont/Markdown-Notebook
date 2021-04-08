//Automation Notebook
//Writes down ideas for automation to a markdown file

//Packages

const fs = require('fs');
const path = require('path');
const prompt = require('prompt-sync')({sigint: true});

//Nested functions

const promptValue = (message, feedback) => {

    const getLineBreak = (message) => {
        let lineBreak = "";
        message.split("").forEach(o => lineBreak += "-");
        return lineBreak;
    }

    const lineBreak = getLineBreak(message);
    console.log(lineBreak);
    console.log(message);
    console.log(lineBreak);
    const value = feedback();
    console.log();
    return value;
}

const promptMultiLineInput = () => {
    let multiLineInput = [];
    while("Endless" === "Endless"){
        const input = prompt('> ');
        if(input.toUpperCase() === "*") return multiLineInput;
        if(input === "**" && multiLineInput.length > 0){multiLineInput.splice(-1,1); continue;}
        multiLineInput.push(input);
    }
}

const getDate = () => {
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    const year = date.getFullYear();
    return day + '.' + month + '.' + year;
}

const getMarkdownContent = (date, title, description, solution) => {
    let markdownContent = [];
    markdownContent.push("# " + title);
    markdownContent.push("");
    if(description.length > 0){
        markdownContent.push("## Description");
        description.forEach(o => markdownContent.push("- " + o));
        markdownContent.push("");
    }
    if(solution.length > 0){
        markdownContent.push("## Solution");
        solution.forEach(o => markdownContent.push("- " + o));
        markdownContent.push("");
    }
    markdownContent.push("---");
    markdownContent.push("##### " + date + " - B. d'Hont"); //TODO add location
    return markdownContent
}

const getReversedDate = (date) => {
    let reversedDate = "";
    date.split(".").reverse().forEach(o => reversedDate += o);
    return reversedDate;
}

const getFilePath = (fileName) => path.join(__dirname, '.', fileName);

const writeFile = (filePath, contentArray) => {
    if(contentArray.length <= 0) return console.log("The array is null");

    const lastLine = contentArray[contentArray.length-1];
    contentArray.pop();

    let fileStream = fs.createWriteStream(filePath, {flags: 'a'});
    contentArray.forEach(o => fileStream.write(o + "\n"));
    fileStream.write(lastLine);
}

//Main function

//Get user input
//TODO get current date
const date = getDate();
const title = promptValue('Title', () => prompt('> '));
const description = promptValue('Description (* to continue)', promptMultiLineInput);
const solution = promptValue('Solution (* to continue)', promptMultiLineInput);

//Write as markdown file
const markdownContent = getMarkdownContent(date, title, description, solution);
const filePath = getFilePath(getReversedDate(date) + " - " + title + ".markdown");
writeFile(filePath, markdownContent);
console.log("Written markdown file to " + filePath);