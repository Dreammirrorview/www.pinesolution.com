
var time_start = new Date();
function clock() {
today = new Date();
hrNow = today.getHours();
mnNow = today.getMinutes();	
scNow = today.getSeconds();
miNow = today.getTime();


if (hrNow == 0) 
{
	hour = 12;
	ap = " AM";
} 
else 
	if(hrNow <= 11) 
	{
		ap = " AM";
		hour = hrNow;
	} 
else 
	if(hrNow == 12) 
	{
		ap = " PM";
		hour = 12;
	} 
else 
	if (hrNow >= 13) 
	{
		hour = (hrNow - 12);
		ap = " PM";
	}
	
if (hrNow >= 13) 
{
	hour = hrNow - 12;
}
if (mnNow <= 9) 
{
	min = "0" + mnNow;
}
else 
{min = mnNow}
if (scNow <= 9) 
{
secs = "0" + scNow;
} 
else 
{
secs = scNow;
}
time = hour + ":" + min + ":" + secs + ap;
document.srctectimebuttonform.button.value = time;
self.status = time;
setTimeout('clock()', 1000);
}

function get_time_spent ()
{ 
	var time_now = new Date();
	var clock_start = time_start.getTime();
	return((time_now.getTime() - clock_start)/1000); 
}

function timeInfo() {
	i_total_secs = Math.round(get_time_spent()); 
	i_secs_spent = i_total_secs % 60;
	i_mins_spent = Math.round((i_total_secs-30)/60); 
	s_secs_spent = "" + ((i_secs_spent>9) ? i_secs_spent : "0" + i_secs_spent);
	s_mins_spent = "" + ((i_mins_spent>9) ? i_mins_spent : "0" + i_mins_spent);
	alert(srctecalerttext+"\r\n"+"Your stay time::"+s_mins_spent+":"+s_secs_spent);
}




