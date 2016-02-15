#pragma strict

@script SerializeAll
public class TutorialManager extends MonoBehaviour {

	private var		_hasDisplayed : Dictionary.<TutorialManager.TutoList, boolean>;
	private var		_tutorials : Dictionary.<TutorialManager.TutoList, String>;
	private var		_tutoDuration : float = 10.0;
	
	public enum	TutoList { 	ACCESS_MENU, ACCESS_INVENTORY, SANITY_WARNING,
							COLLECT_OBJECT, OBJECT_COLLECTED, BEING_HIT, USE_POTION }
	
	public function Awake() : void {
	
		var menuItems = new Array();
		
		this._hasDisplayed = new Dictionary.<TutorialManager.TutoList, boolean>();
		this._tutorials = new Dictionary.<TutorialManager.TutoList, String>();
		
		menuItems = TutoList.GetValues(typeof(TutoList));
		for (var i = 0 ; i < menuItems.Count ; ++i)
			this._hasDisplayed[menuItems[i]] = false;
		this.loadTutos();
	}
	
	public function mayDislayTuto(type : TutoList, displayPtr : function(String, float, Message.messageType) : void) : void {
	
		if (this._hasDisplayed[type] == false) {
			this._hasDisplayed[type] = true;
			displayPtr(this._tutorials[type] as String, this._tutoDuration, Message.messageType.TUTORIAL);
		}
	}
	
	private function loadTutos() : void {
		this._tutorials[TutoList.ACCESS_MENU] = 'You may press "Escape" to access the menu. Do not hesitate the read the tutorial!';
		this._tutorials[TutoList.ACCESS_INVENTORY] = 'You may press "i" to access your inventory.';
	}
}
