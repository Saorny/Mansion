#pragma strict

public var 	_object			: GameObject;
public var	_moving 		: AudioClip;
public var 	_soundVolume 	: float = 2.0;
public var	_number 		: int;
public var 	_riddleManager	: TempleRiddleManager;
private var	_can 			: boolean = true;

public function		pushButton()
{
	this._can = false;
	if (_moving)
		AudioSource.PlayClipAtPoint(_moving, transform.position, 20);
	for (var i : int = 0 ; i < 30 ; ++i)
	{
		this._object.transform.Translate(0, 0, -0.01);
		yield WaitForSeconds(0.05);
	}
	this._riddleManager.pushButton(this._number);
}

public function 	resetButton()
{
	if (_moving)
		AudioSource.PlayClipAtPoint(_moving, transform.position, 20);
	for (var i : int = 0 ; i < 30 ; ++i)
	{
		this._object.transform.Translate(0, 0, 0.01);
		yield WaitForSeconds(0.05);
	}
	this._can = true;
}

public function		getCan() { return (this._can); }
public function		isVisible() { return (this._object.renderer.isVisible); }
