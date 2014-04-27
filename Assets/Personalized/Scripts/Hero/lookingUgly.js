#pragma strict

var hero 			: Interaction;
var object			: GameObject;

function OnTriggerStay()
{
	if (Input.GetButtonDown("Use") && object.renderer.isVisible)
		this.hero.lookingUgly();
}
