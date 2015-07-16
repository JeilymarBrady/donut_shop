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

  if(document.getElementById(this.shopName)){
    var update = document.getElementById(this.shopName).childNodes;
    //Replaces childnodes of existing row with new data
    for(var j = 1; j < update.length-1; j++){
      update[j].innerHTML = this.hourly[j-1];
    }
    update[update.length - 1].innerHTML = this.totalDonuts;
  } else {
    console.log("render - continue making new shop");
    var tr = tbl.insertRow();
    tr.id = this.shopName;
    var rowData = "<td><b>" + this.shopName + "</b></td>";
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
    //this.totalDonuts += this.hourly[i];
  }
};

var body = document.getElementById('insertTable');
var tbl  = document.createElement('table');
tbl.id = "Donut_Table";

//Creates the header for the table: 'hours, times, total'
var createHeader = (function(){
  tbl.style.width  = '25px';
  tbl.style.border = '3px solid black';
  var tr = tbl.insertRow();
  var rowData = "<td><b>" + 'Shops' + "</b></td>";
  for(var i = 0; i < 11; i++){
    var time = 700 + (i*100);
    rowData += "<td><u>" + time + "</u</td>";
  }
  tr.innerHTML = rowData + "<td><b>" + 'Totals' + "</b></td>";
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
  console.log("Running click " + shopN + minC + maxC + avgD);
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
