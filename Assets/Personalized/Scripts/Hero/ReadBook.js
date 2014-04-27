var 		Hero 				: Interaction;
var 		open_book 			: Texture[];
var 		turn_page 			: Texture[];
var 		normal 				: Texture;
var 		sound_open_book 	: AudioClip;
var 		sound_close_book 	: AudioClip;
var 		sound_turn_page 	: AudioClip;
var 		HeroInterface 		: Interface;
var			_style				: GUIStyle;
private var _bookMode			: boolean = false;
private var _isTurningPage		: boolean = false;
private var LeftPage 			= null;
private var RightPage 			= null;
private var _currentBook			: Book;

public function		Start()
{
	this._style.fontSize = 18;
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
	if (this.LeftPage != null)
		this.displayPageContent(200, 160, this.LeftPage);
}

public function		displayRightPage() : void
{
	if (this.RightPage != null)
		this.displayPageContent(580, 160, this.RightPage);
}

public function	getBookMode() : boolean { return (_bookMode); }

public function	setBookMode(val : boolean) : void { _bookMode = val; }

public function	openBook(obj : Book)
{
	this._isTurningPage = true;
	if (sound_open_book)
		AudioSource.PlayClipAtPoint(sound_open_book, transform.position, 20);
	this._currentBook = obj;
	this._style.font = this._currentBook.getFontStyle();
	_bookMode = true;
	Time.timeScale = 0.1;
	for (var i : int = 0 ; i < 25 ; ++i)
	{
		Hero.setSpecialAnimation(open_book[i]);
		yield WaitForSeconds(0.005);
	}
	Hero.setSpecialAnimation(normal);
	Time.timeScale = 0;
	_currentBook.resetReading();
	displayBookContent();
	this._isTurningPage = false;
}

public public function	closeBook()
{
	this._isTurningPage = true;
	this.LeftPage = null;
	this.RightPage = null;
	if (sound_close_book)
		AudioSource.PlayClipAtPoint(sound_close_book, transform.position, 20);
	Time.timeScale = 0.1;
	for (var i : int = 24 ; i >= 0 ; --i)
	{
		Hero.setSpecialAnimation(open_book[i]);
		yield WaitForSeconds(0.005);
	}
	_bookMode = false;
	Hero.setSpecialAnimation(null);
	Time.timeScale = 0;
	this._currentBook = null;
	this._isTurningPage = false;
}

private function	playTurnLeftPageAnimation()
{
	if (this._currentBook.getCurrentPage() > 0)
	{
		this._isTurningPage = true;
		LeftPage = null;
		RightPage = null;
		if (sound_turn_page)
			AudioSource.PlayClipAtPoint(sound_open_book, transform.position, 20);
		Time.timeScale = 0.1;
		for (var i : int = 24 ; i >= 0 ; --i)
		{
			Hero.setSpecialAnimation(turn_page[i]);
			yield WaitForSeconds(0.005);
		}
		Hero.setSpecialAnimation(normal);
		Time.timeScale = 0;
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
		this._isTurningPage = true;
		LeftPage = null;
		RightPage = null;
		if (sound_turn_page)
			AudioSource.PlayClipAtPoint(sound_open_book, transform.position, 20);
		Time.timeScale = 0.1;
		for (var i : int = 0 ; i < 25 ; ++i)
		{
			Hero.setSpecialAnimation(turn_page[i]);
			yield WaitForSeconds(0.005);
		}
		Hero.setSpecialAnimation(normal);
		Time.timeScale = 0;
		this._currentBook.goNextPage();
		this.displayBookContent();
		this._isTurningPage = false;
	}
}

private function	managePageTurning()
{
	if (Input.GetMouseButtonDown(0) && this._isTurningPage == false)
	{
		if 	((Input.mousePosition.x >= 124 && Input.mousePosition.x <= 515) &&
			(Input.mousePosition.y >= 170 && Input.mousePosition.y <= 590))
			this.playTurnLeftPageAnimation();
		if 	((Input.mousePosition.x >= 550 && Input.mousePosition.x <= 950) &&
			(Input.mousePosition.y >= 170 && Input.mousePosition.y <= 590))
			this.playTurnRightPageAnimation();	
	}
}


private function	displayBookContent() : void
{
	if (_currentBook.getCurrentPage() == 0)
	{
		LeftPage = null;
		RightPage = _currentBook.getTitle();
	}
	else
	{
		LeftPage = _currentBook.getLeftPageContent();
		RightPage = _currentBook.getRightPageContent();
	}
}

private function displayPageContent(posX : int, posY : int, content: Array)
{
	var		i			 	: int;
	var		nb_rows			: int;
	
	nb_rows = content.length;
	for (i = 0 ; i < nb_rows ; ++i)
	{
		GUI.Label(Rect (posX, posY, 400, 50), content[i], this._style);
		posY += 30;
	}
}
