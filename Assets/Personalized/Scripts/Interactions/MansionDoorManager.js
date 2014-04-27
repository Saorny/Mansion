#pragma strict

var soundOpening : AudioClip;
var soundVolume : float = 2.0;
private var	_busy : boolean = false;

public function		open()
{
	this._busy = true;
	if (soundOpening)
		AudioSource.PlayClipAtPoint(soundOpening, transform.position, 20);
	animation.Play("handle_turn");
	yield WaitForSeconds(animation["handle_turn"].clip.length);
	animation.Play("door_open");
	yield WaitForSeconds(animation["door_open"].clip.length);
	this._busy = false;
}


public function		close() : IEnumerator
{
	this._busy = true;
	animation.Play("door_close");
	yield WaitForSeconds(animation["door_close"].clip.length);
	this._busy = false;
}

public function		getBusy() { return (this._busy); }