@DoNotSerialize
public class BookReadingManager extends MonoBehaviour
{
	public var 	open_book 			: Texture[];
	public var 	turn_page 			: Texture[];
	public var 	normal 				: Texture;
	public var	_style				: GUIStyle;
	private var _bookMode			: boolean = false;
	private var _isTurningPage		: boolean = false;
	private var _leftPage 			: String[];
	private var _rightPage;
	private var _currentBook		: Book;
	private var _hero 				: HeroManager;
	private var _frameDelay			: float = 0.04;
	private var _innerMargin		: int = 2;
	private var _pageMinY			: int = 123;
	private var _pageMaxY			: int = 590;
	private var _pageLeftMinX		: int = 117;
	private var _pageLeftMaxX		: int = 515;
	private var _pageRightMinX		: int = 545;
	private var _pageRightMaxX		: int = 950;
	private var _lineLength			: int = 400;
	private var _lineHeight			: int = 35;
	
	public function		Start()
	{
		this._style.fontSize = 18;
	}
	
	public function		Awake() : void
	{
		var	hero : GameObject;
	
		hero = GameObject.Find("Hero");
		this._hero = hero.GetComponent("HeroManager") as HeroManager;
	}
	
	public function 	Update()
	{
		if (_bookMode == true && this._isTurningPage == false)
		{
	   		if (Input.GetButtonDown("Escape") || Input.GetButtonDown("Inventory"))
	   			this.closeBook();
	 		else
	 			this.managePageTurning();
	 	}
	}
	
	
	public function		displayLeftPage() : void
	{
		if (this._leftPage != null)
			this.displayPageContent(this._pageLeftMinX + this._innerMargin, this._pageMinY + this._innerMargin, this._leftPage);
	}
	
	public function		displayRightPage() : void
	{
		if (this._rightPage != null)
			this.displayPageContent(this._pageRightMinX + this._innerMargin, this._pageMinY + this._innerMargin, this._rightPage);
	}
	
	public function	getBookMode() : boolean { return (_bookMode); }
	
	public function	setBookMode(val : boolean) : void { _bookMode = val; }
	
	public function	openBook(obj : Book) : IEnumerator
	{
		this._isTurningPage = true;
		this._hero.hearOpenBook();
		this._currentBook = obj;
		this._style.font = this._currentBook.getFontStyle();
		this._bookMode = true;
		for (var i : int = 0 ; i < 25 ; ++i)
			yield this.setNextFrameToDisplay(open_book[i]);
		this._hero.setSpecialAnimation(normal);
		_currentBook.resetReading();
		displayBookContent();
		this._isTurningPage = false;
	}
	
	public public function	closeBook()
	{
		this.turningPage();
		this._hero.hearCloseBook();
		for (var i : int = 24 ; i >= 0 ; --i)
			yield this.setNextFrameToDisplay(open_book[i]);
		this._bookMode = false;
		this._hero.setSpecialAnimation(null);
		this._currentBook = null;
		this._isTurningPage = false;
	}
	
	private function	playTurnLeftPageAnimation()
	{
		if (this._currentBook.getCurrentPage() > 0)
		{
			this.turningPage();
			this._hero.hearTurnPage();
			for (var i : int = 24 ; i >= 0 ; --i)
				yield this.setNextFrameToDisplay(turn_page[i]);
			this._hero.setSpecialAnimation(normal);
			this._currentBook.goPreviousPage();
			this.displayBookContent();
			this._isTurningPage = false;
		}
		else
			this.closeBook();
	}
	
	private function	playTurnRightPageAnimation()
	{
		if (this._currentBook.canTurnRightPage() == true)
		{
			this.turningPage();
			this._hero.hearTurnPage();
			for (var i : int = 0 ; i < 25 ; ++i)
				yield this.setNextFrameToDisplay(turn_page[i]);
			this._hero.setSpecialAnimation(normal);
			this._currentBook.goNextPage();
			this.displayBookContent();
			this._isTurningPage = false;
		}
	}
	
	private function	managePageTurning()
	{
		if (Input.GetMouseButtonDown(0) && this._isTurningPage == false)
		{
			if 	((Input.mousePosition.x >= this._pageLeftMinX && Input.mousePosition.x <= this._pageLeftMaxX) &&
				(Input.mousePosition.y >= this._pageMinY && Input.mousePosition.y <= this._pageMaxY))
				this.playTurnLeftPageAnimation();
			if 	((Input.mousePosition.x >= this._pageRightMinX && Input.mousePosition.x <= this._pageRightMaxX) &&
				(Input.mousePosition.y >= this._pageMinY && Input.mousePosition.y <= this._pageMaxY))
				this.playTurnRightPageAnimation();	
		}
	}
	
	
	private function	displayBookContent() : void
	{
		if (_currentBook.getCurrentPage() == 0)
		{
			this._leftPage = null;
			this._rightPage = this._currentBook.getTitle();
		}
		else
		{
			this._leftPage = this._currentBook.getLeftPageContent();
			this._rightPage = this._currentBook.getRightPageContent();
		}
	}
	
	private function displayPageContent(posX : int, posY : int, content : Array) : void
	{
		var		i			 	: int;
		var		nb_rows			: int;
		
		nb_rows = content.length;
		if (content[0].Length <= 5 || content[0].Substring(0, 5) != "_PIC_")
		{
			for (i = 0 ; i < nb_rows ; ++i)
			{
				UnityEngine.GUI.Label(Rect (posX, posY, this._lineLength, this._lineHeight + 5), content[i], this._style);
				posY += this._lineHeight;
			}
		}
		else
		{
			UnityEngine.GUI.DrawTexture(Rect(posX - this._innerMargin, posY - this._innerMargin,  this._lineLength, 10 * this._lineHeight),
			this._currentBook.getSketchAt(parseInt(content[0].Substring(5))));
		}
	}
	
	private function	setNextFrameToDisplay(frame : Texture) : IEnumerator
	{
		this._hero.setSpecialAnimation(frame);
		yield this._hero.WaitForRealSeconds(this._frameDelay);
	}
	
	private function	turningPage() : void
	{
		this._isTurningPage = true;
		this._leftPage = null;
		this._rightPage = null;
	}
}
