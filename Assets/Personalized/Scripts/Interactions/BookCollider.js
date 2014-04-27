public var sound 			: AudioClip;
public var bookName			: String;
public var bookDescription 	: String;
public var bookTitle		: String;
public var contentPath		: String;
public var ItemIcon 		: Texture;
public var hero 			: Interaction;
public var book				: GameObject;
public var style			: Font;
private var bookContent		: TextAsset;
private var _finalText		: String = "";

public function OnTriggerStay()
{
	if (Input.GetButtonDown("Use") && book.renderer.isVisible) 
   	{
   		if (this._finalText == "")
   			this.loadContent();
   		this.retrieveBook();
   	}
}

public function	setContent(content : String) : void
{
	this._finalText = content;
}

private function	loadContent() : void
{
	this.bookContent = Resources.Load(contentPath, typeof(TextAsset));
	this._finalText = this.bookContent.ToString();
}

private function	retrieveBook() : void
{
	this.hero.giveBook(bookName, bookDescription, ItemIcon, bookTitle, this._finalText, style);
	if (sound)
		AudioSource.PlayClipAtPoint(sound, transform.position, 20);
	Destroy (book.gameObject);
	Destroy (this);
}
