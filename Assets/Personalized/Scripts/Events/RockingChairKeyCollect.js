#pragma strict

@DoNotSerialize
public class RockingChairKeyCollect extends CollectableCollider
{
	public var		_rockingChair	: GameObject;
	public var		_rockingSound	: AudioSource;

	public function		OnTriggerStay(body : Collider) : void
	{
		if (body.transform == this.getHeroBody() && Input.GetButtonDown("Use") && this._object.renderer.isVisible) 
	   	{
			this._hero.getCollectable(this._itemType, this._itemName, this._itemDescription, this._itemIcon, this._heroComment, this._heroCommentTime);
			if (this._sound)
				AudioSource.PlayClipAtPoint(this._sound, transform.position, 20);
			this.rockTheBoat();
			this._hero.scareHero(80);
			this._hero.addDialogText('This house is... unholy!!!', 3, Message.messageType.DIALOG);
			Destroy (this._object.gameObject);
			Destroy (this);
	   	}
	}

	private function	rockTheBoat() : void
	{
		this._rockingSound.Play();
		this._rockingChair.animation.Play("Rocking");
	}
}
