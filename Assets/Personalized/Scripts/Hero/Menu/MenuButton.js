#pragma strict

@DoNotSerialize
public class MenuButton
{
	private var 		_text		:		String;
	private var 		_saveEntry	:		LevelSerializer.SaveEntry;
	private var 		_ptr		: 		function();
	
	public function		MenuButton(text : String, ptr : function() : void)
	{
		this._text = text;
		this._ptr = ptr;
	}

	public function		MenuButton(text : String, ptr : function() : void, data : LevelSerializer.SaveEntry)
	{
		this._text = text;
		this._ptr = ptr;
		this._saveEntry = data;
	}

	public function		exec() { this._ptr(); } ;
	public function		getText() : String { return (this._text); }
	public function		getPointer() : function() : void { return (this._ptr); }
	public function		getSaveEntry() : LevelSerializer.SaveEntry { return (this._saveEntry); }

	public function		setText(text : String) : void { this._text = text; }
	public function		setPointer(ptr : function() : void) : function() : void { this._ptr = ptr; }

};
