public	var		_Hero 				: Interaction;
public	var 	darkWhispers		: AudioClip;
public	var 	_view 				: Camera;
public	var 	_strangeLight		: Light;

public function		OnTriggerEnter()
{
	if (_Hero.hasItem(ObjectType.key_basement, false))
	{
		var i : int;

		this.pauseGame();
		if (darkWhispers)
			AudioSource.PlayClipAtPoint(darkWhispers, transform.position, 20);
		for (i = 0 ; i < 60 ; ++i)
		{
			refreshStrangeLight(i);
			yield WaitForSeconds(0.005);
		}
		this.endVision();
		Destroy(this);
		this.resumeGame();
	}
}

private function	pauseGame()
{
	this._Hero.setPauseHero(true);
	this._Hero.HeroLockCamera(true);
	Time.timeScale = 0.1;
}

private function	resumeGame()
{
	this._Hero.HeroLockCamera(false);
	this._Hero.setPauseHero(false);
	Time.timeScale = 1;
}

private function	endVision()
{
	this._view.fieldOfView = 60;
	this._strangeLight.gameObject.light.intensity = 0.6;
	this._strangeLight.range = 2;
	this._Hero.hearHeartBeat();
}

private function	refreshStrangeLight(i : int)
{
	this._view.fieldOfView = 60 - (i / 2);
	this._strangeLight.gameObject.light.intensity = i / 10;
	this._strangeLight.gameObject.light.range = i * 2;
	
}
