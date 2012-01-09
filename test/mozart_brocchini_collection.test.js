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
      'Expected [true] as the result of isEmpty() , result was: ' + col.isEmpty());  
   
   equals(col.size(), 0,  
      'Expected [0] as the result of size() , result was: ' + col.size());  
      
      
   ok(col.hasNext()===false,  
      'Expected [false] as the result of hasNext() , result was: ' + col.hasNext());  
      
   equals(col.get(obj1), null,  
      'Expected [null] as the result of get(obj1) , result was: ' + col.get(obj1));  
      
   equals(col.contains(obj1), false,  
      'Expected [false] as the result of contains(obj1) , result was: ' + col.contains(obj1));  
      
    // Add data to collection object
    col.add(obj1);
    col.add(obj2);
    col.add(obj3);
    
    equals(col.get(0), obj1,  
      'Expected [obj1] as the result of get(0) , result was: ' + col.get(obj1));  
    
    ok(col.isEmpty()===false,  
      'Expected [false] as the result of isEmpty() , result was: ' + col.isEmpty());  
    
    equals(col.size(), 3,  
      'Expected [3] as the result of size() , result was: ' + col.size());
      
    ok(col.hasNext()===true,  
      'Expected [true] as the result of hasNext() , result was: ' + col.hasNext());  
    
    var nextItem = col.next();    
    equals(nextItem, obj1,  
      'Expected [obj1] as the result of next() , result was: ' + nextItem);  
    
    equals(col.contains(obj1), true,  
      'Expected [true] as the result of contains(obj1) , result was: ' + col.contains(obj1));  
    
    equals(col.indexOf(obj1), 0,  
      'Expected [0] as the result of indexOf(obj1) , result was: ' + col.indexOf(obj1));  
      
    equals(col.contains(obj3), true,  
      'Expected [true] as the result of contains(obj3) , result was: ' + col.contains(obj3));  
     
    equals(col.indexOf(obj3), 2,  
      'Expected [2] as the result of indexOf(obj3) , result was: ' + col.indexOf(obj3));  
        
     
    equals(col.contains(obj4), false,  
      'Expected [true] as the result of contains(obj4) , result was: ' + col.contains(obj4));  
    
    equals(col.indexOf(obj4), -1,  
      'Expected [-1] as the result of indexOf(obj4) , result was: ' + col.indexOf(obj4));  
      
   col.remove(obj2);
   equals(col.size(), 2,  
      'Expected [2] as the result of size() after remove(obj2) , result was: ' + col.size());  

   col.remove(obj4);
   equals(col.size(), 2,  
      'Expected to keep size value after remove on a item that is not in the collection , result was: ' + col.size());     
        
  });  
});  