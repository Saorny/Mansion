#pragma strict

public class DestructiblePlanks extends ActionType
{
	public var 		_hero 			: HeroManager;
	public var 		_destructibles 	: GameObject[];

	override public function		doAction(Hero : HeroManager) : IEnumerator
	{
		this.pauseGame(Hero);
		yield this.displayAnimationPic();
		this.resumeGame(Hero);
		this.destroyList();
		if (_sound)
			AudioSource.PlayClipAtPoint(_sound, Hero.transform.position, 20);
	}
	
	private function	displayAnimationPic()
	{
		for (var i : int = 0 ; i < this._animation.length ; ++i)
		{
			yield WaitForSeconds(0.005);
			this._hero.setSpecialAnimation(this._animation[i]);
		}
	}

	private function	destroyList()
	{
		var obj : GameObject;
	
		for (var i : int = 0 ; i < this._destructibles.length ; ++i)
		{
			obj = this._destructibles[i];
			GameObject.Destroy(obj.gameObject);
			GameObject.Destroy(this.gameObject);
		}
	}
	
	private function	pauseGame(Hero : HeroManager)
	{
		this._hero.setPauseHero(true);
		this._hero.HeroLockCamera(true);
		Time.timeScale = 0.1;
	}
	
	private function	resumeGame(Hero : HeroManager)
	{
		this._hero.setPauseHero(false);
		this._hero.HeroLockCamera(false);
		this._hero.setSpecialAnimation(null);
		Time.timeScale = 1;
	}
}
