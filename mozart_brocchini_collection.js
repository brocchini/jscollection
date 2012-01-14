/*

@Author Mozart Brocchini
@Author http://www.linkedin.com/in/brocchini
@Author @brocchini

----
Usage

// Create some data
var obj1 = {name:'mozart', age:59, camera:'AE1'};
var obj2 = {name:'roque', age:76, camera: 'Rolleiflex'};
var obj3 = {name:'adair', age:69, camera: 'EOS'};

// Create a collection instance
var col = new Collection();

// Add data to collection object
col.add(obj1);
col.add(obj2);
col.add(obj3);

// Call a map function on each collection item 
col.each( 
  function(it){
    alert('Camera is '+ it.camera+ ', age=' +it.age);
  });

// Iterate to next item
col.next();

// Call show on a property
col.show('name');

alert(col.flatten(' : ', 'camera'));

// Remove an item based on a property value
col.removeByPredicate(
function(it){ return it['name']=='roque';}
);
col.show('camera');

*/

if (!window.console) {console = {}}
console.log = console.log || function() {};
console.warn = console.warn || function() {};
console.error = console.error || function() {};
console.info = console.info || function() {};

function Collection( dataArray )
{
    // Private members
	var listContainer_ = dataArray ? dataArray : new Array();
	var pointer_ = -1;
    
    function inc () 
    {
      return ++pointer_;
    }
    
    // Privileged API
    this.size = function () {
        return listContainer_.length;
    }
    
    this.index = function () {
        return pointer_;
    }
    
    this.next = function ()
	{  
		if ( !this.hasNext() )
		{
			return null;
		}
		return (listContainer_[inc()]);
	}
	
    this.add = function ( obj )
	{
		listContainer_[this.size()] = obj;
	}
	
	this.get = function ( i )
	{
	  return listContainer_[i];	
	}
	
	this.reset = function ()
	{
	  pointer_ = -1;
	}

    this.removeCurrent = function ()
    {
       listContainer_.splice(this.index(), 1);
    }
}

Collection.prototype = {

	isEmpty : function ()
	{
		return !this.size() > 0;
	},
  
	hasNext : function ()
	{
		return ( !this.isEmpty() ) &&  ( ( this.index() + 1) < this.size() );
	},
	
	contains : function ( obj )
	{
	    this.reset();
		var item;
		while( this.hasNext())
		{
			item = this.next();
			if ( obj == item )
			{
				return true;
			}
		}
	
		return false;
	},
	
	indexOf: function ( item )
	{
		this.reset();
		while( this.hasNext())
		{
			if (this.next() == item )
			{
				return this.index();
			}
		}
        
        return -1;
	},

    removeByPredicate : function ( predicate )
	{
		this.reset();
		while( this.hasNext())
		{
		    var item = this.next();
			if ( predicate( item ) )
			{
				this.removeCurrent();
			}
		}
	},

    remove : function ( item )
	{
        this.removeByPredicate( function(it){ return it==item;} );
	},
	
	search : function ( comparatorProperty, comparatorValue )
	{
		this.reset();
		var item = null;
		while( this.hasNext())
		{
			item = this.next();
			if (item[comparatorProperty] == comparatorValue )
			{
				return item;
			}
		}
		item = null;

		return item;
	},

	each : function ( map )
	{
		this.reset();
		var item = null;
		while( this.hasNext())
		{
			item = this.next();
			map (item)
		}
	},

	flatten : function ( separator, property )
	{
		var separ = separator ? separator : ' ';
		var result = null;
		
        var glue = function(a,b) { 
         if (a) { return a + separ + b; }
         else { return b; } };
         
        var concat = function(it){ 
          if ( property ) { result = glue(result, it[property]); }
          else { result = glue(result, it);  }
         };
         
        this.each(concat);	 		
		return result;
	},

	parseAndBuild : function ( source, separator )
	{
		var separ;
		if ( separator )
		{
			separ = separator;
		}
		else
		{
			separ = ' ';
		}
		
		return new Collection( source.split( separ ) );
	}
}