#pragma strict

@DoNotSerialize
public class MenuKeyboardControl extends Menu
{
	private var			_inputManager	: InputManager;

	public function		MenuMain() {}

	public function		MenuKeyboardControl(action_sound : AudioSource, ptr : function(MenuManager.Menu_Data) : void, inputManager : InputManager)
	{
		super(ptr, action_sound);
		this._menuTitle = "Keyboard input pannel";

		this._subMenus.Add(new MenuButton("Cancel", this.returnPrevious, "Apply", this.returnPrevious));
		this._inputManager = inputManager;
	}
	
	public function		display() : IEnumerable
	{
		GUI.Box (Rect (	(Screen.width / 2) - (parseInt(MenuManager.Button_Data.MENU_WIDTH) / 2), (Screen.height / 5),
						parseInt(MenuManager.Button_Data.MENU_WIDTH), this._subMenus.Count * (parseInt(MenuManager.Button_Data.BUTTON_HEIGHT) + parseInt(MenuManager.Button_Data.INTER_SPACE)) + parseInt(MenuManager.Button_Data.INTER_SPACE)), this.getMenuTitle());
		for (var i : float = 0 ; i < this._subMenus.Count ; ++i)
		{
			if (this._subMenus[i].getText2() == "")
			{
				if (GUI.Button(Rect (	(Screen.width / 2) - (parseInt(MenuManager.Button_Data.BUTTON_WIDTH) / 2), (Screen.height / 5) + i * (parseInt(MenuManager.Button_Data.BUTTON_HEIGHT) + parseInt(MenuManager.Button_Data.INTER_SPACE)) + parseInt(MenuManager.Button_Data.INTER_SPACE),
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
		    	if (GUI.Button(Rect (	(Screen.width / 2) - (parseInt(MenuManager.Button_Data.BUTTON_WIDTH) / 2), (Screen.height / 5) + i * (parseInt(MenuManager.Button_Data.BUTTON_HEIGHT) + parseInt(MenuManager.Button_Data.INTER_SPACE)) + parseInt(MenuManager.Button_Data.INTER_SPACE),
										(parseInt(MenuManager.Button_Data.BUTTON_WIDTH) / 2) - parseInt(MenuManager.Button_Data.INTER_SPACE), parseInt(MenuManager.Button_Data.BUTTON_HEIGHT)), this._subMenus[i].getText())
										&& this._subMenus[i].getPointer() != null && this._hasClicked == false)
			    {
			    	this._lastClicked = i;
			    	this._clickTime = Time.realtimeSinceStartup;
			    	this._hasClicked = true;
			    	this.playSound();
			    }
			    
			    else if (GUI.Button(Rect (	(Screen.width / 2) - (parseInt(MenuManager.Button_Data.BUTTON_WIDTH) / 2) + (parseInt(MenuManager.Button_Data.BUTTON_WIDTH) / 2) + parseInt(MenuManager.Button_Data.INTER_SPACE), (Screen.height / 5) + i * (parseInt(MenuManager.Button_Data.BUTTON_HEIGHT) + parseInt(MenuManager.Button_Data.INTER_SPACE)) + parseInt(MenuManager.Button_Data.INTER_SPACE),
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
		if (this._hasClicked == true && (Time.realtimeSinceStartup - this._clickTime) > (this._wait_button))
		{
			this._hasClicked = false;
			if (this._lastClicked % 1 == 0)
				this._subMenus[this._lastClicked].exec();
			else
				this._subMenus[this._lastClicked].exec2();
		}
	}

	private function	returnPrevious() : void { this.goTo(MenuManager.Menu_Data.PREVIOUS); }
};
