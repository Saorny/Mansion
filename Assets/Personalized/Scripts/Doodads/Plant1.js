#pragma strict

@DoNotSerialize
public class Plant1 extends Interactable {
	public var 	  _light			: Transform;
	protected var _in				: boolean;

	public function		Start() : void {
		super();
		this._light = this.transform.FindChild("Plant_skeleton/Body/Neck1/Neck2/Neck3/plant_light");
		this._in = false;
	}
	
	public function		OnTriggerEnter(body : Collider) {
		this._in = true;
		if (body.transform == this._heroBody)
		{
			this.animation.Play("plant1_close");
			this._light.active = false;
		}
	}
	
	public function		OnTriggerStay(body : Collider) {
		if (body.transform == this._heroBody && Input.GetButtonDown("Use")) {
			this._hero.addDialogText("How curious... I had never seen this kind of plants... It kinda looks unearthly...", 5.0, Message.messageType.DIALOG);
		}
	}
	
	public function		OnTriggerExit(body : Collider) {
		this._in = false;
		if (body.transform == this._heroBody) {
			this.animation.Play("plant1_open");
			yield WaitForSeconds(1);
			if (this._in == false) {
				this.animation.Play("plant1_idle");
				this._light.active = true;
			}
		}
	}
}
