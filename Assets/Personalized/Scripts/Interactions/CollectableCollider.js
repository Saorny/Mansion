#pragma strict

@DoNotSerialize
public class CollectableCollider extends Interactable
{
	public var sound 				: AudioClip;
	public var ItemType 			: Collectable.ObjectType;
	public var ItemName				: String;
	public var ItemDescription 		: String;
	public var ItemIcon 			: Texture;	
	public var _object				: GameObject;
	public var _highlight			: float = 2.5;
	protected var _originalColor	: Color;

	public function		Start() : void {
		super();
		this._originalColor = this._object.renderer.material.color;
	}
	
	public function		OnTriggerEnter(body : Collider)
	{
		if (body.transform == this._heroBody && this._object.renderer.isVisible)
		{
			this._hero.mayDislayTuto(TutorialManager.TutoList.COLLECT_OBJECT);
	        this._object.renderer.material.color.r = this._originalColor.r * this._highlight;
	        this._object.renderer.material.color.g = this._originalColor.g * this._highlight;
	        this._object.renderer.material.color.b = this._originalColor.b * this._highlight * 3;
	        this._object.renderer.material.color.b = this._object.renderer.material.color.b * this._highlight;
		}
	}
	
	public function		OnTriggerExit(body : Collider)
	{
		if (body.transform == this._heroBody)
		{
			this._object.renderer.material.color.r = this._originalColor.r * this._highlight;
	   		this._object.renderer.material.color.g = this._originalColor.g * this._highlight;
		    this._object.renderer.material.color.b = this._originalColor.b * this._highlight / 3;
		    this._object.renderer.material.color.b = this._originalColor.b / this._highlight;
		    this._object.renderer.material.color = this._originalColor;		
		}
	}

	public function		OnTriggerStay(body : Collider)
	{
		if (body.transform == this._heroBody && this._object.renderer.isVisible && Input.GetButtonDown("Use"))
	   	{
			this._hero.getCollectable(this.ItemType, this.ItemName, this.ItemDescription, this.ItemIcon);
			if (this.sound)
				AudioSource.PlayClipAtPoint(this.sound, transform.position, 20);
			this._hero.mayDislayTuto(TutorialManager.TutoList.OBJECT_COLLECTED);
			Destroy (this._object.gameObject);
			Destroy (this);
	   	}
	}
}
