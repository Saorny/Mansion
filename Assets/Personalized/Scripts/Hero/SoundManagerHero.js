#pragma strict

@DoNotSerialize
public class SoundManagerHero extends MonoBehaviour
{
	public enum 	SoundType { WALK, SPEAK, PUSH, WEAPON }
	public enum 	FloorType { GRASSY, WOODEN, WATERLY }
	public enum 	HeroVoice { BREATHING_PUSHING, LOCKED, UNLOCKED, SAVING, HEART_BEAT, LANDING, PAIN, SCARED, USE_BOTTLE }
	public enum 	HeroWeapon { MINEPICK }
	public enum 	CollisionSoundType { NOTHING, METAL, WOOD }
	public enum 	MUSIC_THEMES { MENU }
	
	public var		_savingSound		: AudioSource;
	public var		_soundOpenBook		: AudioSource;
	public var		_soundCloseBook		: AudioSource;
	public var		_soundTurnPage		: AudioSource;
	public var		walkOnBones 		: AudioSource;
	public var		Rain 				: AudioSource;
	public var		_thunder			: Thunder;
	@SerializeThis
	public var		_weather_volume		: float = 0;
	private var		_themes				: Dictionary.<SoundManagerHero.MUSIC_THEMES, AudioSource>;
	private var		_soundManagers		: Dictionary.<SoundManagerHero.SoundType, SoundTypeManager> = new Dictionary.<SoundManagerHero.SoundType, SoundTypeManager>();
	@SerializeThis
	public var		_walkingOn 			: FloorType = FloorType.WOODEN;
	private var		_lastScare			: float;
	private var		_scareInterval		: float;
	@SerializeThis
	private var		_musicPreference	: float = 1.0;
	private var		_THEME_SOURCE		: String = "Atmosphere/SoundManager/Themes/";
	private var		_HERO_SOURCE		: String = "Atmosphere/SoundManager/HeroSounds/";

	public function		Start() : void {
		this._soundManagers[SoundManagerHero.SoundType.WALK] = new SoundTypeManager(this._HERO_SOURCE + "WALK", 0.1, 0.15, FloorType.GetValues(typeof(FloorType)));
		this._soundManagers[SoundManagerHero.SoundType.SPEAK] = new SoundTypeManager(this._HERO_SOURCE + "SPEAK", 0.1, 1.0, HeroVoice.GetValues(typeof(HeroVoice)));
		this._soundManagers[SoundManagerHero.SoundType.PUSH] = new SoundTypeManager(this._HERO_SOURCE + "PUSH", 0.5, 1.0, FloorType.GetValues(typeof(FloorType)));
		this._soundManagers[SoundManagerHero.SoundType.WEAPON] = new SoundTypeManager(this._HERO_SOURCE + "WEAPON", 0.1, 0.15, HeroWeapon.GetValues(typeof(HeroWeapon)));
		
		this._lastScare = 0;
		this._scareInterval = 4;
		this.loadThemes();
	}

	public function		playTheme(theme : SoundManagerHero.MUSIC_THEMES, val : boolean) : void {
		if (this._themes[theme] != null)
		{
			if (val == true)
				this._themes[theme].Play();
			else
				this._themes[theme].Stop();
		}
	}

	public function		playSoundType(category : SoundManagerHero.SoundType, type : System.Enum) : IEnumerator {
		if (this._soundManagers[category])
			this._soundManagers[category].playType(type);
	}
	
	public function		manageScaredSounds() : IEnumerator {
		if ((Time.time - this._lastScare) > this._scareInterval)
		{
			this._lastScare = Time.time;
			//this.playSoundType(HeroVoice.SCARED, 0);
		}
	}

	public function		stopHeroSoundType(category : int) : void
	{
		this._soundManagers[category].stopAllAudios();
	}
	
	public function		stopHeroAllAudios() : void
	{
		for (var ckey: SoundManagerHero.SoundType in this._soundManagers.Keys) {
			if (this._soundManagers[ckey]) {
				this._soundManagers[ckey].stopAllAudios();
			}
		}
	}

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
		if (val == true)
			this._weather_volume = 0.1;
		else
			this._weather_volume = 1.0;
		this.Rain.volume = this._weather_volume;
	}
	
	public function	walkingOnBones() : void { this.walkOnBones.Play(); }
	public function	playOpenBook() : void { this._soundOpenBook.Play(); }
	public function	playCloseBook() : void { this._soundCloseBook.Play(); }
	public function	playTurnPage() : void { this._soundTurnPage.Play(); }

	public function	setWeatherVolume(volume : float) : void { this._weather_volume = volume; }
	public function	setFloorType(type : FloorType) : void { this._walkingOn = type; }
	public function	setThunderVolume(volume : float) : void { this._thunder.setThunderVolume(volume); }
	
	public function	savingGame() : void { this._savingSound.Play(); }

	private function 	OnDeserialized() : void {
	}
	
	private function 	loadThemes() : void {
		var themeLabels = new Array();
		var theme : AudioSource;
	
		this._themes = new Dictionary.<SoundManagerHero.MUSIC_THEMES, AudioSource>();
		themeLabels = SoundManagerHero.MUSIC_THEMES.GetValues(typeof(SoundManagerHero.MUSIC_THEMES));
		for (var i = 0 ; i < themeLabels.Count ; ++i) {
			theme = GameObject.Find(this._THEME_SOURCE + themeLabels[i].ToString()).GetComponent(AudioSource);
			if (theme) {
				this._themes[themeLabels[i]] = theme;
			}
			else {
				Debug.Log("Cannot load theme: " + this._THEME_SOURCE + themeLabels[i].ToString());
			}
		}
	}
}
