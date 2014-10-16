#pragma strict

@script SerializeAll
public class MenuManager extends MonoBehaviour
{
	public enum Menu_Data { MAIN_MENU, RUNNING_MENU, SAVE_MENU, LOAD_MENU, TOTAL, PREVIOUS }
	public enum Button_Data { BUTTON_WIDTH = 300, BUTTON_HEIGHT = 30, MENU_WIDTH = 350, INTER_SPACE = 20 }
	
	public var 			_background 	: Texture;
	public var			_button_click	: AudioSource;
	public var			_button_action	: AudioSource;
	private var			_subMenus		: List.<Menu> = new List.<Menu>();
	private var 		_menuMode 		: boolean = false;
	private var			_selectedMenu 	: Menu;
	private var			_previousMenu	: Menu;
	private var			_loaded			: boolean;
	private var			_hero			: HeroManager;
	
	public function Start() : void
	{
		this._loaded = false;
		this.buildUpMenu();
	}
	
	public function		Awake() : void
	{
		var	hero : GameObject;
	
		hero = GameObject.Find("Hero");
		this._hero = hero.GetComponent("HeroManager") as HeroManager;
	}
	
	public function manageDisplayMenu () : IEnumerable 
	{
		if (this._loaded == true)
		{
			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), _background);
			this._selectedMenu.display();
		}
	}
	
	public function goTo(val : int) : void
	{
		if (val != parseInt(Menu_Data.PREVIOUS))
		{
			if (val < this._subMenus.Count && this._subMenus != null)
			{
				if (val == parseInt(Menu_Data.SAVE_MENU) || val == parseInt(Menu_Data.LOAD_MENU))
					this._subMenus[val].refresh();
				this._previousMenu = this._selectedMenu;
				this._selectedMenu = this._subMenus[val];
			}
		}
		else
		{
			var	save 	: Menu;
			
			save = this._selectedMenu;
			this._selectedMenu = this._previousMenu;
			this._previousMenu = save;
			
		}
	}
	
	public function	setMenuMode (val : boolean) : void { this._menuMode = val; }
	public function	getMenuMode () : boolean { return (this._menuMode); }
	
	private function	playButtonClick() : IEnumerable
	{
		if (this._button_click)
		{
			this._button_click.Play();
		}
	}
	
	private function 	OnDeserialized() : void
	{
		this._loaded = false;
		this._subMenus.Clear();
		this.buildUpMenu();
	}
	
	private function	buildUpMenu() : void
	{
		this._subMenus.Add(new MenuMain(this._hero, this._button_action, this.goTo));
		this._subMenus.Add(new MenuMainRunning(this._hero, this._button_action, this.goTo));
		this._subMenus.Add(new MenuSave(this._hero, this._button_action, this.goTo));
		this._subMenus.Add(new MenuLoad(this._hero, this._button_action, this.goTo));
		this._selectedMenu = _subMenus[parseInt(Menu_Data.MAIN_MENU)];
		this._previousMenu = _subMenus[parseInt(Menu_Data.MAIN_MENU)];
		this._loaded = true;
	}
}