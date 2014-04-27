@script SerializeAll
public class Book extends Collectable
{
	private var	CollectableTitle 		: String = "";
	private var	_text 					: String = "";
	private var _currentPage			: int = 0;
	private var LINE_LENGTH				: int = 30;
	private var PAGE_NB_ROWS			: int = 13;
	private var _bookContent 			= new Array();
	private var _fontStyle				 : Font;

	public function SetBook(type : ObjectType, name : String, description : String, icon : Texture, title : String, text : String, style : Font)
	{
		this.SetCollectable(type, name, description, icon);
		this.CollectableTitle = title;
		this._text = text;
		this._fontStyle = style;
		this.resetReading();
		parseContent(text);
	}
	
	public function addContent(content: String) { parseContent(content); }

	public function resetReading() { this._currentPage = 0; }

	public function goNextPage() { ++this._currentPage; }

	public function goPreviousPage()
	{
		if (this._currentPage > 0)
		--this._currentPage;
	}

	public function getTitle() : String {return (this.CollectableTitle);}
	public function getText() : String{return (this._text);}
	public function getCurrentPage() : int {return (this._currentPage);}
	public function getFontStyle() : Font {return (this._fontStyle);}
		
	public function	canTurnRightPage() { return ((this._currentPage * 2) < this._bookContent.length); }

	public function getLeftPageContent()
	{
		var		arr;
		
		if (this._currentPage > 0)
			arr = _bookContent[(this._currentPage - 1) * 2];
		else
			arr = false;
		return (arr);
	}

	public function getRightPageContent()
	{
		var		arr;

		if (((this._currentPage - 1) * 2) + 1 < this._bookContent.length)
			arr = _bookContent[((this._currentPage - 1) * 2) + 1];
		else
			arr = null;
		return (arr);
	}
	
	private function	parseContent(text : String)
	{
		var 	tl : int;
		var 	ci : int;
		var		ll : int;
		var		cp : int;
		var		cl : int;
		var		wl : int;
		
		tl = text.Length;
		ci = 0;
		cp = _bookContent.length;
		while (ci < tl)
		{
			this._bookContent[cp] = new Array();
			for (cl = 0 ; cl < this.PAGE_NB_ROWS && ci < tl ; ++cl)
			{
				for (ll = 0 ; ll < this.LINE_LENGTH && (ci + ll) < tl ; )
				{
					if (ci + ll < tl && text[ci + ll] != ' ' && text[ci + ll] != '\n')
					{
						wl = getNextWordLength(text.Substring(ci + ll));
						if (ll + wl < this.LINE_LENGTH)
							ll += wl;
						else
							break ;
					}
					else
					{
						++ll;
						if (text[ci + ll - 1] == '\n')
							break ;
					}
				}
				this._bookContent[cp][cl] = text.Substring(ci, ll);
				ci += ll;
			}
			++cp;
		}
	}

	private function	getNextWordLength(text : String)
	{
		var 	wl : int;
	
		for (wl = 0 ; wl < text.Length && text[wl] != ' ' && text[wl] != '\n' ; ++wl);
		return (wl);
	}
};
