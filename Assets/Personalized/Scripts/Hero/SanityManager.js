#pragma strict

@script SerializeAll
public class SanityManager extends MonoBehaviour
{
	private var 	_lastTimeScary	 	: float;
	private var 	_intervalScare	 	: float;
	private var		_sanity				: float;
	private var 	_heroCamera		 	: Camera;
	private var		_soundManager		: SoundManagerHero;
	private var		_blurringEffect		: MotionBlur;
	private var		_fishEyeEffect		: Fisheye;
	private var		_sepiaToneEffect	: SepiaToneEffect;
	
	public enum	sanityState { HEALTHY, UNSTABLE, INSANE }

	public function 	Start() : void {
		this._sanity = 100;
		this._intervalScare = 0.04;
		this._lastTimeScary = 0;
	}
	
	public function		Awake() : void {
		var	hero : GameObject;
	
		hero = GameObject.Find("Hero");
		this._heroCamera = hero.Find("Main Camera").GetComponent(Camera);
		this._blurringEffect = this._heroCamera.GetComponent("MotionBlur") as MotionBlur;
		this._fishEyeEffect = this._heroCamera.GetComponent("Fisheye") as Fisheye;
		this._sepiaToneEffect = this._heroCamera.GetComponent("SepiaToneEffect") as SepiaToneEffect;
		this._blurringEffect.enabled = false;
		this._fishEyeEffect.enabled = false;
		this._sepiaToneEffect.enabled = false;
	}
	
	private function	calculateEyeFishiness() : void {
		this._fishEyeEffect.strengthX = (1 - (this._sanity / 100)) / 3;
		this._fishEyeEffect.strengthY = (1 - (this._sanity / 100)) / 3;
	}
	
	public function		manageLookingAtScaryThings() : void {
		if (this._sanity > 0)
		{
			if (Time.time - this._lastTimeScary > this._intervalScare)
			{
				this._sanity -= 1;
				if (this._sanity < 0)
					this._sanity = 0;
				if (this._sanity < 80 && this._fishEyeEffect.enabled == false)
					this._fishEyeEffect.enabled = true;
				if (this._fishEyeEffect.enabled == true)
					this.calculateEyeFishiness();
				this._lastTimeScary = Time.time;
				if (this._sanity < 50)
				{
					gameObject.SendMessage("sendScareAlert", true);
					if (this._blurringEffect.enabled == false)
						this._blurringEffect.enabled = true;
					this._soundManager.playSoundType(SoundManagerHero.SoundType.SPEAK, SoundManagerHero.HeroVoice.HEART_BEAT);			
				}
			}
		}
	}
	
	public function		scareHero(val : int) : void {
		this._sanity -= val;
		if (this._sanity < 0)
			this._sanity = 0;
		this._soundManager.playSoundType(SoundManagerHero.SoundType.SPEAK, SoundManagerHero.HeroVoice.HEART_BEAT);
		this._fishEyeEffect.enabled = true;
		this._blurringEffect.enabled = true;
		this.calculateEyeFishiness();
		if (this._sanity < 50) {
			gameObject.SendMessage("sendScareAlert", true);
		}
	}
	
	public function	manageHeroScared() : IEnumerator {
		if (this._sanity < 100 && Time.time - this._lastTimeScary > this._intervalScare)
		{
			this._lastTimeScary = Time.time;
			this._sanity += 0.3;
			if (this._sanity >= 100)
			{
				if (this._sanity > 100)
					this._sanity = 100;
				this._fishEyeEffect.enabled = false;
			}
			else
				this.calculateEyeFishiness();
			if (this._sanity > 50 && this._blurringEffect.enabled == true)
			{
				this._blurringEffect.enabled = false;
				this._soundManager.stopHeroSoundType(parseInt(SoundManagerHero.SoundType.SPEAK));
			}
		}
		if (this._sanity < 75)
			this._soundManager.manageScaredSounds();
	}
	
	public function	getSepiaToneEffect() : boolean { return (this._sepiaToneEffect.enabled); }
	
	public function	setSoundManager(soundManager : SoundManagerHero) : void { this._soundManager = soundManager; }
	public function	setSepiaToneEffect(val : boolean) : void { this._sepiaToneEffect.enabled = val; }
	
}
