public class ActionType extends MonoBehaviour
{
	public var 		_animation 		: Texture[];
	public var		_typeNeeded 	: Collectable.ObjectType;
	public var		_destroyItem 	: boolean;
	public var 		_sound 			: AudioClip;
	
	public function Action(type : Collectable.ObjectType, destroy : boolean)
	{
		this._typeNeeded = type;
		this._destroyItem = destroy;
	}
	
 	public function		doAction(Hero : HeroManager) : IEnumerator {}
	public function		getTypeNeeded() {return (this._typeNeeded);}
	public function		getIsToBeDestroyed() {return (this._destroyItem);}
};
