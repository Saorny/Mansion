#pragma strict

@DoNotSerialize
public class CollectableCollider extends MonoBehaviour
{
	public var sound 			: AudioClip;
	public var ItemType 		: Collectable.ObjectType;
	public var ItemName			: String;
	public var ItemDescription 	: String;
	public var ItemIcon 		: Texture;	
	public var object			: GameObject;
	protected var _hero 		: HeroManager;
	protected var _heroBody 	: Transform;

	public function		Awake() : void
	{
		this.loadComponents();
	}

	public function		OnTriggerStay(body : Collider)
	{
		if (body.transform == this._heroBody && Input.GetButtonDown("Use") && this.object.renderer.isVisible) 
	   	{
			this._hero.getCollectable(this.ItemType, this.ItemName, this.ItemDescription, this.ItemIcon);
			if (this.sound)
				AudioSource.PlayClipAtPoint(this.sound, transform.position, 20);
			Destroy (this.object.gameObject);
			Destroy (this);
	   	}
	}
	
	public function		getHero() : HeroManager { return (this._hero); }
	public function		getHeroBody() : Transform { return (this._heroBody); }
	
	private function	loadComponents() : void
	{
		var	hero : GameObject;
	
		hero = GameObject.Find("Hero");
		this._heroBody = hero.transform;
		this._hero = hero.GetComponent("HeroManager") as HeroManager;
	}
}
