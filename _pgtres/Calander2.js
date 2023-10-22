
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
timebutton.value = time;
self.status = time;
setTimeout('clock()', 1000);
}

function get_time_spent ()
{ 
	var time_now = new Date();
	var clock_start = time_start.getTime();
	return((time_now.getTime() - clock_start)/1000); 
}



function srcteccalengreeting(greettext)
{
   var today = new Date();
   var hrs = today.getHours();
   document.writeln("<CENTER "+srcteccalenstyletext+" >");
   document.write(greettext+"<br>");
   document.write("<center>"
                + "Current Time:<input "+srcteccalenstyletextbutton+"type=text value=\"\""
                + " name=timebutton></center>");
   onError = null;
   clock();
   document.writeln("</CENTER>");
}
function montharr(m0, m1, m2, m3, m4, m5, m6, m7, m8, m9, m10, m11)
{
   this[0] = m0;
   this[1] = m1;
   this[2] = m2;
   this[3] = m3;
   this[4] = m4;
   this[5] = m5;
   this[6] = m6;
   this[7] = m7;
   this[8] = m8;
   this[9] = m9;
   this[10] = m10;
   this[11] = m11;
}
function srcteccalencalendar(bgcolor,textcolor)
{

   var today = new Date();
   var thisDay;
   var monthDays = new montharr(31, 28, 31, 30, 31, 30, 31, 31, 30,
      31, 30, 31);
   
   year = today.getYear();
   if (year<2000)
      year=year+1900;
 
   thisDay = today.getDate();
   
   if (((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0))
      monthDays[1] = 29;
   nDays = monthDays[today.getMonth()];
   firstDay = today;
   firstDay.setDate(1); // works fine for most systems
   testMe = firstDay.getDate();
   if (testMe == 2)
        firstDay.setDate(0);    
   startDay = firstDay.getDay();
     
   document.writeln("<CENTER>");
   document.write("<TABLE " +srcteccalenstylecalander+"  bgcolor="+bgcolor+">");
   document.write("<TR "+srctectitlestyle+"><Th "+srcteccalenstyletextborder+" COLSPAN=7>");
   document.write('Year:'+year+ '&nbsp');
   document.write('Month:'+(today.getMonth()+1));


   document.write("<TR "+srctectitlestyle+"><TH "+srcteccalenstyletextborder+">Sun<TH "+srcteccalenstyletextborder+">Mon<TH "+srcteccalenstyletextborder+">Tue<TH "+srcteccalenstyletextborder+">Wed<TH "+srcteccalenstyletextborder+">Thu<TH "+srcteccalenstyletextborder+">Fri<TH "+srcteccalenstyletextborder+">Sat");
   document.write("<TR>");
   column = 0;
   for (i=0; i<startDay; i++)
   {
      document.write("<TD "+srcteccalenstyletextborder+">");
      column++;
   }
   for (i=1; i<=nDays; i++)
   {
      document.write("<TD "+srcteccalenstyletextborder+">");
      if (i == thisDay)
         document.write("<FONT COLOR="+textcolor+">")
      document.write(i);
      if (i == thisDay)
        document.write("</FONT>")
      column++;
      if (column == 7)
      {
         document.write("<TR>"); 
         column = 0;
      }
   }
   document.write("</TABLE>");
   document.writeln("</CENTER>");
}