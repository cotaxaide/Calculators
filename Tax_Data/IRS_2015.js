        //----------------------------------------------------------------------------------------
        var _TY = _StopYear = "2015" // Tax parameters
        //----------------------------------------------------------------------------------------

        // Form line numbers
        // var LineNo = [];
		_LineNo[_TY+":Salary"] = "7";
		_LineNo[_TY+":Business"] = "12";
                _LineNo[_TY+":Earned"] = "7+12";
		_LineNo[_TY+":Pension"] = "16a";
                _LineNo[_TY+":TaxExInc"] = "8b";
                _LineNo[_TY+":CapGains"] = "13";
		_LineNo[_TY+":QDCG"] = "12";
                _LineNo[_TY+":SSI"] = "20a";
                _LineNo[_TY+":SST"] = "20b";
                _LineNo[_TY+":TNF"] = "34";
                _LineNo[_TY+":SEHI"] = "29";
                _LineNo[_TY+":Adjustments"] = "36";
                _LineNo[_TY+":Deductions"] = "40";
                _LineNo[_TY+":TaxAmount"] = "44";
                _LineNo[_TY+":QBI"] = "";
                _LineNo[_TY+":AGI"] = "37";
                _LineNo[_TY+":ExcessAPTC"] = "46";
                _LineNo[_TY+":Foreign"] = "48";
                _LineNo[_TY+":Care"] = "49";
                _LineNo[_TY+":LLC"] = "50";
                _LineNo[_TY+":Retire"] = "51";
                _LineNo[_TY+":CTC"] = "52";
                _LineNo[_TY+":COD"] = "";
                _LineNo[_TY+":NRCredit"] = "55";
                _LineNo[_TY+":IRP"] = "61";
                _LineNo[_TY+":EIC"] = "66a";
                _LineNo[_TY+":ACTC"] = "67";
                _LineNo[_TY+":AOC"] = "68";
                _LineNo[_TY+":NetPTC"] = "69";
                _LineNo[_TY+":ItemDed"] = "29"; // Sched A
		_LineNo[_TY+":SALT"] = "9"; // Sched A
		_LineNo[_TY+":UseSchedA"] = "30"; // Sched A
	        _LineNo[_TY+":F8962A"] = "11a";
	        _LineNo[_TY+":F8962B"] = "11b";
	        _LineNo[_TY+":F8962F"] = "11f";
	        _LineNo[_TY+":F2555"] = "45 & 50";
		_LineNo[_TY+":Property"] = "6"; // Sched A
	        _LineNo[_TY+":StateWH"] = "5a"; // Sched A
                _LineNo[_TY+":SEP"] = "28";
                _LineNo[_TY+":QualDiv"] = "9b";


        // var EdExpenseLimits = [];
		// For TNF:
                _EdExpenseLimits["MAX"]  = 0; // First limit
                _EdExpenseLimits["AGI1"] = 1; // AGI max for first limit
                _EdExpenseLimits["MAX1"] = 2; // Second limit
                _EdExpenseLimits["AGI2"] = 3; // AGI max for second limit
                _EdExpenseLimits["MAX2"] = 4; // Final limit
		// For AOC and LLC:
		_EdExpenseLimits["MAX"]  = 0; // First limit
		_EdExpenseLimits["SNG1"] = 1; // AGI max for first limit (SNG, WID, HOH)
		_EdExpenseLimits["SNG2"] = 2; // AGI phase out (SNG, WID, HOH)
		_EdExpenseLimits["MFJ1"] = 3; // AGI max for first limit (MFJ)
		_EdExpenseLimits["MFJ2"] = 4; // AGI phase out (MFJ)
		// For SAV:
		_EdExpenseLimits["N/A"]  = 0; // N/A
		_EdExpenseLimits["SNG"]  = 1; // SAV phase out starts (SNG, HOH)
		_EdExpenseLimits["N/A"]  = 2; // SAV gone (SNG, HOH)
		_EdExpenseLimits["N/A"]  = 3; // SAV phase out starts (MFJ, WID)
		_EdExpenseLimits["N/A"]  = 4; // SAV gone (MFJ, WID)

                _EdExpenseLimits[_TY+":TNF"] = "4000,65000,2000,80000,0";
                _EdExpenseLimits[_TY+":LLC"] = "10000,55000,65000,109000,129000";
                _EdExpenseLimits[_TY+":AOC"] = "4000,80000,90000,160000,180000";
		_EdExpenseLimits[_TY+":SAV"] = "N/A,76000,91000,113950,143950"; //not verified

        // var Standard = []; // Exemption and standard deductions
                _Standard["Exemption"] = 0; // per person
                _Standard["Minimum"] = 1;
                _Standard["SNG"] = 2; // inc for age 65 or blind
                _Standard["MFS"] = 4;
                _Standard["MFJ"] = 6;
                _Standard["WID"] = 8;
                _Standard["HOH"] = 10;
		_Standard["Kid"] = 12; // kiddie tax unearned income reporting limit (from Form 8815)
		_Standard["DepAsRel"] = 13; // maximum amount of earned income to be a Dependent as Relative

                // Standard[year] = Exemption,Mimimum,SNG,inc,   MFS,inc,   MFJ,inc,    WID,inc,    HOH,inc,   Kiddie, DepAsRel
                _Standard[_TY] = "  4000,    1050,    6300,1550, 6300,1250, 12600,1250, 12600,1250, 9250,1550,   2100,    4000";

        // var TaxRates = [];
                _TaxRates[_TY+":PCT"] = " 0.10,  0.15,   0.25,   0.28,   0.33,   0.35,   0.396";
                _TaxRates[_TY+":SNG"] = " 9225, 37450,  90750, 189300, 411500, 413200";
                _TaxRates[_TY+":MFJ"] = "18450, 74900, 151200, 230450, 411500, 464850";
                _TaxRates[_TY+":WID"] = "18450, 74900, 151200, 230450, 411500, 464850";
                _TaxRates[_TY+":MFS"] = " 9225, 37450,  75600, 115225, 205750, 232425";
                _TaxRates[_TY+":HOH"] = "13150, 50200, 129600, 209850, 411500, 439000";

	// CGRates
                _CGRates[_TY+":PCT"] =  "   0,   0.15,  0.20";
                _CGRates[_TY+":SNG"] = "37450, 413200";
                _CGRates[_TY+":MFJ"] = "74900, 464850";
                _CGRates[_TY+":WID"] = "74900, 464850";
                _CGRates[_TY+":MFS"] = "37450, 232425";
                _CGRates[_TY+":HOH"] = "50200, 439000";

	// Self-employment tax rates
		_SESocSec[_TY] = 0.124;
		_SEMedicare[_TY] = 0.029;
		_SEMaxWages[_TY] = 118500;

	// var MedicalExclusion = [];
		_MedicalExclusion[_TY] = "0.100, 0.075";

	// StateTaxCap
		_SALT[_TY] = 0; // unlimited

        // var RetireLimits = [];
                // Source: 1040 instructions
                // MFJ,SNG,HOH,WID,MFS
                _RetireLimits["SNG"] = 0;
                _RetireLimits["WID"] = 0;
                _RetireLimits["MFS"] = 0;
                _RetireLimits["HOH"] = 1;
                _RetireLimits["MFJ"] = 2;
                _RetireLimits[_TY] = "30500,45750,61000";

        // var CTCLimits = [];
                // Source: 1040 instructions
                // MFJ,SNG,HOH,WID,MFS
                _CTCLimits["MFJ"] = 0;
                _CTCLimits["SNG"] = 1;
                _CTCLimits["HOH"] = 1;
                _CTCLimits["WID"] = 1;
                _CTCLimits["MFS"] = 2;
                _CTCLimits[_TY+":AGICap"] = "110000,75000,55000";
		_CTCLimits[_TY+":CTCRate"] = 1000;
		_CTCLimits[_TY+":FTCRate"] = 0;
		_CTCLimits[_TY+":ACTCRate"] = 1000;
		_CTCLimits[_TY+":ACTCThreshold"] = 3000;

        // var EICRates = [];
                // Source: search IRS web site "EIC limits" (easier than 1040 instructions)
		// AGISNG and AGIMFJ are the amounts above which AGI must also be tested
                // SNG and MFJ are the max AGI endpoints of the phaseout
		// MAX is the cap amount of EIC
		// RATEUP is the ramp-up rate to the cap
		// RATEDOWN is the ramp-down rate from the cap
		// INVEST is the max investment limit to qualify for EIC
                // Columns are: 0, 1, 2, 3 children

                _EICRates[_TY+":AGISNG"] =   "  8250,  18150,  18150,  18150";
                _EICRates[_TY+":AGIMFJ"] =   " 13750,  23650,  23650,  23650";
                _EICRates[_TY+":SNG"] =      " 14820,  39131,  44454,  47747";
                _EICRates[_TY+":MFJ"] =      " 20330,  44651,  49974,  53267";
                _EICRates[_TY+":MAX"] =      "   503,   3359,   5548,   6242";
                _EICRates[_TY+":RATEUP"] =   "0.0765,   0.34,    0.4,   0.45";
                _EICRates[_TY+":RATEDOWN"] = "0.0765, 0.1598, 0.2106, 0.2106";
                _EICRates[_TY+":INVEST"] = 3400;

	// var FPL = [];
		_FPL[_TY+":US"] =     "11770, 4160";
		_FPL[_TY+":Alaska"] = "14720, 5200";
		_FPL[_TY+":Hawaii"] = "13550, 4780";
		//_FPL[_TY+":US"] =     "4160, 11770, 15930, 20090, 24250, 28410, 32570, 36730, 40890";
		//_FPL[_TY+":Alaska"] = "5200, 14720, 19920, 25120, 30320, 35520, 40720, 45920, 51120";
		//_FPL[_TY+":Hawaii"] = "4780, 13550, 18330, 23110, 27890, 32670, 37450, 42230, 47010";

	// var PTCFactorVal = [];
		// A,B are FPL% ranges, C-D are PTC multipliers * 100
		// A-B = C-D : (C+(%%%-A)*(D-C)/(B-A))/100
		// 0-133 = 2-2
		// 133-150 = 3-4
		// 150-200 = 4-6.3
		// 200-250 = 6.3-8.05
		// 250-300 = 8.05-9.5
		// 300-400 = 9.5-9.5
		// Column 4 = Repayment limitation

		_PTCFactorVal[_TY+":0"] =   "133, 2.01, 2.01,  300"; // NOT VERIFIED
		_PTCFactorVal[_TY+":133"] = "150, 3.02, 4.02,  300";
		_PTCFactorVal[_TY+":150"] = "200, 4.02, 6.34,  300";
		_PTCFactorVal[_TY+":200"] = "250, 6.34, 8.10,  750";
		_PTCFactorVal[_TY+":250"] = "300, 8.10, 9.56,  750";
		_PTCFactorVal[_TY+":300"] = "400, 9.56, 9.56, 1250";

	// var AffordRate = [];
		_AffordRate[_TY] = 0.0805;

	// var AffordRateEmployerSelf = [];
		_AffordRateEmployerSelf[_TY] = 0.0956;

	// var Qualified Business Income Deduction
		_QBILimits[_TY+":Rate"] = 0;
		_QBILimits[_TY+":SNG"] = "0";
		_QBILimits[_TY+":MFJ"] = "0";
		_QBILimits[_TY+":MFS"] = "0";
		_QBILimits[_TY+":HOH"] = "0";
		_QBILimits[_TY+":WID"] = "0";

	// Net Investment Income Tax
		_NIITLimits[_TY+":Rate"] = "0";
		_NIITLimits[_TY+":SNG"] = "200000";
		_NIITLimits[_TY+":MFJ"] = "250000";
		_NIITLimits[_TY+":MFS"] = "125000";
		_NIITLimits[_TY+":HOH"] = "200000";
		_NIITLimits[_TY+":WID"] = "250000";
				
	// Alternative Minimum Tax
		//                  Exempt  Phaseout // Phaseout amounts not correct
		_AMT[_TY+":MFJ"] = "83800, 1020600";
		_AMT[_TY+":SNG"] = "53900,  510300";
		_AMT[_TY+":MFS"] = "41900,  510300";
		_AMT[_TY+":HOH"] = "53900,  510300";
		_AMT[_TY+":WID"] = "53900,  510300";
		
	// Health Savings Account (HSA)
		_HSA[_TY+":IND"] = 3350;	// not correct
		_HSA[_TY+":FAM"] = 6750		// not correct;

	// Retirement Savings Contribution (Form 8880)
		_RETIRE[_TY+":Rate"]= "	 0.5,	  0.2,	  0.1,	0";
		_RETIRE[_TY+":MFJ"] = "37000,	40000,	61500";
		_RETIRE[_TY+":HOH"] = "27750,	30000,	46125";
		_RETIRE[_TY+":SNG"] = 
		_RETIRE[_TY+":WID"] = 
		_RETIRE[_TY+":MFS"] = "18500,	20000,	30750";

	// IRA Adjustment limits
		_IRALimits[_TY+":AGE"] = 50;
		_IRALimits[_TY+":MAX"] = 5500;
		_IRALimits[_TY+":SRMAX"] = 6500;
