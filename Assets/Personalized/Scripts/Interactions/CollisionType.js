#pragma strict

public class CollisionType extends MonoBehaviour
{

	public var _collision_type 		: CollisionSoundType;
	
	public function		getType() : CollisionSoundType
	{
		return (this._collision_type);
	}
}