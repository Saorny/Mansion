#pragma strict

@DoNotSerialize
public class CollectableCollider extends Interactable
{
	public var _sound 				: AudioClip;
	public var _itemType 			: Collectable.ObjectType;
	public var _itemName			: String;
	public var _itemDescription 	: String;
	public var _heroComment 		: String = "";
	public var _heroCommentTime		: float = 2.0;
	public var _itemIcon 			: Texture;
	public var _object				: GameObject;
	public var _highlight			: float = 2.5;
	protected var _originalColor	: Color;

	public function		Start() : void {
		super();
		this._originalColor = this._object.renderer.material.color;
	}
	
	public function		OnTriggerEnter(body : Collider) {
		if (body.transform == this._heroBody && this._object.renderer.isVisible) {
			this._hero.mayDislayTuto(TutorialManager.TutoList.COLLECT_OBJECT);
	        this._object.renderer.material.color.r = this._originalColor.r * this._highlight;
	        this._object.renderer.material.color.g = this._originalColor.g * this._highlight;
	        this._object.renderer.material.color.b = this._originalColor.b * this._highlight * 3;
	        this._object.renderer.material.color.b = this._object.renderer.material.color.b * this._highlight;
		}
	}
	
	public function		OnTriggerExit(body : Collider) {
		if (body.transform == this._heroBody) {
			this._object.renderer.material.color.r = this._originalColor.r * this._highlight;
	   		this._object.renderer.material.color.g = this._originalColor.g * this._highlight;
		    this._object.renderer.material.color.b = this._originalColor.b * this._highlight / 3;
		    this._object.renderer.material.color.b = this._originalColor.b / this._highlight;
		    this._object.renderer.material.color = this._originalColor;		
		}
	}

	public function		OnTriggerStay(body : Collider) {
		if (body.transform == this._heroBody && this._object.renderer.isVisible && Input.GetButtonDown("Use")) {
			this._hero.getCollectable(this._itemType, this._itemName, this._itemDescription, this._itemIcon, this._heroComment, this._heroCommentTime);
			if (this._sound)
				AudioSource.PlayClipAtPoint(this._sound, transform.position, 20);
			this._hero.mayDislayTuto(TutorialManager.TutoList.OBJECT_COLLECTED);
			Destroy (this._object.gameObject);
			Destroy (this);
	   	}
	}
}
