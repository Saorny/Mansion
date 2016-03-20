#pragma strict

@script SerializeAll
public class Hittable extends Interactable
{
	public var 		_hurtSounds		: AudioClip[];
	public var		_volume			: float;
	public var		_body			: GameObject;
	public var		_hp				: int;
	public var		_destructibles	: GameObject[];
		
	public function		Start() : void {
		this._volume = 20.0;
		super();
	}
	
	public function		OnTriggerEnter(body : Collider) : void
	{
		if (body.transform == this._heroBody)
			this._hero.addTarget(this.gameObject);
	}
	
	public function		OnTriggerExit(body : Collider) : void
	{
		if (body.transform == this._heroBody)
			this._hero.removeTarget(this.gameObject);
	}
	
	public function		hit(weapon : Weapon) : boolean
	{
		var damage : int;
		
		this.playHurt();
		damage = Mathf.Round((Random.value * (weapon.getMaxDamage() - weapon.getMinDamage())) + weapon.getMinDamage());
		this._hp -= damage;
		
		return (this._hp > 0);
	}
	
	public function		isVisible() : boolean { return (this._body.renderer.isVisible == true); }
	
	public function		die() : void
	{
		var obj : GameObject;
	
		for (var i : int = 0 ; i < this._destructibles.length ; ++i)
		{
			GameObject.Destroy(this._destructibles[i].gameObject);
			
		}
		GameObject.Destroy(this.gameObject);
	}
	
	protected function		playHurt() : IEnumerator
	{
		var sound : AudioClip;

		sound = this._hurtSounds[Mathf.Round(Random.value * (this._hurtSounds.length - 1))];
		if (sound)
			AudioSource.PlayClipAtPoint(sound, this.transform.position, this._volume);
	}
}
