#pragma strict

@DoNotSerialize
public class MenuTutorial extends Menu
{

	public function		MenuTutorial() {}

	public function		MenuTutorial(action_sound : AudioSource, ptr : function(MenuManager.Menu_Data) : void)
	{
		super(ptr, action_sound);
		this._menuTitle = "Tutorial menu";
		this._subMenus.Add(new MenuButton("Return", this.returnCancel));
		this._subMenus.Add(new MenuButton("First step", this.goToMainTuto));
		this._subMenus.Add(new MenuButton("Inventory management", this.goToInventoryTuto));
		this._subMenus.Add(new MenuButton("Health system", this.goToHealthTuto));
	}
	
	private function	returnCancel() : void { this.goTo(MenuManager.Menu_Data.PREVIOUS); }
	private function	goToMainTuto() : void { this.goTo(MenuManager.Menu_Data.TUTO_MAIN); }
	private function	goToInventoryTuto() : void { this.goTo(MenuManager.Menu_Data.TUTO_INVENTORY); }
	private function	goToHealthTuto() : void { this.goTo(MenuManager.Menu_Data.TUTO_HEALTH); }
}