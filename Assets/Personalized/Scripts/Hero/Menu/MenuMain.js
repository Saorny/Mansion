#pragma strict

@DoNotSerialize
public class MenuMain extends Menu
{
	public function		MenuMain() {}

	public function		MenuMain(hero : HeroManager, action_sound : AudioSource, ptr : function(MenuManager.Menu_Data) : void)
	{
		super(hero, ptr, action_sound);
		this._menuTitle = "Main menu";
		this._subMenus.Add(new MenuButton("New Game", this.launchNewGame));
		this._subMenus.Add(new MenuButton("Last Checkpoint", this.loadCheckpoint, "Load Games", this.goToLoadMenu));
		this._subMenus.Add(new MenuButton("Options", this.goToOptionsMenu));
		this._subMenus.Add(new MenuButton("Tutorial", this.goToTutorialsMenu));
		this._subMenus.Add(new MenuButton("Quit", this.quitGame));
	}
	
	private function	launchNewGame() : IEnumerable
	{
		this._hero.setGameStarted(true);
		this._hero.closeMenu();
	}
	
	private function	loadCheckpoint() : void { LevelSerializer.Resume(); }
	private function	goToOptionsMenu() : void { this.goTo(MenuManager.Menu_Data.OPTIONS); }
	private function	goToLoadMenu() : void { this.goTo(MenuManager.Menu_Data.LOAD_MENU); }
	private function	goToTutorialsMenu() : void { this.goTo(MenuManager.Menu_Data.TUTORIALS); }
	private function	quitGame() : void { Application.Quit(); }
};
