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

Shop.prototype.render = function(){
  this.donutsPerHour();
  this.donutsPerDay();
  this.insertShop();
};

Shop.prototype.randomCustomers = function(){
  return Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers;
};

Shop.prototype.createDonuts = function(){
  return Math.floor(this.randomCustomers() * this.avgDonuts);
};

Shop.prototype.donutsPerHour = function(){
  for(var i = 0; i < this.hoursOpen; i++){
    this.hourly[i] = this.createDonuts();
  }
  console.log(this.hourly + this.shopName + ' hourly' );
};

Shop.prototype.donutsPerDay = function(){
  for (var i=0; i<this.hoursOpen; i++){
    this.totalDonuts += this.hourly[i];
  }
  console.log(this.totalDonuts + ' totalDonuts');
};

var body = document.body;
var tbl  = document.createElement('table');

var createTable = function(){
  tbl.style.width  = '100px';
  tbl.style.border = '1px solid black';

  for(var i = 0; i < 1; i++){
    var tr = tbl.insertRow();
    if(i === 0){
      var td = tr.insertCell();
      td.appendChild(document.createTextNode('Hours:'));
      td.style.border = '1px solid black';
    }
    for(var j = 0; j < 12; j++){
      if(i===0 && j < 11){
        var time = 700 + (j*100);
        var td1 = tr.insertCell();
        td1.appendChild(document.createTextNode(time));
        td1.style.border = '1px solid black';
      } else {
        var td2 = tr.insertCell();
        td2.appendChild(document.createTextNode('Totals'));
        td2.style.border = '1px solid black';
      }
    }
  }
  body.appendChild(tbl);
};

Shop.prototype.insertShop = function(){
  for(var i = 0; i < 1; i++){
    var tr = tbl.insertRow();
    for(var j = 0; j < 13; j++){
      var td = tr.insertCell();
      if(j%2){
        td.style.background = 'gray';
      }
      if(j === 0){
        //var td = tr.insertCell();
        td.appendChild(document.createTextNode(this.shopName));
        td.style.border = '1px solid black';
      } else if (i===0 && j === 12) {
        //var td1 = tr.insertCell();
        td.appendChild(document.createTextNode(this.totalDonuts));
        td.style.border = '1px solid black';
      } else {
        td.appendChild(document.createTextNode(this.hourly[j - 1]));
        td.style.border = '1px solid black';
      }
    }
  }
};

createTable();

var downtown = new Shop('Downtown', 8, 43, 4.5);
downtown.render();

var capitolHill = new Shop('Capitol Hill', 4, 37, 2);
capitolHill.render();

var southLakeUnion = new Shop('South Lake Union', 9, 23, 6.33);
southLakeUnion.render();

var wedgewood = new Shop('Wedgewood', 2, 28, 1.25);
wedgewood.render();

var ballard = new Shop('Ballard', 8, 58, 3.75);
ballard.render();
