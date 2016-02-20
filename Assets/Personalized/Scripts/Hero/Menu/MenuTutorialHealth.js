#pragma strict

@DoNotSerialize
public class MenuTutoHealth extends MenuTuto
{
	public function		MenuTutoHealth(heroManager	: HeroManager, action_sound : AudioSource, ptr : function(MenuManager.Menu_Data) : void, path : String)
	{
		super(heroManager, ptr, action_sound, path);
		this._menuTitle = "About health system";
		this._subMenus.Add(new MenuButton("Return", this.returnCancel));
	}
	
	private function	returnCancel() : void { this.goTo(MenuManager.Menu_Data.PREVIOUS); }
}