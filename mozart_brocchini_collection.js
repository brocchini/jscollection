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

// Call map a function to each collection item 
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
col.removebyPredicate(
function(it){ return it['name']=='roque';}
);
col.show('camera');

*/

if (!window.console) {console = {}}
console.log = console.log || function() {}
console.warn = console.warn || function() {}
console.error = console.error || function() {}
console.info = console.info || function() {}

function Collection()
{
    // Private members
	var listContainer_ = new Array();
	var pointer_ = -1;
	_ = this;
    
    function inc () 
    {
      return ++pointer_;
    }
    
    
    // Public low level API
    this.size = function ()
    {
      return listContainer_.length;
    }
    
    this.index = function ()
    {
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

	this.remove = function ( item )
	{
		this.reset();
		while( this.hasNext())
		{
			if (this.next() == item )
			{
				listContainer_.splice(this.index(), 1);
			}
		}
	}
	
	this.removeByPredicate = function ( predicate )
	{
		this.reset();
		while( this.hasNext())
		{
		    var item = this.next()
			if ( predicate( item ) )
			{
				listContainer_.splice(pointer_, 1);
			}
		}
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
		this.reset();

		var separ;
		if ( separator )
		{
			separ = separator;
		}
		else
		{
			separ = ' ';
		}

		var result = '';
		while( this.hasNext() )
		{
			var item = this.next();

			if ( property )
			{
				result = result + item[property];
			}
			else
			{
				result = result + item;
			}

			if ( this.hasNext() )
			{
				result = result + separ;
			}
		}

		return result;
	},

	createFromList : function ( source, separator )
	{
		this.pointer_ = -1;
		var separ;
		if ( separator )
		{
			separ = separator;
		}
		else
		{
			separ = ' ';
		}
		this.listContainer_ = source.split( separ );
	},
	
	show : function ( property )
	{
		this.pointer_ = -1;
		var result = 'Collection\n\n';
		while( this.hasNext())
		{	if ( property )
			{
				result = result + ' ' + property + ': ';+  this.next()[property] + '\n';
			}
			else
			{
				result = result + ' ' +  this.next() + '\n';
			}
		}
		alert(result);
	},

}