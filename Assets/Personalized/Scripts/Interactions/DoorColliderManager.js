var Door : DoorManager;
var state = 0;

function OnTriggerStay()
{
   if (Input.GetButtonDown("Use") && Door.getBusy() == false) 
   {
   	  if (state == 0)
   	  {
      	Door.Open();
      	state = 1;
      }
      else
      {
      	Door.Close();
      	state = 0;
      }
   }
 }
 