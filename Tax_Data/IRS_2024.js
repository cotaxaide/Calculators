        //----------------------------------------------------------------------------------------
        var _TY = _StopYear = "2024";	// Needs update // Tax parameters
	_Preliminary[_TY] = true;	// Needs update // Preliminary information
        //----------------------------------------------------------------------------------------

        // Form line numbers
        // var LineNo = [];	// Needs update
		// 1040
		_LineNo[_TY+":Salary"] = "1z";	// Needs update	
                _LineNo[_TY+":Earned"] = "1z&S1-3";	// Needs update
                _LineNo[_TY+":TaxExInc"] = "2a";	// Needs update
                _LineNo[_TY+":QualDiv"] = "3a";	// Needs update	
		_LineNo[_TY+":Pension"] = "4b+5b";	// Needs update
                _LineNo[_TY+":SSI"] = "6a";	// Needs update	
                _LineNo[_TY+":SST"] = "6b";	// Needs update
                _LineNo[_TY+":CapGains"] = "7";	// Needs update
                _LineNo[_TY+":AGI"] = "11";	// Needs update
                _LineNo[_TY+":Deductions"] = "12";	// Needs update
                _LineNo[_TY+":QBI"] = "13";	// Needs update	
                _LineNo[_TY+":Taxable"] = "15";	// Needs update
                _LineNo[_TY+":TaxAmount"] = "16";	// Needs update
                _LineNo[_TY+":CTC"] = "19";	// Needs update	
                _LineNo[_TY+":COD"] = "19";	// Needs update
                _LineNo[_TY+":NRCredit"] = "21";	// Needs update
                _LineNo[_TY+":EIC"] = "27";	// Needs update	
                _LineNo[_TY+":ACTC"] = "28";	// Needs update	
                _LineNo[_TY+":AOC"] = "29";	// Needs update
		// Schedules 1-3
		_LineNo[_TY+":Business"] = "S1-3";	// Needs update
                _LineNo[_TY+":SEP"] = "S1-16";	// Needs update	
                _LineNo[_TY+":SEHI"] = "S1-17";	// Needs update
                _LineNo[_TY+":TNF"] = "";	// Needs update
                _LineNo[_TY+":IRADed"] = "S1-20";	// Needs update
                _LineNo[_TY+":StudLoan"] = "S1-21";	// Needs update
                _LineNo[_TY+":Adjustments"] = "S1-24";	// Needs update
                _LineNo[_TY+":ExcessAPTC"] = "S2-2";	// Needs update
                _LineNo[_TY+":Foreign"] = "S3-1";	// Needs update
                _LineNo[_TY+":Care"] = "S3-2";	// Needs update	
                _LineNo[_TY+":LLC"] = "S3-3";	// Needs update	
                _LineNo[_TY+":Retire"] = "S3-4";	// Needs update
                _LineNo[_TY+":IRP"] = "";	// Needs update	
                _LineNo[_TY+":NetPTC"] = "S3-9";	// Needs update
		// Qualified dividends and cap gains worksheet
                _LineNo[_TY+":QDCG"] = "12";	// Needs update	
		// Schedule A
	        _LineNo[_TY+":StateWH"] = "5a";	// Needs update
	        _LineNo[_TY+":Property"] = "5b";	// Needs update	 
		_LineNo[_TY+":SALT"] = "5d";	// Needs update		
                _LineNo[_TY+":CashContrib"] = "11";	// Needs update
                _LineNo[_TY+":ItemDed"] = "17";	// Needs update	
		_LineNo[_TY+":UseSchedA"] = "18";	// Needs update
		// Form 2555
	        _LineNo[_TY+":F2555"] = "45 & 50";	// Needs update
		// Form 8962
	        _LineNo[_TY+":F8962A"] = "11a";	// Needs update	
	        _LineNo[_TY+":F8962B"] = "11b";	// Needs update
	        _LineNo[_TY+":F8962F"] = "11f";	// Needs update

        // EdExpenseLimits
		// Source: Pub 970 or Form 8863 (AOC & LLC)
		// For TNF:
                _EdExpenseLimits["MAX"]  = 0;	// First limit
                _EdExpenseLimits["AGI1"] = 1;	// AGI max for first limit
                _EdExpenseLimits["MAX1"] = 2;	// Second limit
                _EdExpenseLimits["AGI2"] = 3;	// AGI max for second limit
                _EdExpenseLimits["MAX2"] = 4;	// Final limit
		// For AOC and LLC:
		_EdExpenseLimits["MAX"]  = 0;	// First limit
		_EdExpenseLimits["SNG1"] = 1;	// AGI max for first limit (SNG, QSS, HOH)
		_EdExpenseLimits["SNG2"] = 2;	// AGI phase out (SNG, QSS, HOH)
		_EdExpenseLimits["MFJ1"] = 3;	// AGI max for first limit (MFJ)
		_EdExpenseLimits["MFJ2"] = 4;	// AGI phase out (MFJ)
		// For SAV:
		_EdExpenseLimits["N/A"]  = 0;	// N/A
		_EdExpenseLimits["SNG"]  = 1;	// SAV phase out starts (SNG, HOH)
		_EdExpenseLimits["N/A"]  = 2;	// SAV gone (SNG, HOH)
		_EdExpenseLimits["N/A"]  = 3;	// SAV phase out starts (MFJ, QSS)
		_EdExpenseLimits["N/A"]  = 4;	// SAV gone (MFJ, QSS)
        
		_EdExpenseLimits[_TY+":TNF"] = "    0,     0,    0,      0,       0";	// Needs update
		_EdExpenseLimits[_TY+":LLC"] = "10000, 59000, 69000, 118000, 138000";	// Needs update
		_EdExpenseLimits[_TY+":AOC"] = " 4000, 80000, 90000, 160000, 180000";	// Needs update
		_EdExpenseLimits[_TY+":SAV"] = "  N/A, 82350, 96100, 123550, 151600";	// Needs update	// Tentative
		_EdExpenseLimits[_TY+":INT"] = "  2500, 70000, 85000, 145000, 175000";	// Needs update	

        // var Standard = [];	// Needs update	// Exemption and standard deductions
                _Standard["Exemption"] = 0;
                _Standard["Minimum"] = 1;
                _Standard["SNG"] = 2;
                _Standard["MFS"] = 4;
                _Standard["MFJ"] = 6;
                _Standard["QSS"] = 8;
                _Standard["WID"] = 8;
                _Standard["HOH"] = 10;
		_Standard["Kid"] = 12;	// kiddie tax unearned income reporting limit (from Form 8815)
		_Standard["DepAsRel"] = 13;	// maximum earned income to be a Dependent as a Relative
		_Standard["DependInc"] = 14;	// increment to earned income for a dependent

                // Standard[year] = Exemption,Mimimum,  SNG,inc,    MFS,inc,    MFJ,inc,    QSS,inc,    HOH,inc,  Kiddie, DepAsRel, DependInc
                _Standard[_TY] = "          0,1250,   14600,1950, 14600,1550, 29200,1550, 29200,1550, 21900,1950,  2500,   5050,      400";	// Needs update

	// var ItemLimit = [];	// Needs update // Limit repealed by new tax law
                _ItemLimit[_TY+":SNG"] = 10000000;
                _ItemLimit[_TY+":MFJ"] = 10000000;
                _ItemLimit[_TY+":QSS"] = 10000000;
                _ItemLimit[_TY+":WID"] = 10000000;
                _ItemLimit[_TY+":MFS"] = 10000000;
                _ItemLimit[_TY+":HOH"] = 10000000;

        // var TaxRates = [];	// Needs update
                _TaxRates[_TY+":PCT"] = " 0.10,  0.12,   0.22,   0.24,   0.32,   0.35,   0.37";
                _TaxRates[_TY+":MFS"] = "11600, 47150,  100525, 191950, 243725, 365600";
                _TaxRates[_TY+":SNG"] = "11600, 47150,  100525, 191950, 243725, 609350";
                _TaxRates[_TY+":MFJ"] = 
                _TaxRates[_TY+":QSS"] = "23200, 94300, 201050, 383900, 487450, 731200";
                _TaxRates[_TY+":WID"] = "23200, 94300, 201050, 383900, 487450, 731200";
                _TaxRates[_TY+":HOH"] = "16550, 63100, 100500, 191950, 243700, 609350";
                _TaxRates[_TY+":TRUST"]=" 3100,  3100,   3100,  11150,  11150,  15200";

	// CGRates
                _CGRates[_TY+":PCT"] = "    0,   0.15,   0.20";
                _CGRates[_TY+":SNG"] = "47025, 518900";
                _CGRates[_TY+":MFJ"] =
                _CGRates[_TY+":QSS"] =
                _CGRates[_TY+":WID"] = "94050, 583750";
                _CGRates[_TY+":MFS"] = "47025, 291850";
                _CGRates[_TY+":HOH"] = "63000, 551350";
                _CGRates[_TY+":TRUST"]=" 3150,  15450";

	// Self-employment tax rates
		_SETaxRate[_TY+":SSRate"] = 0.124;
		_SETaxRate[_TY+":MCRate"] = 0.029;
		_SETaxRate[_TY+":SSWageCap"] = 167700;
		_SETaxRate[_TY+":AMCRate"] = 0.009;
		_SETaxRate[_TY+":AMCStart"] = 200000;

	// var MedicalExclusion = [];	// Needs update
		_MedicalExclusion[_TY] = "0.075, 0.075";	// Needs update

	// StateTaxCap
		_SALT[_TY] = 10000;	// Needs update

        // var CTCLimits = [];	// Needs update
                // Source: 1040 instructions for line 52 and Form 8812
                // MFJ,SNG,HOH,QSS,MFS
                _CTCLimits["MFJ"] = 0;
                _CTCLimits["SNG"] = 1;
                _CTCLimits["QSS"] = 1;
                _CTCLimits["WID"] = 1;
                _CTCLimits["MFS"] = 2;
                _CTCLimits["HOH"] = 3;
                _CTCLimits[_TY+":AGICap"]  = "400000, 200000, 200000, 200000";	// Needs update
		_CTCLimits[_TY+":CTCRate"] = 2000;	// Needs update
                _CTCLimits[_TY+":AGI0Cap"] = "150000,  75000,  75000, 112500";	// Needs update
		_CTCLimits[_TY+":CTC0Rate"] = 0;	// Needs update	
		_CTCLimits[_TY+":CTC6Rate"] = 1000;	// Needs update
		_CTCLimits[_TY+":FTCRate"] = 500;	// Needs update
		_CTCLimits[_TY+":ACTCRate"] = 1700;
		_CTCLimits[_TY+":ACTCThreshold"] = 2500;	// Needs update

       	// var CareRates = [];	// Needs update
		// Source: Pub 503
		_CareLimits[_TY+":RateMax"] = 35;	// Needs update
		_CareLimits[_TY+":RateMin"] = 20;	// Needs update
		_CareLimits[_TY+":AGICap"] = 15000;	// Needs update
		_CareLimits[_TY+":AGICap2"] = 400000;	// Needs update

        // var EICRates = [];	// Needs update
                // Source: search IRS web site "EIC limits" (easier than 1040 instructions)
		// In 1040 instructions, see the EIC table footnotes for limits
		// AGISNG and AGIMFJ are the amounts above which AGI must also be tested
                // SNG and MFJ are the max AGI endpoints of the phaseout
		// QSS and HOH are same as SNG, MFS doesn't qualify
		// MAX is the cap amount of EIC
		// RATEUP is the ramp-up rate to the cap
		// RATEDOWN is the ramp-down rate from the cap
		// INVEST is the max investment limit to qualify for EIC
                // Columns are:			   0       1       2       3+ children
                _EICRates[_TY+":EARNED"] =   "  8260,  12390,  17400,  17400"; // Earned Income
                _EICRates[_TY+":MAX"] =      "   632,   4213,   6960,   7830";
                _EICRates[_TY+":AGISNG"] =   " 10330,  22720,  22720,  22720"; // Threshold Phaseout
                _EICRates[_TY+":SNG"] =      " 18591,  49084,  55768,  59899"; // Completed Phaseout
                _EICRates[_TY+":AGIMFJ"] =   " 17250,  29640,  29640,  29640"; // Threshold Phaseout
                _EICRates[_TY+":MFJ"] =      " 25511,  56004,  62688,  66819"; // Completed Phaseout
                _EICRates[_TY+":RATEUP"] =   "0.0765,   0.34,    0.4,   0.45";	// Needs update?
                _EICRates[_TY+":RATEDOWN"] = "0.0765, 0.1598, 0.2106, 0.2106";	// Needs update?
                _EICRates[_TY+":INVEST"] = 11600; // Excessive investment income

	// var FPL = [];	// Needs update
		_FPL[_TY+":US"] =     "12880, 4540";	// Needs update
		_FPL[_TY+":Alaska"] = "16090, 5680";	// Needs update
		_FPL[_TY+":Hawaii"] = "14820, 5220";	// Needs update

	// var PTCFactorVal = [];	// Needs update
		// A,B are FPL% ranges, C-D are PTC multipliers * 100
		// A-B = C-D : (C+(%%%-A)*(D-C)/(B-A))/100
		// 0-133 = 2-2
		// 133-150 = 3-4
		// 150-200 = 4-6.3
		// 200-250 = 6.3-8.05
		// 250-300 = 8.05-9.5
		// 300-400 = 9.5-9.5
		// col 4 = SNG APTC repayment limit

		_PTCFactorVal[_TY+":0"] =   "133, 0.00, 0.00,  375";
		_PTCFactorVal[_TY+":133"] = "150, 0.00, 2.00,  375";
		_PTCFactorVal[_TY+":150"] = "200, 2.00, 4.00,  950";
		_PTCFactorVal[_TY+":200"] = "250, 4.00, 6.00,  950";
		_PTCFactorVal[_TY+":250"] = "300, 6.00, 8.50,  950";
		_PTCFactorVal[_TY+":300"] = "400, 8.50, 8.50, 1575";

	// var AffordRate = [];	// Needs update
		_AffordRate[_TY] = 0.0805;	// Needs update	

	// var AffordRateEmployerSelf = [];	// Needs update
		_AffordRateEmployerSelf[_TY] = 0.0986;	// Needs update	

	// var Qualified Business Income Deduction
		_QBILimits[_TY+":Rate"] = "0.2";	// Needs update
		_QBILimits[_TY+":MFJ"] = "383900";
		_QBILimits[_TY+":MFS"] =
		_QBILimits[_TY+":SNG"] =
		_QBILimits[_TY+":HOH"] =
		_QBILimits[_TY+":QSS"] =
		_QBILimits[_TY+":WID"] = "191950";

	// Net Investment Income Tax (Form 8960)
		_NIITLimits[_TY+":Rate"] = "0.038";	// Needs update
		_NIITLimits[_TY+":SNG"] = 		// Need update
		_NIITLimits[_TY+":HOH"] = "200000"		// Need update
		_NIITLimits[_TY+":MFJ"] = 		// Need update
		_NIITLimits[_TY+":QSS"] = "250000";	// Needs update
		_NIITLimits[_TY+":WID"] = "250000";	// Needs update
		_NIITLimits[_TY+":MFS"] = "125000";	// Needs update

	// Alternative Minimum Tax
		// For KIDDIE, exempt amount is increment above earned income
		//                  Exempt  Phaseout	Complete
		_AMT[_TY+":MFJ"] = "133300, 1218700,	1751900";
		_AMT[_TY+":MFS"] = " 66650,  609350,	875950";
		_AMT[_TY+":SNG"] =
		_AMT[_TY+":QSS"] =
		_AMT[_TY+":WID"] =
		_AMT[_TY+":HOH"] = " 87500,   609350,	952150";
		_AMT[_TY+":TRUST"]=" 29900,    99700,	219300";
		_AMT[_TY+":KIDDIE"]=" 9250,   510300";	// (Exempt + earned) up to SNG rate		// Need update
		
	// Health Savings Account (HSA) Contribution limits
		_HSA[_TY+":IND"] = 4150;
		_HSA[_TY+":FAM"] = 8300;

	// Retirement Savings Contribution (Form 8880)
		_RETIRE[_TY+":Rate"]= "	 0.5,	  0.2,	  0.1,	0";
		_RETIRE[_TY+":MFJ"] = "43500,	47500,	76500";
		_RETIRE[_TY+":HOH"] = "32625,	35625,	57375";
		_RETIRE[_TY+":SNG"] = 
		_RETIRE[_TY+":QSS"] = 
		_RETIRE[_TY+":WID"] = 
		_RETIRE[_TY+":MFS"] = "21750,	23750,	38250";

	// IRA Adjustment limits
		_IRALimits[_TY+":AGE"] = 50;	// Needs update
		_IRALimits[_TY+":MAX"] = 6500;	// Needs update
		_IRALimits[_TY+":SRMAX"] = 7500;	// Needs update
		_IRALimits[_TY+":SNG"] = 		// Need update
		_IRALimits[_TY+":MFS"] = 		// Need update
		_IRALimits[_TY+":HOH"] = "78000";	// Needs update
		_IRALimits[_TY+":QSS"] = "129000";	// Needs update
		_IRALimits[_TY+":WID"] = "129000";	// Needs update
		// Col 1 = ret plan, Col 2 = no ret plan
		_IRALimits[_TY+":MFJ"] = "129000, 214000";	// Needs update
		
	// Medicare PartB MFS Premium Threshhold
		_MEDBMFS[_TY] = 91000;	// Needs update

	// Educator expenses
		_EDExpenses[_TY+":EDEXP"] = 300;
