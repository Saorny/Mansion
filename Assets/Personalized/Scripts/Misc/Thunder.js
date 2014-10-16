@script SerializeAll
public var 	_thunderLight : Light;
public var 	_thunderSounds : AudioSource[];
public var 	_soundVolume = 1.0;
public var	_soundManager : SoundManagerHero;
private var _engaged : boolean = false;

public function		Start ()
{
	this._thunderLight.gameObject.SetActive(false);
}

public function		Update ()
{
	this.manageThunder();	
}

public function		setThunderVolume(vol : float) : void
{ this._soundVolume = vol; }

private function	manageThunder()
{
	/*var toWait : int;
	var sound : AudioSource;

	if (this._engaged == false)
	{
		this._engaged = true;
		toWait =  10 + (Random.value * 10);
		yield WaitForSeconds(toWait);
		sound = this._soundManager.getRandomSoundFrom(this._thunderSounds);
		sound.volume = this._soundVolume;
		sound.Play();
		yield WaitForSeconds(0.5);
		this._engaged = false;
	}*/
}