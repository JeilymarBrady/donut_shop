'use strict'
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
    var update = document.getElementById(this.shopName).childNodes;
    for(var j = 1; j < update.length-1; j++){
      update[j].innerHTML = this.hourly[j-1];
    }
    update[update.length - 1].innerHTML = this.totalDonuts;
  } else {
    var tr = tbl.insertRow();
    tr.id = this.shopName.toUpperCase();
    var rowData = "<td>" + this.shopName + "</td>";
    for(var i = 0; i < this.hourly.length; i++){
      rowData += "<td>" + this.hourly[i] + "</td>";
    }
    tr.innerHTML = rowData + "<td>" + this.totalDonuts + "</td>";
    tbl.appendChild(tr);
  }
};
Shop.prototype.donutsPerDay = function(){
  for(var i = 0; i < 11; i++){
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
  var rowData = "<td id='shops'>" + 'Shops' + "</td>";
  for(var i = 0; i < 11; i++){
    var time = 700 + (i*100);
    rowData += "<td class='times'>" + time + "</td>";
  }
  tr.innerHTML = rowData + "<td id='totals'>" + 'Totals' + "</td>";
  tbl.appendChild(tr);
  body.appendChild(tbl);
})();

var pull = document.getElementById('createStore');
pull.addEventListener('submit', function(e){
  e.preventDefault();
  var shopN = document.getElementById('name').value;
  var minC = parseInt(document.getElementById('minCustomers').value);
  var maxC = parseInt(document.getElementById('maxCustomers').value);
  var avgD = parseInt(document.getElementById('avgDonuts').value);
  var createShop = new Shop(shopN, minC, maxC, avgD);
  createShop.render();
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
