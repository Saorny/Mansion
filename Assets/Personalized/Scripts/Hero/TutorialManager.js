#pragma strict

@script SerializeAll
public class TutorialManager extends MonoBehaviour {

	private var		_hasDisplayed : Dictionary.<TutorialManager.TutoList, boolean>;
	private var		_tutorials : Dictionary.<TutorialManager.TutoList, String>;
	private var		_tutoDuration : float = 6.0;
	private var		COMMON_PATH : String = 'Texts/info_tutos/';
	
	public enum	TutoList { 	ACCESS_MENU, ACCESS_INVENTORY, SANITY_WARNING,
							COLLECT_OBJECT, OBJECT_COLLECTED, BEING_HIT, USE_POTION, OPEN_DOOR, WEAPON_COLLECTED }
	
	public function Awake() : void {
		var menuItems = new Array();
		var	res : TextAsset;
		
		this._hasDisplayed = new Dictionary.<TutorialManager.TutoList, boolean>();
		this._tutorials = new Dictionary.<TutorialManager.TutoList, String>();
		
		menuItems = TutoList.GetValues(typeof(TutoList));
		for (var i = 0 ; i < menuItems.Count ; ++i) {
			this._hasDisplayed[menuItems[i]] = false;
			res = Resources.Load(this.COMMON_PATH + menuItems[i].ToString(), typeof(TextAsset));
			if (res != null) {
				this._tutorials[menuItems[i]] = res.ToString();
			}
		}
	}
	
	public function mayDislayTuto(type : TutoList, displayPtr : function(String, float, Message.messageType) : void) : void {
		if (this._hasDisplayed[type] == false) {
			this._hasDisplayed[type] = true;
			displayPtr(this._tutorials[type] as String, this._tutoDuration, Message.messageType.TUTORIAL);
		}
	}
}
