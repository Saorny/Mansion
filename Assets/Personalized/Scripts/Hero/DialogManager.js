#pragma strict

@script SerializeAll
public class DialogManager extends MonoBehaviour {

	private var		_styles : Dictionary.<Message.messageType, GUIStyle>;
	private var		_dialogs : List.<Message>;
	private var		_currentDialog : Message = null;
	private var		_currentText = new Array();
	private var		_dialogBoxXOffset : int = 50;
	private var		_dialogBoxXWidth : int = 300;
	private var		_dialogBoxYOffset : int = 50;
	private var		_dialogBoxYWidth : int = 500;
	private var		_dialogBoxInnerMarger : int = 15;
	private var		_dialogBoxTitle : String = '';
	private var 	LINE_LENGTH	: int = 35;
	private var 	LINE_HEIGHT	: int = 22;

	public function Awake() : void {
		var styleStandard = new GUIStyle();
		var styleTuto = new GUIStyle();
		var styleWarning = new GUIStyle();
		
		styleStandard.fontSize = 18;
		styleStandard.normal.textColor = Color.white;
		styleTuto.fontSize = 18;
		styleTuto.normal.textColor = Color.yellow;
		styleWarning.fontSize = 20;
		styleWarning.normal.textColor = Color.red;
		
		this._dialogs = new List.<Message>();
		this._styles = new Dictionary.<Message.messageType, GUIStyle>();
		this._styles.Add(Message.messageType.DIALOG, styleStandard);
		this._styles.Add(Message.messageType.TUTORIAL, styleTuto);
		this._styles.Add(Message.messageType.WARNING, styleWarning);
	}

	public function addTextToDisplay(content : String, duration : float, type : Message.messageType) : void {
		this._dialogs.Add(new Message(content, duration, type));
	}
	
	public function displayDialogs() : void {
		if (this._currentDialog == null) {
			if (this._dialogs.Count > 0) {
				this._currentDialog = this._dialogs[0];
				this._currentDialog.startReading();
				this._currentText = new Array();
				this._dialogs.Remove(this._currentDialog);
			}
		}
		else {
			if (this._currentDialog.isOver() == false) {
				this.displayMessage();
			}
			else {
				this._currentDialog = null;
			}
		}
	}
	
	private function displayMessage() : void {
		var type : Message.messageType;
		var xPos : int = this._dialogBoxXOffset;
		var yPos : int = Screen.height - this._dialogBoxYOffset;
	
		type = this._currentDialog.getType();
		if (this._currentText.length == 0)
			this.parseContent(type);
		
		GUI.Box (Rect (	this._dialogBoxXOffset - this._dialogBoxInnerMarger, 
						Screen.height - this._dialogBoxYOffset - _dialogBoxInnerMarger - (LINE_HEIGHT * this._currentText.length),
						this._dialogBoxYWidth,
						this._dialogBoxYWidth + (LINE_HEIGHT * this._currentText.length)
					), this._dialogBoxTitle);
		
		for (var cl = 0 ; cl < this._currentText.length ; ++cl) {
			UnityEngine.GUI.Label (Rect (	xPos, yPos - (LINE_HEIGHT * (this._currentText.length - cl)), 
											this._dialogBoxYWidth, this._dialogBoxYWidth),
									this._currentText[cl] as String,
									this._styles[type]);
		}
		
	}
	
	private function	parseContent(type : Message.messageType)
	{
		var 	tl : int;
		var 	content : String;
		var 	ci : int;
		var		ll : int;
		var		cl : int;
		var		wl : int;
		
		content = this._currentDialog.getContent();
		if (type == Message.messageType.TUTORIAL)
			content = 'Hint: ' + content;
		else if (type == Message.messageType.TUTORIAL)
			content = 'Warning: ' + content;
		tl = content.Length;
		ci = 0;
		
		for (cl = 0 ; ci < tl ; ++cl) {
			for (ll = 0 ; ll < this.LINE_LENGTH && (ci + ll) < tl ; ) {
				if ((ci + ll) < tl && content[ci + ll] != ' ' && content[ci + ll] != ':' && content[ci + ll] != '\n') {
					
					wl = this.getNextWordLength(content.Substring(ci + ll));
					if (ll + wl < this.LINE_LENGTH)
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
}
