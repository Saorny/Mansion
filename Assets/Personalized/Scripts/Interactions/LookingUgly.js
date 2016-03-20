#pragma strict

@DoNotSerialize
public class LookingUgly extends Interactable
{
	public var 	_comment	: String = "What a strange painting...";
	public var  _duration	: float = 3;

	function OnTriggerStay(body : Collider)
	{
		if (body.transform == this._heroBody && Input.GetButtonDown("Use") && gameObject.renderer.isVisible) {
			this._hero.addDialogText(this._comment, this._duration, Message.messageType.DIALOG);
			this._hero.lookingUgly();
		}
	}
}
