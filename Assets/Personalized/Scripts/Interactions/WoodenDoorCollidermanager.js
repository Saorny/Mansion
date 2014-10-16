public var _door : WoodenDoorManager;
public var Hero : HeroManager;
public var state = 0;
public var locked : boolean;
public var _typeRequired : Collectable.ObjectType;

function OnTriggerStay()
{
   if (Input.GetButtonDown("Use") && this._door.isDoorVisible() == true)
   {
   		if (this.locked == true)
   		{
   			if (Hero.hasItem(this._typeRequired, true) == true)
   				this.locked = false;
	   		else
	   			this.Hero.lookingAtDoorLocked();
   		}
   		if  (this.locked == false)
   		{
	   		if (this._door.getBusy() == false)
	   		{
	   	  		if (state == 0)
	   	  		{
	      			this._door.Open();
	      			state = 1;
	      		}
	      		else
	      		{
	      			this._door.Close();
	      			state = 0;
	      		}
	      	}
	   	}
 	}
 }
 