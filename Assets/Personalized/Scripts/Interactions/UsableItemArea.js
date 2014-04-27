#pragma strict

public var 		Hero 			: Interaction;
public var		_action			: ActionType;

public function		OnTriggerEnter() { this.Hero.setUsableItemArea(this); }

public function OnTriggerExit () { this.Hero.setUsableItemArea(null); }

public function		tryObjectHere(type : ObjectType)
{
	if (type == _action.getTypeNeeded())
	{
		Hero.closeInventoryMode();
		if (this._action)
			this._action.doAction(Hero);
	}
}