public var _door : WoodenDoorManager;
public var state = 0;
public var locked : boolean;
public var _typeRequired : Collectable.ObjectType;
private var _hero : HeroManager;
private var _heroBody 	: Transform;

public function OnTriggerStay(body : Collider)
{
   if (Input.GetButtonDown("Use") && body.transform == this._heroBody && this._door.isDoorVisible() == true)
   {
   		if (this.locked == true)
   		{
   			if (this._hero.hasItem(this._typeRequired, true) == true) {
   				this.locked = false;
   				this._hero.addDialogText('I used the key to open the door!', 5, Message.messageType.DIALOG);
   			}
	   		else {
	   			this._hero.lookingAtDoorLocked();
	   			this._hero.addDialogText('The door is locked... I need to find the key!', 5, Message.messageType.DIALOG);
	   		}	
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
 
public function		Start() : void
{
	var	hero : GameObject;

	hero = GameObject.Find("Hero");
	this._heroBody = hero.transform;
	this._hero = hero.GetComponent("HeroManager") as HeroManager;
}
 