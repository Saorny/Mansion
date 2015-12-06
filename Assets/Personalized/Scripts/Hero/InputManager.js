#pragma strict

@script SerializeAll
public class InputManager extends MonoBehaviour
{
	private var		_mouseLook			: MouseLook;
	private var		_mouseSensitivity	: int;

	public function		Awake() : void
	{
		this._mouseLook = GameObject.Find("Hero").GetComponent("MouseLook") as MouseLook;
		this._mouseSensitivity = this._mouseLook.sensitivityX;
	}
	
	public function		updateMouseSensitivity(sensitivity : int) : void
	{
		this._mouseSensitivity = sensitivity;
		this._mouseLook.sensitivityX = sensitivity;
		this._mouseLook.sensitivityY = sensitivity;
	}
	
	public function		getSensitivity() : int { return (this._mouseSensitivity); }
	
	private function 	OnDeserialized() : void
	{
		this._mouseLook.sensitivityX = this._mouseSensitivity;
		this._mouseLook.sensitivityY = this._mouseSensitivity;
	}
}
