#pragma strict

@DoNotSerialize
public class MenuGameOver extends Menu
{
	public function		MenuGameOver() {}

	public function		MenuGameOver(hero : HeroManager, action_sound : AudioSource, ptr : function(MenuManager.Menu_Data) : void)
	{
		super(hero, ptr, action_sound);
		this._menuTitle = "Game Over";
		this._subMenus.Add(new MenuButton("Load last checkpoint", this.loadCheckpoint, "Load game", this.goToLoadMenu));
		this._subMenus.Add(new MenuButton("Tutorial", this.goToTutorialsMenu));
		this._subMenus.Add(new MenuButton("Options", this.goToOptionsMenu));
		this._subMenus.Add(new MenuButton("Quit", this.quitGame));
	}
	
	private function	launchNewGame() : IEnumerable
	{
		this._hero.setGameStarted(true);
		this._hero.closeMenu();
	}
	
	private function	goToLoadMenu() : void { this.goTo(MenuManager.Menu_Data.LOAD_MENU); }
	private function	goToTutorialsMenu() : void { this.goTo(MenuManager.Menu_Data.TUTORIALS); }
	private function	loadCheckpoint() : void { LevelSerializer.Resume(); }
	private function	goToOptionsMenu() : void { this.goTo(MenuManager.Menu_Data.OPTIONS); }
	private function	quitGame() : void { Application.LoadLevel ("entrance"); }
};
