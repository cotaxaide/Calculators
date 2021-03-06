        //----------------------------------------------------------------------------------------
        var _TY = _StopYear = "2021"; // Tax parameters
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
                _LineNo[_TY+":TNF"] = "S1-21";			// Needs update
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
                _EdExpenseLimits["MAX"]  = 0;	// First limit
                _EdExpenseLimits["AGI1"] = 1;	// AGI max for first limit
                _EdExpenseLimits["MAX1"] = 2;	// Second limit
                _EdExpenseLimits["AGI2"] = 3;	// AGI max for second limit
                _EdExpenseLimits["MAX2"] = 4;	// Final limit
		// For AOC and LLC:
		_EdExpenseLimits["MAX"]  = 0;	// First limit	// Needs update
		_EdExpenseLimits["SNG1"] = 1;	// AGI max for first limit (SNG, WID, HOH)
		_EdExpenseLimits["SNG2"] = 2;	// AGI phase out (SNG, WID, HOH)
		_EdExpenseLimits["MFJ1"] = 3;	// AGI max for first limit (MFJ)
		_EdExpenseLimits["MFJ2"] = 4;	// AGI phase out (MFJ)
		// For SAV:
		_EdExpenseLimits["N/A"]  = 0;	// N/A	// Needs update
		_EdExpenseLimits["SNG"]  = 1;	// SAV phase out starts (SNG, HOH)
		_EdExpenseLimits["N/A"]  = 2;	// SAV gone (SNG, HOH)
		_EdExpenseLimits["N/A"]  = 3;	// SAV phase out starts (MFJ, WID)
		_EdExpenseLimits["N/A"]  = 4;	// SAV gone (MFJ, WID)
        
		_EdExpenseLimits[_TY+":TNF"] = " 4000, 66000, 2000,  80000,       0";		// Needs update
		_EdExpenseLimits[_TY+":LLC"] = "10000, 59000, 69000, 118000, 138000";		// Needs update
		_EdExpenseLimits[_TY+":AOC"] = " 4000, 80000, 90000, 160000, 180000";		// Needs update
		_EdExpenseLimits[_TY+":SAV"] = "  N/A, 82350, 96100, 123550, 151600";	// Tentative	// Needs update

        // var Standard = [];	// Exemption and standard deductions
                _Standard["Exemption"] = 0;
                _Standard["Minimum"] = 1;
                _Standard["SNG"] = 2;
                _Standard["MFS"] = 4;
                _Standard["MFJ"] = 6;
                _Standard["WID"] = 8;
                _Standard["HOH"] = 10;
		_Standard["Kid"] = 12; // kiddie tax unearned income reporting limit (from Form 8815)
		_Standard["DepAsRel"] = 13; // maximum earned income to be a Dependent as a Relative

                // Standard[year] = Exemption,Mimimum,  SNG,inc,    MFS,inc,    MFJ,inc,    WID,inc,    HOH,inc,  Kiddie, DepAsRel
                _Standard[_TY] = "          0,1100,   12550,1700, 12550,1350, 25100,1350, 25100,1350, 18800,1700,  2200,   4300";

	// var ItemLimit = []; // Limit repealed by new tax law
                _ItemLimit[_TY+":SNG"] = 10000000; //261500;	// Needs update
                _ItemLimit[_TY+":MFJ"] = 10000000; //313800;	// Needs update
                _ItemLimit[_TY+":WID"] = 10000000; //313800;	// Needs update
                _ItemLimit[_TY+":MFS"] = 10000000; //156900;	// Needs update
                _ItemLimit[_TY+":HOH"] = 10000000; //287650;	// Needs update

        // var TaxRates = [];
                _TaxRates[_TY+":PCT"] = " 0.10,  0.12,   0.22,   0.24,   0.32,   0.35,   0.37";	
                _TaxRates[_TY+":SNG"] = " 9950, 40525,  86375, 164925, 209425, 523600";	
                _TaxRates[_TY+":MFJ"] = "19900, 81050, 172750, 329850, 418850, 628300";	
                _TaxRates[_TY+":WID"] = "19900, 81050, 172750, 329850, 418850, 628300";	
                _TaxRates[_TY+":MFS"] = " 9950, 40525,  86375, 164925, 209425, 314150";
                _TaxRates[_TY+":HOH"] = "14200, 54200,  86350, 164900, 209400, 523600";
                _TaxRates[_TY+":TRUST"]=" 2600,  2600,   2600,   9450,   9450,  12950";		// for testing	// Needs update

	// CGRates
                _CGRates[_TY+":PCT"] = "    0,   0.15,   0.20";
                _CGRates[_TY+":SNG"] = "40400, 445850";
                _CGRates[_TY+":MFJ"] = "80800, 501600";
                _CGRates[_TY+":WID"] = "80800, 496600";	
                _CGRates[_TY+":MFS"] = "40400, 250800";
                _CGRates[_TY+":HOH"] = "54100, 473750";
                _CGRates[_TY+":TRUST"]=" 2650,  13150";			// Needs update

	// Self-employment tax rates
		_SESocSec[_TY] = 0.124;
		_SEMedicare[_TY] = 0.029;
		_SEMaxWages[_TY] = 128400;

	// var MedicalExclusion = [];
		_MedicalExclusion[_TY] = "0.075, 0.075";

	// StateTaxCap
		_SALT[_TY] = 10000;	// Needs update

        // var RetireLimits = [];
                // Source: 1040 instructions for line 51
                // MFJ,SNG,HOH,WID,MFS
                _RetireLimits["SNG"] = 0;
                _RetireLimits["WID"] = 0;
                _RetireLimits["MFS"] = 0;
                _RetireLimits["HOH"] = 1;
                _RetireLimits["MFJ"] = 2;
                _RetireLimits[_TY] = "31500, 47250, 63000"; 		// Needs update

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
                // Columns are: 0, 1, 2, 3+ children
		// Needs update
                _EICRates[_TY+":AGISNG"] =   "  8800,  19528,  19528,  19528";
                _EICRates[_TY+":AGIMFJ"] =   " 14820,  25470,  25470,  25470";
                _EICRates[_TY+":SNG"] =      " 15988,  42158,  47915,  51464";
                _EICRates[_TY+":MFJ"] =      " 21920,  48108,  53865,  57414";
                _EICRates[_TY+":MAX"] =      "   543,   3618,   5980,   6728";	
                _EICRates[_TY+":RATEUP"] =   "0.0765,   0.34,    0.4,   0.45";
                _EICRates[_TY+":RATEDOWN"] = "0.0765, 0.1598, 0.2106, 0.2106";
                _EICRates[_TY+":INVEST"] = 3650;		// Tentative	// Needs update

	// var FPL = [];
		_FPL[_TY+":US"] =     "12140, 4320";		// Needs update	// Needs update
		_FPL[_TY+":Alaska"] = "15180, 5400";		// Needs update	// Needs update
		_FPL[_TY+":Hawaii"] = "13960, 4970";		// Needs update	// Needs update

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
		_QBILimits[_TY+":SNG"] = "164900";
		_QBILimits[_TY+":MFJ"] = "329800";
		_QBILimits[_TY+":MFS"] = "164900";
		_QBILimits[_TY+":HOH"] = "329800";
		_QBILimits[_TY+":WID"] = "329800";

	// Net Investment Income Tax
		_NIITLimits[_TY+":Rate"] = "0.038";			// Needs update
		_NIITLimits[_TY+":SNG"] = "200000";			// Needs update
		_NIITLimits[_TY+":MFJ"] = "250000";			// Needs update
		_NIITLimits[_TY+":MFS"] = "125000";			// Needs update
		_NIITLimits[_TY+":HOH"] = "200000";			// Needs update
		_NIITLimits[_TY+":WID"] = "250000";			// Needs update

	// Alternative Minimum Tax
		//                  Exempt  Phaseout
		_AMT[_TY+":MFJ"] = "114600, 1047200";
		_AMT[_TY+":SNG"] = "73600,   523600";
		_AMT[_TY+":MFS"] = "57300,   523600";			// Needs update
		_AMT[_TY+":WID"] = "73600,   523600";
		_AMT[_TY+":HOH"] = "73600,   523600";
		_AMT[_TY+":TRUST"]="25400,    84800";			// Needs update
		_AMT[_TY+":KIDDIE"]="7900,   510300";		// (Exempt + earned) up to SNG rate	// Needs update
		
	// Health Savings Account (HSA)
		_HSA[_TY+":IND"] = 3550;		// Needs update
		_HSA[_TY+":FAM"] = 7100;		// Needs update

	// Retirement Savings Contribution (Form 8880)
		_RETIRE[_TY+":Rate"]= "	 0.5,	  0.2,	  0.1,	0";
		_RETIRE[_TY+":MFJ"] = "38500,	41500,	64000";		// Needs update
		_RETIRE[_TY+":HOH"] = "28875,	31125,	48000";		// Needs update
		_RETIRE[_TY+":SNG"] =
		_RETIRE[_TY+":WID"] =
		_RETIRE[_TY+":MFS"] = "19250,	20750,	32000";		// Needs update

	// IRA Adjustment limits
		_IRALimits[_TY+":AGE"] = 50;	// Needs update
		_IRALimits[_TY+":MAX"] = 6000;	// Needs update
		_IRALimits[_TY+":SRMAX"] = 7000;	// Needs update
		_IRALimits[_TY+":SNG"] = 
		_IRALimits[_TY+":MFS"] = 
		_IRALimits[_TY+":HOH"] = "76000";	// Needs update
		_IRALimits[_TY+":WID"] = "125000";	// Needs update
		// Col 1 = ret plan, Col 2 = no ret plan
		_IRALimits[_TY+":MFJ"] = "125000, 209000";	// Needs update
