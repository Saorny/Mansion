#pragma strict

@DoNotSerialize
public class WanderingManager extends MonoBehaviour
{
	public	var 	_wanderingArea	:	BoxCollider;
	public	var 	_wanderers	 	:	GameObject[];
	private var		_minX			:	float;
	private var		_maxX			:	float;
	private var		_minZ			:	float;
	private var		_maxZ			:	float;
	private var		_last_time		: 	float;
	private var		_wait_duration	: 	float;

	public enum Data { MIN_WAIT = 1, MAX_WAIT = 3}

	public function		Start()
	{
		this._minX = this._wanderingArea.bounds.min.x;
		this._maxX = this._wanderingArea.bounds.max.x;
		this._minZ = this._wanderingArea.bounds.min.z;
		this._maxZ = this._wanderingArea.bounds.max.z;
		this._last_time = Time.time;
		this._wait_duration = 0;
		this.ManageWandering();
	}
	
	private function		ManageWandering() : IEnumerator
	{
		if (Time.time > (this._last_time + this._wait_duration))
		{
			for (var i : int = 0 ; i < this._wanderers.length ; ++i)
				this.moveObject(this._wanderers[i].transform, this._wanderers[i].transform.position, 
						Vector3(Random.Range(this._minX, this._maxX), this.transform.position.y, Random.Range(this._minZ ,this._maxZ)), 5);
		}
	}
	
	private function		moveObject (thisTransform : Transform, startPos : Vector3, endPos : Vector3, time : float) : IEnumerator
	{
	    var i = 0.0;
	    var rate = 1.0/time;
	    while (i < 1.0) {
	        i += Time.deltaTime * rate;
	        thisTransform.position = Vector3.Lerp(startPos, endPos, i);
	        yield; 
	    }
	}
		
	private function		rotateObject(thisTransform : Transform, startPos : Quaternion, endPos : Quaternion, time : float) : IEnumerator
	{
	    var i = 0.0;
	    var rate = 1.0/time;
	    while (i < 1.0) {
	        i += Time.deltaTime * rate;
	        thisTransform.rotation = Quaternion.Lerp(startPos, endPos, i);
	        yield; 
	    }
	}
}
