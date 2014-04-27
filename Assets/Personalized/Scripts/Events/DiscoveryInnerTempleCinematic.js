#pragma strict

public class DiscoveryInnerTempleCinematic extends CinematicManager
{
	public var _entraceDoor			: TempleRiddleManager;
	public var _greatDoorClosing 	: AudioSource;
	public var _templeSound 		: AudioSource;
	
	public function		OnTriggerEnter()
	{
		this.setCinematicMode();
		this._templeSound.Play();
		yield this.transitCamera(3.5);
		yield this.takeCinematicView(this._poses[0], 3.0);
		yield this.takeCinematicView(this._poses[1], 5.0);
		this._greatDoorClosing.Play();
		this._entraceDoor.closeDoor();
		yield WaitForSeconds(1.0);
		yield this.takeCinematicView(this._poses[2], 1.0);
		yield WaitForSeconds(3.0);
		this.setAdventureMode();
		Destroy(this);
	}
}