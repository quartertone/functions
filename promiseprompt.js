
// PROMISEd prompt box
function promiseprompt(promptext, { placeholder = "", defaulttext = "", oktext = "Ok", canceltext = "Cancel", id = "promiseprompt", confirm = false, html = false, okfn = async function () { return true; } } = {}) {
  // Note: deconstructed object can be passed as a regular object
  return new Promise((resolve, reject) => {
    let dimbg = document.createElement("div");
    dimbg.style = "position:fixed; top:0;left:0;right:0;bottom:0; background:#4447;z-index:1000;";
    dimbg.onclick = () => {
      closeit();
      resolve(false);
    };
    let promptbox = document.createElement("div");
    // promptbox.style = style;
    promptbox.id = id;

    if (html) {
      promptbox.append(promptext);
    } else {
      let textrow = document.createElement("div");
      textrow.id = "promisetext";
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
    cxlbtn.id = "promise_cancel";
    cxlbtn.innerText = canceltext;
    cxlbtn.onclick = () => {
      closeit();
      resolve(false);
    };
    let okbtn = document.createElement("button");
    okbtn.id = "promise_ok";
    okbtn.innerText = oktext;
    okbtn.onclick = () => {
      okfn().then(r => {
        if (r) {
          closeit();
          resolve(inbox.value || confirm);
          // pbox.submit();
        }
      });
    };

    let buttonrow = document.createElement("div");
    buttonrow.id = "promisebtns";
    buttonrow.append(cxlbtn, okbtn);

    promptbox.append(buttonrow);
    document.body.append(dimbg, promptbox);
    if (!confirm) {
      inbox.focus();
      inbox.select();
    }

    function closeit() {
      promptbox.remove();
      dimbg.remove();
      document.removeEventListener("keydown", keylistener);
    }

    function keylistener(e) {
      e.stopImmediatePropagation();
      switch (e.key) {
        case "Enter":
          e.preventDefault();
          closeit();
          // resolve(false);
          resolve(inbox.value || confirm);
          break;
        case "Escape":
          e.preventDefault();
          closeit();
          resolve(false);
          break;
      }
    }

    document.addEventListener("keydown", keylistener);

  });
}

{ // HOW TO USE promiseprompt
  // promiseprompt("Guess what?", { defaulttext: butn.innerText, placeholder: "Put something here", style: "display:block" }).then((e) => {
  //   butn.innerText = e;
  //   console.log(e);
  // }).catch((e) => {
  //   console.log("rejected promise prompt");
  // });
}