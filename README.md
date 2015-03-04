#A JavaScript Collection implementation without external dependencies

----
Usage
```javascript
// Create some data
var obj1 = {name:'Ana', age:19, camera:'AE1'};
var obj2 = {name:'Rod', age:76, camera: 'Rolleiflex'};
var obj3 = {name:'Sandy', age:69, camera: 'EOS'};

// Create a collection instance
var col = new Collection();

// Add data to collection object
col.add(obj1)   
   .add(obj2)
   .add(obj3);

// Iterate to next item
alert(col.next()['name']);

// Sort by property
col.sortBy('name');

// Call a function on each collection item 
col.each( 
  function(it){
    alert('Camera is '+ it.camera+ ', age=' +it.age);
  });

alert(col.flatten(' : ', 'camera'));

// Remove an item based on a property value
col.removeByPredicate(
 function(it){ return it['name']=='Rod';}
);

```
