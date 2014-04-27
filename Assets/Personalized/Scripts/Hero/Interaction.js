#pragma strict

@script SerializeAll
public class Interaction extends MonoBehaviour
{
	public var 		OBJECT_WIDTH 	: int = 100;
	public var 		OBJECT_HEIGHT 	: int = 100;
	public var 		_heroPaused 	: boolean = false;
	public var 		_flashLamp 		: GameObject;
	public var 		_picture 		: Texture;
	public var		_bookSystem		: ReadBook;
	public var 		_soundManager 	: SoundManagerHero;
	public var		_menu			: MenuManager;
	private var 	lit				: boolean;
	private var 	Inventory 		= new Array ();
	private var 	_specialAnimation : Texture = null;
	private var		_diary			: Book = null;
	private var 	_usableArea 	: UsableItemArea;
	private var 	_inventory_mode : boolean;
	private var		_gameStarted	: boolean;
	
	public function 	Start()
	{
		this.lit = true;
		this._inventory_mode = false;
		this.openMenu();
		this._gameStarted = false;
	}
	
	public function 	Update()
	{
		if (this._gameStarted == true)
		{
			if (Input.GetButtonDown("Escape"))
			{
				if (this._menu.getMenuMode() == true)
					this.closeMenu();
				else
				{
					if (this._inventory_mode == false)
						this.openMenu();
					else if (this._bookSystem.getBookMode() == false)
						this.closeInventoryMode();
				}
			}
			else if (Input.GetButtonDown("Inventory"))
			{
				if (this._menu.getMenuMode() == false && this._bookSystem.getBookMode() == false && this._heroPaused == false)
				{
					if (this._inventory_mode == false)
						this.openInventoryMode();
					else
						this.closeInventoryMode();
				}
			}
			else if (Input.GetButtonDown("Lamp"))
			{
				if (this._menu.getMenuMode() == false && this._inventory_mode == false && this._heroPaused == false)
					this.manageLamp();
			}
		}
	}
	
	public function 	manageDisplayMenu() : IEnumerable { _menu.manageDisplayMenu(); }
	
	
	public function displayInventory()
	{
	
		GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), _picture);
		if (_specialAnimation != null)
				GUI.DrawTexture(Rect(0, 0,  Screen.width, Screen.height), _specialAnimation);
		this.displayItems();
	}
	
	public function		openMenu() : void
	{
		Time.timeScale = 0;
		this.HeroLockCamera(true);
		if (this._gameStarted == true)
			this._menu.goTo(parseInt(Menu_Data.RUNNING_MENU));
		this._menu.setMenuMode(true);
		this._soundManager.setPlayRain(false);
		this._soundManager.stopHeroAllAudios();
		this._soundManager.playTheme(MusicTheme.MENU, true);
	}
	
	public function		closeMenu() : void
	{
		Time.timeScale = 1.0;
		this.HeroLockCamera(false);
		this._menu.setMenuMode(false);
		this._soundManager.setPlayRain(true);
		this._soundManager.playTheme(MusicTheme.MENU, false);
	}
	
	public function 	openInventoryMode()
	{
		Time.timeScale = 0;
		this._inventory_mode = true;
		this.HeroLockCamera(true);
	}
	
	public function 	closeInventoryMode()
	{
		Time.timeScale = 1.0;
		this._inventory_mode = false;
		this.HeroLockCamera(false);
		this._bookSystem.setBookMode(false);
	}
	
	public function getCollectable(type : ObjectType, name : String, description : String, icon : Texture) 
	{
		var newCollectable = new Collectable();
		
		newCollectable.SetCollectable(type, name, description, icon);
		this.Inventory.Push(newCollectable);
	}
	
	public function giveBook(name : String, description : String, icon : Texture, title : String, text : String, font : Font) 
	{
		var newBook = new Book();
	
		newBook.SetBook(ObjectType.book, name, description, icon, title, text, font);
		this.Inventory.Push(newBook);
	}
	
	public function giveDiary(name : String, description : String, icon : Texture, title : String, text : String, font : Font) 
	{
		var newBook = new Book();
	
		newBook.SetBook(ObjectType.book, name, description, icon, title, text, font);
		this.Inventory.Push(newBook);
		this._diary = newBook;
	}
	
	public function manageObjectUse(obj : Collectable)
	{
		if (Input.GetMouseButtonDown(0))
		{
			if (Input.GetMouseButtonDown(0) && obj.getType() == ObjectType.book)
				this._bookSystem.openBook(obj);
			else if (this._usableArea != null)
				this._usableArea.tryObjectHere(obj.getType());	
		}
		else
			GUI.Label (Rect (50, Screen.height - this.OBJECT_HEIGHT, 500, 500), obj.getName() + " : " + obj.getDescription());
		
	}
	
	public function hasItem(typeRequested : ObjectType, onceUse : boolean)
	{
		var obj : Collectable;
		var found : boolean;
		var i : int;
		
		found = false;
		for (i = 0 ; i < this.Inventory.length && found == false ; ++i)
		{
			obj = this.Inventory[i];
			if (obj.getType() == typeRequested)
				found = true;
		}
		if (onceUse == true && found == true)
			this.Inventory.Remove(obj);
		return (found);
	}
	
	public function		HeroLockCamera(val : boolean) { gameObject.SendMessage("setLocked", val); }
	
	public function 	getMenuMode() : boolean { return(this._menu.getMenuMode()); }
	public function		getInv() { return (this._inventory_mode); }
	public function 	getDiary() { return (this._diary);}
	public function 	getPauseHero() : boolean { return (this._heroPaused); }
	public function 	getGameStarted() : boolean { return (this._gameStarted); }
	public function 	getIndoor() : boolean { return (this._soundManager.getIndoor()); }
	
	public function 	setUsableItemArea(area : UsableItemArea) { this._usableArea = area; }
	public function 	setPauseHero(val : boolean) { this._heroPaused = val; }
	public function		setSpecialAnimation(anim : Texture) { this._specialAnimation = anim; }
	public function		setDiary(diary : Book) { this._diary = diary; }
	public function		setGameStarted(val : boolean) { this._gameStarted = val; }
	
	public function 	updateDiary(content: String) { this._diary.addContent(content); }
	public function 	lookingUninteresting() { this._soundManager.playSoundType(parseInt(SoundType.SPEAK), parseInt(HeroVoice.UNINTERESTING)); }
	public function 	lookingUgly() { this._soundManager.playSoundType(parseInt(SoundType.SPEAK), parseInt(HeroVoice.UGLY)); }
	public function 	lookingAtDoorLocked() { this._soundManager.playSoundType(parseInt(SoundType.SPEAK), parseInt(HeroVoice.LOCKED)); }
	public function 	hearHeartBeat() { this._soundManager.playSoundType(parseInt(SoundType.SPEAK), parseInt(HeroVoice.HEART_BEAT)); }
	
	private function	displayItems()
	{
		var i 	: int;
		var x 	: int = 0;
		var y 	: int = 0;
		var obj : Collectable;
	
		for (i = 0 ; i < this.Inventory.length ; ++i)
		{
			obj = this.Inventory[i];
			if (obj != null)
			{
				GUI.DrawTexture(Rect(x, y, this.OBJECT_WIDTH, this.OBJECT_HEIGHT), obj.getIcon());
				
				if (this._bookSystem.getBookMode() == false)
				{
					if ((Input.mousePosition.x >= x && Input.mousePosition.x <= (x + this.OBJECT_WIDTH)) && (Screen.height - Input.mousePosition.y) >= y && (Screen.height - Input.mousePosition.y) <= (y + this.OBJECT_WIDTH))
						manageObjectUse(obj);
				}
				else
				{
					this._bookSystem.displayLeftPage();
					this._bookSystem.displayRightPage();
				}
				x += this.OBJECT_WIDTH;
				if ((x + this.OBJECT_WIDTH) >= Screen.width)
				{
					x = 0;
					y += this.OBJECT_HEIGHT;
				}
			}
		}
	}
	
	private function 	manageLamp() : void
	{
		if (this.lit == true)
	  	{
	  		this._flashLamp.gameObject.active = false;
	  		this.lit = false;
	  	}
	  	else
	  	{
	  		this._flashLamp.gameObject.active = true;
	  		this.lit = true;
	  	}
	  	this._soundManager.playSoundType(parseInt(SoundType.SPEAK), parseInt(HeroVoice.FLASHLIGHT));
	}
	
	private function 	OnDeserialized() : void
	{
		this.closeMenu();
		this._gameStarted = true;
	}
}
