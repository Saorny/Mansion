#pragma strict

public var	soundCupboard : AudioClip;
public var	soundVolume : float = 2.0;
public var	CupboardBody : Transform;
public var	DoorLeft : Transform;
public var	DoorRight : Transform;

public function		Open()
{
	if (soundCupboard)
		AudioSource.PlayClipAtPoint(soundCupboard, transform.position, 20);
	for (var i : int = 0 ; i < 30 ; ++i)
	{
		DoorLeft.Rotate(Vector3.back * 3);
		DoorRight.Rotate(Vector3.forward * 3);
		yield WaitForSeconds(0.05);
	}
}

public function		isWithinRange()
{
	return (CupboardBody.renderer.isVisible);
}
