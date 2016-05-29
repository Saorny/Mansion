#pragma strict

@DoNotSerialize
public class BookCollider extends CollectableCollider
{
	public var _bookName		: String;
	public var _bookDescription : String;
	public var _bookTitle		: String;
	public var _bookType		: Book.BookType;
	public var _section			: int;
	public var _style			: Font;
	public var _book			: GameObject;
	public var _sketches		: Texture[];
	private var _bookContent	: TextAsset;
	private var _finalText		: String = "";
	
	public function OnTriggerStay(body : Collider)
	{
		if (body.transform == this.getHeroBody() && Input.GetButtonDown("Use") && this._book.renderer.isVisible) 
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
		
		this._bookContent = Resources.Load("Books_Content/" + this._bookType.ToString() + "/" + this._section.ToString(), typeof(TextAsset));
		this._finalText = this._bookContent.ToString();
	}
	
	private function	retrieveBook() : void
	{
		var index : int;
	
		index = this._hero.getBookIndex(this._bookType);
		if (index == -1) {
			this._hero.addDialogText('New book collected:' + this._bookTitle, 4, Message.messageType.TUTORIAL);
			this._hero.giveBook(this._bookName, this._bookDescription, this._itemIcon, this._bookTitle,
									this._finalText, this._style, this._sketches, this._bookType);
		}
		else {
			this._hero.addDialogText('Book updated:' + this._bookTitle, 4, Message.messageType.TUTORIAL);
			this._hero.updateBook(index, this._finalText);
		}
		if (this._sound)
			AudioSource.PlayClipAtPoint(this._sound, transform.position, 20);
		Destroy (this._book.gameObject);
		Destroy (this);
	}
}
