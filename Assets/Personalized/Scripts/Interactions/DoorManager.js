var soundOpening : AudioClip;
var soundClosing : AudioClip;
var soundVolume : float = 2.0;
private var	busy : boolean = false;

function Open()
{
	this.busy = true;
	if (soundOpening)
		AudioSource.PlayClipAtPoint(soundOpening, transform.position, 20);
	animation.Play("open");
	yield WaitForSeconds(animation["open"].clip.length);
	this.busy = false;
}


function Close()
{
	this.busy = true;
	if (soundClosing)
		AudioSource.PlayClipAtPoint(soundClosing, transform.position, 20);
	animation.Play("close");
	yield WaitForSeconds(animation["open"].clip.length);
	this.busy = false;
}

function getBusy()
{
	return (this.busy);
}