#pragma strict

@DoNotSerialize
public class MonsterSpotting extends CinematicManager
{
	public var		_scream		:	AudioSource;
	public var		_monster	:	Creature;
	public	var 	_exitArea 	:	Transform;
	public	var 	_spotArea 	:	Transform;
	
	public function		OnTriggerEnter(body : Collider)
	{
		if (body.transform.name == this._heroBody.transform.name && this._triggered == false) {
			this._triggered = true;
			this.setCinematicMode();
			yield this.MakeHeroLookAt(this._spots[0], 1);
			this._monster.moveTo(this._spotArea, 3.0);
			yield this.MakeHeroLookAt(this._spots[1], 3);
			this._scream.Play();
			this._hero.scareHero(100);
			yield WaitForSeconds(1.0);
			yield this._monster.lookAt(this._exitArea, 1.0);
			yield this._monster.moveTo(this._exitArea, 3.0);
			Destroy (this._monster.gameObject);
			this.setAdventureMode();
			this._hero.addDialogText('What on earth was this thing?!', 4, Message.messageType.DIALOG);
		}
	}
}
