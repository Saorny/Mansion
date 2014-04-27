#pragma strict

@DoNotSerialize
public class MenuMainRunning extends Menu
{
	private var			_interaction	: Interaction;

	public function		MenuMainRunning() {}

	public function		MenuMainRunning(interaction	: Interaction, action_sound : AudioSource, ptr : function(int) : void)
	{
		super(ptr, action_sound);
		this._menuTitle = "Game menu";
		this._interaction = interaction;
		this._subMenus.Add(new MenuButton("Resume", this.launchNewGame));
		this._subMenus.Add(new MenuButton("Options", null));
		this._subMenus.Add(new MenuButton("Save game", this.goSaveMenu));
		this._subMenus.Add(new MenuButton("Load game", this.goToLoadMenu));
		this._subMenus.Add(new MenuButton("Abandon game", this.quitGame));
	}
	
	private function	launchNewGame() : void { this._interaction.closeMenu(); }
	private function	goSaveMenu() : void { this.goTo(parseInt(Menu_Data.SAVE_MENU)); }
	private function	goToLoadMenu() : void { this.goTo(parseInt(Menu_Data.LOAD_MENU)); }
	private function	quitGame() : void { Application.LoadLevel ("entrance"); }
};