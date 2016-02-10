#pragma strict

@DoNotSerialize
public class Message {

	private var 	_content 		: String;
	private var		_duration		: int;
	private var		_type			: messageType;
	private var		_style			: Font;
	private var		_timeStarted	: int;
	
	public enum	messageType { DIALOG, TUTORIAL, WARNING }

	public function Message(content : String, duration : float, type : Message.messageType) {
		this._content = content;
		this._duration = duration;
		this._type = type;
	}
	
	public function getContent() : String {
		return (this._content);
	}
	
	public function getType() : Message.messageType {
		return (this._type);
	}
	
	public function isOver() : boolean {
		return (Time.time > this._timeStarted + this._duration);
	}
		
	public function startReading() : void {
		this._timeStarted = Time.time;
	}
}