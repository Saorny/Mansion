#pragma strict

@DoNotSerialize
public class WeaponCollider extends CollectableCollider
{
	public var _animation			: Texture[];
	public var _canAttack 			: boolean;
	public var _minDamage 			: int;
	public var _maxDamage 			: int;
	public var _coldown 			: float;
	
	public function OnTriggerStay(body : Collider)
	{
		if (body.transform == this.getHeroBody() && Input.GetButtonDown("Use") && this._object.renderer.isVisible) 
	   	{
	   		this._hero.mayDislayTuto(TutorialManager.TutoList.WEAPON_COLLECTED);
	   		this.getHero().giveWeapon(	this.ItemType, this.ItemName, this.ItemDescription, this.ItemIcon,
	   									this._animation, this._canAttack, this._minDamage, this._maxDamage, this._coldown);
			if (this.sound)
				AudioSource.PlayClipAtPoint(this.sound, transform.position, 20);
			Destroy (this._object.gameObject);
			Destroy (this);
	   	}
	}
}
