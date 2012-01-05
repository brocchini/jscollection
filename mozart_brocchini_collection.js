/*

@Author Mozart Brocchini
@Author http://www.linkedin.com/in/brocchini
@Author @brocchini

----
Use case 1

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
col.removeUsingProperty('name',obj2.name);
col.show('camera');

----
Use case 2
var col = new Collection();

// Parse a [space] separated list
col.createFromList('mozart roque adair');

alert(col.flatten());
col.show();
col.remove('mozart');
col.show();

col.add('ana');
col.show();

*/
function Collection()
{
	this.listContainer_	= new Array();
	this.pointer_ = -1;
}

Collection.prototype = {

	isEmpty : function ()
	{
		return !this.listContainer_.length > 0;
	},

	hasNext : function ()
	{
		return ( !this.isEmpty() ) &&  ( ( this.pointer_ + 1) <  this.listContainer_.length );
	},

	next : function ()
	{
		if ( !this.hasNext() )
		{
			return null;
		}
		return (this.listContainer_[++this.pointer_]);

	},

	get : function ( obj )
	{
		this.pointer_ = -1;
		var item;
		while( this.hasNext())
		{
			item = this.next();
			if ( obj == item )
			{
				return item;
			}
		}

		item = null;

		return item;
	},

	contains : function ( obj )
	{
		return  ( this.get ( obj ) ) != null;
	},

	search : function ( comparatorProperty, comparatorValue )
	{
		this.pointer_ = -1;
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
		this.pointer_ = -1;
		var item = null;
		while( this.hasNext())
		{
			item = this.next();
			map (item)
		}
	},
	
	add : function ( obj )
	{
		this.listContainer_[this.listContainer_.length] = obj;
	},

	remove : function ( item )
	{
		this.pointer_ = -1;
		while( this.hasNext())
		{
			if (this.next() == item )
			{
				this.listContainer_.splice(this.pointer_, 1);
			}
		}

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

	flatten : function ( separator, property )
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

	removeUsingProperty : function ( comparatorProperty, comparatorValue )
	{
		this.pointer_ = -1;
		while( this.hasNext())
		{
			if (this.next()[comparatorProperty] == comparatorValue )
			{
				this.listContainer_.splice(this.pointer_, 1);
			}
		}
	}

}