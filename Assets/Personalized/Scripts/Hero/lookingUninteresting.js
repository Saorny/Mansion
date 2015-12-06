#pragma strict

var object					: GameObject;
private var _hero 			: HeroManager;
private var _heroBody 		: Transform;

public function OnTriggerStay(body : Collider)
{
	if (body.transform == _heroBody && Input.GetButtonDown("Use") && object.renderer.isVisible)
		this._hero.lookingUninteresting();
}

public function		Start() : void
{
	var	hero : GameObject;
	
	hero = GameObject.Find("Hero");
	this._heroBody = hero.transform;
	this._hero = hero.GetComponent("HeroManager") as HeroManager;
}