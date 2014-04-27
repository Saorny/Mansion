var HeroInterface : Interface;
var CellarTheme : AudioSource;

function OnTriggerEnter ()
{
	//this.CellarTheme.Play();
	this.HeroInterface.setFloorType(FloorType.WATERLY);
}

function OnTriggerExit ()
{
	//zthis.CellarTheme.Stop();
	this.HeroInterface.setFloorType(FloorType.WOODEN);
}
