public class ActionType extends MonoBehaviour
{
	public var 		_animation 		: Texture[];
	public var		_typeNeeded 	: ObjectType;
	public var		_destroyItem 	: boolean;
	public var 		_sound 			: AudioClip;
	
	public function Action(type : ObjectType, destroy : boolean)
	{
		this._typeNeeded = type;
		this._destroyItem = destroy;
	}
	
 	public function		doAction(Hero : Interaction) : IEnumerator {}
	public function		getTypeNeeded() {return (this._typeNeeded);}
	public function		getIsToBeDestroyed() {return (this._destroyItem);}
};

/*if (GUI.Button (Rect (	(Screen.width / 2) - (parseInt(Button_Data.BUTTON_WIDTH) / 2), i * (parseInt(Button_Data.BUTTON_HEIGHT) + parseInt(Button_Data.INTER_SPACE)) + parseInt(Button_Data.INTER_SPACE),
									parseInt(Button_Data.BUTTON_WIDTH), parseInt(Button_Data.BUTTON_HEIGHT), this._subMenus[i].getText())))*/
