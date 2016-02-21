#pragma strict

@DoNotSerialize
public class Interactable extends MonoBehaviour
{
	protected var _hero 			: HeroManager;
	protected var _heroBody 		: Transform;

	public function		Start() : void {
		this.loadHero();
	}
	
	public function		getHero() : HeroManager { return (this._hero); }
	public function		getHeroBody() : Transform { return (this._heroBody); }
	
	private function	loadHero() : void
	{
		var	hero : GameObject;
	
		hero = GameObject.Find("Hero");
		if (hero != null)
		{
			this._heroBody = hero.transform;
			this._hero = hero.GetComponent("HeroManager") as HeroManager;
		}
		else
			Debug.Log("Error: hero not found");
	}
}
