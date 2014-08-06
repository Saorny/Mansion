#pragma strict

@DoNotSerialize
public class IdleManager extends MonoBehaviour
{
	public var		_sound			: AudioSource;
	public var		_object			: GameObject;

	public function		Awake() : void
	{
		this._sound.Play();
		this._object.animation.Play("idle");
	}
}
