//----------------------------------------------------------------------------------------
//                                    COMMON ROUTINES
//	_GetIRSData		Gets the requested IRS_nnnn.json files
//	_GetCOData		Gets the requested CO_nnnn.json files
//	_IRSValue		Reads the value or array for a JSON file parameter
//	_Write_Cookie		Writes a cookie to the browser
//	_Read_Cookie		Reads a cookie from the browser
//	_SETax			Self-employment tax
//	_TaxableSS		Taxable amount of Social Security
//	_StandardDeduction	Standard Deduction amount
//	_TaxLookup		Tax table lookup
//	_CTCLookup		Child and Dependent Tax Credit
//	_EICLookup		Earned Income Credit table lookup
//	_QBICalc		Qualified Business Income deduction
//	_NIITCalc		Net Investment Income Tax
//	_ChildCare		Child Care Credit
//	_Retirement		Retirement Savings Contributions deduction
//	_EdCredit		AOC or LLC Credit
//	_IRADeduction		IRA Deduction as an income adjustment
//	_StudLoanInt		Student Loan Interest income adjustment
//----------------------------------------------------------------------------------------
//Version 2.0 - Added routines to use JSON data files

//------------------------------------------------------------
// DATE VARIABLES
//------------------------------------------------------------
var _ThisDate = new Date();
var _ThisYear = +_ThisDate.getFullYear();
var _ThisMonth = +_ThisDate.getMonth(); // 0 = January
// Show this year starting in May
var d = (_ThisMonth < 4) ? 1:0; // shift start year in May
var _StartYear = _ThisYear - 3 - d;
var _StopYear = _ThisYear - d; // overridden by individual year file
var d = (_ThisMonth < 11) ? 1:0; // start default year in December
var _DefaultYear = _ThisYear - d;

//------------------------------------------------------------
function _Write_Cookie(	// Writes a cookie
	cookie_name,	// Name of the cookie
	cookie_value,	// Cookie value
	cookie_expires	// Expires (in days)
	) {
// returns true if cookie is able to be set
//------------------------------------------------------------
	if (isNaN(cookie_expires)) cookie_expires = 365; // 1 year
	var d = new Date();
	d.setTime(d.getTime() + (cookie_expires*24*60*60*1000)); // days
	var c_name = cookie_name + "=" + cookie_value;
	var c_expire = "expires=" + d.toUTCString();

	// write the cookie
	document.cookie = c_name + ";" + c_expire + ";path=/;";

	// test the cookie
	var cookie_test = _Read_Cookie(cookie_name);
	return (cookie_test == cookie_value);
}

//------------------------------------------------------------
function _Read_Cookie(
	cookie_name	// Name of the cookie
	) {
// returns the cookie value as text
//------------------------------------------------------------
	var cookie = document.cookie;
	var cookieList = cookie.split(";");
	for (var cookieIdx = 0; cookieIdx < cookieList.length; cookieIdx++) {
		var cn = cookieList[cookieIdx];
		while (cn.charAt(0)==' ') cn = cn.substring(1);
		var cookieVar = cn.split("=");
		if (cookieVar[0] == cookie_name) return (cookieVar[1]);
	}
	return("");
}

//----------------------------------------------------------------------------------------
async function _GetIRSData(
	TY_Start, 
	TY_Stop) {
// Gets the years' IRS data requested and then runs the Main() function
// This will create an object file containing each year requested.
//----------------------------------------------------------------------------------------
  
	IRSData = {}; // Makes the files global
	for (let TY_index = +TY_Start; TY_index <= +TY_Stop; TY_index++) {
		let file = "https://cotaxaide.org/tools/Tax_Data/IRS_" + TY_index + ".json";
		let myObject = await fetch(file);
		let myText = await myObject.text();
		IRSData["TY"+TY_index] = JSON.parse(myText);
	}
	Main();
}

//----------------------------------------------------------------------------------------
async function _GetCOData(
	TY_Start, 
	TY_Stop) {
// Gets the years' IRS data requested and then runs the Main() function
// This will create an object file containing each year requested.
//----------------------------------------------------------------------------------------
  
	COData = {}; // Makes the files global
	for (let TY_index = +TY_Start; TY_index <= +TY_Stop; TY_index++) {
		let file = "https://cotaxaide.org/tools/Tax_Data/CO_" + TY_index + ".json";
		let myObject = await fetch(file);
		let myText = await myObject.text();
		COData["TY"+TY_index] = JSON.parse(myText);
	}
	Main();
}

//----------------------------------------------------------------------------------------
function _IRSValue(
	IRSParameter, 	// The path to the variable, i.e.: Standard.SNG.inc
	TaxYear = TY)	// The optional tax year for which the parameter is sought
			// TY must be defined globally to work as a default
	{
// This function prepends the tax year in TYnnnn form and appends ".value" and returns the result
//----------------------------------------------------------------------------------------
	let parms = IRSParameter.split(".");
	let TYi = "TY" + TaxYear;
	parmval = "??";
	switch (parms.length) {
	case 1:	try { if ((parmval = IRSData[TYi][parms[0]].value) !== undefined) return parmval;} catch {}
		try { if ((parmval = IRSData[TYi][parms[0]]) !== undefined) return parmval;} catch {}
		break;
	case 2:	try { if ((parmval = IRSData[TYi][parms[0]][parms[1]].value) !== undefined) return parmval;} catch {}
		try { if ((parmval = IRSData[TYi][parms[0]][parms[1]]) !== undefined) return parmval;} catch {}
		break;
	case 3:	try { if ((parmval = IRSData[TYi][parms[0]][parms[1]][parms[2]].value) !== undefined) return parmval;} catch {}
		try { if ((parmval = IRSData[TYi][parms[0]][parms[1]][parms[2]]) !== undefined) return parmval;} catch {}
		break;
	case 4:	try { if ((parmval = IRSData[TYi][parms[0]][parms[1]][parms[2]][parms[3]].value) !== undefined) return parmval;} catch {}
		try { if ((parmval = IRSData[TYi][parms[0]][parms[1]][parms[2]][parms[3]]) !== undefined) return parmval;} catch {}
		break;
	case 5:	try { if ((parmval = IRSData[TYi][parms[0]][parms[1]][parms[2]][parms[3]][parms[4]].value) !== undefined) return parmval;} catch {}
		try { if ((parmval = IRSData[TYi][parms[0]][parms[1]][parms[2]][parms[3]][parms[4]]) !== undefined) return parmval;} catch {}
		break;
	default: return "???";
	}
	
	return "??";
}

//----------------------------------------------------------------------------------------
function _COValue(
	IRSParameter, 	// The path to the variable, i.e.: Standard.SNG.inc
	TaxYear=TY)	// The optional tax year for which the parameter is sought
			// TY must be defined globally to work as a default
	{
// This function prepends the tax year in TYnnnn form and appends ".value" and returns the result
//----------------------------------------------------------------------------------------
	let parms = IRSParameter.split(".");
	let TYi = TaxYear; // Already has "TY" prepended to the year
	parmval = "??";
	switch (parms.length) {
	case 1:	try { if ((parmval = COData[TYi][parms[0]].value) !== undefined) return parmval;} catch {}
		try { if ((parmval = COData[TYi][parms[0]]) !== undefined) return parmval;} catch {}
		break;
	case 2:	try { if ((parmval = COData[TYi][parms[0]][parms[1]].value) !== undefined) return parmval;} catch {}
		try { if ((parmval = COData[TYi][parms[0]][parms[1]]) !== undefined) return parmval;} catch {}
		break;
	case 3:	try { if ((parmval = COData[TYi][parms[0]][parms[1]][parms[2]].value) !== undefined) return parmval;} catch {}
		try { if ((parmval = COData[TYi][parms[0]][parms[1]][parms[2]]) !== undefined) return parmval;} catch {}
		break;
	case 4:	try { if ((parmval = COData[TYi][parms[0]][parms[1]][parms[2]][parms[3]].value) !== undefined) return parmval;} catch {}
		try { if ((parmval = COData[TYi][parms[0]][parms[1]][parms[2]][parms[3]]) !== undefined) return parmval;} catch {}
		break;
	case 5:	try { if ((parmval = COData[TYi][parms[0]][parms[1]][parms[2]][parms[3]][parms[4]].value) !== undefined) return parmval;} catch {}
		try { if ((parmval = COData[TYi][parms[0]][parms[1]][parms[2]][parms[3]][parms[4]]) !== undefined) return parmval;} catch {}
		break;
	default: return "???";
	}
	
	return "";
}

//----------------------------------------------------------------------------------------
function _SETax (	// Self-employment tax
	taxYear,	// tax year tables to use (not currently needed but here for consistency)
	SEIncome,	// Self-employment income
	wages = 0		// Wages with SS/MC withheld (optional)
		) {
// returns an array: [self-employment tax amount, deductible amount,
// 			"SE_tax", "deductible", "medicare", "socialsecurity"]
//----------------------------------------------------------------------------------------
	if (wages === undefined) wages = 0;
	let TY = taxYear;

	SEresult = [];
	let selfamt = +SEIncome; // Schedule SE line 3
	let selfmed = 0;
	let selfsoc = 0;
	let selftax = 0;
	let selftest = selfamt * 0.9235; // Schedule SE line 4a-6

	// No SS tax if less than $400
	if (selftest > 400) {
		selflimit = Math.max(0, +_IRSValue("SETaxRates.SSWageCap", TY) - wages); // SE line 7-9
		ssrate = +_IRSValue("SETaxRates.SSRate", TY);
		selfsoc = Math.min(selftest, selflimit) * ssrate; // SE line 10
		mcrate = +_IRSValue("SETaxRates.MCRate", TY);
		selfmed = selftest * mcrate;
		selfastart = +_IRSValue("SETaxRates.AMCStart", TY);
		selfarate = +_IRSValue("SETaxRates.AMCRate", TY);
		selfamed = Math.max(0, selfamt - selfastart) * selfarate;
		selftax = selfmed + selfamed + selfsoc;
	}

	// Return results
	SEresult["SE_tax"] = SEresult[0] = Math.round(selftax);
	SEresult["deductible"] = SEresult[1] = Math.round(selftax/2);
	SEresult["medicare"] = Math.round(selfmed);
	SEresult["socialsecurity"] = Math.round(selfsoc);

	// If more than 1 employer for TP, too much SS withholding might result
	// Not enough info to calc that here however (for now)
	SEresult["excessSS"] = 0;

	return (SEresult);
}

//----------------------------------------------------------------------------------------
function _TaxableSS(	// Taxable amount of Social Security
	taxYear,	// tax year tables to use (not currently needed but here for consistency)
	filingStatus,	// SNG, MFJ, MFS, HOH, WID
	SSAmount,	// total Social Security Received
	otherIncome,	// all other income (gross - Social Security) + tax exempt interest
	adjustments,	// adjustments through IRA deduction + any write-ins (optional)
	MFStogether	// true/false if filing MFS and living together (optional)
	) {
// returns an array: [Taxable SS, IRA 0% gap, IRA 50% gap, IRA 85% gap]
// 	the IRA gaps are used to determine additional IRA contributions that can
// 	be made without increasing SS taxability to the next level
//----------------------------------------------------------------------------------------
	if (SSAmount == 0) return ([0,0,0,0]);
	if (MFStogether == "undefined") MFStogether = false;
	if (adjustments == "undefined") adjustments = 0;
	let TY = taxYear;

	let ssline1 = +SSAmount;
	let ssline2 = ssline1 * .5;
	// ssline3 included in line 5
	// ssline4 included in line 5
	let ssline5 = +otherIncome + ssline2;
	let ssline6 = +adjustments;
	let ssline7 = Math.max(0, ssline5 - ssline6);
	if ((filingStatus == "MFS") && MFStogether) {
		ssline16 = ssline7 * 0.85;
		IRAgap00 = 0;
		IRAgap50 = 0;
		IRAgap85 = 0;
	}
	else {
		if (filingStatus == "MFJ") {
			ssline8 = 32000;
			ssline10 = 12000;
		}
		else {
			ssline8 = 25000;
			ssline10 = 9000;
		}
		IRAgap00 = Math.round(Math.max(0, ssline8 - ssline7));
		ssline9 = Math.max(0, ssline7 - ssline8);
		IRAgap50 = Math.round(Math.max(0, ssline10 - ssline9));
		ssline11 = Math.max(0, ssline9 - ssline10);
		IRAgap85 = Math.round(Math.max(0, ssline1 - ssline11));
		ssline12 = Math.min(ssline9, ssline10);
		ssline13 = ssline12 * 0.5;
		ssline14 = Math.min(ssline2, ssline13);
		ssline15 = ssline11 * 0.85;
		ssline16 = ssline14 + ssline15;
	}
	let ssline17 = ssline1 * 0.85;
	let ssline18 = Math.round(Math.min(ssline16, ssline17));
	let SSresult = [ssline18, IRAgap00, IRAgap50, IRAgap85];
	return (SSresult);
}

//----------------------------------------------------------------------------------------
function _StandardDeduction( // Standard Deduction amount
	taxYear,	// tax year tables to use
	filingStatus,	// SNG, MFJ, QSS, MFS, HOH
	TP65,		// true/false
	TPBlind,	// true/false
	SP65,		// true/false
	SPBlind,	// true/false
	dependent,	// true/false (optional)
	earnedIncome	// Dependent's earned income (optional)
	) {
// Returns the standard deduction amount
//----------------------------------------------------------------------------------------
	let TY = taxYear;
	if (dependent == "undefined") {
		dependent = false;
		earnedIncome = 0;
	}
	let stdval = +_IRSValue("Standard." + filingStatus + ".Rate", TY);
	let stdinc = +_IRSValue("Standard." + filingStatus + ".Inc", TY);
	if (dependent) {
		let depval = Math.max(
				+_IRSValue("DependMin", TY),
				+earnedIncome + +_IRSValue("DependInc", TY));
		stdval = Math.min(depval, stdval);
	}
	if (TP65) stdval += stdinc;
	if (SP65) stdval += stdinc;
	if (TPBlind) stdval += stdinc;
	if (SPBlind) stdval += stdinc;
	return (Math.round(stdval));
}

//----------------------------------------------------------------------------------------
function _TaxLookup(	// Tax table lookup
	taxYear,	// tax year tables to use
	filingStatus,	// SNG, MFJ, WID, MFS, HOH, or TRUST (for kiddie tax in 2018 and 2019)
	taxableAmount,	// the amount to look up
	capitalGains,	// Sched D long term cap gains less cap losses (but not < 0) plus qual dividends
	useSchedD,	// true/false (used for recursion to allow Sched D worksheet to be skipped)
			// on initial call, always use true for useSchedD
	L06F8615	// Line 6 Form 8615 (Kiddie tax form)
	) {
// returns result array [tax amount, tax bracket]
// Note: uses the 1040 worksheet, not the Sched D worksheet so may be off for some returns
//----------------------------------------------------------------------------------------
	result = [];
	result["tax"] = 0;
	result["bracket"] = "";
	if (taxableAmount <= 0) return(result);
	if (L06F8615 == undefined) L06F8615 = 0;
	let TY = taxYear;
	let rateList = _IRSValue("TaxRates.Rate", TY);
	fs = (filingStatus == "TRUST_SNG") ? "SNG" : filingStatus; // Kiddie tax recursion call
	let bracketMax = _IRSValue("TaxRates." + fs, TY); // maximum for the rate
	let CG_rateList = _IRSValue("CGTaxRates.Rate", TY);
	let CG_bracketMax = _IRSValue("CGTaxRates." + fs, TY); // maximum for the rate

	// 1040 Qualified Dividends and Capital Gains Tax Worksheet:
	if (capitalGains && useSchedD) {
		let D01 = +taxableAmount;
		let D06 = +capitalGains;
		let D07 = Math.max(0, D01 - D06);
		let D08 = +CG_bracketMax[0] + +L06F8615;
		let D09 = Math.min(D01, D08);
		let D10 = Math.min(D07, D09);
		let D11PCT0 = Math.round(Math.max(0, D09 - D10));
		let D12 = Math.min(D01, D06);
		let D13 = D11PCT0;
		let D14 = Math.max(0, D12 - D13);
		let D15 = +CG_bracketMax[1] + +L06F8615;
		let D16 = Math.min(D01, D15);
		let D17 = D07 + D11PCT0;
		let D18 = Math.max(0, D16 - D17);
		let D19 = Math.min(D14, D18);
		let D20PCT15 = Math.round(D19 * +CG_rateList[1]);
		let D21 = D11PCT0 + D19;
		let D22 = Math.max(0, D12 - D21);
		let D23PCT20 = Math.round(D22 * +CG_rateList[2]);
		let fs = (filingStatus == "TRUST") ? "TRUST_SNG" : filingStatus;
		result = _TaxLookup(taxYear, fs, D07, 0, false);
		let D24 = +result["tax"];
		let D24b = result["bracket"];
		let D25 = D20PCT15 + D23PCT20 + D24;
		result = _TaxLookup(taxYear, fs, D01, 0, false);
		let D26 = +result["tax"];
		let D26b = result["bracket"];
		let D27 = Math.min(D25, D26);
		result["tax"] = D27;
		result["bracket"] = (D27 == D26) ? D26b : D24b ;
		return (result);
	}

	if ((filingStatus != "TRUST") && (filingStatus != "TRUST_SNG")) {
		let stepSize = 50;
		if (taxableAmount < 5) return(result);
		if (taxableAmount < 25) stepsize = 10;
		else if (taxableAmount < 3000) stepSize = 25;

		// Use tax tables if under $100,000 else just use the percentage rate
		if (taxableAmount < 100000) {
			taxableAmount = stepSize * (Math.floor(taxableAmount/stepSize) + 0.5); // adjusts AGI for table lookup
		}
	}

	let taxAmount = 0;
	let taxBracket = 0;
	let bracketTop = 100000000; //amount of $$ in the bracket

	// Walk through tax brackets and figure tax on each bracket
	while (taxableAmount > 0) {
		switch (taxBracket) {
			case 0:
				bracketTop = +bracketMax[0];
				break;
			case (rateList.size): // $ 10,000,000
				break;
			default:
				bracketTop = bracketMax[taxBracket] - bracketMax[taxBracket-1];
		}

		if (taxableAmount > bracketTop)  { // figure the tax at this bracket
			taxAmount += bracketTop * rateList[taxBracket];
			taxableAmount -= bracketTop;
			taxBracket++;
		}
		else { // this is the last bracket
			result["bracket"] = (rateList[taxBracket] * 100) + "%";
			taxAmount += taxableAmount * rateList[taxBracket];
			taxableAmount = 0;
		}
	}

	result["tax"] = Math.round(taxAmount);
	return(result);
}

//----------------------------------------------------------------------------------------
function _CTCLookup(	// Determines Child and Dependent Tax Credit
	taxYear,	// tax year tables to use
	filingStatus,	// SNG, MFJ, WID, MFS, HOH
	childDependents, // total number of children/disabled eligible for CTC
			// for 2021, the decimal indicates number under 6 (eg 3.01)
	totalDependents, // number of total dependents (including child/disabled)
	earnedIncome,	// Wages + SE income
	AGI,		// AGI
	SocSecOffset	// Withheld SS/MC from W-2s + Ded SE tax (1040 line 27)
			//	+ Unreported SS/MC tax (1040 line 58)
			//	+ "UT" amount (1040 line 62)
			//	- EIC (1040 line 66a)
			//	- Excess SS/MC (1040 line 71)
	) {
// returns an array: [CTCAmount, FTCAmount, ACTCLimit]
//----------------------------------------------------------------------------------------
	if (totalDependents == 0) return [0,0,0];
	let TY = taxYear;
	if (isNaN(SocSecOffset)
		|| (childDependents < 3)
		|| (SocSecOffset < 0)) SocSecOffset = 0;
	let CTCReduction = Math.max(0, (+AGI - +_IRSValue("CTC.AGICap." + filingStatus, TY)));
		CTCReduction = 50 * (Math.ceil(CTCReduction/1000));
	let CTCRate = +_IRSValue("CTC.Rate", TY);
	let FTCRate = +_IRSValue("CTC.FTC", TY);
	let ACTCRate = +_IRSValue("CTC.ACTC", TY);
	let ACTCThresh = +_IRSValue("CTC.ACTCThreshold", TY);

	let cD = Math.floor(+childDependents);
	let CTCAmount = CTCRate * cD;
	CTCAmount = Math.max(0, (CTCAmount - CTCReduction));
	if (taxYear == 2021) { // additional 1000 or 1300 per child
		let CTC0Rate = +_IRSValue("CTC.Age0", TY);
		let CTC6Rate = +_IRSValue("CTC.Age6", TY);
		let CTC0Reduction = Math.max(0, (+AGI - +_IRSValue("CTC.AGI0Cap." + filingStatus, TY)));
			CTC0Reduction = 50 * (Math.ceil(CTC0Reduction/1000));
		let cD0 = Math.round((childDependents - cD) * 100);
			cD0 = Math.min(cD, cD0); // Data error check
		let cD6 = Math.max(0, (cD - cD0));
		let CTC0Amount = CTC0Rate * cD0;
		let CTC6Amount = CTC6Rate * cD6;
		CTCAmount += (Math.max(0, CTC0Amount + CTC6Amount - CTC0Reduction));
		ACTCLimit = CTCAmount;
	}
	else {
		ACTCLimit = Math.max(0, 0.15 * (earnedIncome - ACTCThresh), SocSecOffset);
		childDependents = Math.floor(childDependents); // programming error protection
		ACTCLimit = Math.min(ACTCRate * +childDependents, ACTCLimit);
	}
	totalDependents = Math.floor(totalDependents); // programming error protection
	FTCAmount = FTCRate * (Math.max(0, +totalDependents - cD));
	return ([CTCAmount, FTCAmount, Math.round(ACTCLimit)]);
}

//----------------------------------------------------------------------------------------
function _EICLookup(	// Earned Income Credit table lookup
	taxYear,	// tax year tables to use
	filingStatus,	// SNG, MFJ, WID, MFS, HOH
	EICdependents,	// number of dependents eligible for EIC
	earnedIncome,	// net taxable wages + self-employment
	investedIncome,	// capital gains + dividends + interest + tax-free interest
	AGI,		// AGI
	TP65,		// true/false
	SP65		// true/false
	) {
// Returns the Earned Income Credit
//----------------------------------------------------------------------------------------

// Income is 0 or TP/SP aged 65+
	if (earnedIncome <= 0) return(0);
	if (filingStatus == "MFS") return(0);
	if (EICdependents == 0) {
		if ((filingStatus == "MFJ") && TP65 && SP65) return(0);
		else if (TP65) return(0);
	}
	let TY = taxYear;
	// Dependents limited to 3
	EICdependents = Math.min(3, +EICdependents);

	// Is income over the limit
	let vEICFiling = (filingStatus == "MFJ") ? "MFJ":"SNG";
	let vEICTable = taxYear + ":" + vEICFiling;
	let vEICLookupMax = +_IRSValue("EIC." + vEICFiling, TY)[EICdependents];
	if (earnedIncome > vEICLookupMax) return(0);

	// Investment income over the limit
	let limitEICInvest = +_IRSValue("EIC.InvestMax", TY);
	if (investedIncome > limitEICInvest) return(0);

	// Do we need to test AGI?
	let vidmax = 1;
	if (AGI != earnedIncome) {
		vEICAGIMin = +_IRSValue("EIC.AGI" + vEICFiling, TY)[EICdependents];
		if (AGI >= vEICAGIMin) vidmax = 2;
	}

	// EIC Tables are based on increments of 50 evaluated at the mid-point
	earnedIncome = (50 * Math.floor(+earnedIncome/50)) + 25;
	AGI = (50 * Math.floor(+AGI/50)) + 25;

	// Do the lookup(s) and use the minimum of the results
	let vEICRateUp = +_IRSValue("EIC.RateUp", TY)[EICdependents];
	let vEICRateDown = +_IRSValue("EIC.RateDown", TY)[EICdependents];
	for (vid = 0; vid < vidmax; vid++) {
		testAmount = (vid == 0) ? earnedIncome : AGI;
		vEICUp = testAmount * vEICRateUp;
		vEICMax = +_IRSValue("EIC.Maximum", TY)[EICdependents];
		vEICDown = (vEICLookupMax - testAmount) * vEICRateDown;

		// Find the minimum of the three, not less than 0, and round
		EICResult = Math.round(Math.max(0,Math.min(vEICUp, vEICMax, vEICDown)));

		// Find the minumum of the two test results
		EICAmount = (vid == 0) ? EICResult : Math.min(EICAmount, EICResult);
	}
	return (EICAmount);
}

//----------------------------------------------------------------------------------------
function _QBICalc (	// Qualified Business Income deduction
	taxYear,	// tax year tables to use
	filingStatus,	// SNG, MFJ, WID, MFS, HOH
	SEIncome,	// Self-employment income less s-e adjustments
	nonTaxCG,	// Qualified dividends + capital gains
	QBIDividends,	// Section 166A dividends
	income		// Taxable income amount (before QBI deduction)
	) {
// Returns the QBI Deduction
// Returns -1 if above the first threshhold
//----------------------------------------------------------------------------------------
	let TY = taxYear;
	let QBIMax = +_IRSValue("QBI.Limit." + filingStatus, TY);
	if ((+income > +QBIMax) && (+QBIDividends + +SEIncome > 0)) return -1;
	let QBIRate = +_IRSValue("QBI.Rate", TY);
	let QBI05 = Math.round(Math.max(0, +SEIncome) * QBIRate);
	let QBI09 = Math.round(Math.max(0, +QBIDividends) * QBIRate);
	let QBI10 = QBI05 + QBI09;
	let QBI11 = +income;
	let QBI12 = Math.max(0, +nonTaxCG); // qualified dividends and capital gains
	let QBI13 = Math.max(0, QBI11 - QBI12);
	let QBI14 = Math.round(QBI13 * QBIRate);
	let QBIDeduction = Math.min(QBI10, QBI14); // line 15
	return QBIDeduction;
}

//----------------------------------------------------------------------------------------
function _NIITCalc (	// Net Investment Income Tax calculation
	taxYear,	// tax year tables to use
	filingStatus,	// SNG, MFJ, WID, MFS, HOH
	AGI,		// AGI
	interest,	// Taxable interest income
	dividends,	// Gross dividend income
	capGains,	// Taxable Capital gains income
	expenses	// Investment expenses
		) {
// returns NIIT amount
// Form 8960 line numbers
//----------------------------------------------------------------------------------------
	let TY = taxYear;
	let NIIT_income = Math.max(0, +interest + +dividends + +capGains - +expenses); // line 8
	let NIIT_limit = Math.max(0, AGI - +_IRSValue("NIIT." + filingStatus, TY)); // line 15
	let NIIT_amount = Math.min(NIIT_income, NIIT_limit); // line 16
	let NIIT_rate = +_IRSValue("NIIT.Rate", TY);
	let NIIT_tax = Math.round(NIIT_amount * NIIT_rate); // line 17
	return NIIT_tax;
}

//----------------------------------------------------------------------------------------
function _ChildCare (	// Form 2441
	taxYear,	// tax year tables to use
	filingStatus,	// SNG, MFJ, WID, MFS, HOH
	earnedIncome,	// Enter lowest income of TP or SP if MFJ unless student or disabled
	AGI,		// AGI
	children,	// the number of dependent children that received care
	amountPaid	// max $3000 for 1, $6000 for 2 or more limited to lowest TP/SP earned income
		) {
// Returns Result["percent", "deductible"].
// Form 2441 line numbers
//----------------------------------------------------------------------------------------
	let TY = taxYear;
	Result = [];

	// Get data for the year
	RateMin =  _IRSValue("Care.RateMin", TY);
	RateMax =  _IRSValue("Care.RateMax", TY);
	AGICap =   _IRSValue("Care.AGICap", TY);
	AGICap2 =  _IRSValue("Care.AGICap2", TY);
	PerChild = _IRSValue("Care.PerChild", TY);

	// Limit amountPaid by lowest earned income
	line3 = Math.min(amountPaid, PerChild * Math.min(children, 2));
	line6 = Math.min(line3, +earnedIncome);
	
	rateReduction = Math.ceil(Math.max(0, (AGI - AGICap) / 2000)) / 100;
	line8 = Math.max(RateMin, RateMax - rateReduction);
	if (TY == 2021) {
		rateReduction = Math.min(Math.max(0, (AGI - 400000) / 2000)) / 100;
		line8 = Math.max(0, line8 - rateReduction);
	}
	line9 = line6 * line8;

	Result["percent"] = line8;
	Result["deductible"] = line9;
	return (Result);
}

//----------------------------------------------------------------------------------------
function _Retirement (	// Form 8880
	taxYear,	// tax year tables to use
	filingStatus,	// SNG, MFJ, WID, MFS, HOH
	AGI,		// AGI
	TPcontribution,	// Voluntary to traditional IRA/Roth IRA/ABLE/401K
	SPcontribution	// Voluntary to traditional IRA/Roth IRA/ABLE/401K
		) {
// Form 8880 line numbers
// No test for age<16, dependent or student
// No test for distributions from 4 prior years
//----------------------------------------------------------------------------------------
	let TY = taxYear;

	let rates = _IRSValue("Retire.Rate", TY);
	let ratelimits = _IRSValue("Retire." + filingStatus, TY);
	let line6a = Math.min(2000, +TPcontribution);
	let line6b = Math.min(2000, +SPcontribution);
	let line7 = Math.max(0, (line6a + line6b));
	let i = 0; 
	while ((+rates[i] > 0) && (+AGI > +ratelimits[i])) i++;
	return (line7 * rates[i]);
}

//----------------------------------------------------------------------------------------
function _EdCredit (	// Form 8863
	taxYear,	// tax year tables to use
	filingStatus,	// SNG, MFJ, WID, MFS, HOH
	AGI,		// AGI
	etype,		// AOC, LLC, TNF
	expenses	// Education expenses
		) {
// does not test for eligibility (dependent, claimed, kiddie tax, etc)
// returns array	[0] = nonrefundable credit
// 			[1] = refundable credit
//----------------------------------------------------------------------------------------
	result = [];
	if (filingStatus == "MFS") return[0, 0];
	let TY = taxYear;

	let limitMax = _IRSValue("Education." + etype + ".MAX0", TY);
	expenses = Math.min(limitMax, expenses);

	// Limit expenses
	switch (etype) {
		case "AOC":
			limit = expenses;
			if (limit > 2000) limit = 2000 + ((limit - 2000) * 0.25);
			break;
		case "LLC":
			limit = 0.2 * expenses;
			break;
		default:
			limit = 0;
	}

	// Modify amount if limited by AGI
	var AGIfactor = 1;
	switch (filingStatus) {
		case "MFJ":
			limit1 = _IRSValue("Education." + etype + ".MFJ1", TY);
			limit2 = _IRSValue("Education." + etype + ".MFJ2", TY);
			break;
		default:
			limit1 = _IRSValue("Education." + etype + ".SNG1", TY);
			limit2 = _IRSValue("Education." + etype + ".SNG2", TY);
	}
	if (+AGI >= +limit1) AGIfactor = Math.max(0, (+limit2 - +AGI) / (+limit2 - +limit1));

	// Determine refundable vs nonrefundable amounts
	result[1] = 0; // refundable part
	result[0] = Math.round(AGIfactor * limit); // nonrefundable part
	if (etype === "LLC") return(result);

	// AOC:
	result[1] = Math.round(0.4 * result[0]); // refundable part
	result[0] -= result[1]; // nonrefundable part
	return(result);
}


//----------------------------------------------------------------------------------------
function _IRADeduction (// IRA Deduction worksheet from Form 1040
	taxYear,	// tax year tables to use
	filingStatus,	// SNG, MFJ, WID, MFS, HOH
	MAGI,		// AGI less IRA deduction
	earned,		// Wages + (SE Income - SE Tax Ded - SESEP) + Alimony + nontaxable combat pay
	TP_RetPlan,	// T/F, TP has Retirement Plan
	TP_50,		// T/F, TP is 50+
	SP_RetPlan,	// T/F, SP has Retirement Plan
	SP_50,		// T/F, SP is 50+
	MFStogether	// T/F, filing MFS and living together (optional)
		) {
// returns array	["TPdeductible", "SPdeductible", "TPcontribMax", "SPcontribMax", "comment"]
//----------------------------------------------------------------------------------------
	if ((filingStatus !== "MFS") || (MFStogether === undefined)) MFStogether = false;
	if ((filingStatus == "MFS") && (! MFStogether)) filingStatus = "SNG";
	Result = [];
	Result["comment"] = "";
	let TY = taxYear;

	TP_DedMax = (TP_50) ? +_IRSValue("IRA.SrMaximum", TY) : +_IRSValue("IRA.Maximum", TY);
	SP_DedMax = (SP_50) ? +_IRSValue("IRA.SrMaximum", TY) : +_IRSValue("IRA.Maximum", TY);
	MFJ_DedMax = TP_DedMax + SP_DedMax;
	Result["TPcontribMax"] = Math.min(TP_DedMax, +earned);
	Result["SPcontribMax"] = Math.min(SP_DedMax, +earned);

	if (TP_RetPlan || SP_RetPlan) { // deduction may be limited

		// line 2 (TP_AGIlimit, SP_AGIlimit)
		switch (filingStatus) {
		case "MFJ":
			TPPlan = (TP_RetPlan) ? "MFJRetPlan" : "MFJNoRetPlan" ;
			TP_AGIlimit = +_IRSValue("IRA." + TPPlan, TY);
			SPPlan = (SP_RetPlan) ? "MFJRetPlan" : "MFJNoRetPlan" ;
			SP_AGIlimit = +_IRSValue("IRA." + SPPlan, TY);
			break;
		default:
			TP_AGIlimit = +_IRSValue("IRA." + filingStatus, TY);
			if (MFStogether) TP_AGIlimit = 10000;
			SP_AGIlimit = 0;
		}

		// lines 3 - 5 are MAGI

		// line 6 NO
		if ((+MAGI >= TP_AGIlimit) && (+MAGI >= SP_AGIlimit)) {
			Result["TPdeductible"] = 0;
			Result["SPdeductible"] = 0;
			Result["comment"] = "AGI too high";
			return (Result);
		}

		// line 6 YES and 7
		retlimit = 0;
		multiplier = 0;
		switch (filingStatus) {
		case "MFJ":
			SP_AGIlimit -= +MAGI;
			retlimit = (SP_RetPlan) ? 20000 : 10000 ;
			if (SP_AGIlimit < retlimit) {
				multiplier = (SP_50) ? 0.35 : 0.3 ;
				multiplier *= (SP_RetPlan) ? 1 : 2 ;
				SP_DedMax = Math.ceil(SP_AGIlimit * multiplier / 10) * 10;
				SP_DedMax = Math.max(SP_DedMax, 200);
			}
			// no break
		case "WID":
		case "QSS": // and MFJ
			TP_AGIlimit -= +MAGI;
			retlimit = (TP_RetPlan) ? 20000 : 10000 ;
			if (TP_AGIlimit < retlimit) {
				multiplier = (TP_50) ? 0.35 : 0.3 ;
				multiplier *= (TP_RetPlan) ? 1 : 2 ;
				TP_DedMax = Math.ceil(TP_AGIlimit * multiplier / 10) * 10;
				TP_DedMax = Math.max(TP_DedMax, 200);
			}
			break;
		default: // SNG, HOH, MFS
			TP_AGIlimit -= +MAGI;
			if (TP_AGIlimit < 10000) {
				TP_DedMax = TP_AGIlimit;
				multiplier = (TP_50) ? 0.7 : 0.6 ;
				TP_DedMax = Math.ceil(TP_AGIlimit * multiplier / 10) * 10;
				TP_DedMax = Math.max(TP_DedMax, 200);
			}
		}

	}

	// Line 8 - 10 is earned
	// Line 11 (Pub 590-A Worksheet 1-2)
	if ((filingStatus === "MFJ") && ((TP_DedMax + SP_DedMax) < MFJ_DedMax)) {
		// May need to figure based on TP/SP earned incomes
		// Result["comment"] = "May not be accurate";
	}

	// Line 12
	Result["TPdeductible"] = TP_DedMax;
	Result["SPdeductible"] = SP_DedMax;
	return (Result);
}

//----------------------------------------------------------------------------------------
function _StudLoanInt (	// 1040 Sched 1
	taxYear,	// tax year tables to use
	filingStatus,	// SNG, MFJ, WID, MFS, HOH
	MAGI,		// AGI without Student Loan Interest deduction
	IntPaid		// Student Loan Interest Paid
		) {
//	Returns an array ["deductible", "percent"]
//----------------------------------------------------------------------------------------
	Result = [];
	TY = taxYear;

	// Not allowed if MFS
	if (filingStatus == "MFS") {
		Result["deductible"] = 0;
		return Result;
	}
	
	// Get MAGI where phaseout starts
	// Assumes MFJ rate is twice SNG rate
	let fsFactor = (filingStatus == "MFJ") ? 2 : 1 ;
	let SLIMax = +_IRSValue("StudLoanInterest.Maximum", TY) * fsFactor
	let PhaseOutStart = +_IRSValue("StudLoanInterest.SNG1", TY) * fsFactor
	let PhaseOutEnd = +_IRSValue("StudLoanInterest.SNG2", TY) * fsFactor
	let PhaseOutLength = PhaseOutEnd - PhaseOutStart;
	Result["percent"] = Math.min(1, Math.max(0, +MAGI - PhaseOutStart) / PhaseOutLength);
	IntPaid = Math.min(SLIMax, +IntPaid);
	Result["deductible"] = Math.round(+IntPaid - (IntPaid * Result["percent"]));
	return (Result);
}
