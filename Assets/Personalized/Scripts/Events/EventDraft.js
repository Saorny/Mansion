#pragma strict

@DoNotSerialize
public class EventDraft extends CinematicManager
{
	public	var		_furniture		: 	GameObject;
	public var		_draft			:	AudioSource;
	
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
			yield this.MakeHeroLookAt(this._spots[0], 5);
			this._draft.Play();
			yield WaitForSeconds(3.0);
			this.setAdventureMode();
			this._hero.addDialogText('I should be able to push the bookcase... I have a funny feeling something is behind...', 3, Message.messageType.DIALOG);
		}
	}
}
