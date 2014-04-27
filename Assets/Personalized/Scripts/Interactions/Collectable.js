@script SerializeAll
public class Collectable
{
	private var	CollectableType 		: ObjectType;
	private var CollectableName 		: String;
	private var CollectableDescription 	: String;
	private var CollectableIcon 		: Texture;
	private var CollectableHandle		: boolean;
	
	public function SetCollectable(type : ObjectType, name : String, description : String, icon : Texture)
	{
		this.CollectableType = type;
		this.CollectableName = name;
		this.CollectableDescription = description;
		this.CollectableIcon = icon;
	}
	
	public function getType() {return (this.CollectableType);}
	public function getName() {return (this.CollectableName);}
	public function getDescription() {return (this.CollectableDescription);}
	public function getIcon() {return (this.CollectableIcon);}
};
