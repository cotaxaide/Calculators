        //----------------------------------------------------------------------------------------
        var _TY = _StopYear = "2023"; // Tax parameters
	_Preliminary[_TY] = true; // Preliminary information
        //----------------------------------------------------------------------------------------

        // Form line numbers
        // var LineNo = [];
		// 1040
		_LineNo[_TY+":Salary"] = "1z";	
                _LineNo[_TY+":Earned"] = "1z&S1-3";
                _LineNo[_TY+":TaxExInc"] = "2a";
                _LineNo[_TY+":QualDiv"] = "3a";	
		_LineNo[_TY+":IRADist"] = "4b";	
		_LineNo[_TY+":Pension"] = "5b";	
                _LineNo[_TY+":SSI"] = "6a";	
                _LineNo[_TY+":SST"] = "6b";	
                _LineNo[_TY+":CapGains"] = "7";	
                _LineNo[_TY+":AGI"] = "11";	
                _LineNo[_TY+":Deductions"] = "12";
                _LineNo[_TY+":QBI"] = "13";	
                _LineNo[_TY+":Taxable"] = "15";	
                _LineNo[_TY+":TaxAmount"] = "16";
                _LineNo[_TY+":CTC"] = "19";	
                _LineNo[_TY+":COD"] = "19";	
                _LineNo[_TY+":NRCredit"] = "21";
                _LineNo[_TY+":EIC"] = "27";	
                _LineNo[_TY+":ACTC"] = "28";	
                _LineNo[_TY+":AOC"] = "29";	
		// Schedules 1-3
		_LineNo[_TY+":Business"] = "S1-3";
                _LineNo[_TY+":SEP"] = "S1-16";
                _LineNo[_TY+":SEHI"] = "S1-17";
                _LineNo[_TY+":TNF"] = "";
                _LineNo[_TY+":IRADed"] = "S1-20";
                _LineNo[_TY+":StudLoan"] = "S1-21";
                _LineNo[_TY+":Adjustments"] = "S1-24";
                _LineNo[_TY+":ExcessAPTC"] = "S2-2";
                _LineNo[_TY+":Foreign"] = "S3-1";
                _LineNo[_TY+":Care"] = "S3-2";
                _LineNo[_TY+":LLC"] = "S3-3";
                _LineNo[_TY+":Retire"] = "S3-4";
                _LineNo[_TY+":IRP"] = "";
                _LineNo[_TY+":NetPTC"] = "S3-9";
		// Qualified dividends and cap gains worksheet
                _LineNo[_TY+":QDCG"] = "12";			// Need update
		// Schedule A
	        _LineNo[_TY+":StateWH"] = "5a"; 
	        _LineNo[_TY+":Property"] = "5b";
		_LineNo[_TY+":SALT"] = "5d";
                _LineNo[_TY+":CashContrib"] = "11";
                _LineNo[_TY+":ItemDed"] = "17";	
		_LineNo[_TY+":UseSchedA"] = "18";
		// Form 2555
	        _LineNo[_TY+":F2555"] = "45 & 50";		// Needs update	
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
        
		_EdExpenseLimits[_TY+":TNF"] = "    0,     0,    0,      0,       0";
		_EdExpenseLimits[_TY+":LLC"] = "10000, 59000, 69000, 118000, 138000";
		_EdExpenseLimits[_TY+":AOC"] = " 4000, 80000, 90000, 160000, 180000";
		_EdExpenseLimits[_TY+":SAV"] = "  N/A, 82350, 96100, 123550, 151600";	// Tentative	// Needs update
		_EdExpenseLimits[_TY+":INT"] = "  2500, 70000, 85000, 145000, 175000";

        // var Standard = [];	// Exemption and standard deductions
                _Standard["Exemption"] = 0;
                _Standard["Minimum"] = 1;
                _Standard["SNG"] = 2;
                _Standard["MFS"] = 4;
                _Standard["MFJ"] = 6;
                _Standard["QSS"] = 8;
                _Standard["WID"] = 8;
                _Standard["HOH"] = 10;
		_Standard["Kid"] = 12; // kiddie tax unearned income reporting limit (from Form 8815)
		_Standard["DepAsRel"] = 13; // maximum earned income to be a Dependent as a Relative
		_Standard["DependInc"] = 14; // increment to earned income for a dependent

                // Standard[year] = Exemption,Mimimum,  SNG,inc,    MFS,inc,    MFJ,inc,    QSS,inc,    HOH,inc,  Kiddie, DepAsRel, DependInc
                _Standard[_TY] = "          0,1250,   13850,1850, 13850,1500, 27700,1500, 27700,1500, 20800,1850,  2300,   4700,      400";

	// var ItemLimit = []; // Limit repealed by new tax law
                _ItemLimit[_TY+":SNG"] = 10000000; //261500;
                _ItemLimit[_TY+":MFJ"] = 10000000; //313800;
                _ItemLimit[_TY+":QSS"] = 10000000; //313800;
                _ItemLimit[_TY+":WID"] = 10000000; //313800;
                _ItemLimit[_TY+":MFS"] = 10000000; //156900;
                _ItemLimit[_TY+":HOH"] = 10000000; //287650;

        // var TaxRates = [];
                _TaxRates[_TY+":PCT"] = " 0.10,  0.12,   0.22,   0.24,   0.32,   0.35,   0.37";
                _TaxRates[_TY+":MFS"] = "11000, 44725,  95375, 182100, 231250, 346875";
                _TaxRates[_TY+":SNG"] = "11000, 44725,  95375, 182100, 231250, 578125";
                _TaxRates[_TY+":MFJ"] = 
                _TaxRates[_TY+":QSS"] = "22000, 89450, 190750, 364200, 462500, 693750";
                _TaxRates[_TY+":WID"] = "22000, 89450, 190750, 364200, 462500, 693750";
                _TaxRates[_TY+":HOH"] = "15700, 59850,  95350, 182100, 231250, 578100";
                _TaxRates[_TY+":TRUST"]=" 2900,  2900,   2900,  10550,  10550,  14450";

	// CGRates
                _CGRates[_TY+":PCT"] = "    0,   0.15,   0.20";
                _CGRates[_TY+":SNG"] = "44625, 492300";
                _CGRates[_TY+":MFJ"] =
                _CGRates[_TY+":QSS"] =
                _CGRates[_TY+":WID"] = "89250, 553850";
                _CGRates[_TY+":MFS"] = "44625, 276900";
                _CGRates[_TY+":HOH"] = "59750, 523050";
                _CGRates[_TY+":TRUST"]=" 3000,  14650";

	// Self-employment tax rates
		_SETaxRate[_TY+":SSRate"] = 0.124;
		_SETaxRate[_TY+":MCRate"] = 0.029;
		_SETaxRate[_TY+":SSWageCap"] = 160200;
		_SETaxRate[_TY+":AMCRate"] = 0.009;
		_SETaxRate[_TY+":AMCStart"] = 200000;

	// var MedicalExclusion = [];
		_MedicalExclusion[_TY] = "0.075, 0.075";

	// StateTaxCap
		_SALT[_TY] = 10000;

        // var CTCLimits = [];
                // Source: 1040 instructions for line 52 and Form 8812
                // MFJ,SNG,HOH,QSS,MFS
                _CTCLimits["MFJ"] = 0;
                _CTCLimits["SNG"] = 1;
                _CTCLimits["QSS"] = 1;
                _CTCLimits["WID"] = 1;
                _CTCLimits["MFS"] = 2;
                _CTCLimits["HOH"] = 3;
                _CTCLimits[_TY+":AGICap"]  = "400000, 200000, 200000, 200000";		// Need update
		_CTCLimits[_TY+":CTCRate"] = 2000;
                _CTCLimits[_TY+":AGI0Cap"] = "150000,  75000,  75000, 112500";		// Need update
		_CTCLimits[_TY+":CTC0Rate"] = 0;		// Need update
		_CTCLimits[_TY+":CTC6Rate"] = 1000;		// Need update
		_CTCLimits[_TY+":FTCRate"] = 500;		// Need update
		_CTCLimits[_TY+":ACTCRate"] = 1500;
		_CTCLimits[_TY+":ACTCThreshold"] = 2500;		// Need update

       	// var CareRates = [];
		// Source: Pub 503
		_CareLimits[_TY+":RateMax"] = 35;	// Needs update	
		_CareLimits[_TY+":RateMin"] = 20;	// Needs update
		_CareLimits[_TY+":AGICap"] = 15000;	// Needs update
		_CareLimits[_TY+":AGICap2"] = 400000;	// Needs update

        // var EICRates = [];
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
                _EICRates[_TY+":AGISNG"] =   "  9800,  21560,  21560,  21560";
                _EICRates[_TY+":AGIMFJ"] =   " 16370,  28120,  28120,  28120";
                _EICRates[_TY+":SNG"] =      " 17640,  46560,  52918,  56838";
                _EICRates[_TY+":MFJ"] =      " 24210,  53120,  59478,  63398";
                _EICRates[_TY+":MAX"] =      "   600,   3995,   6604,   7430";
                _EICRates[_TY+":RATEUP"] =   "0.0765,   0.34,    0.4,   0.45";
                _EICRates[_TY+":RATEDOWN"] = "0.0765, 0.1598, 0.2106, 0.2106";
                _EICRates[_TY+":INVEST"] = 10300;		// Need update

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

		_PTCFactorVal[_TY+":0"] =   "133, 0.00, 0.00,  325";		// Need update
		_PTCFactorVal[_TY+":133"] = "150, 0.00, 2.00,  325";		// Need update
		_PTCFactorVal[_TY+":150"] = "200, 2.00, 4.00,  825";		// Need update
		_PTCFactorVal[_TY+":200"] = "250, 4.00, 6.00,  825";		// Need update
		_PTCFactorVal[_TY+":250"] = "300, 6.00, 8.50,  800";		// Need update
		_PTCFactorVal[_TY+":300"] = "400, 8.50, 8.50, 1400";		// Need update

	// var AffordRate = [];
		_AffordRate[_TY] = 0.0805;	

	// var AffordRateEmployerSelf = [];
		_AffordRateEmployerSelf[_TY] = 0.0986;	

	// var Qualified Business Income Deduction
		_QBILimits[_TY+":Rate"] = "0.2";
		_QBILimits[_TY+":MFJ"] = "364200";
		_QBILimits[_TY+":MFS"] =
		_QBILimits[_TY+":SNG"] =
		_QBILimits[_TY+":HOH"] =
		_QBILimits[_TY+":QSS"] =
		_QBILimits[_TY+":WID"] = "182100";

	// Net Investment Income Tax (Form 8960)
		_NIITLimits[_TY+":Rate"] = "0.038";		// Need update
		_NIITLimits[_TY+":SNG"] = 		// Need update
		_NIITLimits[_TY+":HOH"] = "200000"		// Need update
		_NIITLimits[_TY+":MFJ"] = 		// Need update
		_NIITLimits[_TY+":QSS"] = "250000";		// Need update
		_NIITLimits[_TY+":WID"] = "250000";		// Need update
		_NIITLimits[_TY+":MFS"] = "125000";		// Need update

	// Alternative Minimum Tax
		//                  Exempt  Phaseout
		_AMT[_TY+":MFJ"] = "126500, 1156300";
		_AMT[_TY+":MFS"] = " 63250,  578150";
		_AMT[_TY+":SNG"] =
		_AMT[_TY+":QSS"] =
		_AMT[_TY+":WID"] =
		_AMT[_TY+":HOH"] = "81300,   578150";
		_AMT[_TY+":TRUST"]="26500,    88300";		// Need update
		_AMT[_TY+":KIDDIE"]="8200,   510300";		// (Exempt + earned) up to SNG rate		// Need update
		
	// Health Savings Account (HSA) Contribution limits
		_HSA[_TY+":IND"] = 3850;
		_HSA[_TY+":FAM"] = 7750;

	// Retirement Savings Contribution (Form 8880)
		_RETIRE[_TY+":Rate"]= "	 0.5,	  0.2,	  0.1,	0";
		_RETIRE[_TY+":MFJ"] = "43500,	47500,	73000";
		_RETIRE[_TY+":HOH"] = "32625,	35625,	54750";
		_RETIRE[_TY+":SNG"] = 
		_RETIRE[_TY+":QSS"] = 
		_RETIRE[_TY+":WID"] = 
		_RETIRE[_TY+":MFS"] = "21750,	23750,	36500";

	// IRA Adjustment limits
		_IRALimits[_TY+":AGE"] = 50;		// Need update
		_IRALimits[_TY+":MAX"] = 6500;
		_IRALimits[_TY+":SRMAX"] = 7500;
		_IRALimits[_TY+":SNG"] = 		// Need update
		_IRALimits[_TY+":MFS"] = 		// Need update
		_IRALimits[_TY+":HOH"] = "78000";		// Need update
		_IRALimits[_TY+":QSS"] = "129000";		// Need update
		_IRALimits[_TY+":WID"] = "129000";		// Need update
		// Col 1 = ret plan, Col 2 = no ret plan
		_IRALimits[_TY+":MFJ"] = "129000, 214000";		// Need update
		
	// Medicare PartB MFS Premium Threshhold
		_MEDBMFS[_TY] = 97000;
