//----------------------------------------------------------------------------------------
//                                    COMMON ROUTINES
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
//
// Version 1.15 7/24/2022
// 	Changed return from _TaxLookup() to an array and added bracket
// 	Limited CTC expansion to just 2021 and corrected start to > than 400,000
// Version 1.14 10/24/2021
// 	Added excess Social Security
// Version 1.13 10/13/2021
// 	Corrected percent for student loan interest reduction
// Version 1.12 7/27/2021
// 	TNF not returning 0 if filing MFS
// Version 1.11 7/18/2021
// 	Fixed CTC additional 1K not being reduced after 150000
// 	Added TNF to _EdCredit
// Version 1.10 7/9/2021
// 	Added 2021 rates to _ChildCare
// 	Fixed problem where MFJ had 0 for spouse income
// Version 1.09 7/6/2021
// 	Added a totalDependent count check to _CTCLookup
// 	Prevent returning a negative CTC amount
// Version 1.08 12/19/2020
// 	Added IRA Deduction
// Version 1.07 7/18/2020
// 	Dependent deduction not incrementing for age 65 or blind
// Version 1.06 2/10/2020
//	Prevent Child Care Credit from returning a negative amount
// Version 1.05 12/5/2019
// 	Realigned line number for calc in Sched D CG worksheet
// 	Corrected Trust calculation for Kiddie tax
// Version 1.04 3/29/2019
// 	Added ChildCare, Retirement and EdCredit
// Version 1.03 3/29/2019
// 	Added NIITCalc
// Version 1.02 2/3/2019
// 	Correction to MFS and living with spouse - did not use 1/2 Soc Sec
// Version 1.01 12/7/2018
// 	Correction to QBI calculation to not show OOS if no SE or 199A

//----------------------------------------------------------------------------------------
function _SETax (	// Self-employment tax
	taxYear,	// tax year tables to use (not currently needed but here for consistency)
	SEIncome,	// Self-employment income
	wages		// Wages with SS/MC withheld (optional)
		) {
// returns an array: [self-employment tax amount, deductible amount,
// 			"SE_tax", "deductible", "medicare", "socialsecurity", "excessSS"]
//----------------------------------------------------------------------------------------
	if (wages === undefined) wages = 0;
	wagessoc = (Math.min(wages, +_SEMaxWages[TaxYear.value]) * +_SESocSec[TaxYear.value]);

	SEresult = [];
	var selfamt = +SEIncome;
	var selfmed = 0;
	var selfsoc = 0;
	var selftax = 0;
	var selftest = selfamt * 0.9235;

	// No tax if less than $400
	if (selftest > 400) {
		selfmed = selftest * +_SEMedicare[TaxYear.value];
		selfsoc = (Math.min(selftest, +_SEMaxWages[TaxYear.value]) * +_SESocSec[TaxYear.value]);
		selftax = selfmed + selfsoc;
	}

	// Deductible amount
	SEresult["SE_tax"] = SEresult[0] = Math.round(selftax);
	SEresult["deductible"] = SEresult[1] = Math.round(selftax/2);
	SEresult["medicare"] = Math.round(selfmed);
	SEresult["socialsecurity"] = Math.round(selfsoc);

	// Is there excess SS withholding?
	totalsoc = selfsoc + wagessoc;
	maxsoc = +_SEMaxWages[TaxYear.value] * +_SESocSec[TaxYear.value];
	SEresult["excessSS"] = Math.round(Math.max(0, totalsoc - maxsoc));

	return (SEresult);
}

//----------------------------------------------------------------------------------------
function _TaxableSS(	// Taxable amount of Social Security
	taxYear,	// tax year tables to use (not currently needed but here for consistency)
	filingStatus,	// SNG, MFJ, MFS, HOH, WID
	SSAmount,	// total Social Security received
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

	var ssline1 = +SSAmount;
	var ssline2 = ssline1 * .5;
	// ssline3 included in line 5
	// ssline4 included in line 5
	var ssline5 = +otherIncome + ssline2;
	var ssline6 = +adjustments;
	var ssline7 = Math.max(0, ssline5 - ssline6);
	if (MFStogether) {
		var ssline16 = ssline7 * 0.85;
		var IRAgap00 = 0;
		var IRAgap50 = 0;
		var IRAgap85 = 0;
	}
	else {
		if (filingStatus == "MFJ") {
			var ssline8 = 32000;
			var ssline10 = 12000;
		}
		else {
			var ssline8 = 25000;
			var ssline10 = 9000;
		}
		var IRAgap00 = Math.round(Math.max(0, ssline8 - ssline7));
		var ssline9 = Math.max(0, ssline7 - ssline8);
		var IRAgap50 = Math.round(Math.max(0, ssline10 - ssline9));
		var ssline11 = Math.max(0, ssline9 - ssline10);
		var IRAgap85 = Math.round(Math.max(0, ssline1 - ssline11));
		var ssline12 = Math.min(ssline9, ssline10);
		var ssline13 = ssline12 * 0.5;
		var ssline14 = Math.min(ssline2, ssline13);
		var ssline15 = ssline11 * 0.85;
		var ssline16 = ssline14 + ssline15;
	}
	var ssline17 = ssline1 * 0.85;
	var ssline18 = Math.round(Math.min(ssline16, ssline17));
	var SSresult = [ssline18, IRAgap00, IRAgap50, IRAgap85];
	return (SSresult);
}

//----------------------------------------------------------------------------------------
function _StandardDeduction( // Standard Deduction amount
	taxYear,	// tax year tables to use
	filingStatus,	// SNG, MFJ, WID, MFS, HOH
	TP65,		// true/false
	TPBlind,	// true/false
	SP65,		// true/false
	SPBlind,	// true/false
	dependent,	// true/false (optional)
	earnedIncome	// Dependent's earned income (optional)
	) {
// Returns the standard deduction amount
//----------------------------------------------------------------------------------------
	if (dependent == "undefined") {
		dependent = false;
		earnedIncome = 0;
	}
	var taxdata = _Standard[taxYear].split(",");
	var stdval = +taxdata[_Standard[filingStatus]];
	var stdinc = +taxdata[+_Standard[filingStatus] + 1];
	if (dependent) {
		var depval = Math.max(
				+taxdata[_Standard["Minimum"]],
				+earnedIncome + 350);
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
	filingStatus,	// SNG, MFJ, WID, MFS, HOH, or TRUST (for kiddie tax starting in 2018)
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
	var rateList = _TaxRates[taxYear + ":PCT"].split(",");
	fs = (filingStatus == "TRUST_SNG") ? "SNG" : filingStatus; // Kiddie tax recursion call
	var bracketMax = _TaxRates[taxYear + ":" + fs].split(","); // maximum for the rate
	var CG_rateList = _CGRates[taxYear + ":PCT"].split(",");
	var CG_bracketMax = _CGRates[taxYear + ":" + fs].split(","); // maximum for the rate

	// 1040 Qualified Dividends and Capital Gains Tax Worksheet:
	if (capitalGains && useSchedD) {
		var D01 = +taxableAmount;
		var D06 = +capitalGains;
		var D07 = Math.max(0, D01 - D06);
		var D08 = +CG_bracketMax[0] + +L06F8615;
		var D09 = Math.min(D01, D08);
		var D10 = Math.min(D07, D09);
		var D11PCT0 = Math.round(Math.max(0, D09 - D10));
		var D12 = Math.min(D01, D06);
		var D13 = D11PCT0;
		var D14 = Math.max(0, D12 - D13);
		var D15 = +CG_bracketMax[1] + +L06F8615;
		var D16 = Math.min(D01, D15);
		var D17 = D07 + D11PCT0;
		var D18 = Math.max(0, D16 - D17);
		var D19 = Math.min(D14, D18);
		var D20PCT15 = Math.round(D19 * +CG_rateList[1]);
		var D21 = D11PCT0 + D19;
		var D22 = Math.max(0, D12 - D21);
		var D23PCT20 = Math.round(D22 * +CG_rateList[2]);
		var fs = (filingStatus == "TRUST") ? "TRUST_SNG" : filingStatus;
		result = _TaxLookup(taxYear, fs, D07, 0, false);
		var D24 = +result["tax"];
		var D24b = result["bracket"];
		var D25 = D20PCT15 + D23PCT20 + D24;
		result = _TaxLookup(taxYear, fs, D01, 0, false);
		var D26 = +result["tax"];
		var D26b = result["bracket"];
		var D27 = Math.min(D25, D26);
		result["tax"] = D27;
		result["bracket"] = (D27 == D26) ? D26b : D24b ;
		return (result);
	}

	if ((filingStatus != "TRUST") && (filingStatus != "TRUST_SNG")) {
		var stepSize = 50;
		if (taxableAmount < 5) return(0);
		if (taxableAmount < 25) stepsize = 10;
		else if (taxableAmount < 3000) stepSize = 25;

		// Use tax tables if under $100,000 else just use the percentage rate
		if (taxableAmount < 100000) {
			taxableAmount = stepSize * (Math.floor(taxableAmount/stepSize) + 0.5); // adjusts AGI for table lookup
		}
	}

	var taxAmount = 0;
	var taxBracket = 0;
	var bracketTop = 100000000; //amount of $$ in the bracket

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
	if (isNaN(SocSecOffset)
		|| (childDependents < 3)
		|| (SocSecOffset < 0)) SocSecOffset = 0;
	var CTCLimit = _CTCLimits[taxYear + ":AGICap"].split(",");
	var CTCReduction = Math.max(0, (+AGI - +CTCLimit[+_CTCLimits[filingStatus]]));
		CTCReduction = 50 * (Math.ceil(CTCReduction/1000));
	var CTCRate = _CTCLimits[taxYear + ":CTCRate"];
	var FTCRate = _CTCLimits[taxYear + ":FTCRate"];
	var ACTCRate = _CTCLimits[taxYear + ":ACTCRate"];
	var ACTCThresh = _CTCLimits[taxYear + ":ACTCThreshold"];

	var cD = Math.floor(+childDependents);
	var CTCAmount = CTCRate * cD;
	var CTCAmount = Math.max(0, (CTCAmount - CTCReduction));
	if (taxYear == 2021) { // additional 1000 or 1300 per child
		var CTC0Rate = _CTCLimits[taxYear + ":CTC0Rate"];
		var CTC6Rate = _CTCLimits[taxYear + ":CTC6Rate"];
		var CTC0Limit = _CTCLimits[taxYear + ":AGI0Cap"].split(",");
		var CTC0Reduction = Math.max(0, (+AGI - +CTC0Limit[+_CTCLimits[filingStatus]]));
			CTC0Reduction = 50 * (Math.ceil(CTC0Reduction/1000));
		var cD0 = Math.round((childDependents - cD) * 100);
			cD0 = Math.min(cD, cD0); // Data error check
		var cD6 = Math.max(0, (cD - cD0));
		var CTC0Amount = CTC0Rate * cD0;
		var CTC6Amount = CTC6Rate * cD6;
		CTCAmount += (Math.max(0, CTC0Amount + CTC6Amount - CTC0Reduction));
		ACTCLimit = CTCAmount;
	}
	else {
		var ACTCLimit = Math.max(0, 0.15 * (earnedIncome - ACTCThresh), SocSecOffset);
		childDependents = Math.floor(childDependents); // programming error protection
		ACTCLimit = Math.min(ACTCRate * +childDependents, ACTCLimit);
	}
	totalDependents = Math.floor(totalDependents); // programming error protection
	var FTCAmount = FTCRate * (Math.max(0, +totalDependents - cD));
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
	// Dependents limited to 3
	EICdependents = Math.min(3, +EICdependents);

	// Is income over the limit
	var vEICFiling = (filingStatus == "MFJ") ? "MFJ":"SNG";
	var vEICTable = taxYear + ":" + vEICFiling;
	var vEICLookupMax = +_EICRates[vEICTable].split(",")[EICdependents];
	if (earnedIncome > vEICLookupMax) return(0);

	// Investment income over the limit
	var limitEICInvest = +_EICRates[taxYear + ":INVEST"];
	if (investedIncome > limitEICInvest) return(0);

	// Do we need to test AGI?
	var vidmax = 1;
	if (AGI != earnedIncome) {
		vEICTable = taxYear + ":AGI" + vEICFiling;
		var vEICAGIMin = +_EICRates[vEICTable].split(",")[EICdependents];
		if (AGI >= vEICAGIMin) vidmax = 2;
	}

	// EIC Tables are based on increments of 50 evaluated at the mid-point
	earnedIncome = (50 * Math.floor(+earnedIncome/50)) + 25;
	AGI = (50 * Math.floor(+AGI/50)) + 25;

	// Do the lookup(s) and use the minimum of the results
	var vEICRateUp = +_EICRates[taxYear + ":RATEUP"].split(",")[EICdependents];
	var vEICRateDown = +_EICRates[taxYear + ":RATEDOWN"].split(",")[EICdependents];
	for (var vid = 0; vid < vidmax; vid++) {
		var testAmount = (vid == 0) ? earnedIncome : AGI;
		var vEICUp = testAmount * vEICRateUp;
		var vEICMax = +_EICRates[taxYear + ":MAX"].split(",")[EICdependents];
		var vEICDown = (vEICLookupMax - testAmount) * vEICRateDown;

		// Find the minimum of the three, not less than 0, and round
		var EICResult = Math.round(Math.max(0,Math.min(vEICUp, vEICMax, vEICDown)));

		// Find the minumum of the two test results
		var EICAmount = (vid == 0) ? EICResult : Math.min(EICAmount, EICResult);
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
	var QBIMax = +_QBILimits[taxYear + ":" + filingStatus];
	if ((+income > +QBIMax) && (+QBIDividends + +SEIncome > 0)) return -1;
	var QBIRate = +_QBILimits[taxYear + ":Rate"];
	var QBI05 = Math.round(Math.max(0, +SEIncome) * QBIRate);
	var QBI09 = Math.round(Math.max(0, +QBIDividends) * QBIRate);
	var QBI10 = QBI05 + QBI09;
	var QBI11 = +income;
	var QBI12 = Math.max(0, +nonTaxCG); // qualified dividends and capital gains
	var QBI13 = Math.max(0, QBI11 - QBI12);
	var QBI14 = Math.round(QBI13 * QBIRate);
	var QBIDeduction = Math.min(QBI10, QBI14); // line 15
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
	var NIIT_income = Math.max(0, +interest + +dividends + +capGains - +expenses); // line 8
	var NIIT_limit = Math.max(0, AGI - +_NIITLimits[taxYear + ":" + filingStatus]); // line 15
	var NIIT_amount = Math.min(NIIT_income, NIIT_limit); // line 16
	var NIIT_rate = +_NIITLimits[taxYear + ":Rate"];
	var NIIT_tax = Math.round(NIIT_amount * NIIT_rate); // line 17
	return NIIT_tax;
}

//----------------------------------------------------------------------------------------
function _ChildCare (	// Form 2441
	taxYear,	// tax year tables to use
	filingStatus,	// SNG, MFJ, WID, MFS, HOH
	AGI,		// AGI
	amountPaid,	// max $3000 for 1, $6000 for 2 or more limited to lowest TP/SP earned income
	TPEarnedIncome,	// 
	SPEarnedIncome	// 
		) {
// Form 2441 line numbers
//----------------------------------------------------------------------------------------
	
	if (filingStatus === "MFJ") {
		if (+SPEarnedIncome == 0) { // Don't know SP earned income
			line6 = Math.min(+amountPaid, +TPEarnedIncome + +SPEarnedIncome);
		}
		else { // Limit amountPaid by losest earned income
			line6 = Math.min(+amountPaid, +TPEarnedIncome, +SPEarnedIncome);
		}
	}
	else { // SNG, HOH, MFS, WID
		line6 = Math.min(+amountPaid, +TPEarnedIncome);
	}
	var RateMin = _CareLimits[taxYear + ":RateMin"];
	var RateMax = _CareLimits[taxYear + ":RateMax"];
	var AGICap = _CareLimits[taxYear + ":AGICap"];
	var AGICap2 = _CareLimits[taxYear + ":AGICap2"];
	var RateReduction = Math.ceil(Math.max(0, (AGI - AGICap)/2000));
	if (+taxYear == 2021) {
		if (AGI > 400000) {
			RateReduction = Math.ceil(Math.max(0, (AGI - AGICap2)/2000));
			RateMax = RateMin;
			RateMin = 0;
		}
	}
	var line8 = (RateMax - (Math.min(RateReduction, (RateMax - RateMin)))) / 100; // rate
	return Math.max(0, line6 * line8);
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
	var rates = _RETIRE[taxYear + ":Rate"].split(",");
	var ratelimits = _RETIRE[taxYear + ":" + filingStatus].split(",");
	var line6a = Math.min(2000, +TPcontribution);
	var line6b = Math.min(2000, +SPcontribution);
	var line7 = Math.max(0, (line6a + line6b));
	var i = 0; 
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
	var result = [];
	if (filingStatus == "MFS") return[0, 0];

	var limits = _EdExpenseLimits[taxYear + ":" + etype].split(",");
	expenses = Math.min(limits[0], expenses);
	switch (etype) {
		case "AOC":
			limit = expenses;
			if (limit > 2000) limit = 2000 + ((limit - 2000) * 0.25);
			break;
		case "LLC":
			limit = 0.2 * expenses;
			break;
		case "TNF":
			limit = expenses;
			AGIfactor = (filingStatus === "MFJ") ? 2 : 1 ;
			if (+AGI > (limits[1] * AGIfactor)) limit = Math.min(expenses, limits[2]);
			if (+AGI > (limits[3] * AGIfactor)) return [0, 0];
			return [limit, 0];
			break;
		default:
			limit = 0;
	}
	var AGIfactor = 1;

	// Modify amount if limited by AGI
	switch (filingStatus) {
		case "MFJ":
			if (+AGI >= +limits[3]) AGIfactor = Math.max(0, (+limits[4] - +AGI) / (+limits[4] - +limits[3]));
			break;
		default:
			if (+AGI >= +limits[1]) AGIfactor = Math.max(0, (+limits[2] - +AGI) / (+limits[2] - +limits[1]));
	}

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
	var Result = [];
	Result["comment"] = "";

	TP_DedMax = (TP_50) ? _IRALimits[taxYear + ":SRMAX"] : _IRALimits[taxYear + ":MAX"] ;
	SP_DedMax = (SP_50) ? _IRALimits[taxYear + ":SRMAX"] : _IRALimits[taxYear + ":MAX"] ;
	MFJ_DedMax = TP_DedMax + SP_DedMax;
	Result["TPcontribMax"] = Math.min(TP_DedMax, +earned);
	Result["SPcontribMax"] = Math.min(SP_DedMax, +earned);

	if (TP_RetPlan || SP_RetPlan) { // deduction may be limited

		// line 2 (TP_AGIlimit, SP_AGIlimit)
		switch (filingStatus) {
		case "MFJ":
			MFJ_AGIlimits = _IRALimits[taxYear + ":" + filingStatus].split(",");
			TP_AGIlimit = +MFJ_AGIlimits[((TP_RetPlan) ? 0 : 1)];
			SP_AGIlimit = +MFJ_AGIlimits[((SP_RetPlan) ? 0 : 1)];
			break;
		default:
			TP_AGIlimit = +_IRALimits[taxYear + ":" + filingStatus];
			SP_AGIlimit = 0;
			if (MFStogether) TP_AGIlimit = 10000;
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
		var retlimit = 0;
		var multiplier = 0;
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
		case "WID": // and MFJ
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
	var Result = [];

	// Not allowed if MFS
	if (filingStatus == "MFS") {
		Result["amount"] = 0;
		return Result;
	}
	
	// Get MAGI where phaseout starts
	var EdIntRates = _EdExpenseLimits[taxYear + ":INT"].split(",");
	var SLIMax = +EdIntRates[0] * ((filingStatus == "MFJ") ? 2 : 1 );
	var PhaseOutIndex = +_EdExpenseLimits["SNG"];
	var PhaseOutStart = +EdIntRates[PhaseOutIndex] * ((filingStatus == "MFJ") ? 2 : 1 );
	var PhaseOutEnd = +EdIntRates[PhaseOutIndex + 1] * ((filingStatus == "MFJ") ? 2 : 1 );
	var PhaseOutLength = PhaseOutEnd - PhaseOutStart;
	Result["percent"] = Math.min(1, Math.max(0, +MAGI - PhaseOutStart) / PhaseOutLength);
	var IntPaid = Math.min(SLIMax, +IntPaid);
	Result["deductible"] = Math.round(+IntPaid - (IntPaid * Result["percent"]));
	return (Result);
}
