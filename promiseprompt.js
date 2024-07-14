
// - interactive dialog that resolves to a promise. Requires makedimbg
// - necessary styles in promiseprompt.css 
async function promiseprompt(promptext, { placeholder = "", defaulttext = "", oktext = "Ok", canceltext = "Cancel", id = "promiseprompt", classes, confirm = false, html = false, okfn = async function () { return true; } } = {}) {
  // Note: deconstructed object can be passed as a regular object
  return new Promise((resolve, reject) => {

    let promptbox = document.createElement("div");
    // promptbox.style = style;
    promptbox.id = id;
    promptbox.className = "promiseprompt " + classes;

    let dimbg = makedimbg({
      source: promptbox,
      alsofn: () => {
        resolve(false);
        console.log("ALSODING");
        document.removeEventListener("keydown", keylistener);

      }
    });


    if (html) {
      promptbox.append(promptext);
    } else {
      let textrow = document.createElement("div");
      textrow.className = "promisetext";
      textrow.innerText = promptext;
      promptbox.append(textrow);
    }

    let inbox = document.createElement("input");
    inbox.type = "text";
    inbox.value = defaulttext;
    inbox.placeholder = placeholder;
    inbox.style = "display:table";
    inbox.oninput = () => { }; //empty event for helpvideo functions

    if (!confirm) {
      promptbox.append(inbox);
    }

    let cxlbtn = document.createElement("button");
    cxlbtn.className = "promise_cancel";
    cxlbtn.innerText = canceltext;
    cxlbtn.onclick = () => {
      // resolve(false);
      dimbg.click(); // alsofn defaults to resolve false
      // TODO :consider switching this to "reject"
    };
    let okbtn = document.createElement("button");
    okbtn.className = "promise_ok";
    okbtn.innerText = oktext;
    okbtn.onclick = () => {
      okfn().then(r => {
        if (r) {
          resolve(inbox.value || confirm); // resolve first to override alsofn
          dimbg.click();
          // pbox.submit();
        }
      });
    };

    let buttonrow = document.createElement("div");
    buttonrow.className = "promisebtns";
    buttonrow.append(cxlbtn, okbtn);

    promptbox.append(buttonrow);
    document.body.append(dimbg, promptbox);
    if (!confirm) {
      inbox.focus();
      inbox.select();
    }

    function keylistener(e) {
      e.stopImmediatePropagation();
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          resolve(inbox.value || confirm); // resolve first to override alsofn
          dimbg.click();
          // resolve(false);
          break;
        case "Escape":
          e.preventDefault();
          // resolve(false);
          dimbg.click(); // alsofn defaults to resolve false
          break;
      }
    }

    document.addEventListener("keydown", keylistener);

  });
}

// HOW TO USE promiseprompt
// promptext - required. Text displayed in prompt
// placeholder - placeholder text in prompt input field
// defaulttext - default value of input field
// oktext - ok button text
// canceltext - cancel button text
// id - css ID; defaults to "promiseprompt"
// classes - additional classes ("promiseprompt" always)
// confirm - if TRUE, will ignore input text  parameters (placeholder, defaulttext)
// html - if TRUE will interpret prompttext as HTML entity
// okfn - function to run on OK

// promiseprompt("Guess what?", { defaulttext: "cheknbut", placeholder: "Put something here", style: "display:block" }).then((e) => {
//   butn.innerText = e;
//   console.log(e);
// }).catch((e) => {
//   console.log("rejected promise prompt");
// });
