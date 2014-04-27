#pragma strict

@DoNotSerialize
public class HouseSpotting extends CinematicManager
{
	public	var		_house		: 	GameObject;
	public var		_thunder	:	GameObject;
	public var		_sound		:	AudioSource;

	public function		OnTriggerEnter(body : Collider)
	{
		if (body.transform.name == this._heroPos.transform.name && this._triggered == false)
		{
			this._triggered = true;
			this.setCinematicMode();
			yield this.transitCamera(2);
			yield this.takeCinematicView(this._poses[0], 3.0);
			yield WaitForSeconds(1.0);
			this._thunder.light.enabled = true;
			this._sound.Play();
			yield WaitForSeconds(0.3);
			this._thunder.light.enabled = false;
			yield WaitForSeconds(1.0);
			this.setAdventureMode();
		}
	}
}
