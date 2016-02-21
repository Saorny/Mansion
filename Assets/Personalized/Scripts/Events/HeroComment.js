#pragma strict

@DoNotSerialize
public class HeroComment extends Interactable
{
	public var		_comment	:	String = "";
	public var		_time		:	float = 3.0;
	
	public function OnTriggerEnter (body : Collider)
	{
		if (body.transform == this._heroBody)
		{
			this._hero.addDialogText(this._comment, this._time, Message.messageType.DIALOG);
			Destroy(this);
		}
	}
}
