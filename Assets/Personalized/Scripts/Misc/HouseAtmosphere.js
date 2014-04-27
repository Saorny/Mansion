#pragma strict

var GhostSound 			: AudioSource[];
var _hero 				: Transform;
private var GReaction 	: boolean = false;

function OnTriggerStay (object : Collider)
{
	if (object == _hero)
		this.managerAtmosphere();
}

function managerAtmosphere()
{
	var		toWait : float;

	if (this.GReaction == false)
	{
		GReaction = true;
		toWait = 3 + (Random.value * 3);
		yield WaitForSeconds(toWait);
		GhostSound[Mathf.Round(Random.value * 4)].Play();
		GReaction = false;
	}
}
