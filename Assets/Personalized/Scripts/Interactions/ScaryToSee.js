#pragma strict

@script SerializeAll
public class ScaryToSee extends Interactable
{
	public var _angleMin 		: float = 0.3;
	public var _angleMax 		: float = 0.7;
	public var _disMax 			: float = 15;

	public function Update () : void
	{
		if (this.renderer.isVisible && Vector3.Distance(this._hero.transform.position, this.transform.position) < this._disMax)
		{
			var viewPos : Vector3 = this._hero.getCamera().WorldToViewportPoint(this.gameObject.transform.position);

			if(viewPos.x > this._angleMin && viewPos.x < this._angleMax && viewPos.y > this._angleMin &&  viewPos.y < this._angleMax)
				this._hero.manageLookingAtScaryThings();
		}
	}
}
