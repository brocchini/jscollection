$(document).ready(function(){  

  module("Basic Unit Test");  
  test("Sample test", function()  
  {  
  
    // Create some data
    var obj1 = {name:'mozart', age:59, camera:'AE1'};
    var obj2 = {name:'roque', age:76, camera: 'Rolleiflex'};
    var obj3 = {name:'adair', age:69, camera: 'EOS'};
    
    var obj4 = {name:'Ana', age:19, camera: 'Sony'};

    // Create a collection instance
    var col = new Collection();
   
   ok(col.isEmpty(),  
      'isEmpty() Expected [true], got: ' + col.isEmpty());  
   
   equals(col.size(), 0,  
      'size() got: ' + col.size());  
      
      
   ok(col.hasNext()===false,  
      'hasNext() Expected [false], got: ' + col.hasNext());  
      
   equals(col.get(obj1), undefined,  
      'get(obj1) got: ' + col.get(obj1));  
      
   equals(col.get(1), undefined,  
      'get(1) got: ' + col.get(1));  
      
   equals(col.contains(obj1), false,  
      'contains(obj1) got: ' + col.contains(obj1));  
      
    // Add data to collection object
    col.add(obj1);
    col.add(obj2);
    col.add(obj3);
    
    equals(col.get(0), obj1,  
      'get(0) got: ' + col.get(0));  
    
    ok(col.isEmpty()===false,  
      'isEmpty() Expected[false], got: ' + col.isEmpty());  
    
    equals(col.size(), 3,  
      'size() got: ' + col.size());
      
    ok(col.hasNext()===true,  
      'hasNext() Expected [true], got: ' + col.hasNext());  
    
    var nextItem = col.next();    
    equals(nextItem, obj1,  
      'next() got: ' + nextItem);  
    
    equals(col.contains(obj1), true,  
      'contains(obj1) got: ' + col.contains(obj1));  
    
    equals(col.indexOf(obj1), 0,  
      'indexOf(obj1) got: ' + col.indexOf(obj1));  
      
    equals(col.contains(obj3), true,  
      'contains(obj3) got: ' + col.contains(obj3));  
     
    equals(col.indexOf(obj3), 2,  
      'indexOf(obj3) got: ' + col.indexOf(obj3));  
        
     
    equals(col.contains(obj4), false,  
      'contains(obj4) got: ' + col.contains(obj4));  
    
    equals(col.indexOf(obj4), -1,  
      'indexOf(obj4) got: ' + col.indexOf(obj4));  
      
   col.remove(obj2);
   equals(col.size(), 2,  
      'size() after remove(obj2) got: ' + col.size());  

   col.remove(obj4);
   equals(col.size(), 2,  
      'Expected to keep size value after remove on a item that is not in the collection , got: ' + col.size());     
        
  });  
});  
