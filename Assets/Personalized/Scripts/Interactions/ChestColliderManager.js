var chest : ChestManager;
var state = 0;

function OnTriggerStay()
{
   if (Input.GetButtonDown("Use") && chest.getBusy() == false) 
   {
   	  if (state == 0)
   	  {
      	chest.Open();
      	state = 1;
      }
      else
      {
      	chest.Close();
      	state = 0;
      }
   }
 }
 