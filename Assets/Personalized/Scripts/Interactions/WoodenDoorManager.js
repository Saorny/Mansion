#pragma strict

@script SerializeAll
public class WoodenDoorManager extends MonoBehaviour {

	public var soundOpen : AudioClip;
	public var soundClose : AudioClip;
	public var soundVolume : float = 2.0;
	private var	_busy : boolean = false;

	public function Open() : IEnumerator {
		this._busy = true;
		if (soundOpen)
			AudioSource.PlayClipAtPoint(soundOpen, transform.position, 20);
		for (var i : int = 0 ; i < 30 ; ++i)
		{
			transform.Rotate(Vector3.back * 3);
			yield WaitForSeconds(0.05);
		}
		this._busy = false;
	}

	public function Close() : IEnumerator {
		this._busy = true;
		if (soundClose)
			AudioSource.PlayClipAtPoint(soundClose, transform.position, 20);
		for (var i : int = 0 ; i < 30 ; ++i)
		{
			this.transform.Rotate(Vector3.forward * 3);
			yield WaitForSeconds(0.05);
		}
		this._busy = false;
	}

	public function		getBusy() { return (this._busy); }
	public function		isDoorVisible() { return (this.transform.renderer.isVisible); }
}
