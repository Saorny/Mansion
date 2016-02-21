#pragma strict

@DoNotSerialize
public class MultidimensionalSound
{
    private var			_audioSources	: List.<AudioSource> = new List.<AudioSource>();
    private var			_lasTime		: float;
    private var			_finishedAt		: float;
 
 	public function		MultidimensionalSound() {}
 	
   	public function		MultidimensionalSound(src : AudioSource[])
   	{
   		this._lasTime = 0;
		for (var child  : AudioSource in src as AudioSource[]) {
			this._audioSources.Add(child);
		}
   	}
   
   	public function		getRandomSound() : AudioSource
	{
		var sound : AudioSource;

		if (this._audioSources.Count > 0) {
			sound = this._audioSources[Mathf.Round(Random.value * (this._audioSources.Count - 1))];
			this._lasTime = Time.time;
			this._finishedAt = this._lasTime + sound.clip.length;
		}
		else {
			Debug.Log("No sound available");
			sound = null;
		}
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