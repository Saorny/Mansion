#pragma strict

@DoNotSerialize
public class MenuMainRunning extends Menu
{
	public function		MenuMainRunning() {}

	public function		MenuMainRunning(heroManager	: HeroManager, action_sound : AudioSource, ptr : function(MenuManager.Menu_Data) : void)
	{
		super(heroManager, ptr, action_sound);
		this._menuTitle = "Game menu";
		this._subMenus.Add(new MenuButton("Resume", this.resumeGame));
		this._subMenus.Add(new MenuButton("Options", this.goToOptionsMenu));
		this._subMenus.Add(new MenuButton("Tutorial", this.goToTutorialsMenu));
		this._subMenus.Add(new MenuButton("Load game", this.goToLoadMenu));
		this._subMenus.Add(new MenuButton("Abandon game", this.quitGame));
	}
	
	private function	resumeGame() : void { this._hero.closeMenu(); }
	private function	goToOptionsMenu() : void { this.goTo(MenuManager.Menu_Data.OPTIONS); }
	private function	goToTutorialsMenu() : void { this.goTo(MenuManager.Menu_Data.TUTORIALS); }
	private function	goSaveMenu() : void { this.goTo(MenuManager.Menu_Data.SAVE_MENU); }
	private function	goToLoadMenu() : void { this.goTo(MenuManager.Menu_Data.LOAD_MENU); }
	private function	quitGame() : void { Application.LoadLevel ("entrance"); }
};
	