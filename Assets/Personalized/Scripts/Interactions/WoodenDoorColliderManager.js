#pragma strict

@script SerializeAll
public class WoodenDoorColliderManager extends Interactable
{
	public var _door : WoodenDoorManager;
	public var _state = 0;
	public var _locked : boolean = false;
	public var _typeRequired : Collectable.ObjectType;
	
	public function		Start() : void {
		super();
	}

	public function OnTriggerEnter(body : Collider) {
		if (body.transform == this._heroBody && this._door.isDoorVisible() == true) {
			this._hero.mayDislayTuto(TutorialManager.TutoList.OPEN_DOOR);
		}
	}

	public function OnTriggerStay(body : Collider) {
	   if (Input.GetButtonDown("Use") && body.transform == this._heroBody && this._door.isDoorVisible() == true) {
	   		if (this._locked == true) {
	   			if (this._hero.hasItem(this._typeRequired, true) == true) {
	   				this._locked = false;
	   				this._hero.heroSays(SoundManagerHero.HeroVoice.UNLOCKED);
	   				this._hero.addDialogText('I used the key to open the door!', 2, Message.messageType.DIALOG);
	   			}
		   		else {
		   			this._hero.heroSays(SoundManagerHero.HeroVoice.LOCKED);
		   			this._hero.addDialogText('The door is locked... I need to find the key!', 2, Message.messageType.DIALOG);
		   		}	
	   		}
	   		if  (this._locked == false) {
		   		if (this._door.getBusy() == false) {
		   	  		if (this._state == 0) {
		      			this._door.Open();
		      			this._state = 1;
		      		}
		      		else {
		      			this._door.Close();
		      			this._state = 0;
		      		}
		      	}
		   	}
	 	}
	 }
}
 