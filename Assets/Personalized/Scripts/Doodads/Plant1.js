#pragma strict

@DoNotSerialize
public class Plant1 extends MonoBehaviour
{
	public var _light				: Transform;
	protected var _heroBody 		: Transform;
	protected var _in				: boolean;

	public function		Start() : void
	{
		this.loadComponents();
		this._in = false;
	}
	
	public function		OnTriggerEnter(body : Collider)
	{
		this._in = true;
		if (body.transform == this._heroBody)
		{
			this.animation.Play("plant1_close");
			this._light.active = false;
		}
	}
	
	public function		OnTriggerExit(body : Collider)
	{
		this._in = false;
		if (body.transform == this._heroBody)
		{
			this.animation.Play("plant1_open");
			yield WaitForSeconds(1);
			if (this._in == false)
			{
				this.animation.Play("plant1_idle");
				this._light.active = true;
			}
		}
	}
	
	private function	loadComponents() : void
	{
		var	hero : GameObject;
	
		hero = GameObject.Find("Hero");
		if (hero != null)
		{
			this._heroBody = hero.transform;
		}
		else
			Debug.Log("Error: hero not found");
		this._light = this.transform.FindChild("Plant_skeleton/Body/Neck1/Neck2/Neck3/plant_light");
	}
}
