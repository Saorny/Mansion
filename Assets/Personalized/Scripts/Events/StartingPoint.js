#pragma strict

@DoNotSerialize
public class StartingPoint extends CinematicManager
{
	public function OnTriggerEnter (body : Collider)
	{
		if (body.transform == this._heroBody)
		{
			this._hero.mayDislayTuto(TutorialManager.TutoList.ACCESS_MENU);
			this._hero.mayDislayTuto(TutorialManager.TutoList.ACCESS_INVENTORY);
			Destroy(this);
		}
	}
}
