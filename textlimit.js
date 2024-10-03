const MAX_LENGTH_MAP = {
    "status_message": 160,
    "comment": 1024,
    "description": 500
};
function createElement(tag, content, className) {
    const element = document.createElement(tag);
    if (className) {
        element.className = className;
    }
    if (Array.isArray(content)) {
        content.forEach(item => {
            if (typeof item === 'string') {
                element.appendChild(document.createTextNode(item));
            } else if (item instanceof Node) {
                element.appendChild(item);
            }
        });
    }
    return element;
}
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
function createCharacterCounter(characterLimit) {
    return createElement("div", [
        createElement("span", [`0 / ${characterLimit}`])
    ], "kb-char-counter");
}
function createInputCounterHandler(characterLimit, characterCounter) {
    let isWarningDisplayed = false;

    return ({ target }) => {
        const length = target.value.length;

        // Handle warning for exceeding character limit
        if (length > characterLimit && !isWarningDisplayed) {
            target.parentNode.classList.add("error");
            isWarningDisplayed = true;
        } else if (length <= characterLimit && isWarningDisplayed) {
            target.parentNode.classList.remove("error");
            isWarningDisplayed = false;
        }

        // Update the character count in the counter
        characterCounter.firstElementChild.firstChild.data = `${length} / ${characterLimit}`;
    };
}
function createKeypressResetHandler(characterLimit, characterCounter) {
    return event => {
        if (event.key !== "Enter" || event.shiftKey || event.target.value.length > characterLimit) return;
        characterCounter.firstElementChild.firstChild.data = "0 / " + characterLimit;
    };
}
function createClickResetHandler(characterLimit, characterCounter, textarea) {
    return () => {
        if (textarea.value.length > characterLimit) return;
        characterCounter.firstElementChild.firstChild.data = "0 / " + characterLimit;
    };
}
// Event Listener
document.addEventListener("click", ({ target }) => {
    if (
        target.tagName.toLowerCase() !== "textarea" ||
        target.__KB_COUNTER_ATTACHED__ ||
        (target.parentNode.classList.contains("_375XK") && !target.classList.contains("kb-chat-input-replacement"))
    ) return;

    const textareaForm = target.closest("form");
    const characterLimit = target.id === "description" ? 500 : MAX_LENGTH_MAP[target.id] || 256;
    const characterCounter = createCharacterCounter(characterLimit);
    
    // Flag to check if the counter has been displayed
    let counterDisplayed = false;

    const inputHandler = createInputCounterHandler(characterLimit, characterCounter);
    const keypressHandler = createKeypressResetHandler(characterLimit, characterCounter);

    target.parentNode.appendChild(characterCounter);
    
    target.addEventListener("input", debounce(inputHandler, 150));
    target.addEventListener("keypress", debounce(keypressHandler, 150));
    
    // Show character counter on first click
    target.addEventListener("focusin", () => {
        if (!counterDisplayed) {
            characterCounter.style.display = 'block';
            counterDisplayed = true; // Set the flag to true after displaying
        }
        inputHandler({ target }); // Call input handler to update count on focus
    });

    if (textareaForm) {
        textareaForm.querySelector("button")
            .addEventListener("click", createClickResetHandler(characterLimit, characterCounter, target));
    }

    target.__KB_COUNTER_ATTACHED__ = true;
});