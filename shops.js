'use strict'
//Declares and instantiates the necessary properties
var Shop = function(shopName, minCustomers, maxCustomers, avgDonuts){
  this.shopName = shopName;
  this.minCustomers = minCustomers;
  this.maxCustomers = maxCustomers;
  this.avgDonuts = avgDonuts;
  this.opens = 700;
  this.closes = 1800;
  this.hoursOpen = (this.closes - this.opens)/100;
  this.hourly = [];
  this.totalDonuts = 0;
};

//Runs the program to DOM
Shop.prototype.render = function(){
  this.insertShop();
};

Shop.prototype.donutsPerDay = function(){

  //Fills in the array 'hourly'
  for(var i = 0; i < this.hoursOpen; i++){
    this.hourly[i] = (Math.floor((Math.random() * (this.maxCustomers - this.minCustomers + 1) + this.minCustomers) * this.avgDonuts));
  }
  console.log(this.hourly + this.shopName + ' hourly' );

  //The sum of the array 'hourly' to get the total number of donuts that day
  for (var j=0; j<this.hoursOpen; j++){
    this.totalDonuts += this.hourly[j];
  }
  console.log(this.totalDonuts + ' totalDonuts');
};

//Finds body in html and creates a table
var body = document.body;
var tbl  = document.createElement('table');

//Creates the header for the table: 'hours, times, total'
var createTable = function(){
  tbl.style.width  = '100px';
  tbl.style.border = '1px dashed black';
  var tr = tbl.insertRow();
  var rowData = "<td style: bold>" + 'Shops' + "</td>";
  for(var i = 0; i < 11; i++){
    var time = 700 + (i*100);
    rowData += "<td>" + time + "</td>";
  }
  tr.innerHTML = rowData + "<td>" + 'Totals' + "</td>";
  tbl.appendChild(tr);
  body.appendChild(tbl);
};

//Creates a row for the given shop and fills in the corresponding data (aka magic)
Shop.prototype.insertShop = function(){
  this.donutsPerDay();
  var tr = tbl.insertRow();
  var rowData = "<td>" + this.shopName + "</td>";
  for(var i = 0; i < this.hourly.length; i++){
    rowData += "<td>" + this.hourly[i] + "</td>";
  }
  tr.innerHTML = rowData + "<td>" + this.totalDonuts + "</td>";
  tbl.appendChild(tr);
};

//Creates the header and main table
createTable();

//Declaring and instantiating new shops --> calling render to add to table
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
