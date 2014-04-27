#pragma strict

@DoNotSerialize
public class SoundTypeManager
{
	private var			_sounds			: List.<MultidimensionalSound> = new List.<MultidimensionalSound>();
	private var			_interval		: float;
	private var			_volume			: float;
	
	public function		SoundTypeManager() {}
	public function		SoundTypeManager(src : Transform[], interval : float, volume : float)
	{
		this._interval = interval;
		this._volume = volume;
		for (var i : int = 0 ; i < src.length ; ++i)
			this._sounds.Add(new MultidimensionalSound(src[i]));
	}

	public function		playType(type : int) : IEnumerator
	{
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
	
	public function		stopAllAudios() : void
	{
		for (var i : int = 0 ; i < this._sounds.Count ; ++i)
			this._sounds[i].stopAllAudios();
	}
	
	public function		getVolume() : float { return(this._volume); }
	public function		setVolume(val : float) : void { this._volume = val; }
};