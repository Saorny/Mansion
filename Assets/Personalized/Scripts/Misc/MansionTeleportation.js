#pragma strict

public 	var 	_tools 				: 	PersoObjectManager;
public	var 	_hero 				: 	Transform;
public	var 	_zones 				: 	Transform[];
public 	var		_houseAtmosphere 	:	ManageMansionAtmosphere;


public function			OnTriggerEnter()
{
	if (this._houseAtmosphere.getGhostLevel() >= 50 && Mathf.Round(Random.value * 4) >= 3)
		this.randomTeleportation();
}

private function		randomTeleportation() : void
{
	this._tools.moveObject(this._hero, this._hero.position, this._zones[Mathf.Round(Random.value * (this._zones.Length - 1))].position, 0.0);
}
