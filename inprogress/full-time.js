

customElements.define("full-timex", class FullTime extends HTMLElement {


  set value(val) {
    this._value = val;
    let newevent = new Event("input");
    newevent.value = this._value;
    this.dispatchEvent(newevent);
  }
  // designated clock value is assigned to clock-face element
  
  get value() {
    return this._value;
  }
  
  constructor() {
    super();
  
  }
  
  connectedCallback() {
    
  
  //     this.innerHTML = `
  // <grid-cal title="baaboe"></grid-cal>
  // <clock-face></clock-face>
  //     `;
    let gridcal = document.createElement("grid-cal");
    gridcal.title = this.title;
    let clockface = document.createElement("clock-face");
    this.append(gridcal,clockface);
  
    // let basethis = this;
  
  
  
    // gridcal.oninput = function (e) {
    //   basethis.dataset.date = e.value;
    //   checkdata();
    // };
  
    // clockface.oninput = function (e) {
    //   basethis.dataset.time = e.value;
    //   checkdata();
    // };
  
    // function checkdata() {
    //   if (basethis.dataset.date && basethis.dataset.time) {
    //     basethis.value = basethis.dataset.date + "T" + basethis.dataset.time;
    //     // console.log(fulldt);
    //   }
    // }
  
  
  
  }
  });
  