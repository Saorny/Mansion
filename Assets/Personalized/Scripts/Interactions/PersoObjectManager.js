#pragma strict

public function		moveObject (thisTransform : Transform, startPos : Vector3, endPos : Vector3, time : float) : IEnumerator
{
    var i = 0.0;
    var rate = 1.0/time;
    while (i < 1.0) {
        i += Time.deltaTime * rate;
        thisTransform.position = Vector3.Lerp(startPos, endPos, i);
        yield; 
    }
}
	
public function		rotateObject(thisTransform : Transform, startPos : Quaternion, endPos : Quaternion, time : float) : IEnumerator
{
    var i = 0.0;
    var rate = 1.0/time;
    while (i < 1.0) {
        i += Time.deltaTime * rate;
        thisTransform.rotation = Quaternion.Lerp(startPos, endPos, i);
        yield; 
    }
}
