var view 				: Camera;
var thunderSound 		: AudioSource;

function OnTriggerEnter()
{
	this.thunderSound.Play();
	Destroy(this);
}
