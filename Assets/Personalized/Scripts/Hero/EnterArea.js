public var _floor_type		: SoundManagerHero.FloorType;
public var _isIndoor		: boolean;
public var _thunderVolume	: float = 1.0;
private var _hero		 	: HeroManager;
private var _heroBody 		: Transform;

public function		Start() : void
{
	var	hero : GameObject;
	
	hero = GameObject.Find("Hero");
	this._heroBody = hero.transform;
	this._hero = hero.GetComponent("HeroManager") as HeroManager;
}

public function OnTriggerEnter (body : Collider)
{
	if (body.transform == this._heroBody)
	{
		this._hero.setIndoor(this._isIndoor);
		this._hero.setFloorType(this._floor_type);
		this._hero.setHearThunder(this._thunderVolume);
	}
}
