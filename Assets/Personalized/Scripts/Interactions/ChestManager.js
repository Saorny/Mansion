var soundCupboard : AudioClip;
var soundVolume : float = 2.0;
var DoorLeft : Transform;
var DoorRight : Transform;
private var	busy : boolean = false;

function Open()
{
	this.busy = true;
	if (soundCupboard)
		AudioSource.PlayClipAtPoint(soundCupboard, transform.position, 20);
	for (var i : int = 0 ; i < 30 ; ++i)
	{
		DoorLeft.Rotate(Vector3.back * 3);
		DoorRight.Rotate(Vector3.forward * 3);
		yield WaitForSeconds(0.05);
	}
	this.busy = false;
}

function Close()
{
	this.busy = true;
	if (soundCupboard)
		AudioSource.PlayClipAtPoint(soundCupboard, transform.position, 20);
	for (var i : int = 0 ; i < 30 ; ++i)
	{
		DoorLeft.Rotate(Vector3.forward * 3);
		DoorRight.Rotate(Vector3.back * 3);
		yield WaitForSeconds(0.05);
	}
	this.busy = false;
}

function getBusy()
{
	return (this.busy);
}
