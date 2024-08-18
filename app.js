function cleanInput(text) {
    return text.replace(/[^a-z\s]/g, '');
}

function encrypt(text) {
    let encryptedText = text.replace(/e/g, 'enter')
                            .replace(/i/g, 'imes')
                            .replace(/a/g, 'ai')
                            .replace(/o/g, 'ober')
                            .replace(/u/g, 'ufat');
    return encryptedText;
}

// Decryption function
function decrypt(text) {
    let decryptedText = text.replace(/enter/g, 'e')
                            .replace(/imes/g, 'i')
                            .replace(/ai/g, 'a')
                            .replace(/ober/g, 'o')
                            .replace(/ufat/g, 'u');
    return decryptedText;
}

// Function to handle encryption
function handleEncrypt() {
    const inputText = document.getElementById('inputText').value;
    const encryptedText = encrypt(inputText);
    document.getElementById('outputText').innerText = encryptedText;
    updateOutputStyle();
    clearElements();
}

// Function to handle decryption
function handleDecrypt() {
    const inputText = document.getElementById('inputText').value;
    const decryptedText = decrypt(inputText);
    document.getElementById('outputText').innerText = decryptedText;
    updateOutputStyle();
    clearElements();
}

// Function to update output text style
function updateOutputStyle() {
    const outputTextElement = document.getElementById('outputText');
    outputTextElement.style.display = 'block';

    const mainRight = document.querySelector('.main__right');
    mainRight.style.display = 'flex';
    mainRight.style.flexDirection = 'column';
    mainRight.style.justifyContent = 'space-between';

    const mainRightCopy = document.querySelector('.main__right__copy');
    mainRightCopy.style.display = 'block';

    const mainRightMessage = document.querySelector('.main__right__message');
    mainRightMessage.style.height = '100%';
    
}

// Function to clear specific elements
function clearElements() {
    const mainRight = document.querySelector('.main__right');
    const img = mainRight.querySelector('.main__right__image');
    const h1 = mainRight.querySelector('.main__right__message__h1');
    const p = mainRight.querySelector('.main__right__message__p');

    if (img) {
        img.remove();
    }
    if (h1) {
        h1.remove();
    }
    if (p) {
        p.remove();
    }
}

// Function to copy output text to clipboard
function copyOutput() {
    const outputTextElement = document.getElementById('outputText');
    const textToCopy = outputTextElement.value || ''; // Ensure non-empty string

    // Check if Clipboard API is supported
    if (navigator.clipboard) {
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert('Text copied to clipboard!');
        }).catch(err => {
            console.error('Failed to copy text: ', err);
        });
    } else {
        console.error('Clipboard API is not supported');
    }
}

// Function to enable/disable buttons based on textarea content
function updateButtonState() {
    const inputText = document.getElementById('inputText').value.trim();
    const encryptButton = document.getElementById('encryptButton');
    const decryptButton = document.getElementById('decryptButton');

    if (inputText.length > 0) {
        encryptButton.disabled = false;
        decryptButton.disabled = false;
        encryptButton.style.backgroundColor = '#0A3871';
        decryptButton.style.backgroundColor = 'transparent';
    } else {
        encryptButton.disabled = true;
        decryptButton.disabled = true;
        encryptButton.style.backgroundColor = '#356EA9';
        decryptButton.style.backgroundColor = '#D8DFE8';
    }
}

// Event listener to clean input in real-time
document.addEventListener('DOMContentLoaded', function() {
    const inputTextArea = document.getElementById('inputText');
    const warningMessage = document.getElementById('warningMessage');

    inputTextArea.addEventListener('input', function(event) {
        updateButtonState();
        const originalText = event.target.value;
        const cleanedText = cleanInput(originalText);

        if (originalText !== cleanedText) {
            warningMessage.style.color = 'red';
        } else {
            warningMessage.style.color = '#495057';
        }

        event.target.value = cleanedText;
    });
});