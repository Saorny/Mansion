#pragma strict

@script SerializeAll
public class Weapon extends Collectable
{
	private var _handling			: Texture;
	private var _animation			: Texture[];
	private var _canAttack 			: boolean;
	private var _minDamage 			: int;
	private var _maxDamage 			: int;
	private var _coldown 			: float;
	private var _lastAttack			: float;
	private var _currentAttackFrame : int;
	private var _animDuration		: int;

	

	public function Weapon(type : Collectable.ObjectType, name : String, description : String, icon : Texture,
	animation : Texture[], handling : Texture, canAttack : boolean, minDamage : int, maxDamage : int, coldown : float)
	{
		super(type, name, description, icon);
		this._handling  = handling;
		this._animation  = animation;
		this._canAttack  = canAttack;
		this._minDamage  = minDamage;
		this._maxDamage  = maxDamage;
		this._coldown  = coldown;
		this._lastAttack = 0;
	}
	
	public function Weapon() { }
	
	public function attack() : void
	{
		this._currentAttackFrame = 0;
		this._lastAttack = Time.time;
	}
	
	public function getNextAttackAnim() : Texture
	{
		var anim : Texture;
	
		if ((this._currentAttackFrame + 1) < this._animation.Length)
		{
			anim = this._animation[++this._currentAttackFrame];
		}
		else
		{
			anim = null;
			this._currentAttackFrame = 0;
		}
		return (anim);
	}
	
	public function getAnimation() : Texture[] {return (this._animation);}
	public function getPicture() : Texture {return (this._handling);}
	public function getCanAttack() : boolean {return (this._canAttack);}
	public function getMinDamage() : int {return (this._minDamage);}
	public function getMaxDamage() : int {return (this._maxDamage);}
	public function getColdown() : float {return (this._coldown);}
}
