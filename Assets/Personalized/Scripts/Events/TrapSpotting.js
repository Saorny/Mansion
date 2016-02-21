#pragma strict

@DoNotSerialize
public class TrapSpotting extends CinematicManager
{
	public var		_screamer	:	AudioSource;
	
	public function		OnTriggerEnter(body : Collider)
	{
		if (body.transform.name == this._heroBody.transform.name && this._triggered == false) {
			this._triggered = true;
			this.setCinematicMode();
			yield this.MakeHeroLookAt(this._spots[0], 1);
			yield this.MakeHeroLookAt(this._spots[1], 5);
			this._screamer.Play();
			yield this.MakeHeroLookAt(this._spots[0], 0.2);
			this._hero.scareHero(100);
			this.setAdventureMode();
			this._hero.addDialogText('Poor fellow... I need to be extra careful!', 4, Message.messageType.DIALOG);
		}
	}
}
