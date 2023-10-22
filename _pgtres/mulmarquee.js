var  srctecmarquee5msg_num = 0;


var  srctecmarquee5msg_len = 0;

var  srctecmarquee5msg_scr = 0;

var  srctecmarquee5reset_val = 0;



function displays() {

	if ( srctecmarquee5msg_num > srctecmarquee5q_msg) {

		 srctecmarquee5msg_num =  srctecmarquee5reset_val;

	}

 srctecmarquee5msg_len++;

window.status =  srctecmarquee5txt_msg[srctecmarquee5msg_num].substring(srctecmarquee5reset_val,srctecmarquee5msg_len);

	if ( srctecmarquee5msg_len ==  srctecmarquee5txt_msg[srctecmarquee5msg_num].length) {

//show the time interval

		 srctecmarquee5timer_disp=window.setTimeout ("removes()",  srctecmarquee5t_disp);

	}         

	else {

//show the next character

		 srctecmarquee5timer_type=window.setTimeout ("displays()",  srctecmarquee5t_type);

	}

}


//make a character be moved from left side.

function removes()

{

 srctecmarquee5msg_scr++;

	if ( srctecmarquee5msg_scr >  srctecmarquee5txt_msg[srctecmarquee5msg_num].length) {

		 srctecmarquee5msg_num++;    

		 srctecmarquee5msg_len =  srctecmarquee5reset_val;

		 srctecmarquee5msg_scr =  srctecmarquee5reset_val;

//	This timer is executed after the message is completely removed.

		 srctecmarquee5timer_blank=window.setTimeout ("displays()",  srctecmarquee5t_blank)

	}

	else {

		window.status =  srctecmarquee5txt_msg[srctecmarquee5msg_num].substring( srctecmarquee5msg_scr,  srctecmarquee5txt_msg[ srctecmarquee5msg_num].length);

//	This timer calls this function recursively to remove letters.  This gives the appearance of scrolling.  

		 srctecmarquee5timer_scr=window.setTimeout ("removes()",  srctecmarquee5t_scr);

	}
 
}