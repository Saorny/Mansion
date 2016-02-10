#pragma strict

@script SerializeAll
public class DialogManager extends MonoBehaviour {

	private var		_styles : Dictionary.<Message.messageType, GUIStyle>;
	private var		_dialogs : List.<Message>;
	private var		_currentDialog : Message = null;
	private var		_dialogBoxXOffset : int = 50;
	private var		_dialogBoxXWidth : int = 300;
	private var		_dialogBoxYOffset : int = 50;
	private var		_dialogBoxYWidth : int = 500;
	private var		_dialogBoxInnerMarger : int = 15;
	private var		_dialogBoxTitle : String = '';

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
		GUI.Box (Rect (this._dialogBoxXOffset - this._dialogBoxInnerMarger, Screen.height - this._dialogBoxYOffset - _dialogBoxInnerMarger,
						this._dialogBoxYWidth, this._dialogBoxYWidth), this._dialogBoxTitle);
		UnityEngine.GUI.Label (Rect (this._dialogBoxXOffset, Screen.height - this._dialogBoxYOffset, this._dialogBoxYWidth, this._dialogBoxYWidth),
			this._currentDialog.getContent(),
			this._styles[this._currentDialog.getType()]);
	}
}
