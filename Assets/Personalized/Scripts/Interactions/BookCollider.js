#pragma strict

@DoNotSerialize
public class BookCollider extends CollectableCollider
{
	public var bookName			: String;
	public var bookDescription 	: String;
	public var bookTitle		: String;
	public var contentPath		: String;
	public var style			: Font;
	public var book				: GameObject;
	private var bookContent		: TextAsset;
	private var _finalText		: String = "";
	
	public function OnTriggerStay(body : Collider)
	{
		if (body.transform == this.getHeroBody() && Input.GetButtonDown("Use") && this.book.renderer.isVisible) 
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
		this.getHero().giveBook(this.bookName, this.bookDescription, this.ItemIcon, this.bookTitle, this._finalText, this.style);
		if (this.sound)
			AudioSource.PlayClipAtPoint(this.sound, transform.position, 20);
		Destroy (this.book.gameObject);
		Destroy (this);
	}
}
