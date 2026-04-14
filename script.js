let allArr = [];

let checkit = true;

let currentEditId = null;

let savedData = JSON.parse(localStorage.getItem("expenses"));
if(savedData){
	allArr = savedData;
	buildTask("A");
	calculateTotals();
}

window.onload = function(){
	let datebox = document.getElementById("datebox");
	let today = new Date().toISOString().split("T")[0];
	datebox.value = today;
	datebox.max = today;
	addincome();
}

function addincome(){
	checkit = true;
	let inc = document.getElementById("inc");
	let exp = document.getElementById("exp");
	let catg = document.getElementById("catg");
	inc.style.backgroundColor = "#22c55e";
	inc.style.color = "white";
	exp.style.backgroundColor = "white";
	exp.style.color = "black";
	let options = '<option>Salary</option><option>Bonus</option><option>Refund</option><option>Business</option><option>Freelancing</option><option>Others</option>';
	catg.innerHTML = options;
}

function addexpense(){
	checkit = false;
	let bugnum = Number(document.getElementById("bugnum").innerText);
	let incnum = Number(document.getElementById("incnum").innerText);
	let amountinput = document.getElementById("amountinput");
	let income = amountinput.value;
	let inc = document.getElementById("inc");
	let exp = document.getElementById("exp");
	let catg = document.getElementById("catg");
	if(income && (bugnum <= 0 || bugnum < Number(income))){
		window.alert("please add or adjust your budget");
		addincome();
		return;
		}
	inc.style.backgroundColor = "white";
	inc.style.color = "black";
	exp.style.backgroundColor = "#3b82f6";
	exp.style.color = "white";
	let options = '<option>Food</option><option>Transport</option><option>Rent</option><option>Shopping</option><option>Medical</option><option>Others</option>';
	catg.innerHTML = options;
	
}

function submittask(){
	let incnum = Number(document.getElementById("incnum").innerText);
	let expnum = Number(document.getElementById("expnum").innerText);
	let bugnum = Number(document.getElementById("bugnum").innerText);
	let exp = document.getElementById("exp");
	let datebox = document.getElementById("datebox");
	let expdiv = document.getElementById("expnum");
	let bugdiv = document.getElementById("bugnum");
	let incdiv = document.getElementById("incnum");
	let amountinput = document.getElementById("amountinput");
	let incinput = document.getElementById("incinput");
	let description = incinput.value;
	let income = amountinput.value;
	let time = datebox.value;
	let catagory = document.getElementById("catg").value;
	if(income == ""){
			window.alert("please enter something");
			return;
	}
	if (income <= 0) {
    window.alert("amount must be greater than 0");
    return;
	}
	let allobj = {};
	allobj.Description = String(description);
	allobj.Amount = Number(income);
	allobj.Time = String(time);
	allobj.Catagory = String(catagory);
	if(checkit == true){
		allobj.Type = "income";
	}
	else{
		allobj.Type = "expense";
	}
	allobj.uniqueId = Date.now();
	allobj.deleted = false;
	
	if(checkit == true){
		allArr.push(allobj);
		localStorage.setItem("expenses", JSON.stringify(allArr));
		incdiv.innerText = incnum + Number(income);
		bugdiv.innerText = bugnum + Number(income);
		buildTask("A");
	}
	else if(checkit == false){
		if(bugnum <= 0 || bugnum < Number(income)){
        window.alert("please add or adjust your budget");
        addincome();
        return;
		}

		allArr.push(allobj);
		localStorage.setItem("expenses", JSON.stringify(allArr));
		expdiv.innerText = expnum + Number(income);
		bugdiv.innerText = bugnum - Number(income);
		buildTask("A");
		return;
	}
	defaultDate();
}

function getTypeClass(type){
	if(type && type.toLowerCase().trim() == "income"){
		return "incomeRow";
	}
	else{
		return "expenseRow";
	}
}

function buildTask(buildType){
	let Taskdiv = document.getElementById("task");
	let list = "";
	if(buildType == "A"){
		for(let idx = 0; idx<allArr.length; idx++){
		let Task = allArr[idx];
		let typeClass = getTypeClass(Task.Type);
		list += `<div id = "list" class ="taskRow ${typeClass}"><div>D:<div>${Task.Description}</div></div><div>A: <div>${Task.Amount}</div></div><div>C: <div>${Task.Catagory}</div></div><div>T: <div>${Task.Time}</div></div><div class = "task-actions"><button class = "taskbtn" id = "editTask" onclick = "preEdit(${Task.uniqueId})" >EDIT</button><button class = "taskbtn" id = "delTask" onclick="deleteTask(${Task.uniqueId})">DELETE</button></div></div>`;
		}
	}
	else if(buildType == "I"){
		for(let idx = 0; idx<allArr.length; idx++){
			let Task = allArr[idx];
			let typeClass = getTypeClass(Task.Type);
			if(Task.Type == "income"){
				list += `<div id = "list" class ="taskRow ${typeClass}"><div>D:<div>${Task.Description}</div></div><div>A: <div>${Task.Amount}</div></div><div>C: <div>${Task.Catagory}</div></div><div>T: <div>${Task.Time}</div></div><div class = "task-actions"><button class = "taskbtn" id = "editTask" onclick = "preEdit(${Task.uniqueId})" >EDIT</button><button class = "taskbtn" id = "delTask" onclick="deleteTask(${Task.uniqueId})">DELETE</button></div></div>`;
			}
		}
	}
	else{
		for(let idx = 0; idx<allArr.length; idx++){
			let Task = allArr[idx];
			let typeClass = getTypeClass(Task.Type);
			if(Task.Type == "expense"){
				list += `<div id = "list" class ="taskRow ${typeClass}"><div>D:<div>${Task.Description}</div></div><div>A: <div>${Task.Amount}</div></div><div>C: <div>${Task.Catagory}</div></div><div>T: <div>${Task.Time}</div></div><div class = "task-actions"><button class = "taskbtn" id = "editTask" onclick = "preEdit(${Task.uniqueId})" >EDIT</button><button class = "taskbtn" id = "delTask" onclick="deleteTask(${Task.uniqueId})">DELETE</button></div></div>`;
			}
		}
	}
	Taskdiv.innerHTML = list;
}

function showall(){
	buildTask("A");
}

function showData(dataArr){
	let Taskdiv = document.getElementById("task");
	let list = "";
	for (let idx = 0; idx < dataArr.length; idx++){
		let Task = dataArr[idx];
		let typeClass = getTypeClass(Task.Type);
		list += `<div id = "list" class ="taskRow ${typeClass}"><div>D:<div>${Task.Description}</div></div><div>A: <div>${Task.Amount}</div></div><div>C: <div>${Task.Catagory}</div></div><div>T: <div>${Task.Time}</div></div><div class = "task-actions"><button class = "taskbtn" id = "editTask" onclick = "preEdit(${Task.uniqueId})">EDIT</button><button class = "taskbtn" id = "delTask" onclick="deleteTask(${Task.uniqueId})">DELETE</button></div></div>`;
	}
	Taskdiv.innerHTML = list;
}

function delall(){
	let expdiv = document.getElementById("expnum");
	let bugdiv = document.getElementById("bugnum");
	let incdiv = document.getElementById("incnum");
	 allArr = [];
	 buildTask("A");
	 incdiv.innerText = "0";
	 bugdiv.innerText = "0";
	 expdiv.innerText = "0";
	 localStorage.setItem("expenses", JSON.stringify(allArr));
}

function preEdit(uniqueId){
	let datebox = document.getElementById("datebox");
	let amountinput = document.getElementById("amountinput");
	let incinput = document.getElementById("incinput");
	let catagory = document.getElementById("catg");
	currentEditId = uniqueId;
	for(let i = 0 ; i < allArr.length ; i++){
		let Task = allArr[i];
		if(Task.uniqueId == uniqueId){
			if(Task.Type == "expense"){
				addexpense();
			}
			else{
				addincome();
			}
			incinput.value = Task.Description;
			amountinput.value = Task.Amount;
			amountinput.disabled = true;
			catagory.value = Task.Catagory;
			datebox.value = Task.Time;
		}
	}
	submitbtn.disabled = true;
}

//used to show only expenses
function showExpense(){
	buildTask("E");
}

//used to show only incomes
function showIncome(){
	buildTask("I");
}

function editTask(){
	let datebox = document.getElementById("datebox");
	let amountinput = document.getElementById("amountinput");
	let incinput = document.getElementById("incinput");
	let description = incinput.value;
	let income = amountinput.value;
	let time = datebox.value;
	let catagory = document.getElementById("catg").value;
	if(income == ""){
			window.alert("please enter something");
			return;
		}
	for(let i = 0; i < allArr.length; i++){
		let Task = allArr[i];
		if(Task.uniqueId == currentEditId){
			Task.Description = String(description);
			Task.Time = String(time);
			Task.Catagory = String(catagory);
			localStorage.setItem("expenses", JSON.stringify(allArr));
			calculateTotals();
			}
		}

		buildTask("A");
		document.getElementById("amountinput").disabled = false;
		document.getElementById("submit").disabled = false;

		currentEditId = null;
}

// to delete individual items
function deleteTask(uniqueId){
	let expdiv = document.getElementById("expnum");
	let bugdiv = document.getElementById("bugnum");
	let incdiv = document.getElementById("incnum");
	
	let tempArr = [...allArr];

	for(let i = 0; i < tempArr.length; i++){
		let tasks = tempArr[i];
        if(tasks.uniqueId == uniqueId){
            tempArr.splice(i, 1);
            break;
        }
    }
	
    let incnum = 0;
    let expnum = 0;
    let bugnum = 0;

    for(let Task of tempArr){
        if(Task.Type == "income"){
            incnum += Number(Task.Amount);
            bugnum += Number(Task.Amount);
        }
		else {
            expnum += Number(Task.Amount);
            bugnum -= Number(Task.Amount);
        }
    }
	
	if(bugnum < 0){
        window.alert("This action will make expenses exceed your budget!");
        return;
    }
	
	allArr = tempArr;
	incdiv.innerText = incnum;
	expdiv.innerText = expnum;
	bugdiv.innerText = bugnum;

	buildTask("A");
	localStorage.setItem("expenses", JSON.stringify(allArr));
}

function calculateTotals() {
	let incdiv = document.getElementById("incnum");
	let expdiv = document.getElementById("expnum");
	let bugdiv = document.getElementById("bugnum");

	let incnum = 0;
	let expnum = 0;
	let bugnum = 0;

	for(let Task of allArr) {
		if (Task.Type === "income") {
			incnum += Number(Task.Amount);
			bugnum += Number(Task.Amount);
		} 
		else {
			expnum += Number(Task.Amount);
			bugnum -= Number(Task.Amount);
		}
	}

	incdiv.innerText = incnum;
	expdiv.innerText = expnum;
	bugdiv.innerText = bugnum;
}

function defaultDate(){
	let datebox = document.getElementById("datebox");
	let today = new Date().toISOString().split("T")[0];
    datebox.value = today;
	datebox.max = today;
	
	let amountinput = document.getElementById("amountinput").value = "";
	let incinput = document.getElementById("incinput").value = "";
	if(checkit == true){
		let catagory = document.getElementById("catg").value = "Salary";
	}
	else{
		let catagory = document.getElementById("catg").value = "Food";
	}
	document.getElementById("amountinput").disabled = false;
}

const toggleBtn = document.getElementById("theme-toggle");
let savedTheme = localStorage.getItem("theme");

if(savedTheme == "dark"){
	document.body.classList.add("dark");
	toggleBtn.checked = true;
}

toggleBtn.addEventListener("change", function(){
	if(toggleBtn.checked){
		document.body.classList.add("dark");
		localStorage.setItem("theme", "dark");
	} 
	else {
		document.body.classList.remove("dark");
		localStorage.setItem("theme", "light");
	}
});

document.getElementById("resetbtn").addEventListener("click", defaultDate);
