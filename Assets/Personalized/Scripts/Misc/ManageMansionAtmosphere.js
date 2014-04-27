#pragma strict

public var	_sun : Light;
public var  _MoonLights : Transform;
public var	_heroBody : Transform;
private var _GLevel : int;
private var _nextIncrease : float;
private var _GInterval : float = 1.0;

public function		OnTriggerEnter (body : Collider)
{
	if (body.transform == _heroBody)
	{
		this.resetGhostInfluence();
		this._sun.intensity = 0;
		this._sun.gameObject.active = true;
		this.changeLightIntensity(1.0, 3.0);
	}
}

public function		OnTriggerExit(body : Collider)
{
	if (body.transform == _heroBody)
	{
		this.resetGhostInfluence();
		yield this.changeLightIntensity(-this._sun.intensity, this._sun.intensity);
		this._sun.gameObject.active = false;
	}
}

public function		OnTriggerStay (body : Collider)
{
	if (body.transform == _heroBody)
		this.managerAtmosphere();
}

public function		getGhostLevel() : int { return (this._GLevel); }

private function	resetGhostInfluence() : void
{
	this._GLevel = 0;
	this._nextIncrease = 0;
	this.makeMoonLightAppear(false);
}

private function	changeLightIntensity(modif : float, laps : float) : IEnumerator
{
	var		total : int;
	var 	step : float;

	total = laps * 10;
	step = modif / total;
	for (var i : int = 0 ; i < total ; ++i)
	{
		this._sun.intensity += step;
		this._sun.color.r -= (step / 8);
		this._sun.color.g -= (step / 8);
		yield	WaitForSeconds(0.1);
	}
}

private function	managerAtmosphere()
{
	if (Time.time > this._nextIncrease)
	{ 
         this._nextIncrease = Time.time + this._GInterval;
         ++(this._GLevel);
         this.manageThresholds();
	}
}

private function	manageThresholds() : void
{
	if (this._GLevel == 10)
		this.changeLightIntensity(1.0, 1.0);
	else if (this._GLevel == 20)
		this.changeLightIntensity(1.0, 1.0);
	else if (this._GLevel == 30)
		this.changeLightIntensity(1.0, 1.0);
	else if (this._GLevel == 40)
		this.changeLightIntensity(1.0, 1.0);
	else if (this._GLevel == 50)
	{
		this.changeLightIntensity(1.0, 1.0);
		this.makeMoonLightAppear(true);
	}
	else if (this._GLevel == 60)
		this.changeLightIntensity(1.0, 1.0);
	else if (this._GLevel == 70)
		this.changeLightIntensity(1.0, 1.0);
	else if (this._GLevel == 80)
		this.changeLightIntensity(1.0, 1.0);
}

private function	makeMoonLightAppear(val : boolean) : void
{
	for (var child  : Transform in this._MoonLights)
		child.renderer.gameObject.active = val;
}
