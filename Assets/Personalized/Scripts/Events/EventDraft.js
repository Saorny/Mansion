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
		if (body.transform.name == this._heroPos.transform.name && this._furniture.renderer.isVisible && this._triggered == false)
		{
			this._triggered = true;
			this.setCinematicMode();
			yield this.transitCamera(5);
			this._draft.Play();
			yield WaitForSeconds(3.0);
			this.setAdventureMode();
			
		}
	}
}
