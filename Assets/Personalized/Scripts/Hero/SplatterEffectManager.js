#pragma strict

@script SerializeAll
public class SplatterEffectManager extends MonoBehaviour
{
	public var		_splatterEffect		: Texture;
	private var		_fadingInterval		: float;
	private var		_last				: float;
	private var		_opacity			: float;
	
	public function 	Start()
	{
		this._fadingInterval = 0.1;
		this._last = 0;
		this._opacity = 0;
	}
	
	public function 	Update()
	{
		if (this._opacity > 0.1 && (Time.time - this._last) > this._fadingInterval)
		{
			this._opacity -= 0.05;
			this._last = Time.time;
		}
	}
	
	public function 	OnGUI() : void
	{
		if (this._opacity > 0.1)
		{
			GUI.color = new Color32(255, 255, 255, 255 * this._opacity);
			GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), this._splatterEffect);
			GUI.color = new Color32(255, 255, 255, 255);
		}
	}
	
	public function 	hitHero() : void
	{
		this._opacity = 1;
		this._last = Time.time;
	}
}
