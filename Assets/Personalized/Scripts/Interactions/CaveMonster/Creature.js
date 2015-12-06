#pragma strict

@script SerializeAll
public class Creature extends Hittable
{
	public enum STATE { IDLE, WALKING, EATING, ATTACKING, SUFFERING, SEARCHING, DYING }
	
	public var 		_attackSounds	: AudioClip[];
	public var 		_state 			: Creature.STATE;
	public var 		_whole	 		: Transform;
	public var 		_damageMin 		: int = 10;
	public var 		_damageMax 		: int = 20;
	public var		_range			: float = 3.0;
	public var		_attackColdown	: float = 1.0;
	protected var	_agent			: NavMeshAgent;
	protected var	_target			: Vector3 =  Vector3.zero;
	
	public function		Start()
	{
		this._volume = 20.0;
		this.loadHero();
		this._agent = GetComponent.<NavMeshAgent>();
	}
	
	public function		Update()
	{
		if ((this._state == Creature.STATE.WALKING || this._state == Creature.STATE.IDLE) && (this.getRemainingDistanceFromTarget(this._heroBody.position) < this._range || this.getRemainingDistanceFromTarget(this._target) < this._range))
		{
			this._state = Creature.STATE.SEARCHING;
			if (this._target != Vector3.zero)
			{
				this._target =  Vector3.zero;
				this._agent.Stop();
			}
			if (this.getRemainingDistanceFromTarget(this._heroBody.gameObject.transform.position) < this._range)
				this.attackHero();
			else
				this.idle();
		}
	}
	
	public function			hearSound(pos : Vector3) : IEnumerator
	{
		this._state = Creature.STATE.WALKING;
		this._target = pos;
		this.animation.Play("Walking");
		this._agent.SetDestination(pos);
	}
	
	protected function		idle() : IEnumerator
	{
		this._state = Creature.STATE.IDLE;
		this.animation.Play("Idling");
	}
		
	protected function		attackHero() : IEnumerator
	{
		yield this.lookAt(this._heroBody.gameObject.transform);
		var relativePoint = this.transform.InverseTransformPoint(this._heroBody.gameObject.transform.position);
		if (this.getRemainingDistanceFromTarget(this._heroBody.gameObject.transform.position) < this._range && relativePoint.z > 0)
		{
			var damage : int;

			this._state = Creature.STATE.ATTACKING;
			this.playAttack();
			this.animation.Play("Attacking");
			damage = Mathf.Round(Random.value * (this._damageMax - this._damageMin)) + this._damageMin;
			this._hero.takeDamage(damage);
			yield WaitForSeconds(this._attackColdown);
			if (this._state != Creature.STATE.SUFFERING)
				this.attackHero();
		}
		else
		{
			yield WaitForSeconds(0.5);
			this.hearSound(this._heroBody.position);
		}
	}
	
	protected function		getRemainingDistanceFromTarget(pos : Vector3) : float
	{
		return (Vector3.Distance(pos, this.transform.position));
	}
	
	protected function		playHurt() : IEnumerator
	{
		var sound : AudioClip;

		if (this._state != Creature.STATE.ATTACKING)
			this.attackHero();
		this._state = Creature.STATE.SUFFERING;
		this._whole.animation.Play("Suffering");
		sound = this._hurtSounds[Mathf.Round(Random.value * (this._hurtSounds.length - 1))];
		if (sound)
			AudioSource.PlayClipAtPoint(sound, this.transform.position, this._volume);
	}
	
	protected function		moveTo(spot : Transform, time : float) : IEnumerator
	{
	    var i 			: float;
	    var rate 		: float;
	    var startPos	: Vector3;
	    var endPos		: Vector3;
	    
	    i = 0.0;
	    rate = (1.0 / time);
	    startPos = this._whole.transform.position;
	    endPos  = spot.position;
	    while (i < 1.0)
	    {
	        i += Time.deltaTime * rate;
	        this._whole.transform.position = Vector3.Lerp(startPos, endPos, i);
	        yield; 
	    }
	}
		
	protected function		lookAt(target : Transform) : IEnumerator
	{
		var			arrival			: Vector3;
		var			neededRotation	: Quaternion;
		var			i				: System.Decimal;
		var			rate			: System.Decimal;
		var			time			: float;
		
		arrival.x = target.position.x;
		arrival.y = this._whole.transform.position.y;
		arrival.z = target.position.z;
	    i = 0.0;
	    time = 1.0;
	    rate = 1.0 / time;
	    while (i < 1.0)
	    {
	    	neededRotation = Quaternion.LookRotation(arrival - this._whole.transform.position);
	        i += Time.deltaTime * rate;
	        this._whole.transform.rotation = Quaternion.Lerp(this._whole.transform.rotation, neededRotation, i);
	        yield;
	    }
	}
	
	protected function		playAttack() : IEnumerator
	{
		var sound : AudioClip;

		sound = this._attackSounds[Mathf.Round(Random.value * (this._attackSounds.length - 1))];
		if (sound)
			AudioSource.PlayClipAtPoint(sound, this.transform.position, this._volume);
	}
}
