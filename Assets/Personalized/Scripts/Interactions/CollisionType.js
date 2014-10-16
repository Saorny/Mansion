#pragma strict

public class CollisionType extends MonoBehaviour
{

	public var _collision_type 		: SoundManagerHero.CollisionSoundType;
	
	public function		getType() : SoundManagerHero.CollisionSoundType
	{
		return (this._collision_type);
	}
}