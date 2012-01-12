$(document).ready(function(){  

 function makeData(){
    // Create some data
    this.obj1 = {name:'mozart', age:59, camera:'AE1'};
    this.obj2 = {name:'roque', age:76, camera: 'Rolleiflex'};
    this.obj3 = {name:'adair', age:69, camera: 'EOS'};
    
    
    // Create a collection instance
    this.col = new Collection();
    
    // Add data to collection object
    this.col.add(this.obj1);
    this.col.add(this.obj2);
    this.col.add(this.obj3);
    
    // Loose object
    this.obj4 = {name:'Ana', age:19, camera: 'Sony'};  
  }
    
  module("No data Test");  
  test("Empty collection test", function()  
  {  
   
   var d1 = new makeData();
  
    // Create an empty collection instance
    var col = new Collection();
   
   ok(col.isEmpty(),  
      'isEmpty() Expected [true], got: ' + col.isEmpty());  
   
   equals(col.size(), 0,  
      'size() got: ' + col.size());  
      
      
   ok(col.hasNext()===false,  
      'hasNext() Expected [false], got: ' + col.hasNext());  
      
   equals(col.get(d1.obj1), undefined,  
      'get(obj1) got: ' + col.get(d1.obj1));  
      
   equals(col.get(1), undefined,  
      'get(1) got: ' + col.get(1));  
      
   equals(col.contains(d1.obj1), false,  
      'contains(obj1) got: ' + col.contains(d1.obj1));  
      
  });


  module("Populate data Test");  
  test("Enter data test", function()  
  {  
    var d2 = new makeData();
    var col = d2.col;
    
    equals(col.get(0), d2.obj1,  
      'get(0) got: ' + col.get(0));  
    
    ok(col.isEmpty()===false,  
      'isEmpty() Expected[false], got: ' + col.isEmpty());  
    
    equals(col.size(), 3,  
      'size() got: ' + col.size());
      
    ok(col.hasNext()===true,  
      'hasNext() Expected [true], got: ' + col.hasNext());  
    
    var nextItem = col.next();    
    equals(nextItem, d2.obj1,  
      'next() got: ' + nextItem);  
    
    equals(col.contains(d2.obj1), true,  
      'contains(d2.obj1) got: ' + col.contains(d2.obj1));  
    
    equals(col.indexOf(d2.obj1), 0,  
      'indexOf(d2.obj1) got: ' + col.indexOf(d2.obj1));  
      
    equals(col.contains(d2.obj3), true,  
      'contains(d2.obj3) got: ' + col.contains(d2.obj3));  
     
    equals(col.indexOf(d2.obj3), 2,  
      'indexOf(d2.obj3) got: ' + col.indexOf(d2.obj3));  
        
     
    equals(col.contains(d2.obj4), false,  
      'contains(d2.obj4) got: ' + col.contains(d2.obj4));  
    
    equals(col.indexOf(d2.obj4), -1,  
      'indexOf(d2.obj4) got: ' + col.indexOf(d2.obj4)); 
    });
      
    
  module("Remove data Test");  
  test("Remove test", function()  
  {  
    var d3 = new makeData();
    var col = d3.col;  
      
   col.remove(d3.obj2);
   equals(col.size(), 2,  
      'size() after remove(d3.obj2) got: ' + col.size());  

   col.remove(d3.obj4);
   equals(col.size(), 2,  
      'Expected to keep size value after remove on a item that is not in the collection , got: ' + col.size());  
      
   var predicate = function(item) { 
      return item['camera']=='AE1'; 
   }
    
   col.removeByPredicate( predicate);
   equals(col.size(), 1,  
      'removeByPredicate(function(item) { return item["camera"]=="AE1"; } ) , got: ' + col.size());  
   
   equals(col.get(0), d3.obj3,  
      'col.get(0) got: ' + col.get(0));  
      
  });  
  
  
  module("Parse Test");  
  test("parseAndBuild no separator test", function()  
  {  
   var col = Collection.prototype.parseAndBuild('a b c');
   equals(col.size(), 3,  
      'col.parseAndBuild("a b c").size() , got: ' + col.size()); 
      
   equals(col.indexOf('a'), 0,  
      'indexOf("a") got: ' + col.indexOf("a"));  
    
   equals(col.get(1), 'b',  
      'get(1) got: ' + col.get(1));  
      }); 
 
   test("parseAndBuild with separator test", function()  
  {  
   var  col = Collection.prototype.parseAndBuild('a:b:c',':');
   equals(col.size(), 3,  
      'col.parseAndBuild("a:b:c",":").size() , got: ' + col.size()); 
      
   equals(col.indexOf('a'), 0,  
      'indexOf("a") got: ' + col.indexOf("a"));  
    
   equals(col.get(1), 'b',  
      'get(1) got: ' + col.get(1));   
      
      col.flatten();
  }); 
  
  
});  
