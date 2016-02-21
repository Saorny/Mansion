#pragma strict

@DoNotSerialize
public class LookingUgly extends Interactable
{
	function OnTriggerStay(body : Collider)
	{
		if (body.transform == this._heroBody && Input.GetButtonDown("Use") && gameObject.renderer.isVisible) {
			this._hero.addDialogText("What a strange painting...", 3.0, Message.messageType.DIALOG);
			this._hero.lookingUgly();
		}
	}
}
