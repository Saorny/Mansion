public var _door		: MansionDoorManager;
public var _body		: Transform;
public var _heroBody	: Transform;
public var Hero			: HeroManager;
public var _openable	= true;

function OnTriggerStay(body : Collider)
{
   if (body.transform == _heroBody && Input.GetButtonDown("Use") && this._body.renderer.isVisible == true && this._openable == true && this._door.getBusy() == false)
   {
   		this._openable = false;
		this._door.open();
 	}
 }
 
 function OnTriggerExit(body : Collider)
 {
 	if (body.transform == _heroBody && this._openable == false)
 	{
 		while (this._body.renderer.isVisible == true)
 		{
 			yield WaitForSeconds(0.5);
 		}
 		yield this._door.close();
 		this._openable = true;
 	}
 }
 