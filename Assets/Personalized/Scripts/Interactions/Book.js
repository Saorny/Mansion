@script SerializeAll
public class Book extends Collectable
{
	private var	_title 					: String = "";
	private var	_text 					: String = "";
	private var _currentPage			: int = 0;
	private var LINE_LENGTH				: int = 30;
	private var PAGE_NB_ROWS			: int = 13;
	private var _bookContent 			= new Array();
	private var _fontStyle				 : Font;
	private var _sketches				: Texture[];

	public function Book(	name : String, description : String, icon : Texture ,
							title : String, text : String, style : Font, sketches : Texture[])
	{
		super(Collectable.ObjectType.book, name, description, icon);
		this._title = title;
		this._text = text;
		this._fontStyle = style;
		this.resetReading();
		this._sketches = sketches;
		parseContent(text);
	}
	
	public function Book() {}
	
	public function addContent(content: String) { parseContent(content); }

	public function resetReading() { this._currentPage = 0; }

	public function goNextPage() { ++this._currentPage; }

	public function goPreviousPage()
	{
		if (this._currentPage > 0)
		--this._currentPage;
	}

	public function getSketchAt(index : int) : Texture
	{
		var item : Texture;
	
		if (index >= 0 && index < this._sketches.length)
			item =  this._sketches[index];
		else
			item = null;
		return (item);
	}
	public function getTitle() : String {return (this._title);}
	public function getText() : String{return (this._text);}
	public function getCurrentPage() : int {return (this._currentPage);}
	public function getFontStyle() : Font {return (this._fontStyle);}
		
	public function	canTurnRightPage() { return ((this._currentPage * 2) < this._bookContent.length); }

	public function getLeftPageContent() : String[]
	{
		var		arr;
		
		if (this._currentPage > 0)
			arr = _bookContent[(this._currentPage - 1) * 2];
		else
			arr = false;
		return (arr);
	}

	public function getRightPageContent() : String[]
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
		cp = 0;
		while (ci < tl)
		{
			this._bookContent[cp] = new Array();
			for (cl = 0 ; cl < this.PAGE_NB_ROWS && ci < tl ; ++cl)
			{
				for (ll = 0 ; ll < this.LINE_LENGTH && (ci + ll) < tl ; )
				{
					if (ci + ll < tl && text[ci + ll] != ' ' && text[ci + ll] != '\n' && text.Substring(ci + ll, 5) != "_PIC_")
					{
						wl = this.getNextWordLength(text.Substring(ci + ll));
						if (ll + wl < this.LINE_LENGTH)
							ll += wl;
						else
							break ;
					}
					else
					{
						if ((ci + ll + 5) < tl && text.Substring(ci + ll, 5) == "_PIC_")
							break ;
						++ll;
						if (text[ci + ll - 1] == '\n')
							break ;
					}
				}
				this._bookContent[cp][cl] = text.Substring(ci, ll);
				ci += ll;
				if ((ci + 5) < tl && text.Substring(ci, 5) == "_PIC_")
					break ;
			}
			++cp;
			if ((ci + 5) < tl && text.Substring(ci, 5) == "_PIC_")
			{
				wl = this.getNextWordLength(text.Substring(ci));
				this._bookContent[cp] = new Array();
				this._bookContent[cp][0] = text.Substring(ci, wl);
				ci += wl;
				++cp;
			}
		}
	}

	private function	getNextWordLength(text : String)
	{
		var 	wl : int;
	
		for (wl = 0 ; wl < text.Length && text[wl] != ' ' && text[wl] != '\n' ; ++wl);
		return (wl);
	}
};
