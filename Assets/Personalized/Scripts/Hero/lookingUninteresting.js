#pragma strict

var hero 			: Interaction;
var _heroBody 		: Transform;
var object			: GameObject;

function OnTriggerStay(body : Collider)
{
	if (body.transform == _heroBody && Input.GetButtonDown("Use") && object.renderer.isVisible)
		this.hero.lookingUninteresting();
}