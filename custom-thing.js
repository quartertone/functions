
customElements.define("my-thing", class MyThing extends HTMLElement {

  set value(val) {
    this._value = val;
    //if (!this.dataset.noshow) this.innerHTML = val ? val : this.title; // 
    this.setAttribute("value", val);
  }

  get value() {
    return this._value;
  }

  /**
   * @param {any} precal - Preceding months
   */
  set precal(precal) {
    this._precal = precal;
  }

  get precal() {
    return this._precal;
  }




  /**
   * @param {Function} fn - Preceding months
   */
  set returnfn(fn) {
    this._returnfn = fn;
  }

  get returnfn() {
    return this._returnfn;
  }




  constructor() {
    super();
    //this.state = 0;
    // this.rotations = ["0deg", "90deg", "180deg", "270deg"];

    // this.value = this._value;

    this.attachShadow({ mode: "open" });
    this.shadowRoot.innerHTML = this.blockstyle();
  }



  connectedCallback() {

    const { shadowRoot } = this; // this.attachShadow({ mode: "open" });

    
    // console.log(shadow);
    this.value = this.getAttribute("value");
    this.id = "block" + this.value;
    
    let d = document.createElement("div");
    d.innerText = "Halaha";

    shadowRoot.append(d);



    this.onclick = this.oncontextmenu = function (e) {
      console.log("clicked");
      if (this._returnfn instanceof Function) {
        this._returnfn(e);
      }
    };


  }


  monkey() {
    console.log("BLING");
  }


  static observedAttributes = "data-state".split(" ");
  attributeChangedCallback(name, oldValue, newValue) {
    let delta = newValue - oldValue;
    // this.shadowRoot.setAttribute(name,newValue);
    if (name == "data-state" && delta != 0) {
      console.log("CHanged----", newValue);

    }
  }

  blockstyle() {
    return `<style>
    :host {
      --blocksize: 2.5em;
      --bordercolor: #88f;
      --oncolor: #fff;
      --offcolor: #000;
      --color: #999;
      position: relative;
      --half: calc(var(--blocksize) / 2);
      --margins: calc(var(--blocksize) /9);
      --rot: 0deg;
      vertical-align: middle;
      width: var(--blocksize);
      height: var(--blocksize);
      display: inline-block;
      margin: var(--margins);
      transform: rotate(var(--rot));
      transition: all 0.5s;
      border: solid 1px var(--bordercolor);
      user-select:none;
    }</style>`;
  }



});
