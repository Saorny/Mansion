#pragma strict

@DoNotSerialize
public class LookingUninteresting extends Interactable
{
	public var object					: GameObject;
	public var _comment					: String = "Nothing useful...";
	public var _time					: float = 2.0;
	
	public function OnTriggerStay(body : Collider)
	{
		if (body.transform == this._heroBody && Input.GetButtonDown("Use") && object.renderer.isVisible) {
			this._hero.lookingUninteresting();
			this._hero.addDialogText(this._comment, this._time, Message.messageType.DIALOG);
		}
	}
}
