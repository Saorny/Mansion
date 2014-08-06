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

	public enum Data { MIN_WAIT = 3, MAX_WAIT = 10}

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
	
	public function		Update()
	{
		this.ManageWandering();
	}
	
	private function		ManageWandering() : IEnumerator
	{
		if (Time.time - this._wait_duration > this._last_time)
		{
			var	time : float;
		
			time = Random.Range(Data.MIN_WAIT, Data.MAX_WAIT);
			for (var i : int = 0 ; i < this._wanderers.length ; ++i)
				this.wander(this._wanderers[i].transform, time);
			this._last_time = Time.time;
			this._wait_duration = time;
		}
	}
	
	private function		wander(creature : Transform, time	: float) : IEnumerator
	{
		var		start_pos : Vector3;
		var		end_pos : Vector3;
	
		start_pos = creature.transform.position;
		end_pos = Vector3(Random.Range(this._minX, this._maxX), this.transform.position.y, Random.Range(this._minZ ,this._maxZ));
		yield this.facePoint2D(creature, end_pos, (time * 0.3));
		this.moveObject(creature, start_pos, end_pos, (time * 0.7));
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
		
	private function		facePoint2D(looking : Transform, looked : Vector3, time : float) : IEnumerator
	{
		var			arrival			: Vector3;
		var			neededRotation	: Quaternion;
		var			i				: System.Decimal;
		var			rate			: System.Decimal;
		
		arrival.x = looked.x;
		arrival.y = looking.position.y;
		arrival.z = looked.z;
	    i = 0.0;
	    rate = 1.0 / time;
	    while (i < 1.0)
	    {
	    	neededRotation = Quaternion.LookRotation(arrival - looking.position);
	        i += Time.deltaTime * rate;
	        looking.rotation = Quaternion.Lerp(looking.rotation, neededRotation, i);
	        yield;
	    }
	}
}
