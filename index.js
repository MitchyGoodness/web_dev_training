// Run "init" once the HTML has loaded
window.addEventListener("DOMContentLoaded", init)

// This is a function.... :-P
function init() {
  // Select the click button
  const alertButton = document.querySelector("input#alertButton[type=button]");
  const getVerseButton = document.querySelector("input#getVerseButton[type=button]");

  // This is another type of function called an arrow function
  // and it will alert the user when it runs
  const arrowFunction = e => alert("You clicked the button!");

  // This function checks what the event was from and if it's the click
  // button then call arrowFunction
  function clickHandler(event) {
    if (event.target === alertButton) {
      arrowFunction(event);
    } else if (event.target === getVerseButton) {
      loadJohn3_16();
    }

  }

  function loadJohn3_16() {
    fetch("https://bible-api.com/john+3:16", {headers: {"Content-Type": "application/json"}})
      .then(response => response.json())
      .then(convertJsonToVerse)
      .then(addVerseToContainer);
  }

  function addVerseToContainer(text) {
    const verseContainer = document.getElementById("verseContainer");
    verseContainer.appendChild(createListItemNode(text));
  }

  function createListItemNode(text) {
    const li = document.createElement("li");
    li.innerText = text;
    return li;
  }

  function convertJsonToVerse(json) {
    return `${json.text} - ${json.reference}`.replace("\n", "");
  }

  /** 
   * This adds the function called clickHandler to the whole document and is called each time 
   * the "click" event happens for a list of possible events see the link by holding cmd and left clicking on it
   * 
   * @see <a href="https://developer.mozilla.org/en-US/docs/Web/Events">MDN Event API</a>
   */
  document.addEventListener("click", clickHandler);
}