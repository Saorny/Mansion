#pragma strict

@DoNotSerialize
public class EventDraft extends CinematicManager
{
	public	var		_furniture		: 	GameObject;
	
	public function		EventDraft()
	{
		this._triggered = false;
	}

	public function		OnTriggerEnter(body : Collider) : IEnumerator
	{
		if (this._heroBody != null && body.transform.name == this._heroBody.transform.name && this._furniture.renderer.isVisible && this._triggered == false)
		{
			this._triggered = true;
			this.setCinematicMode();
			yield this.MakeHeroLookAt(this._spots[0], 3);
			yield WaitForSeconds(1.0);
			this.setAdventureMode();
			this._hero.addDialogText('I should be able to push the bookcase... I have a funny feeling something is behind...', 6, Message.messageType.DIALOG);
			this._hero.addDialogText('Certain objects may be pushed.', 6, Message.messageType.TUTORIAL);
		}
	}
}
