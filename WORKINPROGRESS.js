

// CUSTOM COMPONENT: three-stage checkbox
customElements.define("tri-check", class TriCheck extends HTMLInputElement {
  // state = -1;
  constructor() {
    super();
    this.type = "checkbox";
    //this.value = this.value ? this.value : 0;
    this.style = "appearance:none;";
  }

  connectedCallback() {
    // console.log("THISVALUE === ", parseInt(this.value));
    this.value = !parseInt(this.value) ? 0 : this.value;
    this.onclick = function (e) {
      this.value = ++this.value % 3;
      // this.value = this.state;
      // console.log(this.value, this);
      switch (this.value) {
      }

    };
  }
}, { extends: "input" });
/* <input is="tri-check" id="triple" /><label for="triple">Triple</label> */


// TODO:: CUSTOM COMPONENT: custom dropdown menu
customElements.define("drop-down", class DropDown extends HTMLSelectElement {

}, { extends: "select" });


