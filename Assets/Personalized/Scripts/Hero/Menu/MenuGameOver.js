#pragma strict

@DoNotSerialize
public class MenuGameOver extends Menu
{
	public function		MenuMain() {}

	public function		MenuGameOver(hero : HeroManager, action_sound : AudioSource, ptr : function(MenuManager.Menu_Data) : void)
	{
		super(hero, ptr, action_sound);
		this._menuTitle = "Game Over";
		this._subMenus.Add(new MenuButton("Last Checkpoint", this.loadCheckpoint));
		this._subMenus.Add(new MenuButton("Load Games", this.goToLoadMenu));
		this._subMenus.Add(new MenuButton("Options", this.goToOptionsMenu));
		this._subMenus.Add(new MenuButton("Abandon game", this.quitGame));
	}
	
	private function	launchNewGame() : IEnumerable
	{
		this._hero.setGameStarted(true);
		this._hero.closeMenu();
	}
	
	private function	goToLoadMenu() : void { this.goTo(MenuManager.Menu_Data.LOAD_MENU); }
	private function	loadCheckpoint() : void { LevelSerializer.Resume(); }
	private function	goToOptionsMenu() : void { this.goTo(MenuManager.Menu_Data.OPTIONS); }
	private function	quitGame() : void { Application.LoadLevel ("entrance"); }
};
