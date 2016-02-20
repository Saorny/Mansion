#pragma strict

@DoNotSerialize
public class MenuOptions extends Menu
{
	private var			_inputManager		: InputManager;
	private var			_mouseSensitivity	: int;
	
	public enum mouse_sensitivity { MOUSE_SENSITIVITY_MIN = 1, MOUSE_SENSITIVITY_MAX = 20 }

	public function		MenuMain() {}

	public function		MenuOptions(hero : HeroManager, action_sound : AudioSource, ptr : function(MenuManager.Menu_Data) : void, inputManager : InputManager)
	{
		super(hero, ptr, action_sound);
		this._menuTitle = "Options";
		this._subMenus.Add(new MenuButton("Cancel", this.returnCancel, "Apply", this.returnSave));
		this._inputManager = inputManager;
	}
	
	public function		refresh() : void
	{
		this._mouseSensitivity = this._inputManager.getSensitivity();
	}
	
	public function		display() : IEnumerable
	{
		GUI.Box (Rect (	(Screen.width / 2) - (parseInt(MenuManager.Button_Data.MENU_WIDTH) / 2), (Screen.height / 5),
						parseInt(MenuManager.Button_Data.MENU_WIDTH), (this._subMenus.Count + 2) * (parseInt(MenuManager.Button_Data.BUTTON_HEIGHT) + parseInt(MenuManager.Button_Data.INTER_SPACE)) + parseInt(MenuManager.Button_Data.INTER_SPACE)), this.getMenuTitle());
		this.buildUpMouseSensitivityBar();
		this.buildUpButtons();
		if (this._hasClicked == true && (Time.realtimeSinceStartup - this._clickTime) > (this._wait_button))
		{
			this._hasClicked = false;
			if (this._lastClicked % 1 == 0)
				this._subMenus[this._lastClicked].exec();
			else
				this._subMenus[this._lastClicked].exec2();
		}
	}
	
	private function	buildUpMouseSensitivityBar() : void
	{
		GUI.color = Color.green;
		this._mouseSensitivity = GUI.HorizontalSlider (Rect (	(Screen.width / 2) - (parseInt(MenuManager.Button_Data.BUTTON_WIDTH) / 2),
																(Screen.height / 5) + parseInt(MenuManager.Button_Data.INTER_SPACE) * 3,
																parseInt(MenuManager.Button_Data.BUTTON_WIDTH) - (parseInt(MenuManager.Button_Data.INTER_SPACE) * 2), parseInt(MenuManager.Button_Data.BUTTON_HEIGHT)),
																this._mouseSensitivity, parseInt(mouse_sensitivity.MOUSE_SENSITIVITY_MIN), parseInt(mouse_sensitivity.MOUSE_SENSITIVITY_MAX));
		GUI.color = Color.white;
		GUI.Label (Rect (	(Screen.width / 2) + (parseInt(MenuManager.Button_Data.BUTTON_WIDTH) / 2),
							(Screen.height / 5) + parseInt(MenuManager.Button_Data.INTER_SPACE) * 3,
							parseInt(MenuManager.Button_Data.INTER_SPACE) * 2, 
							parseInt(MenuManager.Button_Data.INTER_SPACE) * 2),
							this._mouseSensitivity.ToString());
	}
	
	private function	buildUpButtons() : void
	{
		for (var i : float = 0 ; i < this._subMenus.Count ; ++i)
		{
			if (this._subMenus[i].getText2() == "")
			{
				if (GUI.Button(Rect (	(Screen.width / 2) - (parseInt(MenuManager.Button_Data.BUTTON_WIDTH) / 2), (Screen.height / 5) + (i + 2) * (parseInt(MenuManager.Button_Data.BUTTON_HEIGHT) + parseInt(MenuManager.Button_Data.INTER_SPACE)) + parseInt(MenuManager.Button_Data.INTER_SPACE),
										parseInt(MenuManager.Button_Data.BUTTON_WIDTH), parseInt(MenuManager.Button_Data.BUTTON_HEIGHT)), this._subMenus[i].getText())
										&& this._subMenus[i].getPointer() != null && this._hasClicked == false)
			    {
			    	this._lastClicked = i;
			    	this._clickTime = Time.realtimeSinceStartup;
			    	this._hasClicked = true;
			    	this.playSound();
			    }
		    }
		    else
		    {
		    	if (GUI.Button(Rect (	(Screen.width / 2) - (parseInt(MenuManager.Button_Data.BUTTON_WIDTH) / 2), (Screen.height / 5) + (i + 2) * (parseInt(MenuManager.Button_Data.BUTTON_HEIGHT) + parseInt(MenuManager.Button_Data.INTER_SPACE)) + parseInt(MenuManager.Button_Data.INTER_SPACE),
										(parseInt(MenuManager.Button_Data.BUTTON_WIDTH) / 2) - parseInt(MenuManager.Button_Data.INTER_SPACE), parseInt(MenuManager.Button_Data.BUTTON_HEIGHT)), this._subMenus[i].getText())
										&& this._subMenus[i].getPointer() != null && this._hasClicked == false)
			    {
			    	this._lastClicked = i;
			    	this._clickTime = Time.realtimeSinceStartup;
			    	this._hasClicked = true;
			    	this.playSound();
			    }
			    
			    else if (GUI.Button(Rect (	(Screen.width / 2) - (parseInt(MenuManager.Button_Data.BUTTON_WIDTH) / 2) + (parseInt(MenuManager.Button_Data.BUTTON_WIDTH) / 2) + parseInt(MenuManager.Button_Data.INTER_SPACE), (Screen.height / 5) + (i + 2) * (parseInt(MenuManager.Button_Data.BUTTON_HEIGHT) + parseInt(MenuManager.Button_Data.INTER_SPACE)) + parseInt(MenuManager.Button_Data.INTER_SPACE),
										(parseInt(MenuManager.Button_Data.BUTTON_WIDTH) / 2) - parseInt(MenuManager.Button_Data.INTER_SPACE), parseInt(MenuManager.Button_Data.BUTTON_HEIGHT)), this._subMenus[i].getText2())
										&& this._subMenus[i].getPointer() != null && this._hasClicked == false)
			    {
			    	this._lastClicked = i + 0.5;
			    	this._clickTime = Time.realtimeSinceStartup;
			    	this._hasClicked = true;
			    	this.playSound();
			    }
		    }
		}
	}

	private function	returnCancel() : void { this.goTo(MenuManager.Menu_Data.PREVIOUS); }
	
	private function	returnSave() : void
	{
		this._inputManager.updateMouseSensitivity(this._mouseSensitivity);
		this.goTo(parseInt(MenuManager.Menu_Data.PREVIOUS));
	}
};
