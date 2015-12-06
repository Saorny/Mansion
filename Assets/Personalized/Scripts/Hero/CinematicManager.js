#pragma strict

@DoNotSerialize
public class CinematicManager extends MonoBehaviour
{
	protected var	_hero				: HeroManager;
	protected var	_heroPos			: Transform;
	protected var	_heroCamera			: Camera;
	protected var 	_triggered			: boolean = false;
	public var		_spots				: Camera[];
	
	public function CinematicManager()
	{
		this._triggered = false;
	}

	public function		Start() { this.loadComponents(); }

	protected function	setCinematicMode() : IEnumerator
	{
		this._hero.setPauseHero(true);
		this._hero.allowMouseMovement(false);
	}

	protected function	setAdventureMode() : IEnumerator
	{
		this._hero.setPauseHero(false);
		this._hero.allowMouseMovement(true);
	}
	
	protected function	MakeHeroLookAt(spot : Camera, time : float) : IEnumerator
	{
		this.rotateObject(this._heroPos.transform, this._heroPos.transform.rotation, spot.transform.rotation, time);
		yield this.moveObject2D(this._heroPos.transform, this._heroPos.transform.position, spot.transform.transform.position, time);
	}
	
	protected function	loadComponents() : IEnumerable
	{
		var	hero : GameObject;
	
		hero = GameObject.Find("Hero");
		this._heroPos = hero.transform;
		this._heroCamera = hero.Find("Main Camera").GetComponent(Camera);
		this._hero = hero.GetComponent("HeroManager") as HeroManager;
	}
	
	protected function		moveObject2D(thisTransform : Transform, startPos : Vector3, endPos : Vector3, time : float) : IEnumerator
	{
	    var i = 0.0;
	    var rate = 1.0/time;
	    var pos : Vector3;
	    while (i < 1.0) {
	        i += Time.deltaTime * rate;
	        pos = Vector3.Lerp(startPos, endPos, i);
	        thisTransform.position.x = pos.x;
	        thisTransform.position.z = pos.z;
	        yield; 
	    }
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
