var globalSelect;	//This is used when calling an unnamed selectbox with onclick="this.PROPERTY"



var q = 0;

var tagid


function LinkinitSelectBox(el,OptionStyle,sizedBorderStyle) {
	LinkcopySelected(el);
	
	var size = el.getAttribute("size");
	tagid=el.id
// These two lines combined with execution in optionClick() allow you to write:
//		onchange="alert(this.options[this.selectedIndex].value)"
	el.options = el.children[1].children;
	el.selectedIndex = LinkfindSelected(el);	//Set the index now!
// Some methods that are supported on the real SELECT box
	el.remove = new Function("i", "Linkint_remove(this,i)");
	el.item   = new Function("i", "return this.options[i]");
	el.add    = new Function("e", "i", "Linkint_add(this, e, i)");
// The real select box let you have lot of options with the same NAME. In that case the item
// needs two arguments. When using DIVs you can't have two with the same NAME (or ID) and
// then there is no need for the second argument
	
	el.options[el.selectedIndex].selected = true;

	dropdown = el.children[1];

	if (size != null) {
		if (size > 1) {
			el.size = size;
			dropdown.style.zIndex = 0;
			LinkinitSized(el,sizedBorderStyle);
		}
		else {
			el.size = 1;
			dropdown.style.zIndex = 99;
			if (dropdown.offsetHeight > 200) {
				dropdown.style.height = "200";
				dropdown.style.overflow = "auto";
			}
		}
	}
	

}

function Linkint_remove(el,i) {
	if (el.options[i] != null)
		el.options[i].outerHTML = "";
}

function Linkint_add(el, e, i) {
	var html = "<div class='"+el.id+"option' noWrap";
	if (e.value != null)
		html += " value='" + e.value + "'";
	if (e.style.cssText != null)
		html += " style='" + e.style.cssText + "'";
	html += ">";
	if (e.text != null)
		html += e.text;
	html += "</div>"

	if ((i == null) || (i >= el.options.length))
		i = el.options.length-1;

	el.options[i].insertAdjacentHTML("AfterEnd", html);
}
	
function LinkinitSized(el,sizedBorderStyle) {
//alert("initSized -------->");
	var h = 0;
	el.children[0].style.display = "none";

	dropdown = el.children[1];
	dropdown.style.visibility = "visible";

	if (dropdown.children.length > el.size) {
		dropdown.style.overflow = "auto";
		for (var i=0; i<el.size; i++) {
			h += dropdown.children[i].offsetHeight;
		}

		if (dropdown.style.borderWidth != null) {
			dropdown.style.pixelHeight = h + 4; //2 * parseInt(dropdown.style.borderWidth);
		}

		else
			dropdown.style.height = h;

	}

	dropdown.style.border = sizedBorderStyle;


	el.style.height = dropdown.style.pixelHeight;
}

function LinkcopySelected(el) {
	var selectedIndex = LinkfindSelected(el);

	selectedCell = el.children[0].rows[0].cells[0];
	selectedDiv  = 	el.children[1].children[selectedIndex];
	
	selectedCell.innerHTML = selectedDiv.outerHTML;
}

// This function returns the first selected option and resets the rest
// in case some idiot has set more than one to selcted :-)
function LinkfindSelected(el) {
	var selected = null;


	ec = el.children[1].children;	//the table is the first child
	var ecl = ec.length;
	
	for (var i=0; i<ecl; i++) {
		if (ec[i].getAttribute("selected") != null) {
			if (selected == null) {	// Found first selected
				selected = i;
			}
			else
				ec[i].removeAttribute("selected");	//Like I said. Only one selected!
		}
	}
	if (selected == null)
		selected = 0;	//When starting this is the most logic start value if none is present

	return selected;
}

function LinktoggleDropDown(el) {
	if (el.size == 1) {
		dropDown = el.children[1];
		
		if (dropDown.style.visibility == "")
			dropDown.style.visibility = "hidden";
			
		if (dropDown.style.visibility == "hidden")
			LinkshowDropDown(dropDown);
		else
			LinkhideDropDown(dropDown);
	}
}

function LinkoptionClick(OptionStyle) {
	parel=window.event.srcElement.parentElement.parentElement.id+"option"
	el = LinkgetReal(window.event.srcElement, "className", parel);

	if (el.className == parel) {
		dropdown  = el.parentElement;
		selectBox = dropdown.parentElement;
		
		oldSelected = dropdown.children[LinkfindSelected(selectBox)]

		if(oldSelected != el) {
			oldSelected.removeAttribute("selected");
			el.setAttribute("selected", 1);
			selectBox.selectedIndex = LinkfindSelected(selectBox);
		}

		if (selectBox.onchange != null) {	// This executes the onchange when you chnage the option
			if (selectBox.id != "") {		// For this to work you need to replace this with an ID or name
				eval(selectBox.onchange.replace(/this/g, selectBox.id));
			}
			else {
				globalSelect = selectBox;
				eval(selectBox.onchange.replace(/this/g, "globalSelect"));
			}
		}
		
		if (el.backupCss != null)
			el.style.cssText = el.backupCss;
		LinkcopySelected(selectBox);
		LinktoggleDropDown(selectBox);
		LinkhighlightSelected(selectBox, true,OptionStyle);
	}
}

function LinkoptionOver(OptionStyle) {
	parel=window.event.srcElement.parentElement.parentElement.id+"option"
	var toEl = LinkgetReal(window.event.toElement, "className", parel);
	var fromEl = LinkgetReal(window.event.fromElement, "className", parel);
	if (toEl == fromEl) return;
	var el = toEl;
	
	if (el.className == parel) {
		if (el.backupCss == null)
			el.backupCss = el.style.cssText;
		LinkhighlightSelected(el.parentElement.parentElement, false,OptionStyle);
		el.style.cssText = el.backupCss + "; " + OptionStyle;
		this.highlighted = true;
	}
}

function LinkoptionOut(OptionStyle) {
	parel=window.event.srcElement.parentElement.parentElement.id+"option"
	var toEl = LinkgetReal(window.event.toElement, "className", parel);
	var fromEl = LinkgetReal(window.event.fromElement, "className", parel);

	if (fromEl == fromEl.parentElement.children[LinkfindSelected(fromEl.parentElement.parentElement)]) {
		if (toEl == null)
			return;
		if (toEl.className != parel)
			return;
	}
	
	if (toEl != null) {
		if (toEl.className != parel) {
			if (fromEl.className == parel)
				LinkhighlightSelected(fromEl.parentElement.parentElement, true,OptionStyle);
		}
	}
	
	if (toEl == fromEl) return;
	var el = fromEl;

	if (el.className == parel) {
		if (el.backupCss != null)
			el.style.cssText = el.backupCss;
	}

}

function LinkhighlightSelected(el,add,OptionStyle) {
	var selectedIndex = LinkfindSelected(el);
	
	selected = el.children[1].children[selectedIndex];
	
	if (add) {
		if (selected.backupCss == null)
			selected.backupCss = selected.style.cssText;
		selected.style.cssText = selected.backupCss + "; " + OptionStyle;
	}
	else if (!add) {
		if (selected.backupCss != null)
			selected.style.cssText = selected.backupCss;
	}
}

function LinkhideShownDropDowns() {
	parel=tagid+"select"
	var el = LinkgetReal(window.event.srcElement, "className", parel);
	
	var spans = document.all.tags("SPAN");
	var selects = new Array();
	var index = 0;
	
	for (var i=0; i<spans.length; i++) {
		if ((spans[i].className == parel) && (spans[i] != el)) {
			dropdown = spans[i].children[1];
			if ((spans[i].size == 1) && (dropdown.style.visibility == "visible"))
				selects[index++] = dropdown;
		}
	}
	
	for (var j=0; j<selects.length; j++) {
		LinkhideDropDown(selects[j]);
	}	

}

function LinkhideDropDown(el) {
	if (typeof(fade) == "function")
		fade(el, false);
	else
		el.style.visibility = "hidden";
}

function LinkshowDropDown(el) {
	if (typeof(fade) == "function")
		fade(el, true);
	else if (typeof(swipe) == "function")
		swipe(el, 2);
	else
		el.style.visibility = "visible";
}



function LinkgetReal(el, type, value) {
	temp = el;
	while ((temp != null) && (temp.tagName != "BODY")) {
		if (eval("temp." + type) == value) {
			el = temp;
			return el;
		}
		temp = temp.parentElement;
	}
	return el;
}

