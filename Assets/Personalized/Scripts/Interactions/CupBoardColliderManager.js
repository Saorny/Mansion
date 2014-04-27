public var	CupBoard : CupBoardManager;
private var isOpen = false;

public function		OnTriggerStay()
{
   if (Input.GetButtonDown("Use") && this.CupBoard.isWithinRange() == true) 
   {
   	  if (this.isOpen == false)
   	  {
   	  	this.isOpen = true;
      	this.CupBoard.Open();
      }
   }
 }
 