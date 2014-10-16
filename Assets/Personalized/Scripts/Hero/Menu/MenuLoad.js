#pragma strict

@DoNotSerialize
public class MenuLoad extends Menu
{
	private var			_heroManager	: HeroManager;
	private var			_button_action	: AudioSource;
	private var			_newSaveName	: String;
	private var			_defaultName	: String;
	private var			_save_code_name	: String;
	private var			_maxCharacters	: int;

	public function		MenuLoad() {}

	public function		MenuLoad(heroManager : HeroManager, action_sound : AudioSource, ptr : function(int) : void)
	{
		super(ptr, action_sound);
		this._heroManager = heroManager;
		this._menuTitle = "Load a previously saved game:";
		this.refresh();
	}
	
	public function	refresh() : void
	{
		this._subMenus.Clear();
		this._subMenus.Add(new MenuButton("Erase all saves", this.eraseAllSaves));
		this.createLoadEntries();
		this._subMenus.Add(new MenuButton("Return", this.returnMainMenu));
	}
	
	private function loadGame() : void
	{
		LevelSerializer.LoadSavedLevel(this._subMenus[this.getLastClicked()].getSaveEntry().Data);
	}
	
	private function	eraseAllSaves() : void
	{
		LevelSerializer.SavedGames[LevelSerializer.PlayerName].Clear();
		LevelSerializer.SaveDataToPlayerPrefs();
		PlayerPrefs.Save();
		this._subMenus.Clear();
		this.refresh();
	}
	
	private function	createLoadEntries() : void
	{
		for (var sg in LevelSerializer.SavedGames[LevelSerializer.PlayerName])
		   	this._subMenus.Add(new MenuButton(sg.Name + "(" + sg.Level + "," + sg.When + ")", this.loadGame, sg));
	}

	private function	returnMainMenu() : void { this.goTo(parseInt(MenuManager.Menu_Data.PREVIOUS)); }
};
