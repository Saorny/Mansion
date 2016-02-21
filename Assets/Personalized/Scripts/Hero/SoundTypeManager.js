#pragma strict

@DoNotSerialize
public class SoundTypeManager
{
	private var		_sounds		: Dictionary.<System.Enum, MultidimensionalSound>;
	private var		_interval	: float;
	public var		_volume		: float;
	
	public function		SoundTypeManager(path : String, interval : float, volume : float, categLabels : System.Array) {
		var src = new Array();
		var obj;
		var sources : AudioSource[];
		
		this._interval = interval;
		this._volume = volume;
		this._sounds = new Dictionary.<System.Enum, MultidimensionalSound>();
		
		for (var i = 0 ; i < categLabels.Length ; ++i) {
			if (GameObject.Find(path + "/" + categLabels[i].ToString()) != null) {
				src = GameObject.Find(path + "/" + categLabels[i].ToString()).GetComponentsInChildren(AudioSource);
				sources = src;
				this._sounds[categLabels[i]] = new MultidimensionalSound(sources as AudioSource[]);
			}
			else {
				Debug.Log("Cannot load sound category: " + path + "/" + categLabels[i].ToString());
			}
		}
	}

	public function		playType(type : System.Enum) : IEnumerator {
		if ((Time.time - this._sounds[type].getLastTime()) > this._interval && this._sounds[type].canPlay())
		{
			var sound : AudioSource;

			sound = this._sounds[type].getRandomSound();
			if (sound != null)
			{
				sound.volume = this._volume;
				sound.Play();
			}
		}
	}
	
	public function		stopAllAudios() : void {
		for (var ckey: System.Enum in this._sounds.Keys) {
			this._sounds[ckey].stopAllAudios();
		}
	}
	
	public function		getVolume() : float { return(this._volume); }
	public function		setVolume(val : float) : void { this._volume = val; }
};