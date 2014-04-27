#pragma strict

private var		_order 				= new Array();
private var		_attempt 			= new Array();
private var		_total_nb 			: int = 6;
private var 	_standartContent	: TextAsset;
private var		_finalText			: String;
private var		_sentences			= new Array();
public var		_pathContent		: String;
public var		_riddleBook			: BookCollider;
public var		_buttons			: TempleButtonManager[];
public var		_templeDoor			: Transform;

public function 	Start()
{
	this._standartContent = Resources.Load(this._pathContent, typeof(TextAsset));
	this._finalText = this._standartContent.ToString();
	this.fillSentences();
	this.selectOrder();
	this._riddleBook.setContent(this._finalText);
}

public function		pushButton(nb : int) : void
{
	this._attempt.push(nb);
	if (this._attempt.length == _total_nb)
		this.checkResults();
}

public function	closeDoor() : IEnumerator
{
	for (var i : int = 0 ; i < 30 ; ++i)
	{
		this._templeDoor.transform.Translate(0.1, 0, 0);
		yield WaitForSeconds(0.05);
	}
}

private function	checkResults()
{
	var i 	: int;

	for (i = 0 ; i < this._attempt.length && this._attempt[i] == this._order[i] ; ++i);
	if (i != this._attempt.length)
		this.resetMechanics();
	else
		this.openDoor();
}

private function	openDoor() : IEnumerator
{
	for (var i : int = 0 ; i < 30 ; ++i)
	{
		this._templeDoor.transform.Translate(-0.1, 0, 0);
		yield WaitForSeconds(0.05);
	}
}

private function	resetMechanics()
{
	for (var i = 0 ; i < this._buttons.length ; ++i)
		this._buttons[i].resetButton();
	this._attempt.clear();
}

private function	fillSentences()
{
	this._sentences.push("The Unconscious defiling R'Leyh the Dead shall enrage what remains dormant");
	this._sentences.push("Nyarlathotep with a Thousand Arms eternally floats through Space and Time, both meaningless to him");
	this._sentences.push("From the infine depths of the Oceans, Cthulhu awaits dreaming");
	this._sentences.push("Cthulhu the Almighty Priest of the Elder Gods reigns amongst his Worshippers, down the merciless seas");
	this._sentences.push("Our hopeless, primitive race is permanently underneath His shadow, merely waiting for its demise");
	this._sentences.push("Amongst the icy waters, lost in the walls of Times, R'Leyh the Dead holds countless secrets");
}

private function	selectOrder()
{
	var	nb : int;

	for (var i = 0 ; i < this._total_nb ; ++i)
	{
		nb = this.getNextNb();
		this._order.push(nb);
		this._finalText += this._sentences[nb - 1];
		if ((i + 1) < this._total_nb)
			this._finalText += ",";
		this._finalText += "\n\n";
	}
	this._finalText += "\n\nIf thou art as cunning as thy greed is acute, come follow my way...";
}

private function	isInArray(nb : int) : boolean
{
	var 	i : int;

	for (i = 0 ; i < this._order.length && this._order[i] != nb ; ++i);
	return (i != this._order.length);
}

private function	getNextNb() : int
{
	var	nb : int;
	do
	{
		nb = Mathf.Round(Random.value * (this._total_nb - 1)) + 1;
	} while (this.isInArray(nb) == true);
	return (nb);
}
