#pragma strict

var sound 			: AudioClip;
var ItemType 		: ObjectType;
var ItemName		: String;
var ItemDescription : String;
var ItemIcon 		: Texture;
var hero 			: Interaction;
var object			: GameObject;
var _heroBody 		: Transform;

function OnTriggerStay(body : Collider)
{
	if (body.transform == _heroBody && Input.GetButtonDown("Use") && object.renderer.isVisible) 
   	{
		this.hero.getCollectable(ItemType, ItemName, ItemDescription, ItemIcon);
		if (sound)
			AudioSource.PlayClipAtPoint(sound, transform.position, 20);
		Destroy (object.gameObject);
		Destroy (this);
   	}
}