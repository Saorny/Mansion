#pragma strict

@DoNotSerialize
public class StairCaseSpotting extends CinematicManager
{
	public function		OnTriggerEnter(body : Collider)
	{
		if (body.transform.name == this._heroBody.transform.name && this._triggered == false)
		{
			this._triggered = true;
			this.setCinematicMode();
			yield this.MakeHeroLookAt(this._spots[0], 5);
			yield this.MakeHeroLookAt(this._spots[1], 5);
			this.setAdventureMode();
			this._hero.addDialogText('What can of weirdo could live in such a place?..', 4, Message.messageType.DIALOG);
			Destroy (this);
		}
	}
}
