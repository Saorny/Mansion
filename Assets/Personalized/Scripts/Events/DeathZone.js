#pragma strict

@DoNotSerialize
public class DeathZone extends Interactable
{
	public function OnTriggerEnter (body : Collider)
	{
		if (body.transform == this._heroBody)
		{
			this._hero.landingViolently(100);
			Destroy(this);
		}
	}
}
