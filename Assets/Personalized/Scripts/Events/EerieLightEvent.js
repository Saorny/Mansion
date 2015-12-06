#pragma strict

public class EerieLightEvent extends CinematicManager
{	
	public var		_screamer	:	AudioSource;
	public var		_eerieLight	:	Light;

	public function		OnTriggerEnter()
	{
		if (this._hero.hasItem(Collectable.ObjectType.key_basement, false))
		{
			var i : int;

			this.setCinematicMode();
			yield this.MakeHeroLookAt(this._spots[0], 2);
			this._screamer.Play();
			for (i = 0 ; i < 60 ; ++i)
			{
				refreshStrangeLight(i);
				yield WaitForSeconds(0.01);
			}
			this._hero.scareHero(80);
			this.endVision();
			Destroy(this);
			this.setAdventureMode();
		}
	}

	private function	endVision()
	{
		this._heroCamera.fieldOfView = 60;
		this._eerieLight.gameObject.light.intensity = 0.6;
		this._eerieLight.range = 2;
	}

	private function	refreshStrangeLight(i : int)
	{
		this._heroCamera.fieldOfView = 60 - (i / 2);
		this._eerieLight.gameObject.light.intensity = i / 10;
		this._eerieLight.gameObject.light.range = i * 2;
		
	}
}
