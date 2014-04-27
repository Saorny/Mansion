#pragma strict

@DoNotSerialize
public class MenuMain extends Menu
{
	private var			_interaction	: Interaction;

	public function		MenuMain() {}

	public function		MenuMain(interaction	: Interaction, action_sound : AudioSource, ptr : function(int) : void)
	{
		super(ptr, action_sound);
		this._interaction = interaction;
		this._menuTitle = "Main menu";
		this._subMenus.Add(new MenuButton("New Game", this.launchNewGame));
		this._subMenus.Add(new MenuButton("Last Checkpoint", this.loadCheckpoint));
		this._subMenus.Add(new MenuButton("Options", null));
		this._subMenus.Add(new MenuButton("Load Games", this.goToLoadMenu));
		this._subMenus.Add(new MenuButton("Quit", this.quitGame));
	}
	
	private function	launchNewGame() : IEnumerable
	{
		this._interaction.setGameStarted(true);
		this._interaction.closeMenu();
	}
	
	private function	goToLoadMenu() : void { this.goTo(parseInt(Menu_Data.LOAD_MENU)); }
	private function	loadCheckpoint() : void { LevelSerializer.Resume(); }
	private function	quitGame() : void { Application.Quit(); }
};