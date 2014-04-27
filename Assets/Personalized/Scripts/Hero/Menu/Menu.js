#pragma strict

@DoNotSerialize
public class Menu
{
	protected var		_subMenus		: List.<MenuButton> = new List.<MenuButton>();
	protected var		_menuTitle		: String;
	protected var		_lastClicked	: int;
	protected var		_button_action	: AudioSource;
	protected var		_hasClicked		: boolean;
	private var			_goTo 			: function(int) : void;
	private var			_clickTime		: float;
	private var			_wait_button	: float;

	public function		Menu() {}

	public function		Menu(ptr : function(int) : void, action_sound : AudioSource)
	{
		this._goTo = ptr;
		this._button_action = action_sound;
		this._lastClicked = -1;
		this._hasClicked = false;
		this._wait_button = 0.4;
	}

	public function		goTo(val : int) : void { this._goTo(val); }
	public function		refresh() : void {}
	
	public function		setMenuTitle (title : String) : void { this._menuTitle = title; }
	public function		getMenuTitle () : String { return (this._menuTitle); }
	public function		getLastClicked () : int { return (this._lastClicked); }

	public function		display() : IEnumerable
	{
		GUI.Box (Rect (	(Screen.width / 2) - (parseInt(Button_Data.MENU_WIDTH) / 2), (Screen.height / 5),
						parseInt(Button_Data.MENU_WIDTH), this._subMenus.Count * (parseInt(Button_Data.BUTTON_HEIGHT) + parseInt(Button_Data.INTER_SPACE)) + parseInt(Button_Data.INTER_SPACE)), this.getMenuTitle());

		for (var i = 0 ; i < this._subMenus.Count ; ++i)
			if (GUI.Button(Rect (	(Screen.width / 2) - (parseInt(Button_Data.BUTTON_WIDTH) / 2), (Screen.height / 5) + i * (parseInt(Button_Data.BUTTON_HEIGHT) + parseInt(Button_Data.INTER_SPACE)) + parseInt(Button_Data.INTER_SPACE),
									parseInt(Button_Data.BUTTON_WIDTH), parseInt(Button_Data.BUTTON_HEIGHT)), this._subMenus[i].getText())
									&& this._subMenus[i].getPointer() != null && this._hasClicked == false)
		    {
		    	this._lastClicked = i;
		    	this._clickTime = Time.realtimeSinceStartup;
		    	this._hasClicked = true;
		    	this.playSound();
		    }
		if (this._hasClicked == true && (Time.realtimeSinceStartup - this._clickTime) > (this._wait_button))
		{
			this._hasClicked = false;
			this._subMenus[this._lastClicked].exec();
		}
	}
	
	protected function		playSound() : void
	{
		if (this._button_action != null)
			this._button_action.Play();
	}

};

@script RequireComponent (SoundManagerHero)