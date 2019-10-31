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
//----------------------------------------------------------------------------------------
//
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
	SEIncome	// Self-employment income
		) {
// returns an array: [self-employment tax amount, deductible amount]
//----------------------------------------------------------------------------------------

	var selfamt = +SEIncome;
	var selftax = 0;
	var selftest = selfamt * 0.9235;

	// No tax if less than $400
	if (selftest > 400) {
		selftax = selftest * +_SEMedicare[TaxYear.value];
		selftax += (Math.min(selftest, +_SEMaxWages[TaxYear.value]) * +_SESocSec[TaxYear.value]);
	}

	// Deductible amount
	var deductible = Math.round(selftax/2);
	var SEresult = [Math.round(selftax), deductible];

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
	// if ((SSAmount == 0) || (otherIncome == 0)) return (0);
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
	if (dependent && (filingStatus != "MFJ")) {
		var depval = Math.max(
				+taxdata[_Standard["Minimum"]],
				+earnedIncome + 350);
		stdval = Math.min(depval, stdval);
	}
	else {
		var stdinc = +taxdata[_Standard[filingStatus]+1];
		if (TP65) stdval += stdinc;
		if (SP65) stdval += stdinc;
		if (TPBlind) stdval += stdinc;
		if (SPBlind) stdval += stdinc;
	}
	return (Math.round(stdval));
}

//----------------------------------------------------------------------------------------
function _TaxLookup(	// Tax table lookup
	taxYear,	// tax year tables to use
	filingStatus,	// SNG, MFJ, WID, MFS, HOH, or TRUST (for kiddie tax starting in 2018)
	taxableAmount,	// the amount to look up
	capitalGains,	// Sched D long term cap gains less cap losses (but not < 0) plus qual dividends
	useSchedD	// true/false (used for recursion to allow Sched D worksheet to be skipped)
	) {
// returns the tax amount
//----------------------------------------------------------------------------------------
	if (taxableAmount <= 0) return(0);
	var rateList = _TaxRates[taxYear + ":PCT"].split(",");
	var bracketMax = _TaxRates[taxYear + ":" + filingStatus].split(","); // maximum for the rate
	var CG_rateList = _CGRates[taxYear + ":PCT"].split(",");
	var CG_bracketMax = _CGRates[taxYear + ":" + filingStatus].split(","); // maximum for the rate

	// Schedule D worksheet:
	if (capitalGains && useSchedD) {
		var D13 = capitalGains;
		var D14 = Math.max(0, taxableAmount - D13);
		var D16 = Math.min(taxableAmount, CG_bracketMax[0]);
		var D17 = Math.min(D16, D14);
		var D19 = Math.max(D17, D14);
		var D20 = D16 - D17;
		var D21 = Math.min(taxableAmount, D13);
		var D23 = D21 - D20;
		var D25 = Math.min(taxableAmount, CG_bracketMax[1]);
		var D26 = D19 + D20;
		var D27 = Math.max(0, D25 - D26);
		var D28 = Math.min(D23, D27);
		var D29PCT15 = CG_rateList[1] * D28;
		var D30 = D20 + D28;
		var D31 = D21 - D30;
		var D32PCT20 = CG_rateList[2] * D31;
		// skipping D33 - D38
		var D39 = D19 + D20 + D28 + D31;
		var D40 = taxableAmount - D39;
		var D41PCT28 = 0.28 * D40;
		var D42 = _TaxLookup(taxYear, filingStatus, D19, 0, false);
		var D43 = Math.round(D29PCT15 + D32PCT20 + D41PCT28 + D42);
		var D44 = _TaxLookup(taxYear, filingStatus, taxableAmount, 0, false);
		return (Math.min(D43, D44));
	}

	if (filingStatus != "TRUST") {
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
			taxAmount += taxableAmount * rateList[taxBracket];
			taxableAmount = 0;
		}
	}

	return(Math.round(taxAmount));
}

//----------------------------------------------------------------------------------------
function _CTCLookup(	// Determines Child and Dependent Tax Credit
	taxYear,	// tax year tables to use
	filingStatus,	// SNG, MFJ, WID, MFS, HOH
	childDependents, // number of children/disabled eligible for CTC
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

	var CTCAmount = CTCRate * +childDependents;
	var CTCAmount = Math.max(0, (CTCAmount - CTCReduction));
	var FTCAmount = FTCRate * (+totalDependents - +childDependents);
	var ACTCLimit = Math.round(Math.min(
				ACTCRate * +childDependents,
				Math.max(
					0,
					0.15 * (earnedIncome - ACTCThresh),
					SocSecOffset
					)
				));
	var CTCresult = [CTCAmount, FTCAmount, ACTCLimit];
	return (CTCresult);
}

//----------------------------------------------------------------------------------------
function _EICLookup(	// Earned Income Credit table lookup
	taxYear,	// tax year tables to use
	filingStatus,	// SNG, MFJ, WID, MFS, HOH
	EICdependents,	// number of dependents eligible for EIC
	earnedIncome,	// wages + self-employment
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
	amountPaid,	// max $3000 for 1, $6000 for 2 or more
	TPEarnedIncome,	// 
	SPEarnedIncome	// 
		) {
// Form 2441 line numbers
//----------------------------------------------------------------------------------------
	
	if (filingStatus === "MFJ") line6 = Math.min(+amountPaid, +TPEarnedIncome, +SPEarnedIncome);
	else line6 = Math.min(+amountPaid, +TPEarnedIncome);
	var line8 = (35 - (Math.ceil(Math.min(Math.max(0, (AGI - 15000)/2000), 15)))) / 100;
	return (line6 * line8);
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
	etype,		// AOC, LLC
	expenses	// Education expenses
		) {
// does not test for eligibility (dependent, claimed, kiddie tax, etc)
// returns array	[0] = nonrefundable credit
// 			[1] = refundable credit
//----------------------------------------------------------------------------------------
	var result = [];
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
		default:
			limit = 0;
	}
	var AGIfactor = 1;

	// Modify amount if limited by AGI
	switch (filingStatus) {
		case "MFJ":
			if (+AGI >= +limits[3]) AGIfactor = Math.max(0, (+limits[4] - +AGI) / (+limits[4] - +limits[3]));
			break;
		case "MFS":
			AGIfactor = 0;
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
