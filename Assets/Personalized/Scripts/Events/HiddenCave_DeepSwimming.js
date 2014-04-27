#pragma strict

public var _points 		: 	Transform[];
public var DeepOne 		: 	Transform;
public var _tools 		: 	PersoObjectManager;

public function Start ()
{
	DeepOne.animation.Play("swim");
	this.swimAround();
}

private function	swimAround() : IEnumerator
{
	yield this._tools.moveObject(this.DeepOne, this._points[0].position, this._points[1].position, 20.0);
	this.deepOneLookAt(this._points[2]);
	yield this._tools.moveObject(this.DeepOne, this._points[1].position, this._points[2].position, 20.0);
	DeepOne.animation.Play("dive");
	yield WaitForSeconds(DeepOne.animation["dive"].clip.length);
	DeepOne.animation.Play("swim");
	this._tools.moveObject(DeepOne, _points[2].position, _points[1].position, 0.0);
	this.swimAround();
}

private function	deepOneLookAt(target : Transform)
{
	this.DeepOne.LookAt(this._points[2]);
	this.DeepOne.Rotate(Vector3.down * 90);
	this.DeepOne.Rotate(Vector3.back * 10);
}
