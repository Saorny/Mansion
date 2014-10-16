#pragma strict

var hero 			: HeroManager;
var object			: GameObject;

function OnTriggerStay()
{
	if (Input.GetButtonDown("Use") && object.renderer.isVisible)
		this.hero.lookingUgly();
}
