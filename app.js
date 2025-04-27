// TODO: Import required modules
// Hint: You will need the 'fs' module for reading the file and the 'chalk' library for coloring the words.

// IMPORTING REQUIRED MODULES
const fs = require('fs');
const chalk = require('chalk');

/**
 * Synchronously reads the content of 'declaration.txt'.
 * @returns {string} The content of the file.
 */
function readFileContent() {
    // TODO: Use the 'fs' module to synchronously read the content of 'declaration.txt' and return it.
    const data = fs.readFileSync('declaration.txt', 'utf-8')
    return data;
}

/**
 * Gets the word count from the content.
 * @param {string} content The file content.
 * @returns {Object} An object with words as keys and their occurrences as values.
 */
function getWordCounts(content) {
    // TODO: Implement a function to count occurrences of each word in the content.
    // Hint: Consider splitting the content into words and then tallying the counts.
    const wordCount = {};
    const words = content.split(/\W+/).filter(Boolean); // Splitting by non-word characters.

    // ITERATIING THROUGH ALL THE WORDS
    words.forEach(word => {
        // IF THE WORD EXIST, WE INCREMENT
        const lowerWord = word.toLowerCase(); // CONVERTING TO LOWER CASE
        if (wordCount[lowerWord]) {
            wordCount[lowerWord] +=1;
        } else {
            wordCount[lowerWord] = 1; // OTHERWISE WE INIATILIZE ITS COUNT TO 1
        }
    });

    return wordCount;
}

/**
 * Colors a word based on its frequency.
 * @param {string} word The word to be colored.
 * @param {number} count The frequency of the word.
 * @returns {string} The colored word.
 */
function colorWord(word, count) {
    // TODO: Return the word colored based on its frequency using the 'chalk' library.
    // For example: 
    // - Words that occur once can be blue
    // - Words that occur between 2 and 5 times can be green
    // - Words that occur more than 5 times can be red
    if (count === 1) {
        return chalk.blue(word);
    } else if (count  >= 2 && count <= 5) {
        return chalk.green(word);
    } else {
        return chalk.red(word);
    }
}

/**
 * Prints the first 15 lines of the content with colored words.
 * @param {string} content The file content.
 * @param {Object} wordCount The word occurrences.
 */
function printColoredLines(content, wordCount) {
    const lines = content.split('\n').slice(0, 15);

    for (const line of lines) {
        const coloredLine = line.split(/\W+/).map(word => {
            // TODO: Color the word based on its frequency using the 'colorWord' function.  
            const lowerWord = word.toLowerCase(); 
            const count = wordCount[lowerWord];
            return colorWord(word, count);
        }).join(' ');

        console.log(coloredLine);
    }
}

/**
 * Main function to read the file, count the word occurrences and print the colored lines.
 */
function processFile() {
    const content = readFileContent();
    const wordCount = getWordCounts(content);
    printColoredLines(content, wordCount);
}

if (require.main === module) {
    // This will execute only if the file is run directly.
    processFile();
}

// TODO: Export the functions for testing
// Hint: You can use the 'module.exports' syntax.
module.exports = { 
    readFileContent,
    getWordCounts,
    colorWord,
    printColoredLines,
    processFile
};