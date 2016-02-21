#pragma strict

@DoNotSerialize
public class HouseSpotting extends CinematicManager
{
	public	var		_house		: 	GameObject;
	public var		_thunder	:	GameObject;
	public var		_sound		:	AudioSource;

	public function		OnTriggerEnter(body : Collider)
	{
		if (body.transform.name == this._heroBody.transform.name && this._triggered == false)
		{
			this._triggered = true;
			this.setCinematicMode();
			yield this.MakeHeroLookAt(this._spots[0], 2);
			yield this.MakeHeroLookAt(this._spots[1], 3);
			yield WaitForSeconds(1.0);
			this._thunder.light.enabled = true;
			this._sound.Play();
			yield WaitForSeconds(0.3);
			this._thunder.light.enabled = false;
			yield WaitForSeconds(1.0);
			this.setAdventureMode();
			this._hero.addDialogText('This must be the house I was looking for...', 10, Message.messageType.DIALOG);
		}
	}
}
