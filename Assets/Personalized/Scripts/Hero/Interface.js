
public enum ObjectType { nothing, key_entrance, key_basement, lamp, mine_pick, book }

public var		flashLamp : Texture;
public var		book : Texture;
public var		HeroAnimation : Texture = null;
public var		pos : Vector3;
public var		minY : int;
public var		maxY : int;
public var		descending : boolean;
public var		interval : int;
public var		SoundManager : SoundManagerHero;
public var		Rain : ParticleSystem;
public var		_interaction : Interaction;
public var		_heroFont		: Font;

public function Start()
{
	var text : TextAsset;
	
	this.interval = 0;
	this.descending = true;
	this.minY  = Screen.height - this.flashLamp.height;
	this.pos.x = Screen.width - this.flashLamp.width;
	this.pos.y = this.minY;
	this.maxY = this.pos.y + 30;
	this._interaction.getCollectable(ObjectType.lamp, "Lamp", "Useful to explore dark areas !", this.flashLamp);
	text = Resources.Load("Books_Content/Diary", typeof(TextAsset));
	this._interaction.giveDiary("Diary", "Personal diary", this.book, "Personal Diary", text.ToString(), _heroFont);
}

public function OnGUI () : IEnumerable
{
	
	if (this._interaction.getMenuMode() == true)
		this._interaction.manageDisplayMenu();
	else if (this._interaction.getInv() == false && this._interaction.getPauseHero() == false)
	{
		GUI.DrawTexture(Rect(pos.x, pos.y, flashLamp.width, flashLamp.height), flashLamp);
		this.movingObjectInHands();
	}
	else if (HeroAnimation != null)
		GUI.DrawTexture(Rect(	0,
								0, 
								Screen.width, Screen.height), 
								HeroAnimation);
	else if (this._interaction.getInv() == true)
		this._interaction.displayInventory();
}

public function setHeroAnimation(newAnimation : Texture)
{
	this.HeroAnimation = newAnimation;
}

public function movingObjectInHands()
{
	if (interval >= 10)
	{
		if (this.descending == true)
		{
			++this.pos.y;
			if (this.pos.y >= this.maxY)
				this.descending = false;
		}
		else
		{
			--this.pos.y;
			if (this.pos.y <= this.minY)
				this.descending = true;
			
		}
		interval = 0;
	}
	++this.interval;
}

public function	setIndoor(val : boolean)
{
	this.manageRainEmission(val);
	this.SoundManager.setIndoor(val);
}

public function		setFloorType(val : FloorType) : void { this.SoundManager.setFloorType(val); }

public function		setHearThunder(volume : float) : void { this.SoundManager.setThunderVolume(volume); }

private function manageRainEmission(val : boolean) : void
{
	if (val == true)
		this.Rain.enableEmission = false;
	else
		this.Rain.enableEmission = true;
}

private function 	OnDeserialized() : void
{
	this.manageRainEmission(this._interaction.getIndoor());
}