#pragma strict

public var _button 	: TempleButtonManager;
var _heroBody 		: Transform;

function OnTriggerStay(body : Collider)
{
	if (body.transform == _heroBody && Input.GetButtonDown("Use") && this._button.isVisible() && this._button.getCan()) 
   		this._button.pushButton();
}