#pragma strict

@DoNotSerialize
public class RockingChairKeyCollect extends CollectableCollider
{
	public var		_sound			: AudioSource;
	public var		_rockingChair	: GameObject;

	public function		OnTriggerStay(body : Collider) : void
	{
		if (body.transform == this.getHeroBody() && Input.GetButtonDown("Use") && this.object.renderer.isVisible) 
	   	{
			this.getHero().getCollectable(this.ItemType, this.ItemName, this.ItemDescription, this.ItemIcon);
			if (this.sound)
				AudioSource.PlayClipAtPoint(this.sound, transform.position, 20);
			this.rockTheBoat();
			this._hero.scareHero(80);
			Destroy (this.object.gameObject);
			Destroy (this);
	   	}
	}

	private function	rockTheBoat() : void
	{
		this._sound.Play();
		this._rockingChair.animation.Play("Rocking");
	}
}
