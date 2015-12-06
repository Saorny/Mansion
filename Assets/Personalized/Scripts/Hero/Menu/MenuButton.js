#pragma strict

@DoNotSerialize
public class MenuButton
{
	private var 		_text		:		String;
	private var 		_text2		:		String;
	private var 		_saveEntry	:		LevelSerializer.SaveEntry;
	private var 		_ptr		: 		function();
	private var 		_ptr2		: 		function();
	
	public function		MenuButton(text : String, ptr : function() : void)
	{
		this._text = text;
		this._text2 = "";
		this._ptr = ptr;
		this._ptr2 = null;
	}
	
	public function		MenuButton(text : String, ptr : function() : void, text2 : String, ptr2 : function() : void)
	{
		this._text = text;
		this._text2 = text2;
		this._ptr = ptr;
		this._ptr2 = ptr2;
	}

	public function		MenuButton(text : String, ptr : function() : void, data : LevelSerializer.SaveEntry)
	{
		this._text = text;
		this._text2 = "";
		this._ptr = ptr;
		this._ptr2 = null;
		this._saveEntry = data;
	}

	public function		exec() { this._ptr(); } ;
	public function		exec2() { this._ptr2(); } ;
	public function		getText() : String { return (this._text); }
	public function		getText2() : String { return (this._text2); }
	public function		getPointer() : function() : void { return (this._ptr); }
	public function		getPointer2() : function() : void { return (this._ptr2); }
	public function		getSaveEntry() : LevelSerializer.SaveEntry { return (this._saveEntry); }

	public function		setText(text : String) : void { this._text = text; }
	public function		setPointer(ptr : function() : void) : function() : void { this._ptr = ptr; }

};
