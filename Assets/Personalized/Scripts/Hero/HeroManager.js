#pragma strict

@script SerializeAll
public class HeroManager extends MonoBehaviour
{
	public var 		_heroPaused 		: boolean = false;
	public var		_rainingSpawner		: ParticleSystem;
	private var		_blurringEffect		: MotionBlur;
	private var		_fishEyeEffect		: Fisheye;
	private var 	_lastTimeScary	 	: float;
	private var 	_intervalScare	 	: float;
	private var 	_heroCamera		 	: Camera;
	private var		_sanity				: float;
	private var		_gameStarted		: boolean;
	private var 	_soundManager 		: SoundManagerHero;
	private var		_menu				: MenuManager;
	private var		_inventoryManager	: InventoryManager;
	private var		_targets			: List.<GameObject>;
	
	private enum	sanityState { HEALTHY, UNSTABLE, INSANE }

	public function 	Start()
	{
		this._rainingSpawner.enableEmission = false;
		this.openMenu();
		this._gameStarted = false;
		this._targets	= new List.<GameObject>();
		this._sanity = 100;
		this._intervalScare = 0.04;
		this._lastTimeScary = 0;
	}
	
	public function		Awake() : void
	{
		var	hero : GameObject;
	
		hero = GameObject.Find("Hero");
		this._soundManager = hero.GetComponent("SoundManagerHero") as SoundManagerHero;
		this._menu = hero.GetComponent("MenuManager") as MenuManager;
		this._inventoryManager = hero.GetComponent("InventoryManager") as InventoryManager;
		this._heroCamera = hero.Find("Main Camera").GetComponent(Camera);
		this._blurringEffect = this._heroCamera.GetComponent("MotionBlur") as MotionBlur;
		this._fishEyeEffect = this._heroCamera.GetComponent("Fisheye") as Fisheye;
		this._blurringEffect.enabled = false;
		this._fishEyeEffect.enabled = false;
	}
	
	public function OnGUI () : IEnumerable
	{
		if (this.getInv() != InventoryManager.InventoryMode.OFF)
			this._inventoryManager.displayInventory();
		else if (this.getMenuMode() == true)
			this.manageDisplayMenu();
		else if (this.getInv() == InventoryManager.InventoryMode.OFF && this.getPauseHero() == false)
		{
			if (this._inventoryManager.hasSpecialAnimation() == false)
				this._inventoryManager.displayObjectInHand();
			else
				this._inventoryManager.displaySpecialAnimation();
		}
		
	}
	
	public function setSpecialAnimation(newAnimation : Texture) : void { this._inventoryManager.setSpecialAnimation(newAnimation); }
	
	public function	setIndoor(val : boolean)
	{
		this.manageIsRaining(val);
		this._soundManager.setIndoor(val);
	}
	
	public function		setFloorType(val : SoundManagerHero.FloorType) : void { this._soundManager.setFloorType(val); }
	
	public function		setHearThunder(volume : float) : void { this._soundManager.setThunderVolume(volume); }
	
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
					if (this._inventoryManager.getInventoryMode() == InventoryManager.InventoryMode.OFF)
						this.openMenu();
					else
					{
						if (this._inventoryManager.getInventoryMode() == InventoryManager.InventoryMode.MAIN)
							this.closeInventoryMode();
						else
							this._inventoryManager.setInventoryMode(InventoryManager.InventoryMode.MAIN);
					}
				}
			}
			else if (Input.GetButtonDown("Inventory"))
			{
				if (this._menu.getMenuMode() == false && this._heroPaused == false)
				{
					if (this._inventoryManager.getInventoryMode() == InventoryManager.InventoryMode.OFF)
						this.openInventoryMode();
					else
					{
						if (this._inventoryManager.getInventoryMode() == InventoryManager.InventoryMode.MAIN)
							this.closeInventoryMode();
						else
							this._inventoryManager.setInventoryMode(InventoryManager.InventoryMode.MAIN);
					}
				}
			}
			else if (this._inventoryManager.getAttacking() == false)
			{
				if (Input.GetMouseButtonDown(0))
				{
					if (this._menu.getMenuMode() == false && this._inventoryManager.getInventoryMode() == InventoryManager.InventoryMode.OFF && this._heroPaused == false)
					{
						var weapon : Weapon;
						
						weapon = this._inventoryManager.getInHand();
						if (weapon.getCanAttack() == true)
						{
							this._inventoryManager.useCurrentWeapon();
							this.hitTargets(weapon);
						}
					}
				}
				else if (Input.GetButtonDown("Lamp"))
				{
					if (this._menu.getMenuMode() == false && this._inventoryManager.getInventoryMode() == InventoryManager.InventoryMode.OFF && this._heroPaused == false)
						this._inventoryManager.manageLamp();
				}
				else if (Input.GetButtonDown("Weapon1"))
				{
					if (this._menu.getMenuMode() == false && this._inventoryManager.getInventoryMode() == InventoryManager.InventoryMode.OFF && this._heroPaused == false)
						this._inventoryManager.switchToWeapon(0);
				}
				else if (Input.GetButtonDown("Weapon2"))
				{
					if (this._menu.getMenuMode() == false && this._inventoryManager.getInventoryMode() == InventoryManager.InventoryMode.OFF && this._heroPaused == false)
						this._inventoryManager.switchToWeapon(1);
				}
			}
		}
		if (this._sanity < 100 && this._menu.getMenuMode() == false && this._inventoryManager.getInventoryMode() == InventoryManager.InventoryMode.OFF)
			this.manageHeroScared();
	}
	
	public function 	manageDisplayMenu() : IEnumerable { _menu.manageDisplayMenu(); }
	
	public function		openMenu() : void
	{
		Time.timeScale = 0;
		this.HeroLockCamera(true);
		if (this._gameStarted == true)
			this._menu.goTo(parseInt(MenuManager.Menu_Data.RUNNING_MENU));
		this._menu.setMenuMode(true);
		this._soundManager.setPlayRain(false);
		this._soundManager.stopHeroAllAudios();
		this._soundManager.playTheme(SoundManagerHero.MusicTheme.MENU, true);
	}
	
	public function		closeMenu() : void
	{
		Time.timeScale = 1.0;
		this.HeroLockCamera(false);
		this._menu.setMenuMode(false);
		this._soundManager.setPlayRain(true);
		this._soundManager.playTheme(SoundManagerHero.MusicTheme.MENU, false);
	}
	
	public function 	openInventoryMode()
	{
		Time.timeScale = 0;
		this._inventoryManager.setInventoryMode(InventoryManager.InventoryMode.MAIN);
		this.HeroLockCamera(true);
	}
	
	public function 	closeInventoryMode()
	{
		Time.timeScale = 1.0;
		this._inventoryManager.setInventoryMode(InventoryManager.InventoryMode.OFF);
		this.HeroLockCamera(false);
	}
	
	public function getCollectable(type : Collectable.ObjectType, name : String, description : String, icon : Texture) 
	{
		this._inventoryManager.getCollectable(type, name, description, icon);
	}
	
		
	public function		giveBook(	name : String, description : String, icon : Texture,
									title : String, text : String, font : Font, sketches : Texture[]) : void {
		this._inventoryManager.giveBook(name, description, icon, title, text, font, sketches);
	}
	
	public function giveWeapon(	type : Collectable.ObjectType, name : String, description : String, icon : Texture,
								animation : Texture[], canAttack : boolean, minDamage : int, maxDamage : int, coldown : float) 
	{
		this._inventoryManager.giveWeapon(type, name, description, icon,
		animation, canAttack, minDamage, maxDamage, coldown);
	}
	
	public function manageObjectUse(obj : Collectable) { this._inventoryManager.manageObjectUse(obj); }
	
	public function hasItem(typeRequested : Collectable.ObjectType, onceUse : boolean) : boolean {
		return (this._inventoryManager.hasItem(typeRequested, onceUse));
	}
	
	public function		HeroLockCamera(val : boolean) { gameObject.SendMessage("setLocked", val); }
	
	public function		addTarget(item : GameObject) : void
	{
		if (this._targets.Contains(item) == false)
			this._targets.Add(item);		
	}
	
	public function		removeTarget(item : GameObject) : void
	{
		if (this._targets.Contains(item) == true)
			this._targets.Remove(item);		
	}
	
	public function		manageLookingAtScaryThings() : void
	{
		if (this._sanity > 0)
		{
			if (Time.time - this._lastTimeScary > this._intervalScare)
			{
				if (this._sanity == 100)
					this._fishEyeEffect.enabled = true;
				if (((this._sanity - 1) % 10) > 9)
				{
					this._fishEyeEffect.strengthX = (1 - (Mathf.Round(this._sanity / 10) / 10));
					this._fishEyeEffect.strengthY = (1 - (Mathf.Round(this._sanity / 10) / 10));
				}
				this._lastTimeScary = Time.time;
				--this._sanity;
				if (this._sanity < 50 && this._blurringEffect.enabled == false)
				{
					this.hearHeartBeat();
					this._blurringEffect.enabled = true;
				}
			}
		}
	}
	
	public function		scareHero(val : int) : void
	{
		this._sanity -= val;
		if (this._sanity < 0)
			this._sanity = 0;
		this.hearHeartBeat();
		this._fishEyeEffect.enabled = true;
		this._blurringEffect.enabled = true;
		this._fishEyeEffect.strengthX = (1 - (Mathf.Round(this._sanity / 10) / 10));
		this._fishEyeEffect.strengthY = (1 - (Mathf.Round(this._sanity / 10) / 10));
	}
	
	public function 	getCamera() : Camera { return(this._heroCamera); }
	public function 	getMenuMode() : boolean { return(this._menu.getMenuMode()); }
	public function		getInv() : InventoryManager.InventoryMode { return (this._inventoryManager.getInventoryMode()); }
	public function 	getPauseHero() : boolean { return (this._heroPaused); }
	public function 	getGameStarted() : boolean { return (this._gameStarted); }
	public function 	getIndoor() : boolean { return (this._soundManager.getIndoor()); }

	public function 	setPauseHero(val : boolean) { this._heroPaused = val; }
	public function		setGameStarted(val : boolean) { this._gameStarted = val; }
	public function 	setUsableItemArea(area : UsableItemArea) : void { this._inventoryManager.setUsableItemArea(area); }

	public function 	updateDiary(content: String) : void { this._inventoryManager.updateDiary(content); }
	public function 	lookingUninteresting() { this._soundManager.playSoundType(parseInt(SoundManagerHero.SoundType.SPEAK), parseInt(SoundManagerHero.HeroVoice.UNINTERESTING)); }
	public function 	lookingUgly() { this._soundManager.playSoundType(parseInt(SoundManagerHero.SoundType.SPEAK), parseInt(SoundManagerHero.HeroVoice.UGLY)); }
	public function 	lookingAtDoorLocked() { this._soundManager.playSoundType(parseInt(SoundManagerHero.SoundType.SPEAK), parseInt(SoundManagerHero.HeroVoice.LOCKED)); }
	public function 	hearHeartBeat() { this._soundManager.playSoundType(parseInt(SoundManagerHero.SoundType.SPEAK), parseInt(SoundManagerHero.HeroVoice.HEART_BEAT)); }
	public function		walkingOnBones() : void { this._soundManager.walkingOnBones(); }
	
	private function	manageHeroScared() : IEnumerator
	{
		if (Time.time - this._lastTimeScary > this._intervalScare)
		{
			this._lastTimeScary = Time.time;
			this._sanity += 0.3;
			if (this._sanity >= 100)
			{
				if (this._sanity > 100)
					this._sanity = 100;
				this._fishEyeEffect.enabled = false;
			}
			if (((this._sanity + 0.3) % 10) < 0.3)
			{
				this._fishEyeEffect.strengthX = (1 - (Mathf.Round(this._sanity / 10) / 10));
				this._fishEyeEffect.strengthY = (1 - (Mathf.Round(this._sanity / 10) / 10));
			}
			if (this._sanity > 50 && this._blurringEffect.enabled == true)
			{
				this._blurringEffect.enabled = false;
				this._soundManager.stopHeroSoundType(parseInt(SoundManagerHero.SoundType.SPEAK));
			}
		}
		if (this._sanity < 75)
			this._soundManager.manageScaredSounds();
	}
	
	private function manageIsRaining(indoor : boolean) : void
	{
		if (indoor == true)
			this._rainingSpawner.enableEmission = false;
		else
			this._rainingSpawner.enableEmission = true;
	}
	
	private function hitTargets(weapon : Weapon) : void
	{
		var target : Hittable;
	
		for (var i : int = 0 ; i < this._targets.Count ; ++i)
		{
			target = this._targets[i].GetComponent("Hittable") as Hittable;
			if (target.isVisible() == true)
			{
				if (target.hit(weapon) == false)
				{
					this._targets.Remove(this._targets[i]);
					target.die();
				}
			}
		}
	}
	
	private function 	OnDeserialized() : void
	{
		this.closeMenu();
		this._gameStarted = true;
	}
}
