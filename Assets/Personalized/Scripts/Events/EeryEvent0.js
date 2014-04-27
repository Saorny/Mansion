#pragma strict

@DoNotSerialize
public class EeryEvent0 extends CinematicManager
{
	public	var 	SpawnArea 		:	Transform;
	public	var 	_thunderLight 	:	Light;
	public	var 	thunderSound 	:	AudioSource;
	public	var 	thunderSound2 	:	AudioSource;
	public	var		_window			: 	GameObject;
	public	var 	_monsterModel 	:	GameObject;
	private var		_clone 			:	GameObject;

	public function		OnTriggerEnter(body : Collider)
	{
		if (body.transform == _heroPos && this._window.renderer.isVisible == true)
		{
			this.setCinematicMode();
			yield this.transitCamera(3);
			_clone = GameObject.Instantiate(_monsterModel, SpawnArea.transform.position, SpawnArea.transform.rotation);
			this.thunderSound.Play();
			this._thunderLight.light.enabled = true;
			yield WaitForSeconds(0.2);
			this._thunderLight.gameObject.active = false;
			yield WaitForSeconds(0.55);
			this._thunderLight.gameObject.active = true;
			this.thunderSound2.Play();
			yield WaitForSeconds(0.1);
			this._thunderLight.light.enabled = false;
			Destroy(_clone.gameObject);
			yield WaitForSeconds(3.0);
			this.setAdventureMode();
			this._hero.hearHeartBeat();
			Destroy(this);
		}
	}
}
