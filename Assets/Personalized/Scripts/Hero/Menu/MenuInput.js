#pragma strict

public class MenuInput
{
	private var 		_text :		String;

	public function		MenuInput(text : String)
	{
		this._text = text;
	}

	public function		getText() : String { return (this._text); }
	public function		setText(text : String) : void { this._text = text; }
};
