#pragma strict

@script SerializeAll
public class InventoryManager extends MonoBehaviour
{
	public enum 	InventoryMode { OFF, MAIN, HANDABLE, READABLE, USABLE }
	
	public var 		OBJECT_WIDTH 		: int = 100;
	public var 		OBJECT_HEIGHT 		: int = 100;

	public var		_exitTexture 		: Texture;
	public var		_diaryTexture 		: Texture;
	public var		_toolBoxTexture		: Texture;
	public var		_pos 				: Vector3;
	public var		_interval 			: int;
	public var		_minY 				: int;
	public var		_maxY 				: int;
	public var		_descending 		: boolean;
	public var		_lamp 				: Texture;
	public var		_lampHandling		: Texture;
	public var		_lampAnim			: Texture[];
	public var		_inventoryTexture	: Texture;
	public var		_heroFont			: Font;
	public var 		_cursorTexture		: Texture2D;
	public var 		_cursorMode			: CursorMode = CursorMode.Auto;
	public var 		_hotSpot			: Vector2 = Vector2.zero;
	private var 	_specialAnimation	: Texture = null;
	private var		_inHand				: Weapon = null;
	private var		_diary				: Book = null;
	private var 	_inventoryMode 		: InventoryMode;
	private var		_attacking			: boolean;
	private var		_lastAnimTime		: float;
	private var 	_flashlightOn		: boolean;
	private var 	_handables			= new Array ();
	private var 	_books 				= new Array ();
	private var 	_usables 			= new Array ();
	private var		_inventories		= new Array();
	private var 	_flashLight 		: GameObject;
	private var		_bookSystem			: BookReadingManager;
	private var 	_usableArea 		: UsableItemArea;
	private var 	_healingPotionHP 	: int = 25;
	

	
	public function 	Start() : void {
		var text 		: TextAsset;
	
		this._inventoryMode = InventoryMode.OFF;
		this._flashlightOn = true;
		this._attacking = false;
		this._interval = 0;
		this.buildUpInventories();
		text = Resources.Load("Books_Content/Diary/1", typeof(TextAsset));
		this.giveDiary("Diary", "Personal diary", this._diaryTexture, "Personal Diary", text.ToString(), this._heroFont, null);
		this.giveWeapon(Collectable.ObjectType.lamp, "Lamp", "Useful to explore dark areas.", this._lamp,
						this._lampAnim, this._lampHandling, false, 0, 0, 0);
		this.switchToWeapon(0);
	}
	
	public function		Awake() : void {
		var	hero : GameObject;
	
		hero = GameObject.Find("Hero");
		this._flashLight = hero.Find("HeroLight");
		this._bookSystem = hero.GetComponent("BookReadingManager") as BookReadingManager;
	}
	
	public function 	manageLamp() : void {
		if (this._inHand == this._handables[0])
		{
			if (this._flashlightOn == true) {
		  		this._flashLight.gameObject.light.active = false;
		  		this._flashlightOn = false;
		  	}
		  	else {
		  		this._flashLight.gameObject.light.active = true;
		  		this._flashlightOn = true;
		  	}
		}
//	  	this._soundManager.playSoundType(parseInt(SoundType.SPEAK), parseInt(HeroVoice.FLASHLIGHT));
	}
	
	public function hasItem(typeRequested : Collectable.ObjectType, onceUse : boolean): boolean {
		var obj : Collectable;
		var found : boolean;
		var i : int;
		
		found = false;
		for (i = 0 ; i < this._usables.length && found == false ; ++i)
		{
			obj = this._usables[i] as Collectable;
			if (obj.getType() == typeRequested)
				found = true;
		}
		if (onceUse == true && found == true)
			this._usables.Remove(obj);
		return (found);
	}
	
	public function manageObjectUse(obj : Collectable, hp : int, hpMax : int)
	{
		if (Input.GetMouseButtonDown(0))
		{
			var type : Collectable.ObjectType;
		
			type = obj.getType();
			if (type == Collectable.ObjectType.healing && hp < hpMax)
				this.useFirstAid(obj);
			else if (type == Collectable.ObjectType.ink_bottle) {
				this.useInkBottle(obj);
			}
			else if (this._usableArea != null)
				this._usableArea.tryObjectHere(obj.getType());	
		}
		else
			GUI.Label (Rect (50, Screen.height - this.OBJECT_HEIGHT, 500, 500), obj.getName() + " : " + obj.getDescription());
		
	}
	
	public function 	displayInventory(hp : int, hpMax : int) {
		var	category : InventoryCategory;
	
		if (this._inventoryTexture != null)
			GUI.DrawTexture(Rect(0, 0,  Screen.width, Screen.height), this._inventoryTexture);
		category = this._inventories[parseInt(this._inventoryMode)] as InventoryCategory;
		category.getPtr()(hp, hpMax);
		if (this._inventoryMode == InventoryMode.MAIN)
		{
			GUI.color = Color.red;
			GUI.HorizontalScrollbar(Rect (Screen.width / 3, Screen.height * 0.7, 350, 50), 1, hp, 0, hpMax);
			GUI.color = Color.white;
		}
		if (this._specialAnimation != null)
			GUI.DrawTexture(Rect(0, 0,  Screen.width, Screen.height), this._specialAnimation);
		if (this._bookSystem.getBookMode() == true)
		{
			this._bookSystem.displayLeftPage();
			this._bookSystem.displayRightPage();
		}
	}
	
	public function 	displaySpecialAnimation() : void
	{
		GUI.DrawTexture(Rect(	0,
								0, 
								Screen.width, Screen.height), 
								this._specialAnimation);
		if (this._attacking == true) {
			this.manageAttackAnim();
		}
	}
	
	public function getCollectable(type : Collectable.ObjectType, name : String, description : String, icon : Texture) 
	{
		var newCollectable = new Collectable(type, name, description, icon);
		
		this._usables.Push(newCollectable);
	}
	
	public function giveBook(name : String, description : String, icon : Texture, title : String, text : String, font : Font, sketches : Texture[], type : Book.BookType) 
	{
		var newBook = new Book(name, description, icon, title, text, font, sketches, type);
	
		this._books.Push(newBook);
	}
	
	public function giveWeapon(	type : Collectable.ObjectType, name : String, description : String, icon : Texture,
								animation : Texture[], handling : Texture, canAttack : boolean, minDamage : int, maxDamage : int, coldown : float) 
	{
		var weapon = new Weapon(type, name, description, icon, animation, handling, canAttack, minDamage, maxDamage, coldown);
		
		this._handables.Push(weapon);
	}
	
	public function giveDiary(name : String, description : String, icon : Texture, title : String, text : String, font : Font, sketches : Texture[]) 
	{
		var newBook = new Book(name, description, icon, title, text, font, sketches, Book.BookType.DIARY);

		this._books.Push(newBook);
		this._diary = newBook;
	}
	
	public function		hasSpecialAnimation() : boolean { return (this._specialAnimation != null); }
	
	public function		getInHand() : Weapon { return (this._inHand); }
	public function		getAttacking() : boolean { return (this._attacking); }
	public function		getInventoryMode() : InventoryMode { return (this._inventoryMode); }
	public function		getSpecialAnimation() : Texture { return (this._specialAnimation); }
	public function		setInventoryMode(mode : InventoryMode) : void { this._inventoryMode = mode; }
	public function		setUsableItemArea(area : UsableItemArea) : void { this._usableArea = area; }
	public function		setSpecialAnimation(newAnimation : Texture) : void { this._specialAnimation = newAnimation; }
	
	public function 	updateBook(index : int, content: String) : void {
		var book : Book;
	
		book = this._books[index] as Book;
		book.addContent(content);
	}
	
	public function		displayObjectInHand() : void {
		GUI.DrawTexture(Rect(this._pos.x, this._pos.y, this._inHand.getPicture().width, this._inHand.getPicture().height), this._inHand.getPicture());
		this.movingObjectInHands();
	}
	
	public function		switchToWeapon(pos : int) : void {
		if (pos < this._handables.length && this._inHand != this._handables[pos])
		{
			if (this._inHand == this._handables[0])
				this.forceTurnLamp(false);
			else if (pos == 0)
				this.forceTurnLamp(true);
			this._inHand = this._handables[pos] as Weapon;
			this._descending = true;
			this._minY  = Screen.height - this._inHand.getPicture().height;
			this._pos.x = Screen.width - this._inHand.getPicture().width;
			this._pos.y = this._minY;
			this._maxY = this._pos.y + 30;
		}
	}
	
	public function		useCurrentWeapon() : boolean {
		if (this._inHand.getCanAttack() == true)
		{
			this._attacking = true;
			this._inHand.attack();
			this._lastAnimTime = Time.time;
			this._specialAnimation = this._inHand.getPicture();
		}
		return (this._attacking);
	}
	
	public function getBookIndex(type : Book.BookType) : int {
		var book : Book;
		var i : int;
		
		for (i = 0 ; i < this._books.length ; ++i) {
			book = this._books[i] as Book;
			if (book.getBookType() == type)
				return i;
		}
		return -1;
	}
	
	private function OnMouseEnter() {
		Cursor.SetCursor(this._cursorTexture, this._hotSpot, this._cursorMode);
	}
	
	private function OnMouseExit() {
		Cursor.SetCursor(null, Vector2.zero, this._cursorMode);
	}
	
	private function manageAttackAnim() : void {
		if (Time.time - this._lastAnimTime > 0.02)
		{
			this._specialAnimation = this._inHand.getNextAttackAnim();
			this._lastAnimTime = Time.time;
			if (this._specialAnimation == null)
				this._attacking = false;
		}
	}
	
	public function depleteInkBottle() : void {
		var item : Collectable;
		
		for (var i = 0 ; i < this._usables.length ; ++i) {
			item = this._usables[i] as Collectable;
			if (item.getType() == Collectable.ObjectType.ink_bottle) {
				this._usables.Remove(item);
				break;
			}
		}
	}
	
	private function forceTurnLamp(val : boolean) : void {
		this._flashLight.gameObject.SetActive(val);
	  	this._flashlightOn = val;
	}
	
	private function buildUpInventories() : void {
		this._inventories.Push(new InventoryCategory(	InventoryMode.OFF,
														"Exit",
														"Press escape or 'i' to return resume the game",
														this._exitTexture,
														null));
		this._inventories.Push(new InventoryCategory(	InventoryMode.MAIN,
														"Main inventory screen",
														"Return to main inventory screen",
														this._diaryTexture,
														this.displayMainInventory));
		this._inventories.Push(new InventoryCategory(	InventoryMode.HANDABLE,
														"Handable inventory screen",
														"Enable to switch item being handled (Lamp, weapon, etc.)",
														this._lamp,
														this.displayHandableInventory));
		this._inventories.Push(new InventoryCategory(	InventoryMode.READABLE,
														"Book inventory screen",
														"Enables to read books collected",
														this._diaryTexture,
														this.displayReadableInventory));
		this._inventories.Push(new InventoryCategory(	InventoryMode.USABLE,
														"Usable inventory screen",
														"Enables to use an object for a specific location",
														this._toolBoxTexture,
														this.displayUsableInventory));
		
	}
	
	private function		closeInventoryMode() : void {
		Time.timeScale = 1.0;
		this._inventoryMode = InventoryMode.OFF;
		gameObject.SendMessage("allowMouseMovement", true);
	}
	
	private function manageInventoryBrowsing(category : InventoryCategory) : IEnumerator {
		if (Input.GetMouseButtonUp(0))
		{
			if (category.getType() != InventoryMode.OFF)
				this._inventoryMode = category.getType();
			else
				this.closeInventoryMode();
		}
		else
			GUI.Label (Rect (50, Screen.height - this.OBJECT_HEIGHT, 500, 500), category.getTitle() + " : " + category.getDescription());
	}
	
	private function manageUseHandables(item : Collectable, weaponId : int) : IEnumerator {
		if (Input.GetMouseButtonDown(0)) {
			this.switchToWeapon(weaponId);
			this.closeInventoryMode();
		}
		else {
			GUI.Label (Rect (50, Screen.height - this.OBJECT_HEIGHT, 500, 500), item.getName() + " : " + item.getDescription());
		}
	}
	
	private function manageReadBooks(book : Book) : IEnumerator {
		if (Input.GetMouseButtonUp(0))
			this._bookSystem.openBook(book);
		else
			GUI.Label (Rect (50, Screen.height - this.OBJECT_HEIGHT, 500, 500), book.getName() + " : " + book.getDescription());
		
	}
	
	private function displayMainInventory() : void {
		var i 		: int;
		var x 		: int;
		var y 		: int;
		var pace	: int;
		var margin	: int;
		var category : InventoryCategory;

		margin = this.calculateMargin();
		pace = this.calculatePace(margin);
		x = margin;
		y = this.OBJECT_HEIGHT;
		for (i = 0 ; i < this._inventories.length ; ++i)
		{
			category = this._inventories[i] as InventoryCategory;
			if (category.getType() != InventoryMode.MAIN)
			{
				GUI.DrawTexture(Rect(x, y, this.OBJECT_WIDTH, this.OBJECT_HEIGHT), category.getIcon());
				if ((Input.mousePosition.x >= x && Input.mousePosition.x <= (x + this.OBJECT_WIDTH)) && (Screen.height - Input.mousePosition.y) >= y && (Screen.height - Input.mousePosition.y) <= (y + this.OBJECT_WIDTH))
					this.manageInventoryBrowsing(category);
				x += (pace + this.OBJECT_WIDTH);
				if ((x + this.OBJECT_WIDTH) >= Screen.width)
				{
					x = margin;
					y += this.OBJECT_HEIGHT;
				}
			}
		}
	}
	
	private function displayHandableInventory(hp : int, hpMax : int) : void {
		var i 		: int;
		var x 		: int;
		var y 		: int;
		var pace	: int;
		var margin	: int;
		var item 	: Collectable;

		margin = this.calculateMargin();
		pace = this.calculatePace(margin);
		x = margin;
		y = this.OBJECT_HEIGHT;
		for (i = 0 ; i < this._handables.length ; ++i)
		{
			item = this._handables[i] as Collectable;
			GUI.DrawTexture(Rect(x, y, this.OBJECT_WIDTH, this.OBJECT_HEIGHT), item.getIcon());
			if ((Input.mousePosition.x >= x && Input.mousePosition.x <= (x + this.OBJECT_WIDTH)) && (Screen.height - Input.mousePosition.y) >= y && (Screen.height - Input.mousePosition.y) <= (y + this.OBJECT_WIDTH))
				this.manageUseHandables(item, i);
			x += (pace + this.OBJECT_WIDTH);
			if ((x + this.OBJECT_WIDTH) >= Screen.width)
			{
				x = margin;
				y += this.OBJECT_HEIGHT;
			}
		}
	}
	
	private function displayReadableInventory(hp : int, hpMax : int) : void {
		var i 		: int;
		var x 		: int;
		var y 		: int;
		var pace	: int;
		var margin	: int;
		var item 	: Collectable;

		margin = this.calculateMargin();
		pace = this.calculatePace(margin);
		x = margin;
		y = this.OBJECT_HEIGHT;
		for (i = 0 ; i < this._books.length ; ++i)
		{
			item = this._books[i] as Collectable;
			GUI.DrawTexture(Rect(x, y, this.OBJECT_WIDTH, this.OBJECT_HEIGHT), item.getIcon());
			if (this._bookSystem.getBookMode() == false)
			{
				if ((Input.mousePosition.x >= x && Input.mousePosition.x <= (x + this.OBJECT_WIDTH)) && (Screen.height - Input.mousePosition.y) >= y && (Screen.height - Input.mousePosition.y) <= (y + this.OBJECT_WIDTH))
					this.manageReadBooks(item as Book);
			}
			x += (pace + this.OBJECT_WIDTH);
			if ((x + this.OBJECT_WIDTH) >= Screen.width)
			{
				x = margin;
				y += this.OBJECT_HEIGHT;
			}
		}
	}
	
	private function displayUsableInventory(hp : int, hpMax : int) : void {
		var i 		: int;
		var x 		: int;
		var y 		: int;
		var pace	: int;
		var margin	: int;
		var item 	: Collectable;

		margin = this.calculateMargin();
		pace = this.calculatePace(margin);
		x = margin;
		y = this.OBJECT_HEIGHT;
		for (i = 0 ; i < this._usables.length ; ++i) {
			item = this._usables[i] as Collectable;
			GUI.DrawTexture(Rect(x, y, this.OBJECT_WIDTH, this.OBJECT_HEIGHT), item.getIcon());
			if ((Input.mousePosition.x >= x && Input.mousePosition.x <= (x + this.OBJECT_WIDTH)) && (Screen.height - Input.mousePosition.y) >= y && (Screen.height - Input.mousePosition.y) <= (y + this.OBJECT_WIDTH))
				this.manageObjectUse(item, hp, hpMax);
			x += (pace + this.OBJECT_WIDTH);
			if ((x + this.OBJECT_WIDTH) >= Screen.width)
			{
				x = margin;
				y += this.OBJECT_HEIGHT;
			}
		}
	}
	
	private function calculateMargin() : int {
		var margin : int;
	
		if (Screen.width >= 500)
			margin = Screen.width / 10;
		else
			margin = 0;
		return (margin);
	}
	
	private function calculatePace(margin : int) : int {
		var pace : int;
	
		pace = ((Screen.width - margin % this.OBJECT_WIDTH) / (Mathf.RoundToInt((Screen.width - margin) / this.OBJECT_WIDTH) - 1));
		return (pace);
	}
	
	private function movingObjectInHands() {
		if (this._interval >= 10)
		{
			if (this._descending == true)
			{
				++this._pos.y;
				if (this._pos.y >= this._maxY)
					this._descending = false;
			}
			else
			{
				--this._pos.y;
				if (this._pos.y <= this._minY)
					this._descending = true;
				
			}
			this._interval = 0;
		}
		++this._interval;
	}
	
	private function useFirstAid(obj: Collectable) : void {
		this._usables.Remove(obj);
		gameObject.SendMessage("drinkHealingPotion", this._healingPotionHP);
	}
	
	private function useInkBottle(obj: Collectable) : void {
		this.closeInventoryMode();
		gameObject.SendMessage("openMenu", MenuManager.Menu_Data.SAVE_MENU);
	}
	
	private function 	OnDeserialized() : void {
		this._inventories.Clear();
		this.buildUpInventories();
	}
}