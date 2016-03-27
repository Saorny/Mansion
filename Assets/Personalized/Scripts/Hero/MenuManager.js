#pragma strict

@script SerializeAll
public class MenuManager extends MonoBehaviour
{
	public enum Menu_Data { 
		MAIN_MENU, RUNNING_MENU, SAVE_MENU, LOAD_MENU, GAME_OVER, OPTIONS
		, TUTORIALS, TUTO_MAIN, TUTO_INVENTORY, TUTO_HEALTH
		, TOTAL, PREVIOUS
		}
	public enum Button_Data { BUTTON_WIDTH = 350, BUTTON_HEIGHT = 30, MENU_WIDTH = 450 , INTER_SPACE = 20 }
	
	public var 			_background 	: Texture;
	public var			_button_click	: AudioSource;
	public var			_button_action	: AudioSource;
	private var			_closeMenuPtr	: function() : void;
	private var			_useInkPtr		: function() : void;
	private var			_menus			: Dictionary.<MenuManager.Menu_Data, Menu>;
	private var			_previousMenus	: List.<Menu>;
	private var 		_menuMode 		: boolean = false;
	private var			_selectedMenu 	: Menu;
	private var			_loaded			: boolean;
	private var			_inputManager	: InputManager;
	private var			COMMON_PATH 	: String = 'Texts/menu_tutos/';
	
	public function		load(closePtr : function(): void, useInkPtr : function(): void,
							inputManager : InputManager) : void {
		this._closeMenuPtr = closePtr;
		this._useInkPtr = useInkPtr;
		this._inputManager = inputManager;
		this._loaded = false;
		this._menus = new Dictionary.<MenuManager.Menu_Data, Menu>();
		this._previousMenus = new List.<Menu>();
		this.buildUpMenu();
	}
	
	public function manageDisplayMenu () : IEnumerable  {
		if (this._loaded == true)
		{
			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), _background);
			this._selectedMenu.display();
		}
	}
	
	public function goTo(val : int) : void {
		if (val != parseInt(Menu_Data.PREVIOUS))
		{
			if (val < this._menus.Count && this._menus != null)
			{
				this._menus[val].refresh();
				this._previousMenus.Add(this._selectedMenu);
				this._selectedMenu = this._menus[val];
			}
		}
		else
		{
			var	item 	: Menu;
			
			item = this._previousMenus[this._previousMenus.Count - 1];
			if (this._previousMenus.Count > 0) {
				this._selectedMenu = item;
				this._previousMenus.Remove(item);
			}
			else
				Debug.Log("Error: there is no previous menu");
		}
	}
	
	public function	setMenuMode (val : boolean) : void { this._menuMode = val; }
	public function	getMenuMode () : boolean { return (this._menuMode); }
	
	private function	playButtonClick() : IEnumerable {
		if (this._button_click)
		{
			this._button_click.Play();
		}
	}
	
	private function 	OnDeserialized() : void {
		this._loaded = false;
		this._menus.Clear();
		this.buildUpMenu();
	}
	
	private function	buildUpMenu() : void {
		this._menus[Menu_Data.MAIN_MENU] = new MenuMain(this._button_action, this.goTo, this._closeMenuPtr);
		this._menus[Menu_Data.RUNNING_MENU] = new MenuMainRunning(this._button_action, this.goTo, this._closeMenuPtr);
		this._menus[Menu_Data.SAVE_MENU] = new MenuSave(this._button_action, this.goTo, this._closeMenuPtr, this._useInkPtr);
		this._menus[Menu_Data.LOAD_MENU] = new MenuLoad(this._button_action, this.goTo);
		this._menus[Menu_Data.GAME_OVER] = new MenuGameOver(this._button_action, this.goTo, this._closeMenuPtr);
		this._menus[Menu_Data.OPTIONS] = new MenuOptions(this._button_action, this.goTo, this._inputManager);
		this._menus[Menu_Data.TUTORIALS] = new MenuTutorial(this._button_action, this.goTo);
		this._menus[Menu_Data.TUTO_MAIN] = new MenuTutoMain(this._button_action, this.goTo, this.COMMON_PATH + Menu_Data.TUTO_MAIN.ToString());
		this._menus[Menu_Data.TUTO_INVENTORY] = new MenuTutoIventory(this._button_action, this.goTo, this.COMMON_PATH + Menu_Data.TUTO_INVENTORY.ToString());
		this._menus[Menu_Data.TUTO_HEALTH] = new MenuTutoHealth(this._button_action, this.goTo, this.COMMON_PATH + Menu_Data.TUTO_HEALTH.ToString());
		this._selectedMenu = this._menus[Menu_Data.MAIN_MENU];
		this._loaded = true;
	}
}