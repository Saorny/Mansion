#pragma strict

@DoNotSerialize
public class InventoryCategory
{
	private var	_type 				: InventoryManager.InventoryMode;
	private var _title 				: String;
	private var _description	 	: String;
	private var _icon		 		: Texture;
	private var _ptr				: function() : void;
	
	public function InventoryCategory(type : InventoryManager.InventoryMode, title : String, description : String, icon : Texture, ptr : function() : void)
	{
		this._type = type;
		this._title = title;
		this._description = description;
		this._icon = icon;
		this._ptr = ptr;
	}
	
	public function InventoryCategory() {}
	
	public function getType() : InventoryManager.InventoryMode {return (this._type);}
	public function getTitle() : String {return (this._title);}
	public function getDescription() : String {return (this._description);}
	public function getIcon() : Texture {return (this._icon);}
	public function getPtr() : function() : void {return (this._ptr);}
};
