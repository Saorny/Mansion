@script SerializeAll
public class Collectable
{
	protected var _type 			: ObjectType;
	protected var _name 			: String;
	protected var _description 		: String;
	protected var _icon 			: Texture;
	
	public enum ObjectType { nothing, key_entrance, key_basement, lamp, mine_pick, book }
	
	public function Collectable(type : ObjectType, name : String, description : String, icon : Texture)
	{
		this._type = type;
		this._name = name;
		this._description = description;
		this._icon = icon;
	}
	
	public function Collectable() {}
	
	public function getType() : ObjectType {return (this._type);}
	public function getName() : String {return (this._name);}
	public function getDescription() : String {return (this._description);}
	public function getIcon() : Texture {return (this._icon);}
};
