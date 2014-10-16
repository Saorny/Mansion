#pragma strict

public class SoundManagerHero extends MonoBehaviour
{
	public enum 	SoundType { WALK, SPEAK, PUSH, SCARED, TOTAL }
	public enum 	FloorType { GRASSY, WOODEN, WATERLY, CONCRETE, TOTAL }
	public enum 	HeroVoice { UNINTERESTING, BREATHING, UGLY, LOCKED, HEART_BEAT, FLASHLIGHT, TOTAL }
	public enum 	CollisionSoundType { NOTHING, METAL, WOOD }
	public enum 	MusicTheme { MENU }

	@DoNotSerialize
	public var  	_soundWalkSources	: Transform[];
	@DoNotSerialize
	public var  	_soundSpeakSources	: Transform[];
	@DoNotSerialize
	public var  	_soundPushSources	: Transform[];
	@DoNotSerialize
	public var  	_soundScaredSources	: Transform[];
	@DoNotSerialize
	public var		_themes				: AudioSource[];
	@DoNotSerialize
	public var		soundLamp 			: AudioSource;
	@DoNotSerialize
	public var		walkOnBones 		: AudioSource;
	@DoNotSerialize
	public var		Rain 				: AudioSource;
	public var		_thunder			: Thunder;
	@SerializeThis
	public var		_weather_volume		: float = 0;
	private var		_soundManagers		: List.<SoundTypeManager> = new List.<SoundTypeManager>();
	@SerializeThis
	public var 	_indoor 			: boolean = false;
	@SerializeThis
	public var		_walkingOn 			: FloorType = FloorType.WOODEN;
	private var		_lastScare			: float;
	private var		_scareInterval		: float;

	public function		Start() : void
	{
		this._soundManagers.Add(new SoundTypeManager(this._soundWalkSources, 0.1, 0.15));
		this._soundManagers.Add(new SoundTypeManager(this._soundSpeakSources, 0.1, 1.0));
		this._soundManagers.Add(new SoundTypeManager(this._soundPushSources, 0.5, 1.0));
		this._soundManagers.Add(new SoundTypeManager(this._soundScaredSources, 0.1, 0.15));
		this._lastScare = 0;
		this._scareInterval = 4;
	}

	public function		playTheme(theme : MusicTheme, val : boolean) : void
	{
		if (parseInt(theme) < this._themes.Length)
		{
			if (val == true)
				this._themes[parseInt(theme)].Play();
			else
				this._themes[parseInt(theme)].Stop();
		}
	}

	public function		playSoundType(category : int, type : int) : IEnumerator
	{
		this._soundManagers[category].playType(type);
	}
	
	public function		manageScaredSounds() : IEnumerator
	{
		if ((Time.time - this._lastScare) > this._scareInterval)
		{
			this._lastScare = Time.time;
			this.playSoundType(parseInt(SoundType.SCARED), 0);
		}
	}

	public function		stopHeroSoundType(category : int) : void
	{
		this._soundManagers[category].stopAllAudios();
	}
	
	public function		stopHeroAllAudios() : void
	{
		for (var i : int = 0 ; i < this._soundManagers.Count ; ++i)
			this._soundManagers[i].stopAllAudios();
	}

	public function		getIndoor() : boolean { return (this._indoor); }
	public function		getWalkingOn() : FloorType { return (this._walkingOn); }

	public function		setPlayRain(val : boolean) : void
	{
		if (val == true)
			this.Rain.Play();
		else
			this.Rain.Stop();
		this.Rain.volume = this._weather_volume;
	}

	public function		setIndoor(val : boolean) : void
	{
		this._indoor = val;
		if (this._indoor == true)
			this._weather_volume = 0.1;
		else
			this._weather_volume = 1.0;
		this.Rain.volume = this._weather_volume;
	}
	
	public function	walkingOnBones() : void
	{
		this.walkOnBones.Play();
	}

	public function	setWeatherVolume(volume : float) : void { this._weather_volume = volume; }
	public function	setFloorType(type : FloorType) : void { this._walkingOn = type; }
	public function	setThunderVolume(volume : float) : void { this._thunder.setThunderVolume(volume); }

	private function 	OnDeserialized() : void
	{
	}
}

