#pragma strict

@DoNotSerialize
public class RockingChairKeyCollect extends CollectableCollider
{
	public var		_sound			: AudioSource;
	public var		_rockingChair	: GameObject;

	public function		OnTriggerStay(body : Collider) : void
	{
		if (body.transform == this.getHeroBody() && Input.GetButtonDown("Use") && this._object.renderer.isVisible) 
	   	{
			this._hero.getCollectable(this.ItemType, this.ItemName, this.ItemDescription, this.ItemIcon, this._heroComment, this._heroCommentTime);
			if (this.sound)
				AudioSource.PlayClipAtPoint(this.sound, transform.position, 20);
			this.rockTheBoat();
			this._hero.scareHero(80);
			this._hero.addDialogText('This house is... unholy!!!', 3, Message.messageType.DIALOG);
			Destroy (this._object.gameObject);
			Destroy (this);
	   	}
	}

	private function	rockTheBoat() : void
	{
		this._sound.Play();
		this._rockingChair.animation.Play("Rocking");
	}
}
