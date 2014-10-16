#pragma strict

public var		_creatures			: List.<Creature>;
private var 	_hero 				: HeroManager;
private var 	_heroBody 			: Transform;

public function		Start()
{
	this.loadHero();
}

public function		OnTriggerEnter(body : Collider) : void
{
	if (body.transform == this._heroBody)
	{
		this._hero.walkingOnBones();
		for (var i : int = 0 ; i < this._creatures.Count ; ++i)
			this._creatures[i].hearSound(this.gameObject.transform.position);
	}
}

public function		addCreature(item : Creature) : void
{
	if (this._creatures.Contains(item) == false)
			this._creatures.Add(item);
}

public function		removeCreature(item : Creature) : void
{
	if (this._creatures.Contains(item) == true)
			this._creatures.Remove(item);
}

public function		Awake() : void { this.loadHero(); }

private function	loadHero() : void
{
	var	hero : GameObject;

	hero = GameObject.Find("Hero");
	this._heroBody = hero.transform;
	this._hero = hero.GetComponent("HeroManager") as HeroManager;
}
