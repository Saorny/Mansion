#pragma strict

@DoNotSerialize
public class MenuSave extends Menu
{
	private var			_interaction	: Interaction;
	private var			_newSaveName	: String;
	private var			_defaultName	: String;
	private var			_save_code_name	: String;
	private var			_maxCharacters	: int;

	public function		MenuSave() {}

	public function		MenuSave(interaction	: Interaction, action_sound : AudioSource, ptr : function(int) : void)
	{
		super(ptr, action_sound);
		this._interaction = interaction;
		this._menuTitle = "Save game";
		this._newSaveName = "New save";
		this._defaultName = "New save";
		this._save_code_name = "new_save";
		this._maxCharacters = 20;
		this.refresh();
	}
	
	public function		refresh() : void
	{
		this._subMenus.Clear();
		this.createLoadEntries();
		this._subMenus.Add(new MenuButton("Return", returnMainMenu));
	}
	
	public function		display() : IEnumerable
	{
		GUI.Box (Rect (	(Screen.width / 2) - (parseInt(Button_Data.MENU_WIDTH) / 2), (Screen.height / 5),
						parseInt(Button_Data.MENU_WIDTH), (this._subMenus.Count + 1) * (parseInt(Button_Data.BUTTON_HEIGHT) + parseInt(Button_Data.INTER_SPACE)) + parseInt(Button_Data.INTER_SPACE)), this._menuTitle);
		GUI.SetNextControlName (this._save_code_name);
		this._newSaveName = GUI.TextField (	Rect(	(Screen.width / 2) - (parseInt(Button_Data.BUTTON_WIDTH) / 2), (Screen.height / 5) + parseInt(Button_Data.INTER_SPACE),
								parseInt(Button_Data.BUTTON_WIDTH), parseInt(Button_Data.BUTTON_HEIGHT)), this._newSaveName, this._maxCharacters);
		for (var i = 0 ; i < this._subMenus.Count ; ++i)
			if (GUI.Button(Rect (	(Screen.width / 2) - (parseInt(Button_Data.BUTTON_WIDTH) / 2), (Screen.height / 5) + (i + 1) * (parseInt(Button_Data.BUTTON_HEIGHT) + parseInt(Button_Data.INTER_SPACE)) + parseInt(Button_Data.INTER_SPACE),
									parseInt(Button_Data.BUTTON_WIDTH), parseInt(Button_Data.BUTTON_HEIGHT)), this._subMenus[i].getText())
									&& this._subMenus[i].getPointer() != null)
		    {
		    	this._lastClicked = i;
		    	this._subMenus[i].exec();
		    }
		if (Event.current.isKey && Event.current.keyCode == KeyCode.Return && GUI.GetNameOfFocusedControl() == this._save_code_name)
			this.createNewSave();
	}
	
	private function	createLoadEntries() : void
	{
		for (var sg in LevelSerializer.SavedGames[LevelSerializer.PlayerName])
		   this._subMenus.Add(new MenuButton(sg.Name + "(" + sg.Level + "," + sg.When + ")", this.rewriteSave, sg));
	}
	
	private function	rewriteSave() : void
	{
		LevelSerializer.SaveGame(this._subMenus[this.getLastClicked()].getSaveEntry().Name);
		this._subMenus[this.getLastClicked()].getSaveEntry().Delete();
		
	}
	
	private function	createNewSave() : void
	{
		LevelSerializer.SaveGame(this._newSaveName);
		this._subMenus.Insert(0, new MenuButton(this._newSaveName + "(" + Application.loadedLevelName + "," + System.DateTime.Now + ")", null));
		this._newSaveName = this._defaultName = "New save";
	}

	private function	returnMainMenu() : void { this.goTo(parseInt(Menu_Data.RUNNING_MENU)); }
};
