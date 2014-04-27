#pragma strict

@DoNotSerialize
public class CinematicManager extends MonoBehaviour
{
	public var 		_poses				: Transform[];
	protected var	_hero				: Interaction;
	protected var	_heroPos			: Transform;
	protected var	_heroCamera			: Camera;
	protected var	_cinematicCamera 	: Camera;
	protected var 	_triggered			: boolean = false;
	
	public function CinematicManager()
	{
		this._triggered = false;
	}

	public function		Awake() { this.loadComponents(); }

	protected function	setCinematicMode() : IEnumerator
	{
		this._hero.setPauseHero(true);
		this._hero.HeroLockCamera(true);
		this._heroCamera.enabled = false;
	    this._cinematicCamera.enabled = true;
	}

	protected function	setAdventureMode() : IEnumerator
	{	
		this._hero.HeroLockCamera(false);
		this._hero.setPauseHero(false);
		this._heroCamera.enabled = true;
	    this._cinematicCamera.enabled = false;
	}

	protected function	transitCamera(time : float) : IEnumerator
	{
		this.rotateObject(this._cinematicCamera.transform, this._heroPos.transform.rotation, this._cinematicCamera.transform.rotation, time);
		yield this.moveObject(this._cinematicCamera.transform, this._heroPos.transform.position, this._cinematicCamera.transform.transform.position, time);
	}

	protected function	takeCinematicView(obj : Transform, time : float) : IEnumerator
	{
		this.rotateObject(this._cinematicCamera.transform, this._cinematicCamera.transform.rotation, obj.rotation, time);
		yield this.moveObject(this._cinematicCamera.transform, this._cinematicCamera.transform.position, obj.position, time);
	
	}
	
	protected function	loadComponents() : IEnumerable
	{
		var	hero : GameObject;
	
		hero = GameObject.Find("Hero");
		this._heroPos = hero.transform;
		this._heroCamera = hero.Find("Main Camera").GetComponent(Camera);
		this._cinematicCamera = transform.Find("Camera").GetComponent(Camera);
		this._hero = hero.GetComponent("Interaction") as Interaction;
	}
	
	protected function		moveObject (thisTransform : Transform, startPos : Vector3, endPos : Vector3, time : float) : IEnumerator
	{
	    var i = 0.0;
	    var rate = 1.0/time;
	    while (i < 1.0) {
	        i += Time.deltaTime * rate;
	        thisTransform.position = Vector3.Lerp(startPos, endPos, i);
	        yield; 
	    }
	}
		
	protected function		rotateObject(thisTransform : Transform, startPos : Quaternion, endPos : Quaternion, time : float) : IEnumerator
	{
	    var i = 0.0;
	    var rate = 1.0/time;
	    while (i < 1.0) {
	        i += Time.deltaTime * rate;
	        thisTransform.rotation = Quaternion.Lerp(startPos, endPos, i);
	        yield; 
	    }
	}
};
