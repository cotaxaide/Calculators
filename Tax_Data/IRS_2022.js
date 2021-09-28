        //----------------------------------------------------------------------------------------
        var _TY = _StopYear = "2022"; // Tax parameters
	_Preliminary[_TY] = true; // Preliminary information
        //----------------------------------------------------------------------------------------

        // Form line numbers
        // var LineNo = [];
		// 1040
		_LineNo[_TY+":Salary"] = "1";			// Needs update
                _LineNo[_TY+":Earned"] = "1&S1-3";		// Needs update
                _LineNo[_TY+":TaxExInc"] = "2a";		// Needs update
                _LineNo[_TY+":QualDiv"] = "3a";			// Needs update
		_LineNo[_TY+":Pension"] = "4b+5b";		// Needs update
                _LineNo[_TY+":SSI"] = "6a";			// Needs update
                _LineNo[_TY+":SST"] = "6b";			// Needs update
                _LineNo[_TY+":CapGains"] = "7";			// Needs update
                _LineNo[_TY+":AGI"] = "11";			// Needs update
                _LineNo[_TY+":Deductions"] = "12";		// Needs update
                _LineNo[_TY+":QBI"] = "13";			// Needs update
                _LineNo[_TY+":Taxable"] = "15";		// Needs update
                _LineNo[_TY+":TaxAmount"] = "16";		// Needs update
                _LineNo[_TY+":CTC"] = "19";			// Needs update
                _LineNo[_TY+":COD"] = "19";			// Needs update
                _LineNo[_TY+":NRCredit"] = "20";		// Needs update
                _LineNo[_TY+":EIC"] = "27";			// Needs update
                _LineNo[_TY+":ACTC"] = "28";			// Needs update
                _LineNo[_TY+":AOC"] = "29";			// Needs update
		// Schedules 1-3
		_LineNo[_TY+":Business"] = "S1-3";		// Needs update
                _LineNo[_TY+":SEP"] = "S1-15";			// Needs update
                _LineNo[_TY+":SEHI"] = "S1-16";			// Needs update
                _LineNo[_TY+":TNF"] = "";			// Needs update
                _LineNo[_TY+":Adjustments"] = "S1-22";		// Needs update
                _LineNo[_TY+":ExcessAPTC"] = "S2-2";		// Needs update
                _LineNo[_TY+":Foreign"] = "S3-1";		// Needs update
                _LineNo[_TY+":Care"] = "S3-2";			// Needs update
                _LineNo[_TY+":LLC"] = "S3-3";			// Needs update
                _LineNo[_TY+":Retire"] = "S3-4";		// Needs update
                _LineNo[_TY+":IRP"] = "";			// Needs update
                _LineNo[_TY+":NetPTC"] = "S3-9";		// Needs update
		// Qualified dividends and cap gains worksheet
                _LineNo[_TY+":QDCG"] = "12";	// Needs update
		// Schedule A
	        _LineNo[_TY+":StateWH"] = "5a"; 	// Needs update
	        _LineNo[_TY+":Property"] = "5b"; 	// Needs update
		_LineNo[_TY+":SALT"] = "5d";	// Needs update
                _LineNo[_TY+":CashContrib"] = "11";	// Needs update
                _LineNo[_TY+":ItemDed"] = "17";	// Needs update
		_LineNo[_TY+":UseSchedA"] = "18";	// Needs update
		// Form 2555	// Needs update
	        _LineNo[_TY+":F2555"] = "45 & 50";	// Needs update
		// Form 8962
	        _LineNo[_TY+":F8962A"] = "11a";			// Needs update
	        _LineNo[_TY+":F8962B"] = "11b";			// Needs update
	        _LineNo[_TY+":F8962F"] = "11f";			// Needs update

        // var EdExpenseLimits = [];
		// Source: Pub 970 or Form 8863 (AOC & LLC)
		// For TNF:
                _EdExpenseLimits["MAX"]  = 0;	// First limit	// Needs update
                _EdExpenseLimits["AGI1"] = 1;	// AGI max for first limit	// Needs update
                _EdExpenseLimits["MAX1"] = 2;	// Second limit	// Needs update
                _EdExpenseLimits["AGI2"] = 3;	// AGI max for second limit	// Needs update
                _EdExpenseLimits["MAX2"] = 4;	// Final limit	// Needs update
		// For AOC and LLC:
		_EdExpenseLimits["MAX"]  = 0;	// First limit	// Needs update
		_EdExpenseLimits["SNG1"] = 1;	// AGI max for first limit (SNG, WID, HOH)	// Needs update
		_EdExpenseLimits["SNG2"] = 2;	// AGI phase out (SNG, WID, HOH)	// Needs update
		_EdExpenseLimits["MFJ1"] = 3;	// AGI max for first limit (MFJ)	// Needs update
		_EdExpenseLimits["MFJ2"] = 4;	// AGI phase out (MFJ)	// Needs update
		// For SAV:
		_EdExpenseLimits["N/A"]  = 0;	// N/A	// Needs update
		_EdExpenseLimits["SNG"]  = 1;	// SAV phase out starts (SNG, HOH)	// Needs update
		_EdExpenseLimits["N/A"]  = 2;	// SAV gone (SNG, HOH)	// Needs update
		_EdExpenseLimits["N/A"]  = 3;	// SAV phase out starts (MFJ, WID)	// Needs update
		_EdExpenseLimits["N/A"]  = 4;	// SAV gone (MFJ, WID)	// Needs update
        
		_EdExpenseLimits[_TY+":TNF"] = "    0,     0,    0,      0,       0";		// Needs update
		_EdExpenseLimits[_TY+":LLC"] = "10000, 59000, 69000, 118000, 138000";		// Needs update
		_EdExpenseLimits[_TY+":AOC"] = " 4000, 80000, 90000, 160000, 180000";		// Needs update
		_EdExpenseLimits[_TY+":SAV"] = "  N/A, 82350, 96100, 123550, 151600";	// Tentative	// Needs update
		_EdExpenseLimits[_TY+":INT"] = "  2500, 70000, 85000, 140000, 170000";	// Needs update

        // var Standard = [];	// Exemption and standard deductions
                _Standard["Exemption"] = 0;	// Needs update
                _Standard["Minimum"] = 1;	// Needs update
                _Standard["SNG"] = 2;	// Needs update
                _Standard["MFS"] = 4;	// Needs update
                _Standard["MFJ"] = 6;	// Needs update
                _Standard["WID"] = 8;	// Needs update
                _Standard["HOH"] = 10;	// Needs update
		_Standard["Kid"] = 12; // kiddie tax unearned income reporting limit (from Form 8815)	// Needs update
		_Standard["DepAsRel"] = 13; // maximum earned income to be a Dependent as a Relative	// Needs update

                // Standard[year] = Exemption,Mimimum,  SNG,inc,    MFS,inc,    MFJ,inc,    WID,inc,    HOH,inc,  Kiddie, DepAsRel
                _Standard[_TY] = "          0,1100,   12700,1750, 12700,1400, 25400,1400, 25400,1400, 18950,1750,  2200,   4300";		// Tentative for testing // Needs update

	// var ItemLimit = []; // Limit repealed by new tax law
                _ItemLimit[_TY+":SNG"] = 10000000; //261500;	// Needs update
                _ItemLimit[_TY+":MFJ"] = 10000000; //313800;	// Needs update
                _ItemLimit[_TY+":WID"] = 10000000; //313800;	// Needs update
                _ItemLimit[_TY+":MFS"] = 10000000; //156900;	// Needs update
                _ItemLimit[_TY+":HOH"] = 10000000; //287650;	// Needs update

        // var TaxRates = [];
                _TaxRates[_TY+":PCT"] = " 0.10,  0.12,   0.22,   0.24,   0.32,   0.35,   0.37";	// Needs update
                _TaxRates[_TY+":SNG"] = "10025, 40925,  87225, 166550, 211500, 528800";		// for testing	// Needs update
                _TaxRates[_TY+":MFJ"] = "20050, 81850, 174450, 333100, 423000, 634550";		// for testing	// Needs update
                _TaxRates[_TY+":WID"] = "20050, 81850, 174450, 333100, 423000, 634550";		// for testing	// Needs update
                _TaxRates[_TY+":MFS"] = "10025, 40925,  87225, 166550, 211500, 317275";		// for testing	// Needs update
                _TaxRates[_TY+":HOH"] = "14300, 54700,  87200, 166500, 211475, 528800";		// for testing	// Needs update
                _TaxRates[_TY+":TRUST"]=" 2600,  2600,   2600,   9450,   9450,  12950";		// for testing	// Needs update

	// CGRates
                _CGRates[_TY+":PCT"] = "    0,   0.15,   0.20";	// Needs update
                _CGRates[_TY+":SNG"] = "40800, 450250";			// Needs update
                _CGRates[_TY+":MFJ"] = "81600, 507200";			// Needs update
                _CGRates[_TY+":WID"] = "81600, 507200";			// Needs update
                _CGRates[_TY+":MFS"] = "40800, 252500";			// Needs update
                _CGRates[_TY+":HOH"] = "54600, 478450";			// Needs update
                _CGRates[_TY+":TRUST"]=" 2650,  13150";			// Needs update

	// Self-employment tax rates
		_SESocSec[_TY] = 0.124;			// Needs update
		_SEMedicare[_TY] = 0.029;		// Needs update
		_SEMaxWages[_TY] = 128400;		// Needs update

	// var MedicalExclusion = [];
		_MedicalExclusion[_TY] = "0.075, 0.075";		// Needs update

	// StateTaxCap
		_SALT[_TY] = 10000;			// New tax law	// Needs update

        // var CTCLimits = [];
                // Source: 1040 instructions for line 52 and Form 8812
                // MFJ,SNG,HOH,WID,MFS
                _CTCLimits["MFJ"] = 0;
                _CTCLimits["SNG"] = 1;
                _CTCLimits["WID"] = 1;
                _CTCLimits["MFS"] = 2;
                _CTCLimits["HOH"] = 3;
                _CTCLimits[_TY+":AGICap"]  = "400000, 200000, 200000, 200000";	// Needs update
		_CTCLimits[_TY+":CTCRate"] = 2000;
                _CTCLimits[_TY+":AGI0Cap"] = "150000,  75000,  75000, 112500";	// Needs update
		_CTCLimits[_TY+":CTC0Rate"] = 1600;
		_CTCLimits[_TY+":CTC6Rate"] = 1000;
		_CTCLimits[_TY+":FTCRate"] = 500;			// Needs update
		_CTCLimits[_TY+":ACTCRate"] = 1000000;	// not limited
		_CTCLimits[_TY+":ACTCThreshold"] = 0;

       	// var CareRates = [];
		// Source: Pub 503
		_CareLimits[_TY+":RateMax"] = 50;
		_CareLimits[_TY+":RateMin"] = 35;
		_CareLimits[_TY+":AGICap"] = 125000;
		_CareLimits[_TY+":AGICap"] = 125000;

        // var EICRates = [];
                // Source: search IRS web site "EIC limits" (easier than 1040 instructions)
		// In 1040 instructions, see the EIC table footnotes for limits
		// AGISNG and AGIMFJ are the amounts above which AGI must also be tested
                // SNG and MFJ are the max AGI endpoints of the phaseout
		// WID and HOH are same as SNG, MFS doesn't qualify
		// MAX is the cap amount of EIC
		// RATEUP is the ramp-up rate to the cap
		// RATEDOWN is the ramp-down rate from the cap
		// INVEST is the max investment limit to qualify for EIC
                // Columns are: 0, 1, 2, 3 children
		// Needs update
                _EICRates[_TY+":AGISNG"] =   "  8880,  19520,  19520,  19520";	// Needs update
                _EICRates[_TY+":AGIMFJ"] =   " 14820,  25470,  25470,  25470";	// Needs update
                _EICRates[_TY+":SNG"] =      " 21430,  42158,  47915,  51464";	// Needs update
                _EICRates[_TY+":MFJ"] =      " 27380,  48108,  53865,  57414";	// Needs update
                _EICRates[_TY+":MAX"] =      "  1502,   3618,   5980,   6728";	// Needs update
                _EICRates[_TY+":RATEUP"] =   "0.0765,   0.34,    0.4,   0.45";	// Needs update
                _EICRates[_TY+":RATEDOWN"] = "0.0765, 0.1598, 0.2106, 0.2106";	// Needs update
                _EICRates[_TY+":INVEST"] = 10000;		// Tentative	// Needs update

	// var FPL = [];
		_FPL[_TY+":US"] =     "12880, 4540";	// Needs update
		_FPL[_TY+":Alaska"] = "16090, 5680";	// Needs update
		_FPL[_TY+":Hawaii"] = "14820, 5220";	// Needs update

	// var PTCFactorVal = [];
		// A,B are FPL% ranges, C-D are PTC multipliers * 100
		// A-B = C-D : (C+(%%%-A)*(D-C)/(B-A))/100
		// 0-133 = 2-2
		// 133-150 = 3-4
		// 150-200 = 4-6.3
		// 200-250 = 6.3-8.05
		// 250-300 = 8.05-9.5
		// 300-400 = 9.5-9.5
		// col 4 = SNG APTC repayment limit

		_PTCFactorVal[_TY+":0"] =   "133, 2.00, 2.00,  0";		// col 1-3 Needs update
		_PTCFactorVal[_TY+":133"] = "150, 2.00, 2.00,  0";		// col 1-3 Needs update
		_PTCFactorVal[_TY+":150"] = "200, 2.00, 2.00,  0";		// col 1-3 Needs update
		_PTCFactorVal[_TY+":200"] = "250, 2.00, 4.00,  0";		// col 1-3 Needs update
		_PTCFactorVal[_TY+":250"] = "300, 4.00, 6.00,  0";		// col 1-3 Needs update
		_PTCFactorVal[_TY+":300"] = "400, 6.00, 8.50,  0";		// col 1-3 Needs update

	// var AffordRate = [];
		_AffordRate[_TY] = 0.0805;		// Needs update

	// var AffordRateEmployerSelf = [];
		_AffordRateEmployerSelf[_TY] = 0.0986;		// Needs update

	// var Qualified Business Income Deduction
		_QBILimits[_TY+":Rate"] = "0.2";
		_QBILimits[_TY+":MFJ"] = "340000";	// Needs update
		_QBILimits[_TY+":MFS"] = "170025";	// Needs update
		_QBILimits[_TY+":SNG"] =
		_QBILimits[_TY+":HOH"] =
		_QBILimits[_TY+":WID"] = "170000";	// Needs update

	// Net Investment Income Tax
		_NIITLimits[_TY+":Rate"] = "0.038";			// Needs update
		_NIITLimits[_TY+":MFJ"] = "300000";			// Needs update
		_NIITLimits[_TY+":MFS"] = "150000";			// Needs update
		_NIITLimits[_TY+":SNG"] = 
		_NIITLimits[_TY+":HOH"] = 
		_NIITLimits[_TY+":WID"] = "300000";			// Needs update

	// Alternative Minimum Tax
		//                  Exempt  Phaseout
		_AMT[_TY+":MFJ"] = "115800, 1057600";			// Needs update
		_AMT[_TY+":SNG"] = "72900,   528800";			// Needs update
		_AMT[_TY+":MFS"] = "56700,   528800";			// Needs update
		_AMT[_TY+":WID"] = "72900,   528800";			// Needs update
		_AMT[_TY+":HOH"] = "72900,   528800";			// Needs update
		_AMT[_TY+":TRUST"]="25400,    86500";			// Needs update
		_AMT[_TY+":KIDDIE"]="7900,   510300";		// (Exempt + earned) up to SNG rate	// Needs update
		
	// Health Savings Account (HSA)
		_HSA[_TY+":IND"] = 5300;		// Needs update
		_HSA[_TY+":FAM"] = 10700;		// Needs update

	// Retirement Savings Contribution (Form 8880)
		_RETIRE[_TY+":Rate"]= "	 0.5,	  0.2,	  0.1,	0";
		_RETIRE[_TY+":MFJ"] = "39000,	42500,	65000";	// Needs update
		_RETIRE[_TY+":HOH"] = "29250,	31875,	48750";	// Needs update
		_RETIRE[_TY+":SNG"] = 
		_RETIRE[_TY+":WID"] = 
		_RETIRE[_TY+":MFS"] = "19500,	21250,	32500";	// Needs update

	// IRA Adjustment limits
		_IRALimits[_TY+":AGE"] = 50;	// Needs update
		_IRALimits[_TY+":MAX"] = 6000;	// Needs update
		_IRALimits[_TY+":SRMAX"] = 7000;	// Needs update
		_IRALimits[_TY+":SNG"] = 
		_IRALimits[_TY+":MFS"] = 
		_IRALimits[_TY+":HOH"] = "77000";	// Needs update
		_IRALimits[_TY+":WID"] = "126000";	// Needs update
		// Col 1 = ret plan, Col 2 = no ret plan
		_IRALimits[_TY+":MFJ"] = "126000, 212000";	// Needs update
