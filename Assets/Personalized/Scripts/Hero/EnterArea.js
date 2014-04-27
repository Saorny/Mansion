public var _hero		 	: Interface;
public var _floor_type		: FloorType;
public var _isIndoor		: boolean;
public var _thunderVolume	: float = 1.0;

public function OnTriggerEnter ()
{
	this._hero.setIndoor(this._isIndoor);
	this._hero.setFloorType(this._floor_type);
	this._hero.setHearThunder(this._thunderVolume);
}
