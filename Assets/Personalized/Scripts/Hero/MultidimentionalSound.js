#pragma strict

@DoNotSerialize
public class MultidimensionalSound
{
    private var			_audioSources	: List.<AudioSource> = new List.<AudioSource>();
    private var			_lasTime		: float;
    private var			_finishedAt		: float;
 
 	public function		MultidimensionalSound() {}
   	public function		MultidimensionalSound(src : Transform)
   	{
   		this._lasTime = 0;
		for (var child  : Transform in src)
			this._audioSources.Add(child.GetComponent(AudioSource));
   	}
   
   	public function		getRandomSound() : AudioSource
	{
		var sound : AudioSource;

		sound = this._audioSources[Mathf.Round(Random.value * (this._audioSources.Count - 1))];
		this._lasTime = Time.time;
		this._finishedAt = this._lasTime + sound.clip.length;
		return (sound);
	}
	
	public function		Count() : int { return (this._audioSources.Count); }

	public function		canPlay() : boolean { return (this._finishedAt < Time.time); }
	public function		getLastTime() : float { return (this._lasTime); }
	
	public function		stopAllAudios() : void
	{
		for (var i : int = 0 ; i < this._audioSources.Count ; ++i)
			this._audioSources[i].Stop();
	}
}