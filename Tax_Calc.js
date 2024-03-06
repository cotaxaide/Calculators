//----------------------------------------------------------------------------------------
function Tax_Calc(
	taxYear, 		// tax year
	CalcType, 		// T (taxpayer), S (spouse), J (joint)
	CalcIn, 		// Array of input amounts
	AllowUCE = false	// True/False, 2020 Unemployment compensation exclusion (UCE)
) {
// This function takes the inputs from the CalcIn array and creates the CalcOut array
// CalcIn array keys:
// 	Wages:		Total earned income from employment
// 	Scholar:	Taxable scholarship income
// 	Interest:	Taxable interest income
// 	TaxExempt:	Tax exempt interest and dividend income
// 	Dividends:	Taxable dividends income
// 	QualDividends:	Qualified dividends income
// 	QBIDividends:	Qualified business income dividends
// 	QCD:		Total of any QCD distributions
// 	TotalIRAs:	Total of all IRA distributions (including QCDs)
// 	TotalPensions:	Total of all annuity and pension distributions
// 	SS:		Total social security income
// 	SEIncome:	Self-employment net income
// 	LTCapGains:	Long term capital gains
// 	STCapGains:	Short term capital gains
// 	Alimony:	Taxable alimony received
// 	Unemployment:	Unemployment income received
// 	Royalties:	Income from royalties
// 	EdExpenses:	Educator expenses adjustment
// 	HSADeduction:	HSA adjustment
// 	SESEP:		Self-employment SEP amount
// 	SEInsurance:	Self-employment health insurance
// 	SavingsPenalty:	Penalty for early withdrawal of savings adjustment
// 	AlimonyPaid:	Alimony paid adjustment
// 	IRADeduction:	IRA contribution adjustment
// 	StudentLoan:	Student loan payment adjustment
// 	OtherCredits:	Other adjustments not listed above
// 	ActualMedical:	Total of deductible medical expenses
// 	ActualTaxesPaid:Total of other deductible taxes paid
// 	InterestPaid:	Total of deductible expenses paid
// 	Charity:	Charitable cash contributions
// 	CharityNoncash:	Charitable non-cash contributions
//	Miscellaneous:	Job expenses and miscellaneous deductions
//	AdditionalTax:	Additional taxes paid
//	ForeignCost;	Foreign taxes paid
//	ChildCareCost:	Cost of child or dependent care
//	EducationCost:	Cost of education expenses
//	RetirementCost:	Retirement credit amount
//	Residential:	Residential energy credit amount
//	NIITExpenses:	NIIT investment expenses
// 	OtherItemized:	Other Itemized deductions
//	OtherTaxes:	Penalties, etc
//	Refundable:	Other refundable credits
//----------------------------------------------------------------------------------------
	//Version 1.1
	//	Recursive call omitted taxYear
	//Version 1.0
	//	Split from Estimated Tax Worksheet version 3.46
//----------------------------------------------------------------------------------------
	// Initialize output array
	var CalcOut = [];

	var FilingStatusValue = FilingStatus.value;
	var DependentsValue = +Dependents.value;
	var EICDependentsValue = +EICDependents.value;
	var CTCDependentsValue = +CTCDependents.value;
		CTCDependentsValue += 0.01 * Dependents0.value;
	var SPCTCDependentsValue = +SPCTCDependents.value;
	SPCTCDependentsValue += 0.01 * SPDependents0.value;
	if (MFJMFS.checked) {
		switch (CalcType) {
		case "T":
			FilingStatusValue = "MFS";
			break;
		case "J":
			DependentsValue += +SPDependents.value;
			EICDependentsValue += +SPEICDependents.value;
			CTCDependentsValue += +SPCTCDependentsValue;
			break;
		case "S":
			FilingStatusValue = "MFS";
			DependentsValue = +SPDependents.value;
			EICDependentsValue = +SPEICDependents.value;
			CTCDependentsValue = +SPCTCDependentsValue;
			break;
		default:
			break;
		}
	}

	// Get self-employment tax
	SEresult = _SETax(taxYear, +CalcIn["SEIncome"], CalcIn["Wages"]);
	CalcOut["SETax"] = +SEresult["SE_tax"];
	CalcOut["SETaxCredit"] = +SEresult["deductible"];
//	excessSStotal = 0;
//	SSexcess.innerHTML = "";
//	if (+SEresult["excessSS"]) {
//		if (MFJMFS.checked) {
//			if (CalcType === "T") TPRefundable.innerHTML = TPMFS["Refundable"] = TPMFS["SSRefundable"] = SEresult["excessSS"];
//			if (CalcType === "S") SPRefundable.innerHTML = SPMFS["Refundable"] = SPMFS["SSRefundable"] = SEresult["excessSS"];
//			if (CalcType === "J") Refundable.value = TPMFJ["SSRefundable"] = +SPMFS["SSRefundable"] + +SPMFS["SSRefundable"];
//		}
//		else { // not MFJMFS
//			if (FilingStatusValue !== "MFJ") { // create the info message
//				SSexcess.innerHTML = "(include excess SS WH of " + SEresult["excessSS"] + ")";
//				Refundable.style.backgroundColor = (Refundable.value < +SEresult["excessSS"]) ? "hotpink" : "white" ;
//			}
//			else {
//				SSexcess.innerHTML = "(possible excess SS withholding, try MFJ/MFS option)";
//			}
//		}
//	}
//	else { // no excessSS
//			if (CalcType === "T") TPMFS["SSRefundable"] = 0;
//			if (CalcType === "S") SPMFS["SSRefundable"] = 0;
//		if (MFJMFS.checked) {
//			if (CalcType === "J") TPMFJ["SSRefundable"] = +TPMFS["SSRefundable"] + +SPMFS["SSRefundable"];
//		}
//		else { // not MFJMFS
//			if (CalcType === "J") TPMFJ["SSRefundable"] = 0;
//		}
//	}
//	if (MFJMFS.checked && (+TPMFS["SSRefundable"] || +SPMFS["SSRefundable"])) {
//		if (FilingStatusValue === "MFJ") { // create the info message
//			SSmessage = "(include excess SS WH of ";
//			if (TPMFS["SSRefundable"]) SSmessage += (TPMFS["SSRefundable"] + " (TP)");
//			if (SPMFS["SSRefundable"] && TPMFS["Refundable"]) SSmessage += " and ";
//			if (SPMFS["SSRefundable"]) SSmessage += (SPMFS["SSRefundable"] + " (SP)");
//			SSexcess.innerHTML = SSmessage + ")";
//			Refundable.click();
//			SAVEButton.click();
//			Refundable.style.backgroundColor = (Refundable.value < +TPMFJ["SSRefundable"]) ? "hotpink" : "none" ;
//		}
//	}

	// Total the adjustments
	CalcOut["SEHI"] = Math.max(0,Math.min((+CalcIn["SEIncome"] - +CalcOut["SETaxCredit"] - +CalcIn["SESEP"]), +CalcIn["SEInsurance"]));
	var SEHIRemainder = Math.max(0, +CalcIn["SEInsurance"] - +CalcOut["SEHI"]);
	if (CalcType === "J") {
		if (SEHIRemainder) {
			SEHIExcess.innerHTML = "<br />&nbsp;&nbsp;&nbsp;<i>Excess " 
			       	+ +SEHIRemainder + " will carry to Schedule A medical expenses</i>";
			MFJMFSSEHIRow.style.height = SEHIRow.style.height = "2.7em";
		}
		else {
			SEHIExcess.innerHTML = "";
			MFJMFSSEHIRow.style.height = SEHIRow.style.height = "";
		}
	}

	// Pension with QCD
	CalcOut["IRAs"] = +CalcIn["TotalIRAs"] - +CalcIn["QCD"];
	CalcOut["Pensions"] = +CalcIn["TotalPensions"];

	// Limit educator expenses
	var edlimit = (+taxYear >= 2024) ? 300 : 250 ;
	if (FilingStatusValue === "MFJ") edlimit *= 2;
	CalcIn["EdExpenses"] = Math.min(+CalcIn["EdExpenses"], edlimit);

	// Limit HSA Deduction = can't test for age 55
	var hsalimit = +_HSA[taxYear + ":FAM"] + 2000;
	CalcIn["HSADeduction"] = Math.min(+CalcIn["HSADeduction"], hsalimit);
	
	// Limit IRA Contribution Deduction will be done later after AGI is known
	CalcOut["IRADeductionAvailable"] = CalcIn["IRADeduction"];

	// Add Student Loan Payment Deduction without limit - limit will be done later
	if (FilingStatusValue !== "MFS") CalcOut["SLInterest"] = CalcIn["StudentLoan"];
	else CalcOut["SLInterest"] = (CalcIn["StudentLoan"]) ? 0 : "" ;

	// Total the adjustments, not including charitable contribution
	var SSAdjustments = +CalcIn["EdExpenses"] + +CalcIn["HSADeduction"]
		+ +CalcOut["SETaxCredit"] + +CalcIn["SESEP"] + +CalcOut["SEHI"]
		+ +CalcIn["AlimonyPaid"] + +CalcOut["IRADeductionAvailable"]
		+ +CalcIn["SavingsPenalty"] + +CalcIn["OtherCredits"];
	CalcOut["Adjustments"] = SSAdjustments + +CalcOut["SLInterest"];

	// Capital gains
	var CGLossLimit = (FilingStatusValue == "MFS") ? -1500 : -3000;
	CalcOut["CapGains"] = Math.round(Math.max( (+CalcIn["LTCapGains"] + +CalcIn["STCapGains"]) , CGLossLimit));

	// Unemployment and Other Income adustments for 2020
	var MFJUCE = 0;
	if ((taxYear == 2020) && (AllowUCE)) {
		var UCE_limit = 10200;
		TPMFS["TPUCE"] = Math.min(+TPMFS["Unemployment"], UCE_limit);
		SPMFS["SPUCE"] = Math.min(+SPMFS["Unemployment"], UCE_limit);
		if (CalcType == "T") MFJUCE = +TPMFS["TPUCE"];
		else if (CalcType == "S") MFJUCE = +SPMFS["SPUCE"];
		else if (CalcType == "J") MFJUCE = +TPMFS["TPUCE"] + +SPMFS["SPUCE"];
	}
	CalcOut["OtherIncome"] = +CalcIn["Royalties"] - MFJUCE;
	UCEAmount.innerHTML = (MFJUCE) ?  "(UCE = " + MFJUCE + ")" : "" ;

	IncomeNoSS = +CalcIn["Wages"] + +CalcIn["Scholar"] + +CalcIn["Interest"]
		+ +CalcIn["Dividends"] + +CalcIn["SEIncome"] + +CalcOut["CapGains"]
		+ +CalcOut["IRAs"] + +CalcOut["Pensions"] + +CalcIn["Alimony"]
		+ +CalcIn["Unemployment"] + +CalcOut["OtherIncome"] + MFJUCE;
	// Get the taxable Social Security amount
	MFStogetherRelevant = (FilingStatusValue == "MFS") && MFStogether.checked;
	SSresult = _TaxableSS(taxYear, FilingStatusValue, +CalcIn["SS"],
		(IncomeNoSS + +CalcIn["TaxExempt"]), SSAdjustments,
		MFStogetherRelevant);
	CalcOut["TaxableSS"] = +SSresult[0];

	// Get the taxable SS amount difference if charitable contributions are added
	var charityLimit = 0;
	if (taxYear == 2020) { // 300 unless MFS, then 150
		charityLimit = (FilingStatusValue === "MFS") ? 150 : 300 ;
		charityLimit = Math.min(charityLimit, Math.max(0, (IncomeNoSS + +SSresult[0])));
		SSAdjustments += Math.min(CalcIn["Charity"], charityLimit);
	}
	if (taxYear == 2021) { // 300 unless MFJ, then 600
		charityLimit = (FilingStatusValue === "MFJ") ? 600 : 300 ;
	}
	SSresult = _TaxableSS(taxYear, FilingStatusValue, +CalcIn["SS"],
		(IncomeNoSS + +CalcIn["TaxExempt"]), SSAdjustments,
		MFStogetherRelevant);
	taxableSS_charitydiff = 0; // +SSresult[0] - CalcOut["TaxableSS"];

//	if (CalcType === "J") {
//		TPMFJ["IRAgap00"] = +SSresult[1];
//		TPMFJ["IRAgap50"] = +SSresult[2];
//		TPMFJ["IRAgap85"] = +SSresult[3];
//	}

	// Total the income
	CalcOut["Gross"] = Math.round(IncomeNoSS + +CalcOut["TaxableSS"] - MFJUCE);

	// Figure the AGI
	var TrueAGI = Math.round(+CalcOut["Gross"] - +CalcOut["Adjustments"]);
	CalcOut["AGI"] = Math.max(0, TrueAGI);

	// Add the IRA comment and limit the amount entered
	var MAGI = +CalcOut["AGI"] + +CalcOut["IRADeductionAvailable"] + +CalcOut["SLInterest"] + MFJUCE;
	var SENet = Math.max(0, +CalcIn["SEIncome"] - +CalcIn["SESEP"] - +CalcOut["SETaxCredit"]);
	var IRAEarned = +CalcIn["Wages"] + SENet + +CalcIn["Alimony"];
	if (CalcType === "J") {
		IRAResults = _IRADeduction(taxYear, FilingStatusValue, MAGI, IRAEarned, TPPlan.checked, (TP50.checked || TP65.checked), SPPlan.checked, (SP50.checked || SP65.checked), MFStogetherRelevant);
		IRAActualMax = Math.min(+IRAResults["TPcontribMax"] + ((FilingStatusValue == "MFJ") ? +IRAResults["SPcontribMax"] : 0 ), IRAEarned);
		IRADeduction.style.backgroundColor = (CalcIn["IRADeduction"] > IRAActualMax) ? "hotpink" : "white" ;
		IRAActual = Math.min(+IRAResults["TPdeductible"] + ((FilingStatusValue == "MFJ") ? +IRAResults["SPdeductible"] : 0 ), IRAEarned);
		IRAActual = Math.min(+TPMFJ["IRADeduction"], IRAActual, IRAEarned);
	}
	if (CalcType === "T") {
		IRAResults = _IRADeduction(taxYear, FilingStatusValue, MAGI, IRAEarned, TPPlan.checked, (TP50.checked || TP65.checked), SPPlan.checked, false, MFStogetherRelevant);
		IRAActual = Math.min(+TPMFS["IRADeduction"], +IRAResults["TPdeductible"]);
		//CalcOut["IRADeductionAvailable"] = IRAActual;
		IRAContribMax = Math.min(IRAResults["TPcontribMax"], IRAEarned);
		TPIRADeductionAvailable.title = "Contribution can be no more than " + IRAContribMax + " if filing MFS";
		TPIRADeductionAvailable.style.backgroundColor = (CalcIn["IRADeduction"] > IRAEarned) ? "hotpink" : "" ;
	}
	if (CalcType === "S") { // Spouse is now the taxpayer for IRADeduction function
		IRAResults = _IRADeduction(taxYear, FilingStatusValue, MAGI, IRAEarned, SPPlan.checked, (SP50.checked || SP65.checked), TPPlan.checked, false, MFStogetherRelevant);
		IRAActual = Math.min(+SPMFS["IRADeduction"], +IRAResults["TPdeductible"], IRAEarned); // TP here is not an error
		//CalcOut["IRADeductionAvailable"] = IRAActual;
		IRAContribMax = Math.min(IRAResults["TPcontribMax"], IRAEarned); // TP here is not an error
		SPIRADeductionAvailable.title = "Contribution can be no more than " + IRAContribMax + " if filing MFS";
		SPIRADeductionAvailable.style.backgroundColor = (CalcIn["IRADeduction"] > IRAEarned) ? "hotpink" : "" ;
	}

	// Make adjustments to calculations already made
	IRAAdjust = +CalcOut["IRADeductionAvailable"] - IRAActual;
	if (IRAAdjust) { // Deduction limited
		CalcOut["IRADeductionAvailable"] -= IRAAdjust;
		CalcOut["Adjustments"] -= IRAAdjust;
		TrueAGI = TrueAGI + IRAAdjust; // may still be negative
		CalcOut["AGI"] = Math.max(0, TrueAGI);
	}
	else { // Adjust due to a change in AGI
		IRAAdjust = IRAActual - +CalcOut["IRADeductionAvailable"];
		CalcOut["IRADeductionAvailable"] = +CalcOut["IRADeductionAvailable"] + IRAAdjust;
		CalcOut["Adjustments"] += IRAAdjust;
		TrueAGI = TrueAGI - IRAAdjust; // may go negative
		CalcOut["AGI"] = Math.max(0, TrueAGI);
	}

	// Recalculate if UCE can be used
	UCElimit = (FilingStatusValue === "MFS") ? 75000 : 150000;
	if ((taxYear == 2020) && (! AllowUCE) && (CalcOut["AGI"] < UCElimit)) {
		CalcOut["CharityStandard20"] = 0; // prevents doubling
		Tax_Calc(taxYear, CalcType, CalcIn, true); // taxYear added in v1.1
		}

	// Limit Student Loan Payment Deduction
	if (FilingStatusValue !== "MFS") {
		var SLMAGI = +CalcOut["AGI"] + +CalcOut["SLInterest"];
		CalcOut["SLInterest"] = _StudLoanInt(taxYear, FilingStatusValue, SLMAGI, +CalcIn["StudentLoan"])["deductible"];
		SLAdjust = Math.max(0, (CalcIn["StudentLoan"] - CalcOut["SLInterest"]));
		CalcOut["Adjustments"] -= SLAdjust;
		CalcOut["AGI"] += SLAdjust;
	}

	// Calculate standard deduction
	var StdEarned = +CalcIn["Wages"] + +CalcIn["Scholar"]
		+ +CalcIn["SEIncome"] - +CalcOut["SETaxCredit"];

	// Check for dependent limits
	var DependentError = "";
	var TaxableError = "";
	if (IsDependent.checked) {
		if (IsYouth.checked) { // Dependent as child
			var KiddieUnearned = +CalcOut["Gross"] - StdEarned + +CalcIn["Scholar"];
			var KiddieLimit = +_Standard[taxYear].split(",")[+_Standard["Kid"]];
			if (KiddieUnearned > KiddieLimit) {
				DependentError = "Unearned income exceeds kiddie tax limit. Additional taxes (Form 8615) may apply.";
			}
		}
		else { // Dependent as relative
			//DepIncome = (MFStogetherRelevant) ?  +CalcOut["Gross"] : IncomeNoSS;
			var grossLimit = +_Standard[taxYear].split(",")[+_Standard["DepAsRel"]]
			if ((+CalcOut["Gross"] > grossLimit) || (+CalcOut["TaxableSS"] > 0)) {
				TaxableError = "WARNING: your income is too high to be a dependent.";
			}
		}
	}
	TaxableWarning.innerHTML = TaxableError;
	DependentWarning.innerHTML = DependentError;

	if (CalcType === "J") {
		CalcOut["Standard"] = _StandardDeduction(taxYear, FilingStatusValue,
			TP65.checked, TPBlind.checked, SP65.checked, SPBlind.checked, IsDependent.checked, StdEarned);
	}
	if (CalcType === "T") {
		CalcOut["Standard"] = _StandardDeduction(taxYear, FilingStatusValue,
			TP65.checked, TPBlind.checked, false, false, false, 0);
	}
	if (CalcType === "S") {
		CalcOut["Standard"] = _StandardDeduction(taxYear, FilingStatusValue,
			false, false, SP65.checked, SPBlind.checked, false, 0);
	}

	// Medical limitation
	var medexclusionindex = 0
	if (((CalcType === "J") && (TP65.checked || SP65.checked)) ||
		((CalcType === "T") && TP65.checked) ||
		((CalcType === "S") && SP65.checked)) medexclusionindex = 1;
	var medexclusion = Math.round(+CalcOut["AGI"] * +_MedicalExclusion[taxYear].split(",")[medexclusionindex]);
	CalcOut["Medical"] = Math.max(0, +CalcIn["ActualMedical"] + SEHIRemainder - medexclusion);

	// Two percent limitation
	CalcOut["TwoPercent"] = Math.round(+CalcOut["AGI"] * 0.02);

	// Charitable limited to 50% AGI 60% in 2018+
	if (CalcOut["CharityStandard20"] === undefined) CalcOut["CharityStandard20"] = 0;
	if (CalcOut["CharityStandard"] === undefined) CalcOut["CharityStandard"] = 0;
	CharityAGI = Math.max(0, TrueAGI + +CalcOut["CharityStandard20"]);
	charlimit = Math.round(CharityAGI * ((taxYear >= 2018) ? 0.6 : 0.5));
	if (taxYear == 2020) charlimit = CharityAGI; //  CARES ACT removes limit for 2020
	if (taxYear == 2021) charlimit = CharityAGI; //  CARES ACT removes limit for 2021
	CalcOut["CharityTotal"] = Math.min((+CalcIn["Charity"] + +CalcIn["CharityNoncash"]), charlimit);

	// Limit taxes paid if 2018 or later
	if (taxYear > 2017) {
		var taxlimit = (FilingStatusValue === "MFS") ? 5000 : 10000;
		CalcOut["TaxesPaid"] = Math.min(CalcIn["ActualTaxesPaid"], taxlimit);
	}
	else {
		CalcOut["TaxesPaid"] = CalcIn["ActualTaxesPaid"];
	}

	// Find the itemized deduction total
	ItemizedValue = +CalcOut["Medical"] + +CalcOut["TaxesPaid"] + +CalcIn["InterestPaid"] +
		+CalcOut["CharityTotal"] + +CalcIn["OtherItemized"];
	// don't use += in the following statement
	//if (taxYear < 2018) ItemizedValue = +ItemizedValue + +CalcIn["Miscellaneous"];
	CalcOut["Itemized"] = ItemizedValue;

	// Are itemized deductions limited by Pease (high income) deduction limit?
	//var itemval = (+CalcOut["Itemized"] == undefined) ? 0 : +CalcOut["Itemized"];
	var itemval = ItemizedValue;
	CalcOut["AGILimit"] = itemvallimit = +_ItemLimit[taxYear + ":" + FilingStatusValue]

	//if ( ((taxYear < 2018) || (taxYear > 2025))
	//&& (itemval > 0)
	//&& (+CalcOut["AGI"] > itemvallimit)) {
	//	Misc.disabled = false;
	//	// reduce itemized deductions by lesser of 3% of AGI or 80% non Misc
	//	// does not apply to medical, invest exp, gambling loss, casualty losses
	//	itemvalnonMisc = itemval - +CalcIn["Miscellaneous"];
	//	itemlimit80pct = itemvalnonMisc * .8;
	//	itemlimit3pct = +CalcOut["AGI"] * .03;
	//	itemval -= Math.min(itemlimit3pct, itemlimit80pct);
	//}
	//else {
		Misc.disabled = true;
		Misc.value = "";
	//}

	// Select the appropriate deduction
	if (FilingStatusValue == "MFS") {
		Deductions = (ItemizeRequired.checked) ? itemval : CalcOut["Standard"];
		}
	else {
		Deductions = Math.max(+CalcOut["Standard"], itemval);
	}
	
	CalcOut["Itemizing"] = (Deductions !== CalcOut["Standard"]); // T/F

	if (taxYear == 2020) {
		// Adjust the charitable standard deduction amount
		if ((! CalcOut["Itemizing"]) && (CalcOut["CharityStandard20"] == 0)) {
			CalcOut["CharityStandard20"] = Math.min(CalcIn["Charity"], charityLimit);
			CalcOut["TaxableSS"] += taxableSS_charitydiff; 
			CalcOut["Gross"] += taxableSS_charitydiff;
			CalcOut["Adjustments"] = CalcOut["Adjustments"] + CalcOut["CharityStandard20"];
			CalcOut["AGI"] = Math.max(0, CalcOut["AGI"] - CalcOut["CharityStandard20"] + taxableSS_charitydiff);
		}
	}

	if (taxYear == 2021) {
		// Adjust the charitable standard deduction amount
		CalcOut["CharityStandard"] = Math.min(CalcIn["Charity"], charityLimit);
		if (CalcOut["Itemized"] < CalcOut["CharityStandard"] + CalcOut["Standard"]) {
			CalcOut["Itemizing"] = false;
		}
		else CalcOut["CharityStandard"] = 0;
	}

	CalcOut["Deductions"] = Math.round(Deductions);

	// Calculate exemptions
	CalcOut["PreExemptAmount"] = Math.round(Math.max(0, +CalcOut["AGI"] - Deductions));
	var exemptRate = +_Standard[taxYear].split(",")[_Standard["Exemption"]];
	var exemptCount = (((FilingStatusValue == "MFJ") ? 2 : 1) + +DependentsValue);
	var exemptAmt = exemptRate * exemptCount;
	CalcOut["ExemptAmount"] = exemptAmt;
	document.getElementById("ExemptCount").innerHTML =
		exemptCount + " exemption" + ((exemptCount == 1) ? "" : "s") + " times " + exemptRate;
	//document.getElementById("ExemptAmount").innerHTML = exemptAmt;
	var elist = document.getElementsByClassName("exemptions");
	if (CalcType === "J") for (elistno = 0; elistno < elist.length; elistno++) {
		elist[elistno].style.display = (exemptAmt) ? "table-row" : "none";
	}
	var PostExemptAmount = Math.round(Math.max(0, +CalcOut["PreExemptAmount"] - exemptAmt));

	// QBI Calc
	var QBIDeduction = 0;
	QBILine.style.display = MFJMFSQBILine.style.display = "none";
	if (_LineNo[taxYear + ":QBI"]) {
		QBILine.style.display = MFJMFSQBILine.style.display = "table-row";
		var SENetIncome = +CalcIn["SEIncome"] - +CalcOut["SETaxCredit"] - +CalcIn["SESEP"] - +CalcOut["SEHI"];
		var QBIDeduction = _QBICalc(taxYear, FilingStatusValue, SENetIncome,
			(+CalcIn["QualDividends"] + +CalcOut["CapGains"]),
			CalcIn["QBIDividends"], PostExemptAmount);
		if (CalcType === "J") QBIOOS.style.display = (QBIDeduction == -1) ? "inline" : "none";
		CalcOut["QBIAmount"] = QBIDeduction = Math.max(0, +QBIDeduction);
	}
	else {
		if (CalcType === "J") {
			QBILine.style.display = "none";
			MFJMFSQBILine.style.display = "none";
		}
	}

	// Determine total deductions
	if (CalcOut["CharityStandard"]) {
		CalcOut["TotalDeductions"] = CalcOut["Standard"] + CalcOut["CharityStandard"] + QBIDeduction;
	}
	else {
		CalcOut["TotalDeductions"] = CalcOut["Deductions"] + QBIDeduction;
	}

	// Determine taxable amount
	//CalcOut["TaxableAmount"] = Math.max(0, PostExemptAmount - QBIDeduction);
	CalcOut["TaxableAmount"] = Math.max(0, +CalcOut["AGI"] - +CalcOut["TotalDeductions"]);

	// Determine Tax
	var CGtoUse = Math.min( +CalcIn["LTCapGains"], (+CalcIn["LTCapGains"] + +CalcIn["STCapGains"]));
	CG = +CalcIn["QualDividends"] + Math.max(0, CGtoUse);
	TaxResult = _TaxLookup(taxYear, FilingStatusValue, +CalcOut["TaxableAmount"], CG, true);
	CalcOut["Tax"] = TaxResult["tax"];

	// Show the tax bracket
	if (CalcType === "J") {
		if (TaxResult["bracket"]) {
			Bracket.innerHTML = "(" + TaxResult["bracket"] + " marginal bracket)";
		}
		else {
			Bracket.innerHTML = "";
		}
	}
	
	TaxTable.innerHTML = (CG) ? "Tax from Capital Gains Worksheet" : "Tax from tax tables" ;
	CalcOut["PreWorkingTax"] = WorkingTax = Math.round(+CalcOut["Tax"] + +CalcIn["AdditionalTax"]);

	// Limit Foreign Tax deduction
	forlimit = (FilingStatusValue == "MFJ") ? 600 : 300;
	CalcOut["Foreign"] = +CalcIn["ForeignCost"];
	if (+CalcIn["ForeignCost"] > forlimit) {
		Warn1116.style.display = "inline";
		if (! Allow1116.checked) CalcOut["Foreign"] = forlimit;
	}
	else if (CalcType === "J") {
		Warn1116.style.display = "none";
		Allow1116.checked = false;
	}
	CalcOut["ForeignUsed"] = NRUsed = Math.min(WorkingTax, +CalcOut["Foreign"]);
	WorkingTax -= NRUsed;

	// Limit Child Care Cost
	CalcOut["ChildCare"] = CalcOut["ChildCareUsed"] = NRUsedTemp = 0;
	CalcOut["ACCCredit"] = 0; // 2021 only
	if (+CCDependents.value < 0) CCDependents.value = "";
	if ((FilingStatusValue != "MFS") && (+CCDependents.value > 0)) {
		var cclimit = (+CCDependents.value  > 1) ? 6000 : 3000;
		if (taxYear == 2021) cclimit = (+CCDependents.value  > 1) ? 16000 : 8000;
		cccost = Math.min(+CalcIn["ChildCareCost"], cclimit);
		CCEarned = +CalcIn["Wages"] + +CalcIn["SEIncome"] - +CalcOut["SETaxCredit"];
		CC2Earned = 0; // Other partner
		CalcOut["ChildCare"] = Math.round(_ChildCare(taxYear, FilingStatusValue, CalcOut["AGI"], cccost, CCEarned, CC2Earned));
		if (taxYear == 2021) {
			CalcOut["ACCCredit"] = CalcOut["ChildCare"];
			CalcOut["ChildCare"] = 0;
		}
		else {
			CalcOut["ChildCareUsed"] = NRUsedTemp = Math.min(WorkingTax, +CalcOut["ChildCare"]);
		}
	}
	WorkingTax -= NRUsedTemp;
	NRUsed += NRUsedTemp;

	// Determine education expenses and credits
	CalcIn["EducationCost"] = CalcOut["Education"] = CalcOut["AOCCredit"] = "";
	if ((FilingStatusValue !== "MFS") && (EdiList.length)) {
		for (j = 1; j <= 3; j++) {
			if (EdiList[j].value) {
				etype = (EdtList[j].checked) ? "AOC" : "LLC";
				result = _EdCredit(taxYear, FilingStatusValue, AGI.innerHTML,
					etype, EdiList[j].value);
				// Don't use += below...
				CalcIn["EducationCost"] = +CalcIn["EducationCost"] + +EdiList[j].value;
				CalcOut["Education"] = +CalcOut["Education"] + +result[0];
				CalcOut["AOCCredit"] = +CalcOut["AOCCredit"] + +result[1];
			}
		}
	}
	CalcOut["EducationUsed"] = NRUsedTemp = Math.min(WorkingTax, CalcOut["Education"]);
	WorkingTax -= NRUsedTemp;
	NRUsed += NRUsedTemp;

	// Determine retirement expenses
	retlimit = (FilingStatusValue === "MFS") ? 2000 : 4000;
	CalcOut["Retirement"] = _Retirement(taxYear, FilingStatusValue, CalcOut["AGI"],
			Math.min(CalcIn["RetirementCost"], retlimit), 0);
	CalcOut["RetirementUsed"] = NRUsedTemp = Math.round(Math.min(WorkingTax, +CalcOut["Retirement"]));
	WorkingTax -= NRUsedTemp;
	NRUsed += NRUsedTemp;

	// Get the CTC and ACTC amounts
	var CTCresult = [];
	CTCresult = _CTCLookup(taxYear, FilingStatusValue, CTCDependentsValue, DependentsValue,
			(+CalcIn["Wages"] + +CalcIn["SEIncome"]), +CalcOut["AGI"]);
	var CTCAmount = +CTCresult[0];
	var FTCAmount = +CTCresult[1];
	var ACTCLimit = +CTCresult[2];
	CalcOut["CTCredit"] = FTCAmount + ( (taxYear == 2021) ? 0 : CTCAmount );

	// FTC - Current assumption - Use FTC before CTC but use the same line
	NRUsedTemp = FTCUsed = Math.min(WorkingTax, FTCAmount); 
	WorkingTax -= NRUsedTemp;
	NRUsed += NRUsedTemp;

	// CTC
	if (taxYear != 2021 ) {
		NRUsedTemp = Math.min(WorkingTax, CTCAmount);
		WorkingTax -= NRUsedTemp;
		NRUsed += NRUsedTemp;
		CalcOut["CTCreditUsed"] = FTCUsed + NRUsedTemp;
	}
	else {
		CalcOut["CTCreditUsed"] = FTCUsed;
	}
	
	// ACTC
	if (taxYear != 2021) {
		ACTCAmount = Math.min(Math.max(0, CTCAmount - NRUsedTemp), ACTCLimit);
	}
	else {
		ACTCAmount = CTCAmount;
	}
	CalcOut["ACTCredit"] = ACTCAmount;

	// Residential and other credits
	NRUsedTemp = Math.min(WorkingTax, +CalcIn["Residential"]);
	WorkingTax -= NRUsedTemp;
	NRUsed += NRUsedTemp;
	CalcOut["ResidentialUsed"] = NRUsedTemp;

	// Totals
	CalcOut["Nonrefundable"] = NRUsed;
	CalcOut["TaxPostCredits"] = Math.round(Math.max(0, CalcOut["PreWorkingTax"] - NRUsed));

	// Get the EIC amount
	var EICAmount = 0;
	var EICInvest = +CalcOut["CapGains"] + +CalcIn["Interest"] + +CalcIn["TaxExempt"] + +CalcIn["Dividends"];
	var EICEarned = +CalcIn["Wages"] + +CalcIn["SEIncome"] - +CalcOut["SETaxCredit"];
	CalcOut["EICCredit"] = EICAmount = +_EICLookup(taxYear, FilingStatusValue, EICDependentsValue,
		EICEarned, EICInvest, CalcOut["AGI"], TP65.checked, SP65.checked);

	// Does NIIT apply?
	var NIITAmount = _NIITCalc(taxYear, FilingStatusValue, +CalcOut["AGI"], +CalcIn["Interest"],
			CalcIn["Dividends"], +CalcOut["CapGains"], +CalcIn["NIITExpenses"]);
	CalcOut["NIITTax"] = NIITAmount;
	if (CalcType === "J") {
		if ((NIITAmount > 0) || (CalcIn["NIITExpenses"] != "")) {
			NIITRow.style.display = "table-row";
			MFJMFSNIITRow.style.display = "table-row";
		}
		else {
			NIITRow.style.display = "none";
			MFJMFSNIITRow.style.display = "none";
		}
	}

	// Total the tax amounts
	CalcOut["TotalTax"] = Math.round(+CalcOut["TaxPostCredits"] + +CalcOut["SETax"] + +CalcOut["NIITTax"] + +CalcIn["OtherTaxes"]);

	// Determine tax due
	CalcOut["TaxDue"] = 
	taxdue = Math.round(+CalcOut["TotalTax"]
		- +CalcOut["ACTCredit"]
		- +CalcOut["ACCCredit"]
		- +CalcOut["EICCredit"]
		- +CalcOut["AOCCredit"]
		- +CalcIn["RecoveryCredit"]
		- +CalcIn["Refundable"]);
	mustFile = (Math.round(+CalcOut["Tax"] + +CalcOut["SETax"] + +CalcIn["OtherTaxes"]) > 0);
	if ((FilingStatusValue == "MFJ") && IsDependent.checked && mustFile) {
		DependentWarning.innerHTML = "WARNING: You cannot file as MFJ and still be a dependent if filing for other than a refund of withholding.";
	}

	RefundComment.style.display = (taxdue < 0) ? "inline" : "none" ;

	return (CalcOut);

} // end Tax_Calc()
