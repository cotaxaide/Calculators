//----------------------------------------------------------------------------------------
function Tax_Calc (
	taxYear, 		// tax year
	CalcType, 		// T (taxpayer), S (spouse), J (joint)
	CalcInArray 		// Array of input amounts
) {
// This function takes the inputs from the CalcIn array and creates the CalcOut array
// Hint for ease of use:
//	Use inputs with ids = CalcIn keys and use a common input class name
//		watch for checkboxes (test for type) and make true or false
//	Use table tds or spans with ids = CalcOut keys and use a common output class name
//----------------------------------------------------------------------------------------
//Version 2.1, 8/2/2025
//	Corrected scholarship income needed to be added to earned income for EIC
//Version 2.0, 7/17/2025
//	Removed style, checked, innerHTML, value, etc to make independent function
//	Added CalcIn and CalcOut arrays initializations and keys
//	Removed any special coding for TY2021 and prior
//Version 1.4
//	Child care credit changes
//Version 1.3
//	Changed to JSON data files
//Version 1.2
//	Corrected educator expense amount test
//Version 1.1
//	Recursive call omitted taxYear
//Version 1.0
//	Split from Estimated Tax Worksheet version 3.46
//----------------------------------------------------------------------------------------
// Improvements needed:
//	Determine age for HSA adjustment - no input for TP55 and SP55
//----------------------------------------------------------------------------------------

//----------------------------------------------------------------------------------------

// Initialize CalcIn so that all keys are defined
var CalcIn = [];
// CalcIn array keys:
CalcIn["ActualMedical"] = 0;	// Total of deductible medical expenses
CalcIn["AdditionalTax"] = 0;	// Additional taxes paid
CalcIn["AlimonyIncome"] = 0;	// Taxable alimony received
CalcIn["AlimonyPaid"] = 0;	// Alimony paid adjustment
CalcIn["AOCCost"] = 0;		// Cost of AOC education expenses
CalcIn["CCDependents"] = 0;	// Dependents elegible for care
CalcIn["CharityCash"] = 0;	// Charitable cash contributions
CalcIn["CharityNoncash"] = 0;	// Charitable non-cash contributions
CalcIn["ChildCareCost"] = 0;	// Cost of child or dependent care
CalcIn["Dividends"] = 0;	// Taxable dividends income
CalcIn["EdExpenses"] = 0;	// Educator expenses adjustment
CalcIn["FilingStatus"] = 0;	// MFS, MFJ, SNG, HOH, OSS (T or S implies MFS)
CalcIn["ForeignPaid"] = 0;	// Foreign taxes paid
CalcIn["GamblingWins"] = "";	// Gambling winnings
CalcIn["HSADeduction"] = 0;	// HSA adjustment
CalcIn["InterestIncome"] = 0;	// Taxable interest income
CalcIn["InterestPaid"] = 0;	// Total of deductible expenses paid
CalcIn["ItemizedRequired"] = 0;	// Itemizing is required (T/F)
CalcIn["IRADeduction"] = 0;	// IRA contribution adjustment
CalcIn["IsDependent"] = 0;	// TP is a dependent (T/F)
CalcIn["IsYouth"] = 0;		// TP is a youth <18 or student <24 (T/F)
CalcIn["LLCCost"] = 0;		// Cost of LLC education expenses
CalcIn["LTCapGains"] = 0;	// Long term capital gains
CalcIn["MFStogether"] = 0;	// Filing MFS but living together
CalcIn["Miscellaneous"] = 0;	// Job expenses and miscellaneous deductions
CalcIn["NIITExpenses"] = 0;	// NIIT investment expenses
CalcIn["OtherCredits"] = 0;	// Other adjustments not listed above
CalcIn["OtherItemized"] = 0;	// Other Itemized deductions
CalcIn["OtherTaxes"] = 0;	// Penalties, etc
CalcIn["QBIDividends"] = 0;	// Qualified business income dividends
CalcIn["QCD"] = 0;		// Total of any QCD distributions
CalcIn["QualDividends"] = 0;	// Qualified dividends income
CalcIn["Refundable"] = 0;	// Other refundable credits
CalcIn["ResidenceEnergy"] = 0;	// Residential energy credit amount
CalcIn["RetirementCost"] = 0;	// Retirement credit amount
CalcIn["Royalties"] = 0;		// Income from royalties
CalcIn["SALTTaxesPaid"] = 0;	// Total of other deductible taxes paid
CalcIn["SavingsPenalty"] = 0;	// Penalty for early withdrawal of savings adjustment
CalcIn["Scholarships"] = 0;	// Taxable scholarship income
CalcIn["SEIncome"] = 0;		// TP + SP Self-employment net income
CalcIn["SEInsurance"] = 0;	// Self-employment health insurance
CalcIn["SESEP"] = 0;		// Self-employment SEP amount
CalcIn["SPBirthYear"] = 0;	// SP birth year
CalcIn["SPSEIncome"] = 0;	// SP Self-employment net income
CalcIn["SP50"] = 0;		// SP is 50-64 (T/F)
CalcIn["SP65"] = 0;		// SP is > 65 (T/F)
CalcIn["SPBlind"] = 0;		// SP is blind (T/F)
CalcIn["SPPlan"] = 0;		// SP has a retirement plan (T/F)
CalcIn["SPCTCDependents"] = 0;	// SP Dependents elegible for CTC
CalcIn["SPDependents"] = 0;	// Total number of dependents for SP
CalcIn["SPEICDependents"] = 0;	// SP Dependents eligible for EIC
CalcIn["SPWages"] = 0;		// Total SP earned income from employment
CalcIn["SS"] = 0;		// Total social security income
CalcIn["STCapGains"] = 0;	// Short term capital gains
CalcIn["StudentLoan"] = 0;	// Student loan payment adjustment
CalcIn["TaxYear"] = 0;		// Tax year to use
CalcIn["TaxExemptInt"] = 0;	// Tax exempt interest income
CalcIn["TotalIRAs"] = 0;	// Total of all IRA distributions (including QCDs)
CalcIn["TPBirthYear"] = 0;	// TP birth year
CalcIn["TP50"] = 0;		// TP is 50-64 (T/F)
CalcIn["TP65"] = 0;		// TP is > 65 (T/F)
CalcIn["TPBlind"] = 0;		// TP is blind (T/F)
CalcIn["TPSEIncome"] = 0;	// TP Self-employment net income
CalcIn["TPPlan"] = 0;		// TP has a retirement plan (T/F)
CalcIn["TotalPensions"] = 0;	// Total of all annuity and pension distributions
CalcIn["TPCTCDependents"] = 0;	// TP Dependents elegible for CTC
CalcIn["TPDependents"] = 0;	// Total number of dependents for TP
CalcIn["TPEICDependents"] = 0;	// TP Dependents eligible for EIC
CalcIn["TPWages"] = 0;		// Total TP earned income from employment
CalcIn["Unemployment"] = 0;	// Unemployment income received
CalcIn["Wages"] = 0;		// Total TP + SP earned income from employment

// Overwrite initialized zeros with inputted values
for (j in CalcInArray) { CalcIn[j] = CalcInArray[j]; }

// Initialize output array keys
var CalcOut = [];
CalcOut["Adjustments"] = "";	// Total of adjustments
CalcOut["AGI"] = "";		// Adjusted Gross Income
CalcOut["ItemizedLimit"] = "";	// Pease limit on itemized deductions
CalcOut["AOCCredit"] = "";	// Amer Opportunity Credit amount
CalcOut["Bracket"] = "";	// Resulting marginal tax bracket
CalcOut["CapGains"] = "";	// Capital gains total
CalcOut["CharityTotal"] = "";	// Total of cash + noncash contributions
CalcOut["ChildCare"] = "";	// Care Credit available
CalcOut["ChildCareUsed"] = "";	// Care Credit used
CalcOut["CTCredit"] = "";	// CTC available
CalcOut["CTCreditUsed"] = "";	// CTC used
CalcOut["Deductions"] = "";	// Total deductions
CalcOut["Education"] = "";	// Education credit available
CalcOut["EducationUsed"] = "";	// Education credit used
CalcOut["EICCredit"] = "";	// Earned Income Credit
CalcOut["ExemptAmount"] = "";	// Exemption deduction (obsolete)
CalcOut["ForeignTax"] = "";	// Foreign tax cred avalable
CalcOut["ForeignUsed"] = "";	// Foreign tax cred used
CalcOut["Gross"] = "";		// Gross income
CalcOut["IRADedAvailable"] = "";// Amount of IRA deduction available
CalcOut["IRAs"] = "";		// IRA total less any QCDs
CalcOut["Itemized"] = "";	// Itemized deduction total
CalcOut["Itemizing"] = "";	// T/F if itemizing
CalcOut["Medical"] = "";	// Medical deduction allowwed
CalcOut["NIITTax"] = "";	// NIIT tax
CalcOut["Nonrefundable"] = "";	// Total nonrefundable credits
CalcOut["OtherIncome"] = "";	// Royalties + Gambling
CalcOut["Pensions"] = "";	// IRAs - QCDs
CalcOut["PreNRTax"] = "";	// Tax before NR credits
CalcOut["QBIAmount"] = "";	// QBI deduction (-1 if OOS)
CalcOut["ResidentialUsed"] = "";// ResEnergy credit used
CalcOut["Retirement"] = "";	// Retirement credits available
CalcOut["RetirementUsed"] = "";	// Retirement credits used
CalcOut["SEHI"] = "";		// Self-employed health ins adjustment
CalcOut["SEHIExcess"] = "";	// Self-employed excess amount to Sched A
CalcOut["SETax"] = "";		// Self-employment tax
CalcOut["SETaxCredit"] = "";	// Self-employment tax adjustment
CalcOut["SLInterest"] = "";	// Student Loan interst used
CalcOut["Standard"] = "";	// Standard deduction
CalcOut["StudentEarned"] = "";	// Student earned income
CalcOut["Tax"] = "";		// Tax on taxable income
CalcOut["TaxTable"] = "";	// "Tax table" or "CG worksheet"
CalcOut["TaxableAmount"] = "";	// Taxable income
CalcOut["TaxableSS"] = "";	// Taxable social security
CalcOut["TaxDue"] = "";		// Tax owed
CalcOut["TaxesPaid"] = "";	// Tax paid
CalcOut["TaxPostCredits"] = "";	// Tax owed after credits
CalcOut["TotalDeductions"] = "";// Total itemized deductions
CalcOut["TotalTax"] = "";	// Tax + SETax + NIITTax + OtherTaxes

// Filing information --------------------------------------------------------
let FS = CalcIn["FilingStatus"];
if ((CalcType == "T") || (CalcType == "S")) FS = "MFS"; // Overrides filing status
let TY = CalcIn["TaxYear"];
let Dependents = +CalcIn["TPDependents"] + +CalcIn["SPDependents"];
let EICDependents = +CalcIn["TPEICDependents"] + +CalcIn["SPEICDependents"];
let CTCDependents = +CalcIn["TPCTCDependents"];+CalcIn["SPCTCDependents"];

// Income -------------------------------------------------------------------

// Pension with QCD
CalcOut["IRAs"] = +CalcIn["TotalIRAs"] - +CalcIn["QCD"];
CalcOut["Pensions"] = +CalcIn["TotalPensions"];

// Capital gains
var CGLossLimit = (FS == "MFS") ? -1500 : -3000;
CalcOut["CapGains"] = Math.round(Math.max( (+CalcIn["LTCapGains"] + +CalcIn["STCapGains"]) , CGLossLimit));

// Unemployment and Other Income adustments for 2020
CalcOut["OtherIncome"] = +CalcIn["Royalties"];

// Income adjustments -------------------------------------------------------

// Limit educator expenses
var edlimit = _IRSValue("EducatorExpenses");
if (FS === "MFJ") edlimit *= 2;
CalcIn["EdExpenses"] = Math.min(+CalcIn["EdExpenses"], edlimit);

// Limit HSA Deduction = can't test for age 55
var hsalimit = +_IRSValue("HSA.Family") + 2000;
CalcIn["HSADeduction"] = Math.min(+CalcIn["HSADeduction"], hsalimit);

// Determine self-employment tax
let result = _SETax(taxYear, +CalcIn["SEIncome"], CalcIn["Wages"]);
CalcOut["SETax"] = +result["SE_tax"];
CalcOut["SETaxCredit"] = +result["deductible"];

// Determine self-employed health insurance
CalcOut["SEHI"] = Math.max(0,Math.min((+CalcIn["SEIncome"] - +CalcOut["SETaxCredit"] - +CalcIn["SESEP"]), +CalcIn["SEInsurance"]));
let SEHIExcess = Math.max(0, +CalcIn["SEInsurance"] - +CalcOut["SEHI"]);
if (FS === "MFJ") {
	CalcOut["SEHIExcess"] = (SEHIExcess) ? SEHIExcess : "" ;
}

// Limit IRA Contribution Deduction will be adjusted later after AGI is known
CalcOut["IRADedAvailable"] = CalcIn["IRADeduction"];

// Add Student Loan Payment Deduction without limit - limit will be done later
CalcOut["SLInterest"] = (FS !== "MFS") ?  CalcIn["StudentLoan"] : 0 ;

// Total the adjustments
let SSAdjustments = +CalcIn["EdExpenses"] + +CalcIn["HSADeduction"]
	+ +CalcOut["SETaxCredit"] + +CalcIn["SESEP"] + +CalcOut["SEHI"]
	+ +CalcIn["AlimonyPaid"] + +CalcOut["IRADedAvailable"]
	+ +CalcIn["SavingsPenalty"] + +CalcIn["OtherCredits"];
CalcOut["Adjustments"] = SSAdjustments + +CalcOut["SLInterest"];

let SSIncome = +CalcIn["Wages"] + +CalcIn["Scholarships"] + +CalcIn["InterestIncome"]
	+ +CalcIn["Dividends"] + +CalcIn["SEIncome"] + +CalcOut["CapGains"]
	+ +CalcOut["IRAs"] + +CalcOut["Pensions"] + +CalcIn["AlimonyIncome"]
	+ +CalcIn["Unemployment"] + +CalcOut["OtherIncome"];

// Get the taxable Social Security amount
MFStogetherRelevant = (FS === "MFS") && CalcIn["MFStogether"];
result = _TaxableSS(TY, FS, +CalcIn["SS"],
	(SSIncome + +CalcIn["TaxExemptInt"]),
	SSAdjustments, MFStogetherRelevant);
CalcOut["TaxableSS"] = +result[0];

// Total the income
CalcOut["Gross"] = Math.round(SSIncome + +CalcOut["TaxableSS"]);

// Figure the AGI
let TrueAGI = Math.round(+CalcOut["Gross"] - +CalcOut["Adjustments"]);
CalcOut["AGI"] = Math.max(0, TrueAGI);

// Make adjustments to entries already made (IRA contributions & Student loan interest)

// Limit the IRA amount entered due to IRA MAGI
let IRA_MAGI = +CalcOut["AGI"] + +CalcOut["IRADedAvailable"] + +CalcOut["SLInterest"];
let SENet = Math.max(0, +CalcIn["SEIncome"] - +CalcIn["SESEP"] - +CalcOut["SETaxCredit"]);
let IRAEarned = +CalcIn["Wages"] + SENet + +CalcIn["AlimonyIncome"];
let IRAActual = 0;
if (FS !== "MFS") {
	let IRAResults = _IRADeduction(TY, FS, IRA_MAGI, IRAEarned, CalcIn["TPPlan"], (CalcIn["TP50"] || CalcIn["TP65"]), CalcIn["SPPlan"], (CalcIn["SP50"] || CalcIn["SP65"]), MFStogetherRelevant);
	let IRAActualMax = Math.min(+IRAResults["TPcontribMax"] + ((FS == "MFJ") ? +IRAResults["SPcontribMax"] : 0 ), IRAEarned);
	IRAActual = Math.min(+IRAResults["TPdeductible"] + ((FS == "MFJ") ? +IRAResults["SPdeductible"] : 0 ), IRAEarned);
	IRAActual = Math.min(+TPMFJ["IRADeduction"], IRAActual, IRAEarned);
}
else { // FS = MFS
	if (CalcType === "T") {
		IRAResults = _IRADeduction(taxYear, FS, IRA_MAGI, IRAEarned, CalcIn["TPPlan"], (CalcIn["TP50"] || CalcIn["TP65"]), CalcIn["SPPlan"], false, MFStogetherRelevant);
		IRAActual = Math.min(+TPMFS["IRADeduction"], +IRAResults["TPdeductible"]);
		IRAContribMax = Math.min(IRAResults["TPcontribMax"], IRAEarned);
	}
	if (CalcType === "S") { // Spouse is now the taxpayer for IRADeduction function
		IRAResults = _IRADeduction(taxYear, FS, IRA_MAGI, IRAEarned, CalcIn["SPPlan"], (CalcIn["SP50"] || CalcIn["SP65"]), CalcIn["TPPlan"], false, MFStogetherRelevant);
		IRAActual = Math.min(+SPMFS["IRADeduction"], +IRAResults["TPdeductible"], IRAEarned); // TP here is not an error
		IRAContribMax = Math.min(IRAResults["TPcontribMax"], IRAEarned); // TP here is not an error
	}
}
// Adjust AGI due to any limit on IRA contribution
let IRAAdjust = +CalcOut["IRADedAvailable"] - IRAActual;
if (IRAAdjust > 0) { // Deduction limited
	CalcOut["IRADedAvailable"] -= IRAAdjust;
	CalcOut["Adjustments"] -= IRAAdjust;
	TrueAGI += IRAAdjust; // may still be negative
	CalcOut["AGI"] = Math.max(0, TrueAGI);
}
//else { // Adjust due to a change in AGI // don't think this is needed any more, was for old contribution deductions
//	IRAAdjust = IRAActual - +CalcOut["IRADedAvailable"];
//	CalcOut["IRADedAvailable"] = +CalcOut["IRADedAvailable"] + IRAAdjust;
//	CalcOut["Adjustments"] += IRAAdjust;
//	TrueAGI = TrueAGI - IRAAdjust; // may go negative
//	CalcOut["AGI"] = Math.max(0, TrueAGI);
//}

// Limit Student Loan Payment adjustment
if (FS !== "MFS") {
	let SL_MAGI = +CalcOut["AGI"] + +CalcOut["SLInterest"];
	CalcOut["SLInterest"] = _StudLoanInt(taxYear, FS, SL_MAGI, +CalcIn["StudentLoan"])["deductible"];
	SLAdjust = Math.max(0, (CalcIn["StudentLoan"] - CalcOut["SLInterest"]));
	CalcOut["Adjustments"] -= SLAdjust;
	CalcOut["AGI"] += SLAdjust;
}

// Determine standard/itemized deduction ------------------------------------------------------------------

// Calculate standard deduction
CalcOut["StudentEarned"] = +CalcIn["Wages"] + +CalcIn["Scholarships"]
	+ +CalcIn["SEIncome"] - +CalcOut["SETaxCredit"];

if (FS !== "MFS") {
	CalcOut["Standard"] = _StandardDeduction(taxYear, FS,
		CalcIn["TP65"], CalcIn["TPBlind"], CalcIn["SP65"], CalcIn["SPBlind"], CalcIn["IsDependent"], CalcOut["StudentEarned"]);
}
else {
	if (CalcType === "T") {
		CalcOut["Standard"] = _StandardDeduction(taxYear, FS,
			CalcIn["TP65"], CalcIn["TPBlind"], false, false, false, 0);
	}
	if (CalcType === "S") {
		CalcOut["Standard"] = _StandardDeduction(taxYear, FS,
			false, false, CalcIn["SP65"], CalcIn["SPBlind"], false, 0);
	}
}

// Itemized deductions...

// Medical limitation
let medExclusion = Math.round(+CalcOut["AGI"] * +_IRSValue("MedExclusion"));
CalcOut["Medical"] = Math.max(0, +CalcIn["ActualMedical"] + +CalcOut["SEHIExcess"] - medExclusion);

// Charitable limitation
let charlimit = Math.round(+CalcOut["AGI"] * 0.6);
CalcOut["CharityTotal"] = Math.min((+CalcIn["CharityCash"] + +CalcIn["CharityNoncash"]), charlimit);

// Limit taxes paid
let taxlimit = _IRSValue("SALT") / ((FS === "MFS") ?  2 : 1 );
CalcOut["TaxesPaid"] = Math.min(CalcIn["SALTTaxesPaid"], taxlimit);

// Find the itemized deduction total
CalcOut["Itemized"] = +CalcOut["Medical"] + +CalcOut["TaxesPaid"] + +CalcIn["InterestPaid"] +
	+CalcOut["CharityTotal"] + +CalcIn["OtherItemized"];

// Select the appropriate deduction
if (FS === "MFS") {
	CalcOut["Deductions"] = (CalcIn["ItemizedRequired"]) ? CalcOut["Itemized"] : CalcOut["Standard"] ;
}
else {
	CalcOut["Deductions"] = Math.max(+CalcOut["Standard"], CalcOut["Itemized"]);
}
CalcOut["Itemizing"] = (CalcOut["Deductions"] == CalcOut["Itemized"]); // T/F

// QBI Calc
let QBIDeduction = 0;
let SENetIncome = +CalcIn["SEIncome"] - +CalcOut["SETaxCredit"] - +CalcIn["SESEP"] - +CalcOut["SEHI"];
QBIDeduction = _QBICalc(taxYear, FS, SENetIncome,
	(+CalcIn["QualDividends"] + +CalcOut["CapGains"]),
	CalcIn["QBIDividends"], CalcOut["AGI"]);
CalcOut["QBIAmount"] = QBIDeduction;

// Determine total deductions
CalcOut["TotalDeductions"] = CalcOut["Deductions"] + Math.max(0, QBIDeduction);

// Determine tax ----------------------------------------------------------------------------

// Determine taxable amount
CalcOut["TrueTaxableAmount"] = +CalcOut["AGI"] - +CalcOut["TotalDeductions"];
CalcOut["TaxableAmount"] = Math.max(0, CalcOut["TrueTaxableAmount"]);

// Determine Tax
let CGtoUse = Math.min( +CalcIn["LTCapGains"], (+CalcIn["LTCapGains"] + +CalcIn["STCapGains"]));
let CGAmount = +CalcIn["QualDividends"] + Math.max(0, CGtoUse);
TaxResult = _TaxLookup(taxYear, FS, +CalcOut["TaxableAmount"], CGAmount, true);
CalcOut["Tax"] = TaxResult["tax"];

// Show the tax bracket
CalcOut["Bracket"] = "(" + TaxResult["bracket"] + " marginal bracket)";

CalcOut["TaxTable"] = (CGAmount) ? "Tax from Capital Gains Worksheet" : "Tax from tax tables" ;

// Nonrefundable credits  ----------------------------------------------------------------------------

// WorkingTax is a variable to use to see how much is left to deduct from
let WorkingTax = Math.round(+CalcOut["Tax"] + +CalcIn["AdditionalTax"]);
CalcOut["PreNRTax"] = WorkingTax;

// Limit Foreign Tax deduction
foreignLimit = (FS != "MFS") ? 600 : 300 ;
CalcOut["ForeignTax"] = Math.min(foreignLimit, CalcIn["ForeignPaid"]);
let NRUsed = Math.min(WorkingTax, +CalcOut["ForeignTax"]);
CalcOut["ForeignUsed"] = NRUsed
WorkingTax -= NRUsed;

// Limit Child Care Cost
CalcOut["ChildCare"] = CalcOut["ChildCareUsed"] = NRUsedTemp = 0;
if ((FS != "MFS") && (+CalcIn["CCDependents"] > 0)) {
	let cclimit = _IRSValue("Care.PerChild") * (+CalcIn["CCDependents"]  > 1) ? 2 : 1 ;
	let CCEarned = +CalcIn["Wages"] + +CalcIn["SEIncome"] - +CalcOut["SETaxCredit"];
	// CC limited by lower income of TP or SP
	if (FS === "MFJ") {
		let TPCCEarned = +CalcIn["TPWages"] + +CalcIn["TPSEIncome"] - +CalcOut["TPSETaxCredit"];
		let SPCCEarned = +CalcIn["SPWages"] + +CalcIn["SPSEIncome"] - +CalcOut["SPSETaxCredit"];
		if (TPCCEarned || SPCCEarned) CCEarned = Math.min(TPCCEarned, SPCCEarned);
	}
	CalcOut["ChildCare"] = Math.round(_ChildCare(TY, FS, CCEarned, CalcOut["AGI"],
		CalcIn["CCDependents"], CalcIn["ChildCareCost"])["deductible"]);
	CalcOut["ChildCareUsed"] = NRUsedTemp = Math.min(WorkingTax, +CalcOut["ChildCare"]);
}
WorkingTax -= NRUsedTemp;
NRUsed += NRUsedTemp;

// Determine education expenses and credits
CalcOut["Education"] = CalcOut["AOCCredit"] = "";
if (FS !== "MFS") {
	result = _EdCredit(TY, FS, CalcOut["AGI"], "AOC", CalcIn["AOCCost"]);
	CalcOut["AOCCredit"] = +CalcOut["AOCCredit"] + +result[1];
	CalcOut["Education"] = +CalcOut["Education"] + +result[0];
	result = _EdCredit(TY, FS, CalcOut["AGI"], "LLC", CalcIn["LLCCost"]);
	CalcOut["Education"] = +CalcOut["Education"] + +result[0];
}
CalcOut["EducationUsed"] = NRUsedTemp = Math.min(WorkingTax, CalcOut["Education"]);
WorkingTax -= NRUsedTemp;
NRUsed += NRUsedTemp;

// Determine retirement savings contribution redit
if ((FS === "MFJ")  // preferred solution
	&& ((CalcIn["TPRetirementCost"] || CalcIn["SPRetirementCost"]))) {
	CalcOut["Retirement"] = _Retirement(taxYear, FS, CalcOut["AGI"],
		CalcIn["TPRetirementCost"], CalcIn["SPRetirementCost"]);
}
else { // suboptimal solution but OK if only TP has it
	CalcOut["Retirement"] = _Retirement(taxYear, FS, CalcOut["AGI"],
		CalcIn["RetirementCost"], 0);
}
CalcOut["RetirementUsed"] = NRUsedTemp = Math.round(Math.min(WorkingTax, +CalcOut["Retirement"]));
WorkingTax -= NRUsedTemp;
NRUsed += NRUsedTemp;

// Get the FTC, CTC and ACTC amounts
CTCresult = _CTCLookup(taxYear, FS, CTCDependents, Dependents,
		(+CalcIn["Wages"] + +CalcIn["SEIncome"]), +CalcOut["AGI"]);
let CTCAmount = +CTCresult[0];
let FTCAmount = +CTCresult[1];
let ACTCLimit = +CTCresult[2];
CalcOut["CTCredit"] = FTCAmount + CTCAmount;

// FTC - Current assumption - Use FTC before CTC but use the same line
// 	Saves more for ACTC
let FTCUsed = Math.min(WorkingTax, FTCAmount); 
WorkingTax -= FTCUsed;
NRUsed += FTCUsed;

// CTC
let CTCUsed = Math.min(WorkingTax, CTCAmount);
WorkingTax -= CTCUsed;
NRUsed += CTCUsed;
CalcOut["CTCreditUsed"] = FTCUsed + CTCUsed;

// ACTC
let ACTCAmount = Math.min(Math.max(0, CTCAmount - CTCUsed), ACTCLimit);
CalcOut["ACTCredit"] = ACTCAmount;

// Residential and other credits
NRUsedTemp = Math.min(WorkingTax, +CalcIn["ResidenceEnergy"]);
WorkingTax -= NRUsedTemp;
NRUsed += NRUsedTemp;
CalcOut["ResidentialUsed"] = NRUsedTemp;

// Totals
CalcOut["Nonrefundable"] = NRUsed;
CalcOut["TaxPostCredits"] = Math.round(Math.max(0, CalcOut["PreNRTax"] - NRUsed));

// Refundable credits  ----------------------------------------------------------------------------

// Get the EIC amount
var EICAmount = 0;
var EICInvest = +CalcOut["CapGains"] + +CalcIn["InterestIncome"] + +CalcIn["TaxExemptInt"] + +CalcIn["Dividends"];
var EICEarned = +CalcIn["Wages"] + +CalcIn["SEIncome"] - +CalcOut["SETaxCredit"] + +CalcIn["Scholarships"];
CalcOut["EICCredit"] = EICAmount = +_EICLookup(taxYear, FS,
	EICDependents, EICEarned, EICInvest, CalcOut["AGI"],
	CalcIn["TP65"], CalcIn["SP65"]);

// Does NIIT apply?
var NIITAmount = _NIITCalc(taxYear, FS, +CalcOut["AGI"], +CalcIn["InterestIncome"],
	CalcIn["Dividends"], +CalcOut["CapGains"], +CalcIn["NIITExpenses"]);
CalcOut["NIITTax"] = NIITAmount;

// Total the tax amounts
CalcOut["TotalTax"] = Math.round(+CalcOut["TaxPostCredits"] + +CalcOut["SETax"] + +CalcOut["NIITTax"] + +CalcIn["OtherTaxes"]);

// Determine tax due
CalcOut["TaxDue"] = Math.round(+CalcOut["TotalTax"] - +CalcOut["ACTCredit"]
	- +CalcOut["EICCredit"] - +CalcOut["AOCCredit"] - +CalcIn["Refundable"]);

return (CalcOut);

} // end Tax_Calc()
