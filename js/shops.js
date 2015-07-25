'use strict';
//Donut shop constructor, declares and instantiates the necessary properties
var Shop = function(shopName, minCustomers, maxCustomers, avgDonuts){
  this.shopName = shopName;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgDonuts = avgDonuts;
  this.hourly = [];
  this.totalDonuts = 0;
};

//Runs the program to DOM, creates a row for the given shop and fills in the corresponding data (aka magic)
Shop.prototype.render = function(){
  this.donutsPerDay();
  if(document.getElementById(this.shopName.toUpperCase())){
    var update = document.getElementById(this.shopName.toUpperCase()).childNodes;
    for(var j = 1; j < update.length-1; j++){
      update[j].innerHTML = this.hourly[j-1];
    }
    update[update.length - 1].innerHTML = this.totalDonuts;
  } else {
    var tr = tbl.insertRow();
    tr.id = this.shopName.toUpperCase();

    var rowData = "<td class='one'>" + this.shopName + "</td>";
    for(var i = 0; i < this.hourly.length; i++){
      rowData += "<td class='rest'>" + this.hourly[i] + "</td>";
    }
    tr.innerHTML = rowData + "<td class='total'>" + this.totalDonuts + "</td>";
    tbl.appendChild(tr);
  }
};
Shop.prototype.donutsPerDay = function(){
  for(var i = 0; i < 12; i++){
    this.totalDonuts += this.hourly[i] = (Math.floor((Math.random() * (this.maxCustomers - this.minCustomers + 1) + this.minCustomers) * this.avgDonuts));
  }
};

var body = document.getElementById('insertTable');
var tbl  = document.createElement('table');
tbl.id = "Donut_Table";

//Creates the header for the table: 'hours, times, total'
var createHeader = (function(){
  var tr = tbl.insertRow();
  tr.id = "table_header";
  var rowData = "<td id='shops'>" + 'SHOPS' + "</td>";
  for(var i = 0; i < 12; i++){
    var time = 7 + (i);
    if(i<5){
      rowData += "<td class='times'>" + time + "am</td>";
    } else if (i===5) {
      rowData += "<td class='times'>" + time + "pm</td>";
    } else {
      rowData += "<td class='times'>" + (time - 12) + "pm</td>";
    }
  }
  tr.innerHTML = rowData + "<td id='totals'>" + 'TOTALS' + "</td>";
  tbl.appendChild(tr);
  body.appendChild(tbl);
})();

var pull = document.getElementById('createStore');
pull.addEventListener('submit', function(e){
  e.preventDefault();
if(!(pull.elements[1].value&&pull.elements[2].value&&pull.elements[3].value&&pull.elements[4].value)){
  return;
} else {
  var createShop = new Shop(pull.elements[1].value, parseInt(pull.elements[2].value), parseInt(pull.elements[3].value), parseInt(pull.elements[4].value));
  createShop.render();
}
});

var downtown = new Shop('Downtown', 8, 43, 4.5);
var capitolHill = new Shop('Capitol Hill', 4, 37, 2);
var southLakeUnion = new Shop('South Lake Union', 9, 23, 6.33);
var wedgewood = new Shop('Wedgewood', 2, 28, 1.25);
var ballard = new Shop('Ballard', 8, 58, 3.75);

downtown.render();
capitolHill.render();
southLakeUnion.render();
wedgewood.render();
ballard.render();
