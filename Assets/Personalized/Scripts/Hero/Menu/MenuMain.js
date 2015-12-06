#pragma strict

@DoNotSerialize
public class MenuMain extends Menu
{
	private var			_hero	: HeroManager;

	public function		MenuMain() {}

	public function		MenuMain(hero : HeroManager, action_sound : AudioSource, ptr : function(int) : void)
	{
		super(ptr, action_sound);
		this._hero = hero;
		this._menuTitle = "Main menu";
		this._subMenus.Add(new MenuButton("New Game", this.launchNewGame));
		this._subMenus.Add(new MenuButton("Last Checkpoint", this.loadCheckpoint, "Load Games", this.goToLoadMenu));
		this._subMenus.Add(new MenuButton("Options", this.goToOptionsMenu));
		this._subMenus.Add(new MenuButton("Quit", this.quitGame));
	}
	
	private function	launchNewGame() : IEnumerable
	{
		this._hero.setGameStarted(true);
		this._hero.closeMenu();
	}
	
	private function	loadCheckpoint() : void { LevelSerializer.Resume(); }
	private function	goToOptionsMenu() : void { this.goTo(parseInt(MenuManager.Menu_Data.OPTIONS)); }
	private function	goToLoadMenu() : void { this.goTo(parseInt(MenuManager.Menu_Data.LOAD_MENU)); }
	private function	quitGame() : void { Application.Quit(); }
};