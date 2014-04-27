#pragma strict

public var 		_statue	: Transform;
public var		_hero	: Transform;
private var		_pos	: Vector3;

function OnTriggerStay ()
{
	if (this._statue.renderer.isVisible == false)
		this.ManageLookingStatue();
}

private function	ManageLookingStatue()
{
	this._pos.x = this._hero.position.x;
	this._pos.y = this._statue.position.y;
	this._pos.z = this._hero.position.z;
	this._statue.LookAt(this._pos);
	this._statue.Rotate(Vector3.left * 90);
	this._statue.Rotate(Vector3.forward * 180);
}