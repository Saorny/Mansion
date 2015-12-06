#pragma strict

@DoNotSerialize
public class WindowEerieEvent extends CinematicManager
{
	public	var 	SpawnArea 		:	Transform;
	public	var 	_thunderLight 	:	Light;
	public	var 	thunderSound 	:	AudioSource;
	public	var 	thunderSound2 	:	AudioSource;
	public	var		_window			: 	GameObject;
	public  var 	_model			:	GameObject;

	public function		OnTriggerEnter(body : Collider)
	{
		if (body.transform == _heroPos && this._window.renderer.isVisible == true &&  this._triggered == false)
		{
			var clone : GameObject;
		
			this._triggered = true;
			this.setCinematicMode();
			yield this.MakeHeroLookAt(this._spots[0], 3);
			yield this.MakeHeroLookAt(this._spots[1], 5);
			this._hero.scareHero(100);
			clone = GameObject.Instantiate(this._model, SpawnArea.transform.position, SpawnArea.transform.rotation);
			this.thunderSound.Play();
			this._thunderLight.light.enabled = true;
			yield WaitForSeconds(0.2);
			this._thunderLight.gameObject.SetActive(false);
			yield WaitForSeconds(0.55);
			this._thunderLight.gameObject.SetActive(true);
			this.thunderSound2.Play();
			yield WaitForSeconds(0.1);
			this._thunderLight.light.enabled = false;
			Destroy(clone.gameObject);
			yield WaitForSeconds(3.0);
			this.setAdventureMode();
			Destroy(this);
		}
	}
}
