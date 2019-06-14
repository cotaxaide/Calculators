        //----------------------------------------------------------------------------------------
        var _TY = _StopYear = "2020"; // Tax parameters
        //----------------------------------------------------------------------------------------

        // Form line numbers
        // var LineNo = [];
		_LineNo[_TY+":Salary"] = "1";		// Needs update
		_LineNo[_TY+":Business"] = "S1-12";		// Needs update
                _LineNo[_TY+":Earned"] = "1&S1-12";		// Needs update
		_LineNo[_TY+":Pension"] = "4b";		// Needs update
                _LineNo[_TY+":TaxExInc"] = "2a";		// Needs update
                _LineNo[_TY+":CapGains"] = "S1-13";		// Needs update
                _LineNo[_TY+":QDCG"] = "12";		// Needs update
                _LineNo[_TY+":SSI"] = "5a";		// Needs update
                _LineNo[_TY+":SST"] = "5b";		// Needs update
                _LineNo[_TY+":AGI"] = "7";		// Needs update
                _LineNo[_TY+":QBI"] = "9";		// Needs update
                _LineNo[_TY+":Taxable"] = "10";		// Needs update
                _LineNo[_TY+":TNF"] = "";		// Needs update
                _LineNo[_TY+":SEHI"] = "S1-29";		// Needs update
                _LineNo[_TY+":Adjustments"] = "S1-36";		// Needs update
                _LineNo[_TY+":Deductions"] = "8";		// Needs update
                _LineNo[_TY+":TaxAmount"] = "11";		// Needs update
                _LineNo[_TY+":ExcessAPTC"] = "S2-46";		// Needs update
                _LineNo[_TY+":Foreign"] = "S3-48";		// Needs update
                _LineNo[_TY+":Care"] = "S3-49";		// Needs update
                _LineNo[_TY+":LLC"] = "S3-50";		// Needs update
                _LineNo[_TY+":Retire"] = "S3-51";		// Needs update
                _LineNo[_TY+":CTC"] = "12a";		// Needs update
                _LineNo[_TY+":COD"] = "12a";		// Needs update
                _LineNo[_TY+":NRCredit"] = "12";		// Needs update
                _LineNo[_TY+":IRP"] = "S4-61";		// Needs update
                _LineNo[_TY+":EIC"] = "17a";		// Needs update
                _LineNo[_TY+":ACTC"] = "17b";		// Needs update
                _LineNo[_TY+":AOC"] = "17c";		// Needs update
                _LineNo[_TY+":NetPTC"] = "S5-70";		// Needs update
                _LineNo[_TY+":ItemDed"] = "17"; // Sched A		// Needs update
		_LineNo[_TY+":SALT"] = "5d"; // Sched A		// Needs update
		_LineNo[_TY+":UseSchedA"] = "18"; // Sched A	// Needs update
	        _LineNo[_TY+":F8962A"] = "11a";		// Needs update
	        _LineNo[_TY+":F8962B"] = "11b";		// Needs update
	        _LineNo[_TY+":F8962F"] = "11f";		// Needs update
	        _LineNo[_TY+":F2555"] = "45 & 50"; //Form 2555		// Needs update

        // var EdExpenseLimits = [];
		// Source: Pub 970 or Form 8863 (AOC & LLC)
		// For TNF:
                _EdExpenseLimits["MAX"]  = 0;	// First limit
                _EdExpenseLimits["AGI1"] = 1;	// AGI max for first limit
                _EdExpenseLimits["MAX1"] = 2;	// Second limit
                _EdExpenseLimits["AGI2"] = 3;	// AGI max for second limit
                _EdExpenseLimits["MAX2"] = 4;	// Final limit
		// For AOC and LLC:
		_EdExpenseLimits["MAX"]  = 0;	// First limit
		_EdExpenseLimits["SNG1"] = 1;	// AGI max for first limit (SNG, WID, HOH)
		_EdExpenseLimits["SNG2"] = 2;	// AGI phase out (SNG, WID, HOH)
		_EdExpenseLimits["MFJ1"] = 3;	// AGI max for first limit (MFJ)
		_EdExpenseLimits["MFJ2"] = 4;	// AGI phase out (MFJ)
		// For SAV:
		_EdExpenseLimits["N/A"]  = 0;	// N/A
		_EdExpenseLimits["SNG"]  = 1;	// SAV phase out starts (SNG, HOH)
		_EdExpenseLimits["N/A"]  = 2;	// SAV gone (SNG, HOH)
		_EdExpenseLimits["N/A"]  = 3;	// SAV phase out starts (MFJ, WID)
		_EdExpenseLimits["N/A"]  = 4;	// SAV gone (MFJ, WID)

                _EdExpenseLimits[_TY+":TNF"] = " 4000, 66000, 2000,  80000,       0";		// Needs update
                _EdExpenseLimits[_TY+":TNF"] = "0,0,0,0,0";		// Needs update
                _EdExpenseLimits[_TY+":LLC"] = "10000, 58000, 66000, 116000, 132000";	// Need update!		// Needs update
                _EdExpenseLimits[_TY+":AOC"] = " 4000, 80000, 90000, 160000, 180000";	// Need update!		// Needs update
		_EdExpenseLimits[_TY+":SAV"] = "  N/A, 81100, 96100, 121600, 151600";		// Needs update

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
                _Standard[_TY] = "          0,1100,   12200,1650, 12200,1300, 24400,1300, 24400,1300, 18350,1650,  2100,   4200";		// Needs update

	// var ItemLimit = []; // Limit repealed by new tax law
                _ItemLimit[_TY+":SNG"] = 10000000; //261500;		// Needs update
                _ItemLimit[_TY+":MFJ"] = 10000000; //313800;		// Needs update
                _ItemLimit[_TY+":WID"] = 10000000; //313800;		// Needs update
                _ItemLimit[_TY+":MFS"] = 10000000; //156900;		// Needs update
                _ItemLimit[_TY+":HOH"] = 10000000; //287650;		// Needs update

        // var TaxRates = [];			// New tax law
                _TaxRates[_TY+":PCT"] = " 0.10,  0.12,   0.22,   0.24,   0.32,   0.35,   0.37";		// Needs update
                _TaxRates[_TY+":SNG"] = " 9700, 39475,  84200, 160725, 204100, 510300";		// Needs update
                _TaxRates[_TY+":MFJ"] = "19400, 78950, 168400, 321450, 408200, 612350";		// Needs update
                _TaxRates[_TY+":WID"] = "19400, 78950, 168400, 321450, 408200, 612350";		// Needs update
                _TaxRates[_TY+":MFS"] = " 9700, 39475,  84200, 160725, 204100, 306175";		// Needs update
                _TaxRates[_TY+":HOH"] = "13850, 52850,  84200, 160700, 204100, 510300";		// Needs update
                _TaxRates[_TY+":TRUST"]=" 2600,  2600,   2600,   9300,   9300,  12750";		// Needs update

	// CGRates
                _CGRates[_TY+":PCT"] = "    0,   0.15,   0.20";		// Needs update
                _CGRates[_TY+":SNG"] = "38750, 434550";		// Needs update
                _CGRates[_TY+":MFJ"] = "78750, 488850";		// Needs update
                _CGRates[_TY+":WID"] = "78750, 488850";		// Needs update
                _CGRates[_TY+":MFS"] = "39375, 244425";		// Needs update
                _CGRates[_TY+":HOH"] = "52750, 461700";		// Needs update
                _CGRates[_TY+":TRUST"]=" 2650,  12950";		// Needs update

	// Self-employment tax rates
		_SESocSec[_TY] = 0.124;		// Needs update
		_SEMedicare[_TY] = 0.029;		// Needs update
		_SEMaxWages[_TY] = 128400;		// Needs update

	// var MedicalExclusion = [];
		_MedicalExclusion[_TY] = "0.10, 0.10";		// Needs update

	// StateTaxCap
		_SALT[_TY] = 10000;			// New tax law

        // var RetireLimits = [];
                // Source: 1040 instructions for line 51
                // MFJ,SNG,HOH,WID,MFS
                _RetireLimits["SNG"] = 0;		// Needs update
                _RetireLimits["WID"] = 0;		// Needs update
                _RetireLimits["MFS"] = 0;		// Needs update
                _RetireLimits["HOH"] = 1;		// Needs update
                _RetireLimits["MFJ"] = 2;		// Needs update
                _RetireLimits[_TY] = "31500, 47250, 63000"; 	// Need update

        // var CTCLimits = [];
                // Source: 1040 instructions for line 52 and Form 8812
                // MFJ,SNG,HOH,WID,MFS
                _CTCLimits["MFJ"] = 0;
                _CTCLimits["SNG"] = 1;
                _CTCLimits["HOH"] = 1;
                _CTCLimits["WID"] = 1;
                _CTCLimits["MFS"] = 2;
                _CTCLimits[_TY+":AGICap"] = "400000,200000,200000";		// Needs update
		_CTCLimits[_TY+":CTCRate"] = 2000;		// Needs update
		_CTCLimits[_TY+":FTCRate"] = 500;		// Needs update
		_CTCLimits[_TY+":ACTCRate"] = 1400;		// Needs update
		_CTCLimits[_TY+":ACTCThreshold"] = 2500;		// Needs update

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
                _EICRates[_TY+":AGISNG"] =   "  8650,  19030,  19030,  19030";		// Needs update
                _EICRates[_TY+":AGIMFJ"] =   " 14450,  24820,  24820,  24820";		// Needs update
                _EICRates[_TY+":SNG"] =      " 15570,  41094,  46703,  50162";		// Needs update
                _EICRates[_TY+":MFJ"] =      " 21370,  46884,  52493,  55952";		// Needs update
                _EICRates[_TY+":MAX"] =      "   529,   3526,   5828,   6557";		// Needs update
                _EICRates[_TY+":RATEUP"] =   "0.0765,   0.34,    0.4,   0.45";		// Needs update
                _EICRates[_TY+":RATEDOWN"] = "0.0765, 0.1598, 0.2106, 0.2106";		// Needs update
                _EICRates[_TY+":INVEST"] = 3600;		// Needs update

	// var FPL = [];
		_FPL[_TY+":US"] =     "12140, 4320";		// Needs update
		_FPL[_TY+":Alaska"] = "15180, 5400";		// Needs update
		_FPL[_TY+":Hawaii"] = "13960, 4970";		// Needs update

	// var PTCFactorVal = [];	// Need update
		// A,B are FPL% ranges, C-D are PTC multipliers * 100
		// A-B = C-D : (C+(%%%-A)*(D-C)/(B-A))/100
		// 0-133 = 2-2
		// 133-150 = 3-4
		// 150-200 = 4-6.3
		// 200-250 = 6.3-8.05
		// 250-300 = 8.05-9.5
		// 300-400 = 9.5-9.5
		// col 4 = SNG APTC repayment limit

		_PTCFactorVal[_TY+":0"] =   "133, 2.08, 2.08,  300";		// Needs update
		_PTCFactorVal[_TY+":133"] = "150, 3.11, 4.15,  300";		// Needs update
		_PTCFactorVal[_TY+":150"] = "200, 4.15, 6.54,  300";		// Needs update
		_PTCFactorVal[_TY+":200"] = "250, 6.54, 8.36,  750";		// Needs update
		_PTCFactorVal[_TY+":250"] = "300, 8.36, 9.86,  750";		// Needs update
		_PTCFactorVal[_TY+":300"] = "400, 9.86, 9.86, 1250";		// Needs update

	// var AffordRate = [];
		_AffordRate[_TY] = 0.0805;	// Need verification? (went down?)		// Needs update

	// var AffordRateEmployerSelf = [];
		_AffordRateEmployerSelf[_TY] = 0.0986;		// Needs update

	// var Qualified Business Income Deduction
		_QBILimits[_TY+":Rate"] = "0.2";		// Needs update
		_QBILimits[_TY+":SNG"] = "160700";		// Needs update
		_QBILimits[_TY+":MFJ"] = "321400";		// Needs update
		_QBILimits[_TY+":MFS"] = "160725";		// Needs update
		_QBILimits[_TY+":HOH"] = "160700";		// Needs update
		_QBILimits[_TY+":WID"] = "160700";		// Needs update

	// Net Investment Income Tax
		_NIITLimits[_TY+":Rate"] = "0.038";		// Needs update
		_NIITLimits[_TY+":SNG"] = "200000";		// Needs update
		_NIITLimits[_TY+":MFJ"] = "250000";		// Needs update
		_NIITLimits[_TY+":MFS"] = "125000";		// Needs update
		_NIITLimits[_TY+":HOH"] = "200000";		// Needs update
		_NIITLimits[_TY+":WID"] = "250000";		// Needs update

	// Alternative Minimum Tax
		//                  Exempt  Phaseout
		_AMT[_TY+":MFJ"] = "111700, 1020600";		// Needs update
		_AMT[_TY+":SNG"] = "71700,   510300";		// Needs update
		_AMT[_TY+":MFS"] = "55850,   510300";		// Needs update
		_AMT[_TY+":HOH"] = "71700,   510300";		// Needs update
		_AMT[_TY+":WID"] = "71700,   510300";		// Needs update
