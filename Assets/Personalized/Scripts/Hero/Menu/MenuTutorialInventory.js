#pragma strict

@DoNotSerialize
public class MenuTutoIventory extends MenuTuto
{

	public function		MenuTutoIventory() {}

	public function		MenuTutoIventory(action_sound : AudioSource, ptr : function(MenuManager.Menu_Data) : void, path : String)
	{
		super(ptr, action_sound, path);
		this._menuTitle = "About inventory management";
		this._subMenus.Add(new MenuButton("Return", this.returnCancel));
	}
	
	private function	returnCancel() : void { this.goTo(MenuManager.Menu_Data.PREVIOUS); }
}