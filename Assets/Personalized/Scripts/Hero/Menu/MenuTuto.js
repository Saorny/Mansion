#pragma strict

@DoNotSerialize
public class MenuTuto extends Menu
{
	protected var	_currentText = new Array();
	protected var	_style : GUIStyle;
	
	public enum FORMAT_DATA { LINE_LENGTH = 70, TUTO_HEIGHT = 100, TUTO_MENU_WIDTH = 600, BUTTON_WIDTH = 500 , INTER_SPACE = 45 }

	public function		MenuTuto() {}

	public function		MenuTuto(ptr : function(MenuManager.Menu_Data) : void, action_sound : AudioSource, path : String) {
		super(ptr, action_sound);
		var	res : TextAsset;
		var	content : String;
		
		res = Resources.Load(path, typeof(TextAsset));
		if (res != null) {
			content = res.ToString();
			this.parseContent(content);
			this._style = new GUIStyle();
			this._style.fontSize = 16;
			this._style.normal.textColor = Color.white;
		}
		else {
			Debug.Log("Couldn't load: " + path);
		}
	}
	
	public function		display() : IEnumerable
	{
		GUI.Box (Rect (	(Screen.width / 2) - (parseInt(MenuTuto.FORMAT_DATA.TUTO_MENU_WIDTH) / 2), (Screen.height / 5),
						parseInt(MenuTuto.FORMAT_DATA.TUTO_MENU_WIDTH),
						 (this._subMenus.Count + this._currentText.length) * (parseInt(MenuManager.Button_Data.BUTTON_HEIGHT) + parseInt(MenuManager.Button_Data.INTER_SPACE)) + parseInt(MenuManager.Button_Data.INTER_SPACE)
						), this.getMenuTitle());
		for (var i : float = 0 ; i < this._subMenus.Count ; ++i)
		{
			if (GUI.Button(Rect (	(Screen.width / 2) - (parseInt(MenuTuto.FORMAT_DATA.TUTO_MENU_WIDTH) / 2) + parseInt(MenuTuto.FORMAT_DATA.INTER_SPACE),
									(Screen.height / 5) + i * (parseInt(MenuManager.Button_Data.BUTTON_HEIGHT) + parseInt(MenuManager.Button_Data.INTER_SPACE)) + parseInt(MenuManager.Button_Data.INTER_SPACE),
									parseInt(MenuTuto.FORMAT_DATA.BUTTON_WIDTH),
									parseInt(MenuManager.Button_Data.BUTTON_HEIGHT)), this._subMenus[i].getText())
									&& this._subMenus[i].getPointer() != null && this._hasClicked == false)
		    {
		    	this._lastClicked = i;
		    	this._clickTime = Time.realtimeSinceStartup;
		    	this._hasClicked = true;
		    	this.playSound();
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
		for (var cl = 0 ; cl < this._currentText.length ; ++cl) {
			UnityEngine.GUI.Label (Rect (	(Screen.width / 2) - (parseInt(MenuTuto.FORMAT_DATA.BUTTON_WIDTH) / 2),
											(Screen.height / 5) + (this._subMenus.Count) * (parseInt(MenuManager.Button_Data.BUTTON_HEIGHT) + parseInt(MenuManager.Button_Data.INTER_SPACE)) + parseInt(MenuManager.Button_Data.INTER_SPACE) + cl * (this._style.fontSize + 3), 
											(parseInt(MenuTuto.FORMAT_DATA.BUTTON_WIDTH) / 2) - parseInt(MenuManager.Button_Data.INTER_SPACE),
											parseInt(MenuManager.Button_Data.BUTTON_HEIGHT)),
									this._currentText[cl] as String,
									this._style);
		}
	}
	
	private function	parseContent(content : String)
	{
		var 	tl : int;
		var 	ci : int;
		var		ll : int;
		var		cl : int;
		var		wl : int;
		
		tl = content.Length;
		ci = 0;
		for (cl = 0 ; ci < tl ; ++cl) {
			for (ll = 0 ; ll < FORMAT_DATA.LINE_LENGTH && (ci + ll) < tl ; ) {
				if ((ci + ll) < tl && content[ci + ll] != ' ' && content[ci + ll] != ':' && content[ci + ll] != '\n') {
					
					wl = this.getNextWordLength(content.Substring(ci + ll));
					if (ll + wl < FORMAT_DATA.LINE_LENGTH)
						ll += wl;
					else
						break ;
				}
				else {
					++ll;
					if (content[ci + ll - 1] == '\n')
						break ;
				}
			}
			this._currentText[cl] = content.Substring(ci, ll);
			ci += ll;
		}
	}
	
	private function	getNextWordLength(text : String)
	{
		var 	wl : int;
	
		for (wl = 0 ; wl < text.Length && text[wl] != ' ' && text[wl] != '\n' ; ++wl);
		return (wl);
	}
};
