#pragma strict

@DoNotSerialize
public class MenuTutoMain extends MenuTuto
{

	public function		MenuTutoMain() {}

	public function		MenuTutoMain(action_sound : AudioSource, ptr : function(MenuManager.Menu_Data) : void, path : String)
	{
		super(ptr, action_sound, path);
		this._menuTitle = "First step";
		this._subMenus.Add(new MenuButton("Return", this.returnCancel));
	}
	
	private function	returnCancel() : void { this.goTo(MenuManager.Menu_Data.PREVIOUS); }
}