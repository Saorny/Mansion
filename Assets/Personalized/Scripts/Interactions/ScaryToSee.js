﻿#pragma strict

@script SerializeAll
public class ScaryToSee extends MonoBehaviour
{
	private var _hero		 	: HeroManager;

	function Update ()
	{
		if (this.renderer.isVisible && Vector3.Distance(this._hero.transform.position, this.transform.position) < 5)
		{
			var viewPos : Vector3 = this._hero.getCamera().WorldToViewportPoint(this.gameObject.transform.position);

			if(viewPos.x > 0.3 && viewPos.x < 0.7 && viewPos.y > 0.3 &&  viewPos.y < 0.7)
				this._hero.manageLookingAtScaryThings();
		}
	}

	public function		Start() : void
	{
		var	hero : GameObject;
		
		hero = GameObject.Find("Hero");
		this._hero = hero.GetComponent("HeroManager") as HeroManager;
	}
}
