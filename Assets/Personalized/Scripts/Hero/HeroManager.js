#pragma strict

@script SerializeAll
public class HeroManager extends MonoBehaviour
{
	public var 		_heroPaused 		: boolean = false;
	public var		_rainingSpawner		: ParticleSystem;
	public var		_fading				: Texture;
	private var		_blurringEffect		: MotionBlur;
	private var		_fishEyeEffect		: Fisheye;
	private var 	_hpMax			 	: int;
	private var 	_hp				 	: int;
	private var 	_heroCamera		 	: Camera;
	private var		_sanity				: float;
	private var		_gameStarted		: boolean;
	private var		_dying				: boolean;
	private var		_mouseLook			: MouseLook;
	private var		_sanityManager		: SanityManager;
	private var		_splatterEffect		: SplatterEffectManager;
	private var 	_soundManager 		: SoundManagerHero;
	private var 	_tutoManager 		: TutorialManager;
	private var		_menu				: MenuManager;
	private var		_inventoryManager	: InventoryManager;
	private var		_dialogManager		: DialogManager;
	private var		_targets			: List.<GameObject>;
	private var		_audiosPaused		: List.<AudioSource>;
	
	private enum	sanityState { HEALTHY, UNSTABLE, INSANE }

	public function 	Start()
	{
		this._rainingSpawner.enableEmission = false;
		this.openMenu(MenuManager.Menu_Data.MAIN_MENU);
		this._gameStarted = false;
		this._dying = false;
		this._targets = new List.<GameObject>();
		this._hpMax = 100;
		this._hp = 100;
	}
	
	public function		Awake() : void
	{
		var	hero : GameObject;
	
		hero = GameObject.Find("Hero");
		this._soundManager = hero.GetComponent("SoundManagerHero") as SoundManagerHero;
		this._menu = hero.GetComponent("MenuManager") as MenuManager;
		this._inventoryManager = hero.GetComponent("InventoryManager") as InventoryManager;
		this._splatterEffect = hero.GetComponent("SplatterEffectManager") as SplatterEffectManager;
		this._sanityManager = hero.GetComponent("SanityManager") as SanityManager;
		this._dialogManager = hero.GetComponent("DialogManager") as DialogManager;
		this._tutoManager = hero.GetComponent("TutorialManager") as TutorialManager;
		this._mouseLook = hero.GetComponent("MouseLook") as MouseLook;
		this._heroCamera = hero.Find("Main Camera").GetComponent(Camera);
		this._sanityManager.setSoundManager(this._soundManager);
		this._audiosPaused	= new List.<AudioSource>();
		
		/*this.addDialogText('this is a test1', 3, Message.messageType.DIALOG);
		this.addDialogText('this is a test2', 3, Message.messageType.TUTORIAL);
		this.addDialogText('this is a test3', 3, Message.messageType.WARNING);*/
	}
	
	public function OnGUI () : IEnumerable
	{
		if (this.getInv() != InventoryManager.InventoryMode.OFF)
			this._inventoryManager.displayInventory(this._hp, this._hpMax);
		else if (this.getMenuMode() == true)
			this.manageDisplayMenu();
		else if (this.getInv() == InventoryManager.InventoryMode.OFF && this.getPauseHero() == false)
		{
			if (this._inventoryManager.hasSpecialAnimation() == false) {
				this._inventoryManager.displayObjectInHand();
				this._dialogManager.displayDialogs();
			}
			else
				this._inventoryManager.displaySpecialAnimation();
		}
	}

	public function 	Update()
	{
		if (this._gameStarted == true && this._dying == false)
		{
			if (Input.GetButtonDown("Escape"))
			{
				if (this._menu.getMenuMode() == true)
					this.closeMenu();
				else
				{
					if (this._inventoryManager.getInventoryMode() == InventoryManager.InventoryMode.OFF)
						this.openMenu(MenuManager.Menu_Data.RUNNING_MENU);
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
		if (this._menu.getMenuMode() == false && this._inventoryManager.getInventoryMode() == InventoryManager.InventoryMode.OFF)
			this._sanityManager.manageHeroScared();
	}
		
	public function setSpecialAnimation(newAnimation : Texture) : void { this._inventoryManager.setSpecialAnimation(newAnimation); }
	
	public function	setIndoor(val : boolean)
	{
		this.manageIsRaining(val);
		this._soundManager.setIndoor(val);
	}
	
	public function		setFloorType(val : SoundManagerHero.FloorType) : void { this._soundManager.setFloorType(val); }
	
	public function		setHearThunder(volume : float) : void { this._soundManager.setThunderVolume(volume); }
	
	
	public function 	manageDisplayMenu() : IEnumerable { _menu.manageDisplayMenu(); }
	
	public function		openMenu(menu : MenuManager.Menu_Data) : void
	{
		var allAudioSources = FindObjectsOfType(AudioSource) as AudioSource[];
		
		Time.timeScale = 0;
		this.allowMouseMovement(false);
		this._menu.goTo(parseInt(menu));
		this._menu.setMenuMode(true);
		this._soundManager.setPlayRain(false);
		this._soundManager.stopHeroAllAudios();
		
		for (var audioS : AudioSource in allAudioSources) {
			if (audioS.isPlaying == true) {
				this._audiosPaused.Add(audioS);
				audioS.active = false;
			}
		}
		this._soundManager.playTheme(SoundManagerHero.MusicTheme.MENU, true);
		
	}
	
	public function		closeMenu() : void
	{
		Time.timeScale = 1.0;
		this.allowMouseMovement(true);
		this._menu.setMenuMode(false);
		this._soundManager.setPlayRain(true);
		this._soundManager.playTheme(SoundManagerHero.MusicTheme.MENU, false);
		this._heroCamera.gameObject.GetComponent(AudioListener).pause = false;
		for (var i = 0 ; i < this._audiosPaused.Count ; ++i) {
			this._audiosPaused[i].active = true;
		}
		this._audiosPaused.Clear();
	}
	
	public function 	openInventoryMode()
	{
		Time.timeScale = 0;
		this._inventoryManager.setInventoryMode(InventoryManager.InventoryMode.MAIN);
		this.allowMouseMovement(false);
	}
	
	public function 	closeInventoryMode()
	{
		Time.timeScale = 1.0;
		this._inventoryManager.setInventoryMode(InventoryManager.InventoryMode.OFF);
		this.allowMouseMovement(true);
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
	
	public function manageObjectUse(obj : Collectable) { this._inventoryManager.manageObjectUse(obj, this._hp, this._hpMax); }
	
	public function hasItem(typeRequested : Collectable.ObjectType, onceUse : boolean) : boolean {
		return (this._inventoryManager.hasItem(typeRequested, onceUse));
	}
	
	public function		allowMouseMovement(val : boolean) { this._mouseLook.enabled = val; }
	
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
	
	public function		manageLookingAtScaryThings() : void { this._sanityManager.manageLookingAtScaryThings(); }
	public function		scareHero(val : int) : void { this._sanityManager.scareHero(val); }
	
	public function		takeDamage(damage : int) : void
	{
		this._splatterEffect.hitHero();
		this._soundManager.playSoundType(parseInt(SoundManagerHero.SoundType.SPEAK), parseInt(SoundManagerHero.HeroVoice.PAIN));
		this._hp -= damage;
		if (this._hp <= 30 && this._sanityManager.getSepiaToneEffect() == false)
			this._sanityManager.setSepiaToneEffect(true);
		if (this._hp <= 0)
			this.die();
	}
	
	public function		drinkHealingPotion(hp : int) : void
	{
		this._soundManager.playSoundType(parseInt(SoundManagerHero.SoundType.SPEAK), parseInt(SoundManagerHero.HeroVoice.BOTTLE));
		this._hp += hp;
		if (this._hp > this._hpMax)
			this._hp = this._hpMax;
	}
	
	public function	WaitForRealSeconds(time : float) : IEnumerator
	{
		 var start : float = Time.realtimeSinceStartup;

         while (Time.realtimeSinceStartup < start + time) { };
	}
	
	public function		addDialogText(content : String, duration : float, type : Message.messageType) : void {
		this._dialogManager.addTextToDisplay(content, duration, type);
	}
	public function		mayDislayTuto(type : TutorialManager.TutoList) { this._tutoManager.mayDislayTuto(type, this.addDialogText); }
	
	public function 	getCamera() : Camera { return(this._heroCamera); }
	public function 	getMenuMode() : boolean { return(this._menu.getMenuMode()); }
	public function		getInv() : InventoryManager.InventoryMode { return (this._inventoryManager.getInventoryMode()); }
	public function 	getPauseHero() : boolean { return (this._heroPaused); }
	public function 	getGameStarted() : boolean { return (this._gameStarted); }
	public function 	getIndoor() : boolean { return (this._soundManager.getIndoor()); }

	public function		setMouseMovement(val : boolean) { this.allowMouseMovement(val);}
	public function 	setPauseHero(val : boolean) { this._heroPaused = val; }
	public function		setGameStarted(val : boolean) { this._gameStarted = val; }
	public function 	setUsableItemArea(area : UsableItemArea) : void { this._inventoryManager.setUsableItemArea(area); }

	public function 	updateDiary(content: String) : void { this._inventoryManager.updateDiary(content); }
	public function 	lookingUninteresting() { this._soundManager.playSoundType(parseInt(SoundManagerHero.SoundType.SPEAK), parseInt(SoundManagerHero.HeroVoice.UNINTERESTING)); }
	public function 	lookingUgly() { this._soundManager.playSoundType(parseInt(SoundManagerHero.SoundType.SPEAK), parseInt(SoundManagerHero.HeroVoice.UGLY)); }
	public function 	lookingAtDoorLocked() { this._soundManager.playSoundType(parseInt(SoundManagerHero.SoundType.SPEAK), parseInt(SoundManagerHero.HeroVoice.LOCKED)); }
	public function 	hearHeartBeat() { this._soundManager.playSoundType(parseInt(SoundManagerHero.SoundType.SPEAK), parseInt(SoundManagerHero.HeroVoice.HEART_BEAT)); }
	public function 	hearOpenBook() { this._soundManager.playOpenBook(); }
	public function 	hearCloseBook() { this._soundManager.playCloseBook(); }
	public function 	hearTurnPage() { this._soundManager.playTurnPage(); }
	public function		walkingOnBones() : void { this._soundManager.walkingOnBones(); }
	
	private function	die() : void
	{
		Time.timeScale = 0.1;
		this.allowMouseMovement(false);
		this._dying = true;
		var alphaFadeValue = 1.0;
		alphaFadeValue -= Mathf.Clamp01(Time.deltaTime / 5);
		GUI.color = new Color(alphaFadeValue, alphaFadeValue, alphaFadeValue, alphaFadeValue);
		GUI.DrawTexture( new Rect(0, 0, Screen.width, Screen.height ), this._fading);
		//this.openMenu(MenuManager.Menu_Data.GAME_OVER);
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
	
		this._soundManager.playSoundType(parseInt(SoundManagerHero.SoundType.WEAPON), parseInt(SoundManagerHero.HeroWeapon.MINEPICK));
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
